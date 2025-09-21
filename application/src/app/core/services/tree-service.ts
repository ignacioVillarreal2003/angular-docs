import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tree } from '../models/tree';

@Injectable({
  providedIn: 'root',
})
export class TreeService {
  constructor(private http: HttpClient) {}

  loadTree(): Observable<Tree> {
    return this.http.get<Tree>('tree.json');
  }
}
