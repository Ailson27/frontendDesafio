import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-cadastro-perfil',
  templateUrl: './cadastro-perfil.component.html',
  styleUrls: ['./cadastro-perfil.component.scss'],
})
export class CadastroPerfilComponent implements OnInit {

  perfilForm: FormGroup;
  perfilArray: any;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router,
            ) { }

  ngOnInit(): void {
     this.perfilArray={};
      this.perfilForm = this.formBuilder.group({
           nomePerfil:['', Validators.required]
      });
  }

  cadastrarPerfil(){
    const nomeDoPerfil = this.perfilForm.get('nomePerfil').value;
    this.perfilArray.perfil = nomeDoPerfil;
    this.apiService.cadastrarPerfil(this.perfilArray).subscribe(
      () => console.log('Perfil Cadastrado com sucesso',
            this.apiService.getDataPerfil(),
            this.router.navigate(['/tabs/tab2'])
      ),
    err =>{
      console.log('Não foi possivel cadastrar o perfil');
      this.perfilForm.reset();
    });
  }

}
