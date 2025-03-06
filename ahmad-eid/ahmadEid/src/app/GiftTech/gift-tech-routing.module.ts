import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // data: {
    //   role: [Roles.User]
    // },
    // canActivate: [
    //   () => inject(MobileGuard).canActivate,
    //   () => inject(AuthGuard).canActivate
    //   ],
    title: '',
    //canActivate: [AuthGuard],
    loadComponent: () => import('../GiftTech/gift-tech-main/gift-tech-main.component').then(m => m.GiftTechMainComponent)
  },
  {
    path: 'edit',
    title: '',
    loadComponent: () => import('../GiftTech/gift-tech-page-edit/gift-tech-page-edit.component').then(m => m.GiftTechPageEditComponent),
  },
  {
    path: 'view',
    title: '',
    loadComponent: () => import('../GiftTech/gift-tech-page/gift-tech-page.component').then(m => m.GiftTechPageComponent),
  },
  {
    path: 'start',
    title: 'home',
    loadComponent: () => import('../GiftTech/home/home.component').then(m => m.HomeComponent),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftTechRoutingModule { }
