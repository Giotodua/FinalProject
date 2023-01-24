import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as firebase from 'firebase/auth';
import { User } from '../../components/user-models/user';

@Injectable({
  providedIn: 'root',
})
export class FirebaseWorkerService {
  userData!: any;

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public router: Router
  ) {
    this.auth.authState.subscribe((user) => {
      console.log(user);
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this.dialog.closeAll();
      } else {
        // localStorage.setItem('user', 'null');
        localStorage.removeItem('user');
        // JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  get isLoggedIn(): boolean {
    return !!JSON.parse(localStorage.getItem('user')!);
  }

  signIn(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.auth.authState.subscribe((user) => {
          if (user) {
            console.log(user);
          }
        });
        return this.getUserDoc(result.user?.uid ?? '');
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(user: User, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(user.email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserDataForSignUp(result.user, user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  googleAuth() {
    return this.authLogin(new firebase.GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  authLogin(provider: any) {
    return this.auth
      .signInWithPopup(provider)
      .then((result) => {
        return this.getUserDoc(result.user?.uid ?? '');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  sendVerificationMail() {
    // return this.afAuth.currentUser
    // .then((u: any) => u.sendEmailVerification())
    // .then(() => {
    // this.router.navigate(['verify-email-address']);
    // });
  }

  getUserDoc(id: string): any {
    return this.firestore.collection('users').doc(id).valueChanges();
  }

  setUserDataForSignUp(fireUser: any, user: User) {
    console.log(user);
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${fireUser.uid}`
    );
    const userData: User = {
      id: fireUser.uid,
      email: fireUser.email,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
    } as User;
    return userRef.set(userData, {
      merge: true,
    });
  }

  async singOut() {
    await this.auth.signOut();
    localStorage.removeItem('user');
    await this.router.navigate(['']);
  }
}
