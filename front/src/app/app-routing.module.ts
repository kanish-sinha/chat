import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPersonalComponent } from './chat-personal/chat-personal.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'chat/:sender/:reciever', component: ChatPersonalComponent },
  { path: 'chat/:sender', component: ChatComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
