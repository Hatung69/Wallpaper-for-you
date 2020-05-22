import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './must-match.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createAndRestForm();
  }

  createAndRestForm() {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  isLoading = false;
  register(userValue) {
    this.isLoading = true;
    this.authService
      .doRegister(userValue)
      .then((res) => {
        this.isLoading = false;
        Swal.fire(
          'Chúc mừng nàng',
          'Nàng đã đăng ký thành công ! Ta cũng đã đăng nhập giúp nàng rồi đó, tận hưởng đi',
          'success'
        );
        this.router.navigateByUrl('profile');
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          Swal.fire(
            'Oh fuck nàng',
            'Mail người ta xài rồi, lấy mail khác đi công chúa của ta ơi !',
            'error'
          );
          this.isLoading = false;
          return;
        } else if (err.code === 'auth/invalid-email') {
          Swal.fire('Nàng ơi', 'Nhập cái mail cho nó chuẩn dùm con', 'error');
          this.isLoading = false;
          return;
        }
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
