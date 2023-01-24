import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { FirebaseWorkerService } from '../../shared-services/firebase-worker/firebase-worker.service';


import { SingInComponent } from '../sing-in/sing-in.component';
import { SingUpComponent } from '../sing-up/sing-up.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;
  constructor(public dialog: MatDialog, public auth: FirebaseWorkerService) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(SingUpComponent, { restoreFocus: false });
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }
  openSingIn() {
    const dialogRef = this.dialog.open(SingInComponent, { restoreFocus: false });
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }
}

