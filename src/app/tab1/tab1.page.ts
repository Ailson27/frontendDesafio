import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  contatos: Array<any>;

  constructor(
              private apiService: ApiService,
              public alertController: AlertController,
              public router: Router
            ) {

            }

getData(){
  this.apiService.getData().subscribe(dados =>{
    this.contatos = dados;
  });
}

ionViewDidEnter(){
  this.getData();
 }


async exibirAlertaExcluir(contatos) {
  const alert = await this.alertController.create({
    header: 'Atenção!',
    message: 'Deseja excluir  '+`${contatos.nome}`+ '?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        id: 'cancel-button',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Sim, desejo excluir',
        id: 'confirm-button',
        handler: () => {
          console.log('Confirm Okay');
          this.deletarAppPessoa(contatos);
        }
      }
    ]
  });

  await alert.present();
}

deletarAppPessoa(contatos): void{
  this.apiService.excluirAppPessoa(contatos.cpf).subscribe(() => {
    this.deletar(contatos);
  },
  error => {
    console.log(error);
  }
  );
}

deletar(contatos): void{
  this.apiService.excluir(contatos.cpf).subscribe(() => {
     this.getData();
  },
  error => {
    console.log(error);
  }
  );
}

pegarDadosAlteracao(contatos){
  localStorage.setItem('id',contatos.cpf.toString());
  this.router.navigate(['atualizar-pessoas']);
}

}


