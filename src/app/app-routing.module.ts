import { ImagesCategoryComponent } from './images-category/images-category.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UserResolver } from './auth/profile/user.resolver';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: { data: UserResolver },
  },
  { path: 'image-detail/:objID', component: ImageDetailComponent },
  { path: 'images-category/:category', component: ImagesCategoryComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
