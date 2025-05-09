import { Readability } from '@mozilla/readability';
import fetch from 'cross-fetch';
import { JSDOM } from 'jsdom';
import * as sanitizeHtml from 'sanitize-html';

import { Injectable } from '@nestjs/common';

import { preprocessHtml } from '@/utils/html.utils';

import { sanitizeHtmlOptions } from './config';
import { ExtractedContentDto } from './dto';

@Injectable()
export class ExtractorService {
  async extractFromUrl(url: string): Promise<ExtractedContentDto | null> {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const html = await res.text();
    return this.extractFromHtml(html, url);
  }

  extractFromHtml(html: string, url = ''): ExtractedContentDto | null {
    const preProcessedHtml = preprocessHtml(html);
    const cleanedHtml = preProcessedHtml
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi, '');

    const dom: JSDOM = new JSDOM(cleanedHtml, {
      url,
      pretendToBeVisual: true,
    });

    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article) return null;

    return {
      title: article.title ?? '',
      content: this.cleanContent(article.content ?? ''),
      author: article.byline ?? '',
      published: article.publishedTime ?? '',
    };
  }

  private cleanContent(html: string) {
    html = html.replace(/\s+/g, ' ').trim();
    return sanitizeHtml(html, sanitizeHtmlOptions);
  }
}
