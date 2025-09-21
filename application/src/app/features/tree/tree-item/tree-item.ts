import { Component, Input } from '@angular/core';
import { Folder } from '../../../core/models/folder';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tree-item',
  imports: [RouterLink],
  templateUrl: './tree-item.html',
  styleUrl: './tree-item.scss',
})
export class TreeItem {
  @Input() folder: Folder | undefined;
}
