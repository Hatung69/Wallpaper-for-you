import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  logIn(userValue) {
    this.authService
      .doLogin(userValue)
      .then((resolve) => {
        this.router.navigate(['/profile']);
      })
      .catch((err) => {
        Swal.fire(
          'Oh shit',
          'Nàng nhập tầm bậy gì rồi? Xem lại đi, thật thất vọng !',
          'error'
        );
        console.log(err);
      });
  }

  loginGoogle() {
    this.authService
      .doGoogleLogin()
      .then((res) => {
        this.router.navigate(['/profile']);
      })
      .catch((err) => {
        Swal.fire('Huhmmm', 'Google bị si đa rồi chả hiểu sao !', 'error');
        console.log(err);
      });
  }

  loginFacebook() {
    this.authService
      .doFacebookLogin()
      .then((res) => {
        this.router.navigate(['/profile']);
      })
      .catch((err) => {
        Swal.fire('Huhmmm', 'Facebook bị si đa rồi chả hiểu sao !', 'error');
        console.log(err);
      });
  }

  loginGitHub() {
    this.authService
      .doGitHubLogin()
      .then((res) => {
        this.router.navigate(['/profile']);
      })
      .catch((err) => {
        Swal.fire('Huhmmm', 'GitHub bị si đa rồi chả hiểu sao !', 'error');
        console.log(err);
      });
  }
}
