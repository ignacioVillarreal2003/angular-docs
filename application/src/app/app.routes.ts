import { Routes } from '@angular/router';
import { FolderPage } from './features/folder/folder-page/folder-page';
import { DocumentPage } from './features/document/document-page/document-page';
import { TreePage } from './features/tree/tree-page/tree-page';

export const routes: Routes = [
  {
    path: '',
    component: TreePage,
  },
  {
    path: 'folder/:path',
    component: FolderPage,
  },
  {
    path: 'document',
    children: [
      {
        path: '**',
        component: DocumentPage,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
