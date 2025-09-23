import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Folder } from '../../../core/models/folder';
import { RouterLink } from '@angular/router';
import { ColorService } from '../../../core/services/color-service';

@Component({
  selector: 'app-folder-item',
  imports: [RouterLink],
  templateUrl: './folder-item.html',
  styleUrl: './folder-item.scss',
})
export class FolderItem {
  @Input() folder: Folder | undefined;
  @ViewChild('folderImage2', { static: false }) folderImage!: ElementRef<HTMLDivElement>;
  @ViewChild('coverImg2', { static: false }) coverImg!: ElementRef<HTMLImageElement>;

  constructor(private colorService: ColorService) {}

  onImageLoad(img: HTMLImageElement) {
    const rgb = this.colorService.getColor(img);

    if (this.folderImage) {
      this.folderImage.nativeElement.style.backgroundColor = rgb;
    }
  }
}
