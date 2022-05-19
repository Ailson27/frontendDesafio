import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroPessoasPage } from './paginas/cadastro-pessoas/cadastro-pessoas.page';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CadastroPerfilComponent } from './paginas/cadastro-perfil/cadastro-perfil.component';
import { CommonModule } from '@angular/common';
import { CadastroAplicativoComponent } from './paginas/cadastro-aplicativo/cadastro-aplicativo.component';
import { AtualizarPessoasComponent } from './paginas/atualizar-pessoas/atualizar-pessoas.component';


@NgModule({
  declarations: [AppComponent,
                 CadastroPessoasPage,
                 CadastroPerfilComponent,
                 CadastroAplicativoComponent,
                 AtualizarPessoasComponent
                ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    CommonModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
