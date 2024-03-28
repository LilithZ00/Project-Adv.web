import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { EditprofileComponent } from './profile/editprofile/editprofile.component';
import { EditpostComponent } from './profile/editpost/editpost.component';
import { ChangepasswordComponent } from './profile/changepassword/changepassword.component';
import { AddComponent } from './profile/add/add.component';
import { ScoreComponent } from './statistic/score/score.component';
import { GrapComponent } from './statistic/grap/grap.component';
import { HomeadminComponent } from './admin/homeadmin/homeadmin.component';
import { ProfileuserComponent } from './admin/profileuser/profileuser.component';
import { ScoreadminComponent } from './admin/scoreadmin/scoreadmin.component';
import { GrapadminComponent } from './admin/grapadmin/grapadmin.component';
import { ShowComponent } from './components/show/show.component';
import { HeaderComponent } from './main/header/header.component';
import { HeaderadminComponent } from './admin/headeradmin/headeradmin.component';
import { HeaderrshowComponent } from './components/headerrshow/headerrshow.component';
import { ScoreShowComponent } from './components/score-show/score-show.component';
import { GraphShowComponent } from './components/graph-show/graph-show.component';
import { UserpostComponent } from './main/userpost/userpost.component';


export const routes: Routes = [
  { path: 'show', component: ShowComponent },
  { path: 'main/:id', component: MainComponent },
  { path: 'main/userpost/:id', component: UserpostComponent },
  { path: 'showScore', component: ScoreShowComponent },
  { path: 'showGraph/:idP/:str', component: GraphShowComponent },

  { path: 'header/:id', component: HeaderComponent },
  { path: 'headerrshow', component: HeaderrshowComponent},

  { path: 'Headeradmin/:id', component: HeaderadminComponent },
  { path: 'homeadmin/:id', component: HomeadminComponent },
  { path: 'profileUser/:id', component: ProfileuserComponent },
  { path: 'scoreadmin/:id', component: ScoreadminComponent },
  { path: 'scoreadmin/grapadmin/:id/:idP/:str', component: GrapadminComponent },

  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  //Profile
  { path: 'Profile/:id', component: ProfileComponent },
  { path: 'profile/editprofile/:id', component: EditprofileComponent },
  { path: 'profile/changepassword/:id', component: ChangepasswordComponent },
  { path: 'profile/add/:id', component: AddComponent },
  { path: 'profile/editpost/:id/:idP', component: EditpostComponent },

  { path: 'score/:id', component: ScoreComponent },
  { path: 'score/grap/:id/:idP/:str', component: GrapComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }