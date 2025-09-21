import { Component, Input } from '@angular/core';
import { Folder } from '../../../core/models/folder';
import { TreeItem } from '../tree-item/tree-item';

@Component({
  selector: 'app-tree-list',
  imports: [TreeItem],
  templateUrl: './tree-list.html',
  styleUrl: './tree-list.scss',
})
export class TreeList {
  @Input() folders: Folder[] | undefined;
}
