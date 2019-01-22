import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monaco',
  templateUrl: './monaco.component.html',
  styleUrls: ['./monaco.component.scss']
})
export class MonacoComponent {
  title = 'app';
  theme = 'vs-dark';
  themes = ['vs', 'vs-dark', 'hc-black'];
  options = {theme: 'vs-dark'};

  setTheme(theme: string) {
    if (theme) {
      this.options = Object.assign({}, {theme: theme});
    }
  }

  constructor(
    public router: Router
  ){}
}
