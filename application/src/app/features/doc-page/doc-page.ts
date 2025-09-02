import {MarkdownViewer} from '../markdown-viewer/markdown-viewer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MarkdownService} from '../../core/services/markdown-service';

@Component({
  selector: 'app-doc-page',
  imports: [
    MarkdownViewer
  ],
  templateUrl: './doc-page.html',
  styleUrl: './doc-page.scss'
})
export class DocPage {
  content = '';
  metadata: any;

  constructor(private route: ActivatedRoute, private mdService: MarkdownService) {}

  ngOnInit() {
    const section = this.route.snapshot.paramMap.get('section');
    const doc = this.route.snapshot.paramMap.get('doc');
    if (section && doc) {
      const path = `welcome.md`;
      this.mdService.loadDoc(path).subscribe(doc => {
        this.content = doc.content;
        this.metadata = doc.metadata;
      });
    }
  }
}
