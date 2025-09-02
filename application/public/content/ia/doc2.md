---
title: "Redes Neuronales 2"
description: "Ejemplo de documento con código, imágenes y matemáticas"
---

# Introducción

Este es un documento de ejemplo.

## Fórmula

$$
e^{i \pi} + 1 = 0
$$

## Código

```python
def suma(a, b):
    return a + b
```

> Nota: imágenes van en `src/assets/images/`.

---

## 3️⃣ Crear servicio para cargar Markdown

```ts
// src/app/services/markdown.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import matter from 'gray-matter';
import { Observable, map } from 'rxjs';

export interface MarkdownDoc {
  metadata: any;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  constructor(private http: HttpClient) {}

  loadDoc(path: string): Observable<MarkdownDoc> {
    return this.http.get(`assets/content/${path}`, { responseType: 'text' })
      .pipe(map(raw => {
        const parsed = matter(raw);
        return { metadata: parsed.data, content: parsed.content };
      }));
  }
}
