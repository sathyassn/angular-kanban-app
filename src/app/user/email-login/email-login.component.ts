import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type formType = 'login' | 'signup' | 'reset';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  formType: formType = 'signup';
  serverMessage = '';
  loading = false;

  constructor(public afAuth: AngularFireAuth, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [''],
    });
  }

  changeFormType(val: formType) {
    this.formType = val;
  }

  get isLogin() {
    return this.formType === 'login';
  }

  get isSignup() {
    return this.formType === 'signup';
  }

  get isPasswordReset() {
    return this.formType === 'reset';
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  get passwordDoesMatch() {
    if (this.formType !== 'signup') {
      return true;
    } else {
      return this.password?.value === this.confirmPassword?.value;
    }
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        await this.afAuth.signInWithEmailAndPassword(email, password);
      }
      if (this.isSignup) {
        await this.afAuth.createUserWithEmailAndPassword(email, password);
      }
      if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Please check your email';
      }
    } catch (error) {
      this.serverMessage = error;
    }
    this.loading = false;
  }
}
