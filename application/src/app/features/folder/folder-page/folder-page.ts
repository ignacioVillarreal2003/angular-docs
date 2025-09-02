import { Component } from '@angular/core';
import {Folder} from '../../../core/models/folder';
import {ActivatedRoute} from '@angular/router';
import {FolderService} from '../../../core/services/folder-service';
import {FolderList} from '../folder-list/folder-list';
import {DocumentList} from '../document-list/document-list';

@Component({
  selector: 'app-folder-page',
  imports: [
    FolderList,
    DocumentList
  ],
  templateUrl: './folder-page.html',
  styleUrl: './folder-page.scss'
})
export class FolderPage {
  folder: Folder | undefined;

  constructor(private route: ActivatedRoute,
              private folderService: FolderService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const path: string | null = params.get('path');
      if (path !== null) {
        this.folderService.findFolderByPath(path).subscribe((folder: Folder | undefined): void => {
          this.folder = folder;
        });
      }
    });
  }
}
