import {Component, Input} from '@angular/core';
import {ProgettiServiceMetadataModel} from "../../../../models/ProgettiServiceModel";
import {CommonModule} from "@angular/common";
import {DotLayoutComponent} from "../../../layout/dot-layout/dot-layout.component";

@Component({
  selector: 'progetto-card',
  standalone: true,
  imports: [CommonModule, DotLayoutComponent],
  templateUrl: './progetto-card.component.html',
  styleUrl: './progetto-card.component.scss'
})
export class ProgettoCardComponent {
  @Input() progettoMetadata: ProgettiServiceMetadataModel;
}
