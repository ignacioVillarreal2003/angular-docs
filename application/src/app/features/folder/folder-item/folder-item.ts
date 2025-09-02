import {Component, Input} from '@angular/core';
import {Folder} from '../../../core/models/folder';
import {RouterLink} from '@angular/router';

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
}
