import { Subject, Observable } from 'rxjs';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  message: string = 'Hola Mundo!';
  @Output() messageEvent = new EventEmitter<Observable<any[]>>();

  // sendMessage() {
  //   this.messageEvent.emit(this.message);
  // }

  imagesChild: Observable<any[]>;
  searchValue: string = '';

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {}

  searchByName(searchValue: string) {
    if (searchValue && !searchValue.trim()) {
      return;
    } else if (searchValue === '') {
      console.log('kỳ vậy');
      this.imagesChild = this.firebaseService.getImages();
      this.imagesChild.subscribe((data) => console.log(data));
      this.messageEvent.emit(this.imagesChild);
      return;
    } else {
      this.imagesChild = this.firebaseService.searchByImgName(
        searchValue.toLowerCase().trim(),
        searchValue.toLowerCase().trim()
      );
      this.imagesChild.subscribe((data) => console.log(data));
      this.messageEvent.emit(this.imagesChild);
      return;
    }
  }
}
