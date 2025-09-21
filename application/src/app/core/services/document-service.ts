import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private http: HttpClient) {}

  loadDocument(path: string): Observable<Document | undefined> {
    return this.http.get(`content/${path}`, { responseType: 'text' }).pipe(
      map((raw) => {
        if (raw.startsWith('---')) {
          const end = raw.indexOf('---', 3);
          if (end !== -1) {
            const fm = raw.slice(3, end).trim();
            const content = raw.slice(end + 3).trim();

            const metadata: { [key: string]: string } = {};

            fm.split('\n').forEach((line) => {
              const [key, ...rest] = line.split(':');
              metadata[key.trim()] = rest.join(':').trim();
            });

            const document: Document = {
              id: Math.random().toString(36).substring(2, 10),
              title: metadata['title'],
              subtitle: metadata['subtitle'],
              order: Number(metadata['order']),
              date: metadata['date'],
              coverImage: metadata['coverImage'],
              urlPath: metadata['urlPath'],
              markdownContent: content,
            };

            return document;
          }
        }
        return undefined;
      })
    );
  }
}
