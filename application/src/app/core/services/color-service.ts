import { Injectable } from '@angular/core';
import ColorThief from 'colorthief';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private colorThief: ColorThief;

  constructor() {
    this.colorThief = new ColorThief();
  }

  getColor(image: HTMLImageElement): string {
    const color = this.colorThief.getColor(image);
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  }
}
