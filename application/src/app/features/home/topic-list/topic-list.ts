import {Component, Input} from '@angular/core';
import {Folder} from '../../../core/models/folder';
import { TopicItem } from '../topic-item/topic-item';

@Component({
  selector: 'app-topic-list',
  imports: [TopicItem],
  templateUrl: './topic-list.html',
  styleUrl: './topic-list.scss'
})
export class TopicList {
  @Input() folders: Folder[] | undefined;

}
