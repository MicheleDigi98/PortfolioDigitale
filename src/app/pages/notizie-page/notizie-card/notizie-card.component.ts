import {Component, Input, OnInit} from '@angular/core';
import BlogServiceMetadataModel from "../../../../models/BlogServiceModel";
import {CommonModule} from "@angular/common";
import {RestService} from "../../../../servicies/rest.service";
import {BlogService} from "../../../../servicies/blog.service";

@Component({
  selector: 'notizie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notizie-card.component.html',
  styleUrl: './notizie-card.component.scss'
})
export class NotizieCardComponent implements OnInit{
  @Input() blogMetadata: BlogServiceMetadataModel;

  public template = "";

  constructor(
    private _restService: RestService,
    private _blogService: BlogService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.template = await this._blogService.getTemplateBlog(this.blogMetadata);
  }

  public get baseUrl(): string{
    return this._restService.baseUrl;
  }
}
