import {Component, Input} from '@angular/core';
import {Movie} from "../../types/movie";
import {CommonModule, NgIf} from "@angular/common";
import {imagesBaseUrl} from "../../constants/images-size";

@Component({
  selector: 'app-show-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.css'
})
export class ShowItemComponent {
  @Input() showItem: Movie | null = null ;
  imageBaseUrl = imagesBaseUrl;
}
