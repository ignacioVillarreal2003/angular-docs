import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Document } from '../../../core/models/document';
import ColorThief from 'colorthief';
import { ColorService } from '../../../core/services/color-service';

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

  constructor(private colorService: ColorService) {}

  onImageLoad(img: HTMLImageElement) {
    const rgb = this.colorService.getColor(img);

    if (this.folderImage) {
      this.folderImage.nativeElement.style.backgroundColor = rgb;
    }
  }
}
