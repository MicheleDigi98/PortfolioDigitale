import {Component, Input, Output, EventEmitter} from '@angular/core';
import MenuHeaderItemModel from "../../../models/MenuHeaderItemModel";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'menu-header-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-header-item.component.html',
  styleUrl: './menu-header-item.component.scss'
})
export class MenuHeaderItemComponent {
  @Input() item: MenuHeaderItemModel;
  @Input() selected = false;

  @Output() onClick = new EventEmitter<boolean>();
}
