import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'category/:Id',
    loadChildren: () =>
      import('./view/home/home.module').then((x) => x.HomeModule),
  },
  {
    path: 'rooms/:id',
    loadChildren: () =>
      import('src/app/view/room-page/room-page.module').then(
        (x) => x.RoomPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./view/home/home.module').then((x) => x.HomeModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./view/page-not-found/page-not-found.module').then(
        (x) => x.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
