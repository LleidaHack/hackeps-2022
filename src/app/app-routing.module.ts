import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';


const routes: Routes = [
  { path:  '', component: HomeComponent },
  { path:  'user', component: UserProfileComponent },
  { path:  'user/signup', component: SignUpFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
