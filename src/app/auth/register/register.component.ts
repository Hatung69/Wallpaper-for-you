import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './must-match.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
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
  register(value) {
    this.isLoading = true;
    this.authService.doRegister(value).then(
      (res) => {
        Swal.fire('Chúc mừng năm mới', 'Đăng ký thành công !', 'success');
        this.isLoading = false;
      },
      (err) => {
        const errorCode = err.code;
        if (errorCode === 'auth/email-already-in-use') {
          Swal.fire(
            'Chậc',
            'Mail này người ta xài rồi, lấy mail khác đi',
            'error'
          );
          this.isLoading = false;
          return;
        } else if (errorCode === 'auth/invalid-email') {
          Swal.fire('Chán lắm', 'Nhập cái mail cho nó chuẩn dùm con', 'error');
          this.isLoading = false;
          return;
        }
      }
    );
  }
}
