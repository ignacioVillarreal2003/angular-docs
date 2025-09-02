import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Folder} from '../models/folder';
import {RootFolder} from '../models/root-folder';


@Injectable({
  providedIn: 'root'
})
export class FolderService {
  constructor(private http: HttpClient) {}

  loadFolders(): Observable<RootFolder> {
    return this.http.get<RootFolder>('content/folders.json');
  }

  findFolderByPath(path: string): Observable<Folder | undefined> {
    return this.loadFolders().pipe(
      map(root => {
        if (!root.folders) return undefined;

        const parts = path.split('/').filter(Boolean); // ["ia", "ml"]
        let currentFolders = root.folders;
        let current: Folder | undefined;

        for (const part of parts) {
          // acá la comparación debe ser contra el ID de cada parte
          current = currentFolders.find(f => f.id === part);
          if (!current) return undefined;
          currentFolders = current.folders || [];
        }

        return current;
      })
    );
  }

}
