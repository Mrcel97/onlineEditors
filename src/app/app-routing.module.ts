import { StackBitzComponent } from './stack-bitz/stack-bitz.component';
// Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { FroalaComponent } from './froala/froala.component';
import { MonacoComponent } from './monaco/monaco.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'stackblitz', component: StackBitzComponent},
  {path: 'froala', component: FroalaComponent},
  {path: 'monaco', component: MonacoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
