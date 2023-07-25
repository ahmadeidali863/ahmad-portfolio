import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',   redirectTo: '/', pathMatch: 'full'
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('../app/home/home/home.component').then(m => m.HomeComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
