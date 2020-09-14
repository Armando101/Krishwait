import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: any = {};
  public loggedIn =  false;

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.auth.authState.subscribe(user => {
      if (!user) {
        this.loggedIn = false;
        return;
      }
      this.user.name = user.displayName;
      this.user.photo = user.photoURL;
      this.user.uid = user.uid;
      this.loggedIn = true;
      console.log('Usuario: ', this.user.name);
      console.log('Usuario: ', this.user.photo);
    });
  }

  login(provider: string): void {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout(): void {
    this.auth.signOut();
    this.router.navigateByUrl('products');
  }
}