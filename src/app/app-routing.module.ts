// Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { StackBitzComponent } from './stack-bitz/stack-bitz.component';
import { FroalaComponent } from './froala/froala.component';
import { MonacoComponent } from './monaco/monaco.component';
import { ChatComponent } from './chat/chat.component';
import { ChatRoomComponent } from './chat/chat-room/chat-room.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stackblitz', component: StackBitzComponent },
  { path: 'froala', component: FroalaComponent },
  { path: 'monaco', component: MonacoComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'chat/:workspace', component: ChatRoomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
