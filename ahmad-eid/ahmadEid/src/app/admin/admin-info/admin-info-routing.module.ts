import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminInfoComponent } from './admin-info.component';

const routes: Routes = [
  {
    path: '',
  component: AdminInfoComponent,
children: [
 {
  path: 'info_JavaScript',
  title:'Info JavaScript',
  loadComponent: () => import('../admin-info/info-javascript/info-javascript.component').then(m => m.InfoJavascriptComponent)
  }
]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminInfoRoutingModule { }
