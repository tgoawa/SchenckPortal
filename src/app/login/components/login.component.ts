import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Cookie } from 'ng2-cookies';

import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import * as CryptoJS from '../../../../node_modules/crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  private loginUser: User = {
    username: '',
    password: ''
  };
  private errMessage: string;
  private isError: boolean;

  constructor(private _fb: FormBuilder, private _login: LoginService, private _router: Router) {}

  ngOnInit() {
    this.form = this._fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log(values['username']);
      this.loginUser.username = values['username'].toString();
      this.loginUser.password = values['password'].toString();
      let encUser = this.encryptUser();
      this._login.checkStatus(encUser)
        .then(
          data => this.setAuthStatus(data),
          error => this.displayError(error)
        );
    }
    else {
      this.isError = true;
      this.errMessage = 'Invalid User Name and/or password.';
      return;
      }
    }

  setAuthStatus(data){
    if (data) {
      Cookie.set('user', this.loginUser.username, 90);
      this._router.navigate(['/home']);
    }
    else {
      this.isError = true;
      this.errMessage = 'Username and/or password is incorrect';
      return;
    }
  }
  displayError(error) {
    this.isError = true;
    this.errMessage = 'Issue logging in.  Please ensure network connectivity and try again.';
  }

  encryptUser() {
    let key = CryptoJS.enc.Utf8.parse('8080808080808080');
    let iv = CryptoJS.enc.Utf8.parse('8080808080808080');
    let encryptedUser: User = {
    username: '',
    password: ''
    };

    encryptedUser.username = CryptoJS.AES.encrypt(this.loginUser.username, key, {iv: iv}).toString();
    encryptedUser.password = CryptoJS.AES.encrypt(this.loginUser.password, key, {iv: iv}).toString();
    return encryptedUser;
  }
}
