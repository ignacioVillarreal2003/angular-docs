import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {Folder} from '../../../core/models/folder';
import {RouterLink} from '@angular/router';
import ColorThief from 'colorthief';

@Component({
  selector: 'app-folder-item',
  imports: [
    RouterLink
  ],
  templateUrl: './folder-item.html',
  styleUrl: './folder-item.scss'
})
export class FolderItem {
  @Input() folder: Folder | undefined;

    @ViewChild('folderImage2', { static: false }) folderImage!: ElementRef<HTMLDivElement>;
  @ViewChild('coverImg2', { static: false }) coverImg!: ElementRef<HTMLImageElement>;

  onImageLoad(img: HTMLImageElement) {
    const colorThief = new ColorThief();
    const color = colorThief.getColor(img);
    const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  
    if (this.folderImage) {
      this.folderImage.nativeElement.style.backgroundColor = rgb;
    }
  }
}
