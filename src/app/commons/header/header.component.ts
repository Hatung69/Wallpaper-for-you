import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ListCategory } from 'src/app/upload-image/categogy';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  listCategory = ListCategory.categogy.map((data) => {
    return data;
  });

  user: Observable<firebase.User>;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.authUser();
  }

  logOut() {
    this.authService.logOut().then((onResolve) => {
      this.router.navigateByUrl('home');
    });
  }
}
