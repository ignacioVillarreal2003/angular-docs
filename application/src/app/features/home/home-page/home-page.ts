import { Component } from '@angular/core';
import {FolderList} from '../../folder/folder-list/folder-list';
import {FolderService} from '../../../core/services/folder-service';
import {RootFolder} from '../../../core/models/root-folder';

@Component({
  selector: 'app-home-page',
  imports: [
    FolderList,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  rootFolder: RootFolder | undefined;

  constructor(private folderService: FolderService) {}

  ngOnInit(): void {
    this.folderService.loadFolders().subscribe((rootFolder: RootFolder): void => {
      this.rootFolder = rootFolder;
    });
  }
}
