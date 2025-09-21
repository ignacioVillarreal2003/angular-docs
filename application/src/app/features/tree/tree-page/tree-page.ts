import { Component } from '@angular/core';
import { FolderList } from '../../folder/folder-list/folder-list';
import { Tree } from '../../../core/models/tree';
import { TreeService } from '../../../core/services/tree-service';

@Component({
  selector: 'app-tree-page',
  imports: [FolderList],
  templateUrl: './tree-page.html',
  styleUrl: './tree-page.scss',
})
export class TreePage {
  tree: Tree | undefined;

  constructor(private treeService: TreeService) {}

  ngOnInit(): void {
    this.treeService.loadTree().subscribe((tree: Tree): void => {
      this.tree = tree;      
    });
  }
}
