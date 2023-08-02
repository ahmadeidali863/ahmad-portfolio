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
  },
  {
    path: 'projects',
    title:'Projects',
    loadComponent: () => import('../app/home/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'skills',
    title:'Skills',
    loadComponent: () => import('../app/home/skills/skills.component').then(m => m.SkillsComponent)
  },
  {
    path: 'certifications',
    title:'Certifications',
    loadComponent: () => import('../app/home/certifications/certifications.component').then(m => m.CertificationsComponent)
  },
  {
    path: 'contact',
    title:'Contact',
    loadComponent: () => import('../app/home/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('../app/admin/admin-routing.module').then(m => m.AdminRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
