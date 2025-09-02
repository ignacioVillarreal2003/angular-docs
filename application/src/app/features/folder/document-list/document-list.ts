import {Component, Input} from '@angular/core';
import {Document} from '../../../core/models/document';
import {DocumentItem} from '../document-item/document-item';

@Component({
  selector: 'app-document-list',
  imports: [
    DocumentItem
  ],
  templateUrl: './document-list.html',
  styleUrl: './document-list.scss'
})
export class DocumentList {
  @Input() documents: Document[] | undefined;
}
