import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroPessoasPageRoutingModule } from './cadastro-pessoas-routing.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CadastroPessoasPageRoutingModule,
    RouterModule
  ],
  declarations: []
})
export class CadastroPessoasPageModule {}

