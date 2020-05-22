import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message: string;
  receiveMessage($event) {
    this.images = $event;
  }
  images: Observable<any[]>;
  //Paginations
  config: any;
  lenghImages: number;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.images = this.firebaseService.getImages();
    //Get length Images
    this.images.subscribe((data) => {
      this.lenghImages = data.length;
    });
    //Config pagination
    this.config = {
      id: 'custom',
      itemsPerPage: 27,
      currentPage: 1,
      totalItems: this.lenghImages,
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
