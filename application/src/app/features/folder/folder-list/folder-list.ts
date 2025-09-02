import {Component, Input} from '@angular/core';
import {Folder} from '../../../core/models/folder';
import {FolderItem} from '../folder-item/folder-item';

@Component({
  selector: 'app-folder-list',
  imports: [
    FolderItem
  ],
  templateUrl: './folder-list.html',
  styleUrl: './folder-list.scss'
})
export class FolderList {
  @Input() folders: Folder[] | undefined;
}
