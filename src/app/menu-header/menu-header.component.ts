import {Component, EventEmitter, Input, Output} from '@angular/core';
import MenuHeaderItemModel from "../../models/MenuHeaderItemModel";
import {MenuHeaderItemComponent} from "./item/menu-header-item.component";

@Component({
  selector: 'menu-header',
  standalone: true,
  imports: [
    MenuHeaderItemComponent
  ],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss'
})
export class MenuHeaderComponent {
  @Input() listaVoci: MenuHeaderItemModel[] = [];
  @Input() voceSelezionata = '';
  @Output() onVoceSelezionataChange = new EventEmitter<string>();
}
