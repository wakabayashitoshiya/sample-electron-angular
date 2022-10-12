import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginModel } from './loginModel';
// test_ipc
import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private ipc: IpcRenderer;
  model = new LoginModel('', '');
  constructor(private router: Router) {
    this.ipc = (window as any).require('electron').ipcRenderer;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const auth = {
      id: this.model.loginId,
      pass: this.model.password,
    }

    const message = this.ipc.sendSync('testIpc',auth);
    console.log(message);
    // if (this.model.loginId == this.model.password) {
    //   this.router.navigate(['menu']);
    // } else {
    //   this.model.message = "ログインに失敗しました";
    // }
  }
  
}
