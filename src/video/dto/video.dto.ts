/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TagEntity } from 'src/tag/model/tag.entity';

export class VideoDto {
  constructor(
    id: number,
    add_at: Date,
    title: string,
    miniature_url: string,
    content_url: string,
    description: string,
    rating: string,
    lang: string,
    tags: TagEntity[],
  ) {
    this.id = id;
    this.add_at = add_at;
    this.title = title;
    this.miniature_url = miniature_url;
    this.content_url = content_url;
    this.description = description;
    this.rating = rating;
    this.lang = lang;
    this.tags = tags;
  }

  id: number;
  add_at: Date;
  title: string;
  miniature_url: string;
  content_url: string;
  description: string;
  rating: string;
  lang: string;
  tags: TagEntity[];
}
