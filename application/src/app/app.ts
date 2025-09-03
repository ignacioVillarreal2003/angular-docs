import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RootFolder } from './core/models/root-folder';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-docs');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<RootFolder>('content/history.md').subscribe((data) => {
      console.log(data);
    });
  }
}
