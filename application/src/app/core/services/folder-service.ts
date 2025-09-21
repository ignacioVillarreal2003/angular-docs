import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Folder } from '../models/folder';
import { TreeService } from './tree-service';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  constructor(private treeService: TreeService) {}

  findFolderByPath(path: string): Observable<Folder | undefined> {
    return this.treeService.loadTree().pipe(
      map((root) => {
        if (!root.folders) return undefined;

        const parts = path.split('/').filter(Boolean);
        let currentFolders = root.folders;
        let currentFolder: Folder | undefined;

        for (const part of parts) {
          currentFolder = currentFolders.find((f) => {
            if (!f.urlPath) return false;
            const folderSegment = f.urlPath.split('/').pop();
            return folderSegment === part;
          });
          if (currentFolder == undefined) {
            return undefined;
          }

          currentFolders = currentFolder.folders || [];
        }

        if (currentFolder != undefined) {
          currentFolder.id = Math.random().toString(36).substring(2, 10);
        }

        return currentFolder;
      })
    );
  }
}
