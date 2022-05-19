import { Component, Output } from '@angular/core';
import { ApiService } from '../service/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  perfis: Array<any>;

  constructor(private apiService: ApiService,
              public alertController: AlertController
    ) {this.getDataPerfil(); }

  getDataPerfil(){
    this.apiService.getDataPerfil().subscribe(dados => this.perfis = dados);
  }

  async mensagemExcluirPerfil(perfis) {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Deseja excluir o perfil  '+`${perfis.perfil}`+ '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim, desejo excluir este perfil',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.deletarPerfil(perfis);
          }
        }
      ]
    });

    await alert.present();
  }

  deletarPerfil(perfis): void{
    console.log('Valor de perfis');
    console.log(perfis);
    this.apiService.deletarPerfil(perfis).subscribe(() => {
       this.getDataPerfil();
    },
    error => {
      this.mensagemPerfilVinculado(perfis);
      console.log(error);
    }
    );
  }

  async mensagemPerfilVinculado(perfis) {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'O Perfil '+`${perfis.perfil}`+
               ' não pode ser deletado pois está vinculado a uma ou mais pessoas,'+
               'para deleta-lo desvincule este perfil da(s) pessoa(s)',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          id: 'confirm-button',
          handler: (blah) => {
            console.log('confirma fechar');
          }
        }
      ]
    });

    await alert.present();
  }
}
