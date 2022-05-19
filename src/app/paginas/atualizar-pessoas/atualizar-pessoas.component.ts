import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { element } from 'protractor';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-atualizar-pessoas',
  templateUrl: './atualizar-pessoas.component.html',
  styleUrls: ['./atualizar-pessoas.component.scss'],
})
export class AtualizarPessoasComponent implements OnInit {

contato: any;
perfis: Array<any>;
aplicativos: Array<any>;
appPessoa: any;
idsApp: any;

  constructor(private router: Router,
              private apiService: ApiService,
              public alertController: AlertController
            ) { }


ngOnInit() {
    this.editar();
    this.contato={};
    this.appPessoa = {};
    this.idsApp = {};
  }


ionViewDidEnter(){
  this.getDataAplicativo();
  this.getDataPerfil();
}

  editar(){
    const cpf =localStorage.getItem('id');
    this.apiService.getPessoasId(cpf).subscribe(data => {this.contato = data;});
  }

  getDataPerfil(){
    this.apiService.getDataPerfil().subscribe(dados =>{this.perfis = dados;});
  }

  getDataAplicativo(){
    this.apiService.getDataAplicativo().subscribe(dados =>{
      this.aplicativos = dados;
      this.getAppPessoa();
    });
  }

  atualizar(frm: FormGroup){
    this.idsApp.idApp = this.contato.idApp;
    this.idsApp.cpf   = this.contato.cpf;
    this.apiService.updatePessoas(this.contato).subscribe(data => {
        this.contato = data;
        const cpfExcluirAppPessoa = localStorage.getItem('id');
        this.apiService.excluirAppPessoa(cpfExcluirAppPessoa).subscribe(dados => {
            this.cadastrarAppPessoa(this.idsApp);
        });
        this.mensagemAltSucesso();
    },
    error => {
      console.log(error);
    }
    );
  }

  getAppPessoa(){
    const cpfBusca =localStorage.getItem('id');
    this.apiService.buscarPessoasAppPorId(cpfBusca).subscribe(data =>{
      this.appPessoa = data;
      this.contato.idApp = data.map(x => x.idApp);
     });
  }

  async mensagemAltSucesso() {
    const alert = await this.alertController.create({
      header: 'Alteração!',
      message: 'Dados Alterados com sucesso!',
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

  //Cadastrar os aplicativos vinculados a pessoa.
  cadastrarAppPessoa(appPessoa: any){
    const cpf   = appPessoa.cpf;
    const tamanhoArray = appPessoa.idApp.length;
    let   idApp: any;

    for(let i = 0; i < tamanhoArray; i++ ){
      idApp = appPessoa.idApp[i];
     this.apiService
          .cadPessoasApp(cpf, idApp)
          .subscribe(
                      () => {
                         console.log('Aplicativos cadastrados com sucesso');
                         this.router.navigate(['tabs']);
                    },
                      err => {
                        console.log('Algo deu errado');
                    }
     );
     idApp = null;
    }
  }

}
