import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-images-category',
  templateUrl: './images-category.component.html',
  styleUrls: ['./images-category.component.css'],
})
export class ImagesCategoryComponent implements OnInit {
  imagesCategory: Observable<any[]>;
  paramCategory;

  //Paginations
  config: any;
  lenghImages: number;

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramCategory = this.route.snapshot.params['category'];
    this.imagesCategory = this.firebaseService.getImagesByCategory(
      this.paramCategory
    );

    //Get length Images
    this.imagesCategory.subscribe((data) => {
      this.lenghImages = data.length;
    });
    //Config pagination
    this.config = {
      id: 'custom',
      itemsPerPage: 27,
      currentPage: 1,
      totalItems: this.lenghImages,
    };

    setTimeout(() => {
      this.imagesCategory.subscribe((data) => console.log(data));
    }, 2000);
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
