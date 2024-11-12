import{NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {RegisterComponent} from './pages/register/register.component';


const routes: Routes = [
  {path:'sign-in',component:SignInComponent},
  {path:'register',component:RegisterComponent},
  {path:'',component:SignInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents=[SignInComponent,RegisterComponent];
