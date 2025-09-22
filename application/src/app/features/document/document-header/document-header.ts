import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Document } from '../../../core/models/document';
import ColorThief from 'colorthief';

@Component({
  selector: 'app-document-header',
  imports: [],
  templateUrl: './document-header.html',
  styleUrl: './document-header.scss'
})
export class DocumentHeader {
  @Input() document: Document | undefined;

  @ViewChild('documentImage', { static: false }) folderImage!: ElementRef<HTMLDivElement>;
  @ViewChild('coverImg3', { static: false }) coverImg!: ElementRef<HTMLImageElement>;

  onImageLoad(img: HTMLImageElement) {
    const colorThief = new ColorThief();
    const color = colorThief.getColor(img);
    const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  
    if (this.folderImage) {
      this.folderImage.nativeElement.style.backgroundColor = rgb;
    }
  }
}
