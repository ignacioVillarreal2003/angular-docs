import { Component, Input, SimpleChanges } from '@angular/core';
import { marked } from 'marked';
import katex from 'katex';
import Prism from 'prismjs';
import 'prismjs/components/prism-python.js';
import { Document } from '../../../core/models/document';

@Component({
  selector: 'app-document-content',
  imports: [],
  templateUrl: './document-content.html',
  styleUrl: './document-content.scss',
})
export class DocumentContent {
  @Input() document: Document | undefined;
  htmlContent: string | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.document != undefined &&
      changes['document'] &&
      this.document.markdownContent != undefined
    ) {
      this.renderMarkdown(this.document.markdownContent);
    }
  }

private renderMarkdown(markdownContent: string): void {
  // Primero KaTeX
  markdownContent = this.renderKatex(markdownContent);

  const docPath = this.document?.path ?? '';

  const renderer = new marked.Renderer();
  renderer.code = function ({ text, lang }: any) {
    const language = (lang || 'javascript').toLowerCase();
    const prismLang = Prism.languages[language] || Prism.languages['javascript'];
    const html = Prism.highlight(text, prismLang, language);
    return `<pre class="language-${language}"><code>${html}</code></pre>`;
  };

  marked.use({
    extensions: [
      {
        name: 'customImage',
        level: 'block',
        start(src: string) {
          return src.match(/\[\[img:/)?.index;
        },
        tokenizer(src: string) {
          const rule = /^\[\[img:(.*?)\]\]([\s\S]*?)\[\[\/img\]\]/;
          const match = rule.exec(src);
          if (match) {
            const inner = match[2].trim();
            return {
              type: 'customImage',
              raw: match[0],
              url: match[1].trim(),
              tokens: marked.lexer(inner, { gfm: true }),
            };
          }
          return undefined;
        },
        renderer(token: any) {
          const captionHtml = marked.parser(token.tokens, { gfm: true });
          return `
            <div class="image-container">
              <img src="content/${docPath}/img/${token.url}" alt="">
              <p>${captionHtml}</p>
            </div>
          `;
        },
      },
      {
        name: 'customCard',
        level: 'block',
        start(src: string) {
          return src.match(/\[\[card\]\]/)?.index;
        },
        tokenizer(src: string) {
          const rule = /^\[\[card\]\]([\s\S]*?)\[\[\/card\]\]/;
          const match = rule.exec(src);
          if (match) {
            const inner = match[1].trim();
            return {
              type: 'customCard',
              raw: match[0],
              tokens: marked.lexer(inner, { gfm: true }),
            };
          }
          return undefined;
        },
        renderer(token: any) {
          const innerHtml = marked.parser(token.tokens, { gfm: true });
          return `<div class="card">${innerHtml}</div>`;
        },
      },
    ],
  });

  // 👇 ESTA LÍNEA FALTABA
  this.htmlContent = marked.parse(markdownContent, {
    renderer,
    gfm: true,
    breaks: true,
  }) as string;
}


  private renderKatex(markdownContent: string): string {
    markdownContent = markdownContent.replace(/\$\$(.*?)\$\$/gs, (_, expr) =>
      katex.renderToString(expr, { throwOnError: false, displayMode: true })
    );

    markdownContent = markdownContent.replace(/\$(.*?)\$/g, (_, expr) =>
      katex.renderToString(expr, { throwOnError: false, displayMode: false })
    );

    return markdownContent;
  }
}
