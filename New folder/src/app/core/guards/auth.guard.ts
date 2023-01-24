import { Injectable, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SingInComponent } from 'src/app/shared/components/sing-in/sing-in.component';

import { FirebaseWorkerService } from 'src/app/shared/shared-services/firebase-worker/firebase-worker.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;
  constructor(public dialog: MatDialog, public authService: FirebaseWorkerService, public router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn !== true) {

      this.router.navigate(['/']);

      const dialogRef = this.dialog.open(SingInComponent, { restoreFocus: false });
      dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
      return false;

    }
    return true;
  }

}


