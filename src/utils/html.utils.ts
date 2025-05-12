import * as cheerio from 'cheerio';

const IGNORED_CLASSES = ['modal__sendreact', 'detail-info', 'main-nav'];

export function preprocessHtml(html: string): string {
  const $ = cheerio.load(html);

  IGNORED_CLASSES.forEach((cls) => {
    $(`.${cls}`).remove();
  });

  return $.html();
}
