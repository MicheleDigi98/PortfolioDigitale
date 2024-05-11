import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuHeaderComponent} from "./menu-header/menu-header.component";
import {SocialFooterComponent} from "./social-footer/social-footer.component";
import {ProgettiPageComponent} from "./pages/progetti-page/progetti-page.component";
import MenuHeaderItemModel from "../models/MenuHeaderItemModel";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {NotiziePageComponent} from "./pages/notizie-page/notizie-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuHeaderComponent, SocialFooterComponent, ProgettiPageComponent, HomePageComponent, NotiziePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public vociMenu: MenuHeaderItemModel[] = [
    {idItem: 'home', labelItem: 'HOME', iconPath: 'assets/icons/homeIcon.png'},
    {idItem: 'progetti', labelItem: 'Progetti', iconPath: 'assets/icons/projectIcon.png'},
    {idItem: 'notizie', labelItem: 'Notizie', iconPath: 'assets/icons/workstationIcon.png'},
    {idItem: 'me', labelItem: 'Riguardo me', iconPath: 'assets/icons/aboutMeIcon.png'},
  ]

  public voceSelezionata = 'home';
}
