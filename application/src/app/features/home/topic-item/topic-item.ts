import {Component, Input} from '@angular/core';
import {Folder} from '../../../core/models/folder';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-topic-item',
  imports: [RouterLink],
  templateUrl: './topic-item.html',
  styleUrl: './topic-item.scss'
})
export class TopicItem {
  @Input() folder: Folder | undefined;

}
