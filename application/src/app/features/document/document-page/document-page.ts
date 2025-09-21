import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../../../core/services/document-service';
import { DocumentHeader } from '../document-header/document-header';
import { DocumentContent } from '../document-content/document-content';
import { Document } from '../../../core/models/document';

@Component({
  selector: 'app-document-page',
  imports: [DocumentHeader, DocumentContent],
  templateUrl: './document-page.html',
  styleUrl: './document-page.scss',
})
export class DocumentPage {
  document: Document | undefined;

  constructor(private route: ActivatedRoute, private documentService: DocumentService) {}

  ngOnInit(): void {
    this.getDataFromMarkdown();
  }

  getDataFromMarkdown(): void {
    const segments = this.route.snapshot.url.map((seg) => seg.path);
    const documentPath = segments.join('/');

    console.log(documentPath);

    if (documentPath != undefined) {
      this.documentService.loadDocument(documentPath).subscribe({
        next: (data: Document | undefined): void => {
          this.document = data;
        },
      });
    }
  }
}
