import {Component, Input} from '@angular/core';
import {Movie} from "../../types/movie";
import {CommonModule, NgIf} from "@angular/common";
import {imagesBaseUrl} from "../../constants/images-size";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-show-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.css'
})
export class ShowItemComponent {
  @Input() showItem: Movie | null = null;
  @Input() currentDetailId: number | undefined;
  imageBaseUrl = imagesBaseUrl;

  constructor(private router: Router) {
  }

  navigateToDetail() {
    if (this.currentDetailId !== this.showItem?.id) {
      this.router.navigate(['/detail', this.showItem?.id]);
    }
  }
}
