import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-cadastro-aplicativo',
  templateUrl: './cadastro-aplicativo.component.html',
  styleUrls: ['./cadastro-aplicativo.component.scss'],
})
export class CadastroAplicativoComponent implements OnInit {

  aplicativoForm: FormGroup;
  aplicativoArray: any;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router,
            ) { }

  ngOnInit(): void {
     this.aplicativoArray={};
      this.aplicativoForm = this.formBuilder.group({
           nomeAplicativo:['', Validators.required],
            bundleId:['', Validators.required]
      });
  }

  cadastrarAplicativo(){
    const nome = this.aplicativoForm.get('nomeAplicativo').value;
    const bundleIdDoApp = this.aplicativoForm.get('bundleId').value;
    this.aplicativoArray.nome = nome;
    this.aplicativoArray.bundleId = bundleIdDoApp;
    this.apiService.cadastrarAplicativo(this.aplicativoArray).subscribe(
      () => console.log('Aplicativo Cadastrado com sucesso',
            //this.apiService.getDataPerfil(),
            this.router.navigate(['/tabs/tab3'])
      ),
    err =>{
      console.log('Não foi possivel cadastrar o aplicativo');
      this.aplicativoForm.reset();
    });
  }

}



