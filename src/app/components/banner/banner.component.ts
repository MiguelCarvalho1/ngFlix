import {Component, Input} from '@angular/core';
import {ShowItemComponent} from "../show-item/show-item.component";
import {MovieService} from "../../services/movie.service";
import {Movie} from "../../types/movie";
import {AsyncPipe, CommonModule, NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    ShowItemComponent,HttpClientModule,CommonModule
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
  providers: [MovieService],
})
export class BannerComponent {
  @Input() shows: Movie[] = [];
  @Input() title = '';
  @Input() showsType: 'tv' | 'movie' = 'movie';
}




