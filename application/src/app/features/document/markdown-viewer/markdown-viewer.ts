import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-python.js';
import 'prismjs/themes/prism.css';

@Component({
  selector: 'app-markdown-viewer',
  imports: [],
  templateUrl: './markdown-viewer.html',
  styleUrl: './markdown-viewer.scss'
})
export class MarkdownViewer {
  @Input() markdownContent!: string;
  htmlContent = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['markdownContent'] && this.markdownContent) {
      this.renderMarkdown(this.markdownContent);
    }
  }

  private renderMarkdown(md: string) {
    // Render KaTeX for block math
    md = md.replace(/\$\$(.*?)\$\$/gs, (_, expr) =>
      katex.renderToString(expr, { throwOnError: false, displayMode: true })
    );

    // Render KaTeX for inline math
    md = md.replace(/\$(.*?)\$/g, (_, expr) =>
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

    this.htmlContent = marked.parse(md, {
      renderer: renderer,
      gfm: true,
      breaks: true
    }) as string;
  }
}
