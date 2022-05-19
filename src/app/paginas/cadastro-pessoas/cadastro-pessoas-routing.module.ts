import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroPessoasPage } from './cadastro-pessoas.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroPessoasPage
  },
  {
    path: '/:id',
    component: CadastroPessoasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroPessoasPageRoutingModule {}
