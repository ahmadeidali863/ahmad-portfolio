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
    },
   {
    path: 'info',
    title:'Info',
    loadChildren: () => import('../admin/admin-info/admin-info-routing.module').then(m => m.AdminInfoRoutingModule)
    },
   {
    path: 'certifications',
    title:'Certifications',
    loadComponent: () => import('../admin/admin-certification/admin-certification.component').then(m => m.AdminCertificationComponent)
    }]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
