---
title: "Bienvenido"
description: "Mi primer documento en Angular Markdown"
---

# Hola

Este es un ejemplo simple con:

## Fórmula

$$
E = mc^2
$$

## Código

```typescript
console.log("Hola mundo!");
```


> Nota: `images/logo.png` debe estar en `src/assets/images/logo.png`.

---

## 2️⃣ Servicio Markdown simple

```ts
// src/app/services/markdown.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import matter from 'gray-matter';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  constructor(private http: HttpClient) {}

  loadDoc(path: string): Observable<{metadata: any, content: string}> {
    return this.http.get(`assets/content/${path}`, { responseType: 'text' })
      .pipe(map(raw => {
        const parsed = matter(raw);
        return { metadata: parsed.data, content: parsed.content };
      }));
  }
}
