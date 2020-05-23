import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-images-latest',
  templateUrl: './images-latest.component.html',
  styleUrls: ['./images-latest.component.css'],
})
export class ImagesLatestComponent implements OnInit {
  imagesLatest: Observable<any[]>;
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.loadDataImagesLatest();
    this.imagesLatest = this.firebaseService.imagesLatest;
  }
}
