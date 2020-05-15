import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full' },
  { path: 'yguide', loadChildren: () => import('./yguide/dbtable/dbtable.module').then(m => m.DbtableModule) },


  { path: 'table', loadChildren: () => import('./table/table.module').then(m => m.TableModule) },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'page-header', loadChildren: () => import('./page-header/page-header.module').then(m => m.PageHeaderModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
