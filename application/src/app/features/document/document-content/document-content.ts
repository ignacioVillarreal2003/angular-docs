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
    // Primero renderizamos KaTeX porque no es parte de marked
    markdownContent = this.renderKatex(markdownContent);

    // Renderer de PrismJS
    const renderer = new marked.Renderer();
    renderer.code = function ({ text, lang }: any) {
      const language = lang?.toLowerCase() || 'javascript';
      const prismLang = Prism.languages[language] || Prism.languages['javascript'];
      const html = Prism.highlight(text, prismLang, language);
      return `<pre class="language-${language}"><code>${html}</code></pre>`;
    };

    // Extensiones custom para imágenes y cards
    marked.use({
      extensions: [
        {
          name: 'customImage',
          level: 'inline',
          start(src: string) {
            return src.match(/\[\[img:/)?.index;
          },
          tokenizer: (src: string) => {
            const rule = /^\[\[img:(.*?)\]\]([\s\S]*?)\[\[\/img\]\]/;
            const match = rule.exec(src);
            if (match) {
              return {
                type: 'customImage',
                raw: match[0],
                url: match[1].trim(),
                text: match[2].trim(),
              };
            }
            return undefined;
          },
          renderer: (token: any) => {
            return `
              <div class="image-container">
                <img src="content/${this.document?.path}/img/${token.url}" alt="">
                <p>${token.text}</p>
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
          tokenizer: (src: string) => {
            const rule = /^\[\[card\]\]([\s\S]*?)\[\[\/card\]\]/;
            const match = rule.exec(src);
            if (match) {
              return {
                type: 'customCard',
                raw: match[0],
                text: match[1].trim(),
              };
            }
            return undefined;
          },
          renderer: (token: any) => {
            return `<div class="card">${token.text}</div>`;
          },
        },
      ],
    });

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
