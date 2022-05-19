import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AtualizarPessoasComponent } from './paginas/atualizar-pessoas/atualizar-pessoas.component';
import { CadastroAplicativoComponent } from './paginas/cadastro-aplicativo/cadastro-aplicativo.component';
import { CadastroPerfilComponent } from './paginas/cadastro-perfil/cadastro-perfil.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'cadastro-pessoas',
    loadChildren: () => import('./paginas/cadastro-pessoas/cadastro-pessoas.module').then( m => m.CadastroPessoasPageModule)
  },
  {
    path: 'cadastro-perfil', component: CadastroPerfilComponent
  },
  {
    path: 'cadastro-aplicativo', component: CadastroAplicativoComponent
  },
  {
    path: 'atualizar-pessoas', component: AtualizarPessoasComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
