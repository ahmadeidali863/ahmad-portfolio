import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './admin-main/admin-main.component';

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
    component: AdminMainComponent,
 children: [
   {
    path: 'projects',
    title:'Projects',
    loadComponent: () => import('../admin/admin-projects/admin-projects.component').then(m => m.AdminProjectsComponent)
    },
   {
    path: 'skills',
    title:'Skills',
    loadComponent: () => import('../admin/admin-skills/admin-skills.component').then(m => m.AdminSkillsComponent)
    }]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
