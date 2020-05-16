import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarDialogComponent } from './avatar-dialog/avatar-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  profileForm: FormGroup;

  // valueUserTemp = {
  //   displayNameTemp: '',
  //   photoURLTemp:
  //     'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg',
  // };

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((routeData) => {
      let data = routeData['data'];
      console.log(data);
      if (data) {
        this.user = data;
        this.createForm(this.user.displayName);
      }
    });
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
        console.log(res);
        Swal.fire('Ok', 'Cập hình profile thành công', 'success');
      },
      (err) => console.log(err)
    );
  }

  logout() {
    this.authService.doLogout().then(
      (res) => {
        this.location.back();
      },
      (error) => {
        console.log('Logout error', error);
      }
    );
  }
}
