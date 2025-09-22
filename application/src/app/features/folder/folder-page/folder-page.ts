import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Folder } from '../../../core/models/folder';
import { ActivatedRoute } from '@angular/router';
import { FolderService } from '../../../core/services/folder-service';
import { FolderList } from '../folder-list/folder-list';
import { DocumentList } from '../document-list/document-list';
import ColorThief from 'colorthief';

@Component({
  selector: 'app-folder-page',
  imports: [FolderList, DocumentList],
  templateUrl: './folder-page.html',
  styleUrl: './folder-page.scss',
})
export class FolderPage {
folder: Folder | undefined;

  @ViewChild('folderImage', { static: false }) folderImage!: ElementRef<HTMLDivElement>;
  @ViewChild('coverImg', { static: false }) coverImg!: ElementRef<HTMLImageElement>;

  constructor(private route: ActivatedRoute, private folderService: FolderService) {}

 ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const path: string | null = params.get('path');
      if (path !== null) {
        this.folderService.findFolderByPath(path).subscribe((folder: Folder | undefined): void => {
          this.folder = folder;
          if (this.folder) {
            this.folder.folders =
              this.folder.folders?.slice().sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)) ?? [];
            this.folder.documents =
              this.folder.documents?.slice().sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)) ?? [];
          }
        });
      }
    });
  }

  onImageLoad(img: HTMLImageElement) {
  const colorThief = new ColorThief();
  const color = colorThief.getColor(img);
  const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

  if (this.folderImage) {
    this.folderImage.nativeElement.style.backgroundColor = rgb;
  }
}
}