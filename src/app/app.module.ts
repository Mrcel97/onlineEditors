// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestoreModule, FirestoreSettingsToken } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StackBitzComponent } from './stack-bitz/stack-bitz.component';
import { FroalaComponent } from './froala/froala.component';
import { MonacoComponent } from './monaco/monaco.component';
import { AuthComponent } from './auth/auth.component';

// Configs
import { firebaseConfig } from '../assets/configs/firebaseConfig';
import { GithubComponent } from './github/github.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StackBitzComponent,
    FroalaComponent,
    MonacoComponent,
    AuthComponent,
    GithubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    MonacoEditorModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
