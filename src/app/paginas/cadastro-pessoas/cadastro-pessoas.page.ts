import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-cadastro-pessoas',
  templateUrl: './cadastro-pessoas.page.html',
  styleUrls: ['./cadastro-pessoas.page.scss'],
})
export class CadastroPessoasPage implements OnInit {

  selectedVal = 103;
  selectedVal2 = 104;

  perfis: Array<any>;
  aplicativos: Array<any>;
  contato: any;
  appPessoa: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.contato={};
  }

  ionViewDidEnter() {
    // const id = this.activatedRoute.snapshot.params.id;
    // if (id) {
    //   //buscar a pessoa
    // }

    this.appPessoa={};
    this.getDataPerfil();
    this.getDataAplicativo();
  }

  getDataPerfil(){
    this.apiService.getDataPerfil().subscribe(dados =>{
       this.perfis = dados;
       console.log(this.perfis);
      });
  }

  getDataAplicativo(){
    this.apiService.getDataAplicativo().subscribe(dados =>{
      this.aplicativos = dados;
      console.log(this.aplicativos);
    });
  }

  //Cadastrar Pessoa
  criar(frm: FormGroup){
    console.log('Esse é o valor de contato');
    console.log(this.contato);
     this.apiService.criar(this.contato).subscribe(data => {
       this.appPessoa.cpf = this.contato.cpf;
       this.criarAppPessoa(this.appPessoa);
     },
     error => {
       console.log(error);
     }
     );
  }

  //Adicionar os aplicativos da pessoa
  criarAppPessoa(appPessoa: any){
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
