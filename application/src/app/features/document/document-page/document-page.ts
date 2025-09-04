import {MarkdownViewer} from '../markdown-viewer/markdown-viewer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MarkdownService} from '../../../core/services/markdown-service';

@Component({
  selector: 'app-document-page',
  imports: [MarkdownViewer],
  templateUrl: './document-page.html',
  styleUrl: './document-page.scss'
})
export class DocumentPage {
  content = '';
  metadata: any;

  constructor(private route: ActivatedRoute, private mdService: MarkdownService) {}

  ngOnInit() {        
    const fullPath = this.route.snapshot.url[0].path
    if (fullPath) {
      this.mdService.loadDoc(fullPath).subscribe(doc => {
        this.content = doc.content;
        this.metadata = doc.metadata;
      });
    }
  }
}
