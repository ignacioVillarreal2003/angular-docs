import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ColorService } from '../../../core/services/color-service';
import { Folder } from '../../../core/models/folder';

@Component({
  selector: 'app-folder-header',
  imports: [],
  templateUrl: './folder-header.html',
  styleUrl: './folder-header.scss',
})
export class FolderHeader {
  @Input() folder: Folder | undefined;
  @ViewChild('folderImage', { static: false }) folderImage!: ElementRef<HTMLDivElement>;
  @ViewChild('coverImg', { static: false }) coverImg!: ElementRef<HTMLImageElement>;

  constructor(private colorService: ColorService) {}

  onImageLoad(img: HTMLImageElement) {
    const rgb = this.colorService.getColor(img);

    if (this.folderImage) {
      this.folderImage.nativeElement.style.backgroundColor = rgb;
    }
  }
}
