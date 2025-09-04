import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-document-header',
  imports: [],
  templateUrl: './document-header.html',
  styleUrl: './document-header.scss'
})
export class DocumentHeader {
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() date: string | undefined;
}
