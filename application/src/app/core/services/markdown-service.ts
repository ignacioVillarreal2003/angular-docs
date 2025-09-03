import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export interface MarkdownDoc {
  metadata: any;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  base: string = "";

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    this.base = this.document.getElementsByTagName('base')[0].href;
  }

  loadDoc(path: string): Observable<MarkdownDoc> {
    return this.http.get(`${this.base}/content/${path}`, {responseType: 'text'}).pipe(
      map(raw => {
        let metadata: any = {};
        let content = raw;

        // Detectar frontmatter YAML entre '---'
        if (raw.startsWith('---')) {
          const end = raw.indexOf('---', 3);
          if (end !== -1) {
            const fm = raw.slice(3, end).trim();
            content = raw.slice(end + 3).trim();

            // Parse simple key: value por línea
            fm.split('\n').forEach(line => {
              const [key, ...rest] = line.split(':');
              metadata[key.trim()] = rest.join(':').trim();
            });
          }
        }

        return {metadata, content};
      })
    );
  }
}
