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
  imageList: AngularFireList<any[]>;
  imageListOfUser: AngularFireList<any[]>;

  constructor(
    public db: AngularFirestore,
    private firebase: AngularFireDatabase
  ) {
    // this.removeImage();
  }

  getAvatars() {
    return this.db.collection('avatar').valueChanges();
  }

  addImage(image) {
    this.firebase.list('images').push(image);
  }

  getImages(): Observable<any[]> {
    return this.firebase
      .list('images')
      .snapshotChanges()
      .pipe(
        map((action) =>
          action.map((a) => {
            const data = a.payload.val();
            return data;
          })
        )
      );
  }

  getImageDetailByImageID(imageId: string) {
    return this.firebase
      .list('images', (ref) => ref.orderByChild('imageID').equalTo(imageId))
      .valueChanges();
  }

  getImagesByCategory(category: string) {
    return this.firebase
      .list('images', (ref) => ref.orderByChild('category').equalTo(category))
      .valueChanges();
  }

  getImageOfUser(uid: string) {
    return this.firebase
      .list('images', (ref) => ref.orderByChild('uId').equalTo(uid))
      .valueChanges();
  }

  searchByImgName(start, end): Observable<any[]> {
    return this.firebase
      .list('images', (ref) =>
        ref
          .orderByChild('keySearch')
          .limitToFirst(10)
          .startAt(start)
          .endAt(end + '\uf8ff')
      )
      .snapshotChanges()
      .pipe(
        map((action) =>
          action.map((a) => {
            const data = a.payload.val();
            return data;
          })
        )
      );
  }

  // removeImage() {
  //   return this.firebase
  //     .list('images', (ref) =>
  //       ref.orderByChild('uId').equalTo('hvt15901461367741076005076')
  //     )
  //     .remove();
  // }
}
