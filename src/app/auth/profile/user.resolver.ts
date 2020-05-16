import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<User> {
  constructor(public userService: UserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Promise<User> {
    let user = new User();
    /////////////////////////////////////////////ĐÂy là nơi bạn cần phải customer your user model////////////////
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser().then(
        (res) => {
          if (res.providerData[0].providerId == 'password') {
            user.displayName = res.displayName;
            user.photoURL = res.photoURL;
            user.provider = res.providerData[0].providerId;
            return resolve(user);
          } else {
            user.photoURL = res.photoURL;
            user.displayName = res.displayName;
            user.provider = res.providerData[0].providerId;
            return resolve(user);
          }
        },
        (err) => {
          this.router.navigate(['/login']);
          return reject(err);
        }
      );
    });
  }
}
