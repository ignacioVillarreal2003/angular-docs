import { Routes } from '@angular/router';
import {HomePage} from './features/home/home-page/home-page';
import {FolderPage} from './features/folder/folder-page/folder-page';
import {folderMatcher} from './core/routing/folder-matcher';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    matcher: folderMatcher,
    component: FolderPage
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];
