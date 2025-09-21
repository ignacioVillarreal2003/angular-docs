import {Component, Input, SimpleChanges} from '@angular/core';
import { marked } from 'marked';
import katex from 'katex';
import Prism from 'prismjs';
import 'prismjs/components/prism-python.js';
import { Document } from '../../../core/models/document';

@Component({
  selector: 'app-document-content',
  imports: [],
  templateUrl: './document-content.html',
  styleUrl: './document-content.scss'
})
export class DocumentContent {
  @Input() document: Document | undefined;
  htmlContent: string | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.document != undefined && changes['document'] && this.document.markdownContent != undefined) {
      this.renderMarkdown(this.document.markdownContent);
    }
  }

  private renderMarkdown(markdownContent: string): void {
    markdownContent = markdownContent.replace(
      /\[\[note\]\]([\s\S]*?)\[\[\/note\]\]/g,
      (_, inner) => {
        return `<div class="note">${inner.trim()}</div>`;
      }
    );

    // Render KaTeX for block math
    markdownContent = markdownContent.replace(/\$\$(.*?)\$\$/gs, (_, expr) =>
      katex.renderToString(expr, { throwOnError: false, displayMode: true })
    );

    // Render KaTeX for inline math
    markdownContent = markdownContent.replace(/\$(.*?)\$/g, (_, expr) =>
      katex.renderToString(expr, { throwOnError: false, displayMode: false })
    );

    // Create a custom renderer that extends the default one
    const renderer = new marked.Renderer();

    // Override only the code method (new signature for marked v5+)
    renderer.code = function({text, lang, escaped}: {text: string, lang?: string, escaped?: boolean}) {
      const language = lang?.toLowerCase() || 'javascript';
      const prismLang = Prism.languages[language] || Prism.languages['javascript'];
      const html = Prism.highlight(text, prismLang, language);
      return `<pre class="language-${language}"><code>${html}</code></pre>`;
    };

    this.htmlContent = marked.parse(markdownContent, {
      renderer: renderer,
      gfm: true,
      breaks: true
    }) as string;
  }
}
