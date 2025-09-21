import {Component, Input} from '@angular/core';
import { Document } from '../../../core/models/document';

@Component({
  selector: 'app-document-header',
  imports: [],
  templateUrl: './document-header.html',
  styleUrl: './document-header.scss'
})
export class DocumentHeader {
  @Input() document: Document | undefined;
}
