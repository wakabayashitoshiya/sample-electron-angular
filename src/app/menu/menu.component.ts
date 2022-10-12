import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  template: '<h1>Menu</h1><a routerLink="/login">ログアウト</a>'
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}