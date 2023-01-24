import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseWorkerService } from '../../shared-services/firebase-worker/firebase-worker.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  constructor(private firebaseWorker: FirebaseWorkerService) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    this.firebaseWorker
      .signIn(form.value.email, form.value.password)
      .then((response: any) => {
        if (response != undefined) {
          console.log("logined")
        }
      });
  }

  onForgotPasswordBtnClick() {
    this.firebaseWorker.googleAuth().then(response => {
      console.log(response);
    })
  }
}
