import { Document } from './document';
import { Folder } from './folder';

export interface Tree {
  folders: Folder[] | undefined;
  documents: Document[] | undefined;
}
