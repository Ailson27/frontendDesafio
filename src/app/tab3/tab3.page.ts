import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  aplicativos: Array<any>;

  constructor(private apiService: ApiService,
              public alertController: AlertController
    ) {this.getDataAplicativo(); }

  getDataAplicativo(){
    this.apiService.getDataAplicativo().subscribe(dados => this.aplicativos = dados);
  }

  async mensagemExcluirAplicativo(aplicativos) {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Deseja excluir o aplicativo  '+`${aplicativos.nome}`+ '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim, desejo excluir este aplicativo',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.deletarAplicativo(aplicativos);
          }
        }
      ]
    });

    await alert.present();
  }

  async mensagemAppVinculadoPessoa(aplicativos) {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'O aplivativo '+`${aplicativos.nome}`+
               ' esta vinculado a uma ou mais pessoas,'+
               'para deleta-lo desvincule o aplicativo da(s) pessoa(s)',
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

  deletarAplicativo(aplicativos): void{
    console.log('Valor de aplicativs');
    console.log(aplicativos);
    this.apiService.deletarAplicativo(aplicativos).subscribe(() => {
       console.log('Aplicativo deletado com sucesso');
       this.getDataAplicativo();
    },
    error => {
      this.mensagemAppVinculadoPessoa(aplicativos);
      console.log('Erro ao deletar aplicativo');
      console.log(error);
    }
    );
  }

}
