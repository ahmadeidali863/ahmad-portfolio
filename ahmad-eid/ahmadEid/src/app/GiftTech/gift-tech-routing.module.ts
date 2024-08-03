import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftTechMainComponent } from './gift-tech-main/gift-tech-main.component';

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
    loadComponent: () => import('../GiftTech/gift-tech-main/gift-tech-main.component').then(m => m.GiftTechMainComponent),
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftTechRoutingModule { }
