import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css'],
})
export class ImageDetailComponent implements OnInit {
  imageDetail: Observable<any>;
  paramObjID;

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramObjID = this.route.snapshot.params['objID'];

    this.imageDetail = this.firebaseService
      .getImageDetailByObjectID(this.paramObjID)
      .valueChanges();

    setTimeout(() => {
      this.imageDetail.subscribe((data) => console.log(data));
    }, 1000);
  }
}
