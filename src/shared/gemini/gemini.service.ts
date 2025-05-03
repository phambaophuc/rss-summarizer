import {
  Content,
  GenerateContentRequest,
  GenerateContentResult,
  GenerativeModel,
  GoogleGenerativeAI,
  Part,
} from '@google/generative-ai';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig } from '@/config';

@Injectable()
export class GeminiService {
  private readonly client: GoogleGenerativeAI;
  private readonly model: GenerativeModel;

  constructor(private readonly configService: ConfigService<AppConfig>) {
    const apiKey = this.configService.get('gemini.key', { infer: true })!;
    const modelId = this.configService.get('gemini.model', { infer: true })!;

    this.client = new GoogleGenerativeAI(apiKey);
    this.model = this.client.getGenerativeModel({ model: modelId });
  }

  async summarize(content: string): Promise<string> {
    const prompt = `Tóm tắt bài viết sau đây: \n${content}`;
    const parts: Part[] = [{ text: prompt }];

    const contentRequest: Content = {
      role: 'user',
      parts: parts,
    };

    const request: GenerateContentRequest = {
      contents: [contentRequest],
      systemInstruction: 'Tóm tắt bài viết này một cách ngắn gọn và rõ ràng.',
      tools: [],
    };

    const result: GenerateContentResult =
      await this.model.generateContent(request);

    return result.response.text()?.trim();
  }
}
