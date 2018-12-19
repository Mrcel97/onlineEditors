// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MonacoEditorModule } from 'ngx-monaco-editor';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StackBitzComponent } from './stack-bitz/stack-bitz.component';
import { FroalaComponent } from './froala/froala.component';
import { MonacoComponent } from './monaco/monaco.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StackBitzComponent,
    FroalaComponent,
    MonacoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    MonacoEditorModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
