import { Observable } from 'rxjs/internal/Observable';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarDialogComponent } from './avatar-dialog/avatar-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  imageListOfUser: Observable<any[]>;
  config: any;
  lenghImages: number;

  user: User = new User();
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((routeData) => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.displayName);
      }
    });

    this.imageListOfUser = this.firebaseService.getImageOfUser(this.user.uid);
    //Get length Images
    this.imageListOfUser.subscribe((data) => {
      this.lenghImages = data.length;
    });

    // Config pagination
    this.config = {
      id: 'custom',
      itemsPerPage: 12,
      currentPage: 1,
      totalItems: this.lenghImages,
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required],
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '350px',
      width: '560px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.user.photoURL = result.link;
      }
    });
  }

  save(value) {
    this.userService.updateCurrentUser(value).then(
      (res) => {
        Swal.fire('Ok baby', 'Ta đã cập nhật Rồ phai của nàng', 'success');
      },
      (err) => console.log(err)
    );
  }

  logOut() {
    this.authService.logOut().then((onResolve) => {
      this.router.navigateByUrl('home');
    });
  }
}
