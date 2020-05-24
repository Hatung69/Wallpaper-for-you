import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  receiveImages($event) {
    this.images = $event;
    this.config.currentPage = 1;
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
    this.firebaseService.loadDataImages();
    this.images = this.firebaseService.images;
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

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
