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
    markdownContent = this.renderCard(markdownContent);
    markdownContent = this.renderKatex(markdownContent);
    markdownContent = this.renderImage(markdownContent);

    const renderer = new marked.Renderer();

    renderer.code = function ({
      text,
      lang,
      escaped,
    }: {
      text: string;
      lang?: string;
      escaped?: boolean;
    }) {
      const language = lang?.toLowerCase() || 'javascript';
      const prismLang = Prism.languages[language] || Prism.languages['javascript'];
      const html = Prism.highlight(text, prismLang, language);
      return `<pre class="language-${language}"><code>${html}</code></pre>`;
    };

    this.htmlContent = marked.parse(markdownContent, {
      renderer: renderer,
      gfm: true,
      breaks: true,
    }) as string;
  }

  renderCard(markdownContent: string): string {
    markdownContent = markdownContent.replace(
      /\[\[card\]\]([\s\S]*?)\[\[\/card\]\]/g,
      (_, inner) => {
        return `<div class="card">${inner.trim()}</div>`;
      }
    );

    return markdownContent;
  }

  renderKatex(markdownContent: string): string {
    markdownContent = markdownContent.replace(/\$\$(.*?)\$\$/gs, (_, expr) =>
      katex.renderToString(expr, { throwOnError: false, displayMode: true })
    );

    markdownContent = markdownContent.replace(/\$(.*?)\$/g, (_, expr) =>
      katex.renderToString(expr, { throwOnError: false, displayMode: false })
    );

    return markdownContent;
  }

  renderImage(markdownContent: string): string {
    markdownContent = markdownContent.replace(
      /\[\[img:(.*?)\]\]\s*([\s\S]*?)\[\[\/img\]\]/g,
      (match, imageUrl, text) => {
        const cleanText = text.trim();
        return `
        <div class="image-container">
          <img src="content/${this.document?.path}/img/${imageUrl}" alt="">
          <p>${cleanText}</p>
        </div>
      `;
      }
    );
    console.log(markdownContent);
    
    return markdownContent;
  }
}
