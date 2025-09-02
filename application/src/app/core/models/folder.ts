import {Document} from './document';

export interface Folder {
  id: string;
  title: string;
  path: string;
  folders: Folder[] | undefined;
  documents: Document[] | undefined;
}
