import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { ListCategory } from './categogy';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent implements OnInit {
  listCategory = ListCategory.categogy.map((data) => {
    return data;
  });
  uploadForm: FormGroup;
  imgSrc: string = '/assets/img/imgdefault.png';
  selectedImg: any = null;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.uploadForm = this.fb.group({
      imageID: [
        'hvt' +
          new Date().getTime() +
          Math.floor(Math.random() * Math.floor(10000000000)),
      ],
      keySearch: [''],
      imageUrl: ['', Validators.required],
      imageName: ['', [Validators.required, Validators.maxLength(30)]],
      category: ['', Validators.required],
      description: [
        'Đây là...',
        [Validators.required, Validators.maxLength(30)],
      ],
      dateUpload: [new Date().toJSON().slice(0, 10).toString()],
      uId: [firebase.auth().currentUser.uid],
    });
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/imgdefault.png';
    }
  }

  isLoading = false;
  onSubmit(formValue) {
    this.isLoading = true;
    let filePath = `${formValue.category}/${this.selectedImg.name
      .split('.')
      .slice(0, -1)
      .join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage
      .upload(filePath, this.selectedImg)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            formValue['keySearch'] = formValue['imageName'].toLowerCase();
            this.firebaseService.addImage(formValue);
            this.imgSrc = '/assets/img/imgdefault.png';
            this.selectedImg = null;
            Swal.fire(
              'Làm được rồi',
              'Nàng đã tải thành công tấm hình xinh xắn ấy ! ',
              'success'
            );
            this.isLoading = false;
            this.createLoginForm();
          });
        })
      )
      .subscribe();
  }
}
