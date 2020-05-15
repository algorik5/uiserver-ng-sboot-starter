import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'yguide/dbtable', pathMatch: 'full' },
  { path: 'yguide', loadChildren: () => import('./yguide/dbtable/dbtable.module').then(m => m.DbtableModule) },


  { path: 'ztable', loadChildren: () => import('./ztable/table.module').then(m => m.TableModule) },
  { path: 'zform', loadChildren: () => import('./zform/form.module').then(m => m.FormModule) },
  { path: 'zpage-header', loadChildren: () => import('./zpage-header/page-header.module').then(m => m.PageHeaderModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
