import { Document } from './document';

export interface Folder {
  id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  order: number | undefined;
  coverImage: string | undefined;
  urlPath: string | undefined;
  folders: Folder[] | undefined;
  documents: Document[] | undefined;
}
