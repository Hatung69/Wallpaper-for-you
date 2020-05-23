import { Subject, Observable } from 'rxjs';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  @Output() imagesEvent = new EventEmitter<Observable<any[]>>();

  // sendMessage() {
  //   this.messageEvent.emit(this.message);
  // }

  imagesChild: Observable<any[]>;
  searchValue: string;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {}

  searchByName(searchValue: string) {
    if (searchValue && !searchValue.trim()) {
      return;
    } else if (searchValue === '') {
      this.imagesChild = this.firebaseService.images;
      this.imagesEvent.emit(this.imagesChild);
      return;
    } else {
      this.firebaseService.searchByImgName(
        searchValue.toLowerCase().trim(),
        searchValue.toLowerCase().trim()
      );
      this.imagesChild = this.firebaseService.images;
      this.imagesChild.subscribe((data) => console.log(data));
      this.imagesEvent.emit(this.imagesChild);
      this.firebaseService.loadDataImages(); //tạm thời thì cứ reset khi sau khi xem chi tiết
      this.imagesChild = this.firebaseService.images;
      return;
    }
  }
}
