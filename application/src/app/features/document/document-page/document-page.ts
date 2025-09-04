import {Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MarkdownService} from '../../../core/services/markdown-service';
import {Metadata} from '../../../core/models/metadata';
import {MarkdownDocument} from '../../../core/models/markdown-document';
import {DocumentHeader} from '../document-header/document-header';
import {DocumentContent} from '../document-content/document-content';

@Component({
  selector: 'app-document-page',
  imports: [
    DocumentHeader,
    DocumentContent
  ],
  templateUrl: './document-page.html',
  styleUrl: './document-page.scss'
})
export class DocumentPage {
  markdownContent: string | undefined;
  metadata: Metadata | undefined;

  constructor(private route: ActivatedRoute,
              private mdService: MarkdownService) {}

  ngOnInit(): void {
    this.getDataFromMarkdown();
  }

  getDataFromMarkdown(): void {
    const documentPath: string = this.route.snapshot.url[0].path;
    if (documentPath != undefined) {
      this.mdService.loadDoc(documentPath).subscribe({
        next: (data: MarkdownDocument): void => {
          this.markdownContent = data.content;
          this.metadata = data.metadata;
        }
      });
    }
  }
}
