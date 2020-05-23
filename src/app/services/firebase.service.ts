import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private imageFL: AngularFireList<any>;
  public images: Observable<any[]>; // List image
  private imagesLatestFL: AngularFireList<any>;
  public imagesLatest: Observable<any[]>; // List image

  private userImagesFL: AngularFireList<any[]>;
  public userImages: Observable<any[]>; // List image user
  private imagesCategoryFL: AngularFireList<any[]>;
  public imagesCategory: Observable<any[]>; // List image user

  constructor(
    public db: AngularFirestore,
    private firebase: AngularFireDatabase
  ) {}

  getAvatars() {
    return this.db.collection('avatar').valueChanges();
  }

  addImage(image) {
    this.firebase.list('images').push(image);
  }

  loadDataImages() {
    this.imageFL = this.firebase.list('/images');
    this.images = this.imageFL
      .snapshotChanges()
      .pipe(
        map((res) =>
          res.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  loadDataImagesLatest() {
    this.imagesLatestFL = this.firebase.list('/images');
    this.imagesLatest = this.imagesLatestFL.snapshotChanges().pipe(
      map((res) =>
        res
          .reverse()
          .slice(0, 8)
          .map((c) => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  loadDataUserImages(uid: string) {
    this.userImagesFL = this.firebase.list('images', (ref) =>
      ref.orderByChild('uId').equalTo(uid)
    );
    this.userImages = this.userImagesFL
      .snapshotChanges()
      .pipe(
        map((action) =>
          action.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  getImageDetailByObjectID(objID: string) {
    return this.firebase.object('images/' + objID);
  }

  getImagesByCategory(category: string) {
    this.imagesCategoryFL = this.firebase.list('images', (ref) =>
      ref.orderByChild('category').equalTo(category)
    );
    this.imagesCategory = this.imagesCategoryFL
      .snapshotChanges()
      .pipe(
        map((action) =>
          action.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  searchByImgName(start, end) {
    this.imageFL = this.firebase.list('images', (ref) =>
      ref
        .orderByChild('keySearch')
        .limitToFirst(10)
        .startAt(start)
        .endAt(end + '\uf8ff')
    );
    this.images = this.imageFL
      .snapshotChanges()
      .pipe(
        map((action) =>
          action.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  removeImageByKey(imgKey: string) {
    this.firebase.object('images/' + imgKey).remove();
  }
}
