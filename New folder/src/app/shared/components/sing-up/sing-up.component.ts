import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseWorkerService } from '../../shared-services/firebase-worker/firebase-worker.service';
import { User } from '../user-models/user';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  constructor(private firebaseWorker: FirebaseWorkerService, private router: Router) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    var tmpUser = Object.assign(new User(), form.value);
    this.firebaseWorker.signUp(tmpUser, form.value.password).then(response => {
      this.router.navigate(['/']);
    });
  }

  onForgotPasswordBtnClick() {
    this.firebaseWorker.googleAuth().then(response => {
      console.log(response);
    })
  }
}
