import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../../servicies/blog.service";
import BlogServiceMetadataModel from "../../../models/BlogServiceModel";
import {NotizieCardComponent} from "./notizie-card/notizie-card.component";

@Component({
  selector: 'notizie-page',
  standalone: true,
  imports: [
    NotizieCardComponent
  ],
  templateUrl: './notizie-page.component.html',
  styleUrl: './notizie-page.component.scss'
})
export class NotiziePageComponent implements OnInit{
  public isLoading = true;
  public listaBlog: BlogServiceMetadataModel[] = [];

  constructor(
    private _blogService: BlogService
  ) {}

  public async ngOnInit(): Promise<void> {
    const blogs = await this._blogService.getListaBlog();

    for(const blog of blogs){
      const nomeBlog = blog.replace('Blog/', '');
      const metadataBlog = await this._blogService.getMetadataBlog(nomeBlog);
      metadataBlog.path = `/Blog/${nomeBlog}`;
      if(metadataBlog.affidabile === 'true'){
        this.listaBlog.push(metadataBlog);
      }
    }

    this.isLoading = false;
  }
}
