import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Document} from '../../../core/models/document';

@Component({
  selector: 'app-document-item',
  imports: [
    RouterLink
  ],
  templateUrl: './document-item.html',
  styleUrl: './document-item.scss'
})
export class DocumentItem {
  @Input() document: Document | undefined;
}
