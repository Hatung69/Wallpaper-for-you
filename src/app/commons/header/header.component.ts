import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ListCategory } from 'src/app/upload-image/categogy';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  listCategory = ListCategory.categogy.map((data) => {
    return data;
  });

  conatactForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    content: ['', Validators.required],
  });

  user: Observable<firebase.User>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user = this.authService.authUser();
  }

  logOut() {
    this.authService.logOut().then((onResolve) => {
      this.router.navigateByUrl('home');
    });
  }

  thanks(name) {
    Swal.fire(
      'My thanks',
      'Cám ơn ' + name + ' đã đóng góp ý kiến nhé hihi',
      'success'
    );
    this.conatactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
}
