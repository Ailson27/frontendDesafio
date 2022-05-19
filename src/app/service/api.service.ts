import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  contatosUrl          = 'http://localhost:8080/pessoa';
  perfilUrl            = 'http://localhost:8080/perfil';
  aplicativoUrl        = 'http://localhost:8080/aplicativo';
  pessoaAplicativoUrl  = 'http://localhost:8080/pessoaAplicativo';

  constructor(private http: HttpClient) { }

  //Pegar dados da pessoa
  getData(){
    return this.http.get<any[]>(`${this.contatosUrl}`);
  }

  //buscar dados do perfil
  getDataPerfil(){
    return this.http.get<any[]>(`${this.perfilUrl}`);
  }

  //buscar dados do aplicativo
  getDataAplicativo(){
    return this.http.get<any[]>(`${this.aplicativoUrl}`);
  }

  //Cadastrar uma nova pessoa
  criar(contato: any){
      return this.http.post(this.contatosUrl, contato);
  }

  //Alterar dados da pessoa
  alterar(contato: any){
    return this.http.put(this.contatosUrl, contato);
  }

  //Excluir dados da pessoa
  excluir(id: string) {
    const url = `${this.contatosUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  //Excluir os aplicativos vinculados a pessoa.
  excluirAppPessoa(id: string) {
    const url = `${this.pessoaAplicativoUrl}/${id}`;
    return this.http.delete<any>(url);
  }

cadastrarPerfil(perfil: any){
    return this.http.post(this.perfilUrl, perfil);
}

cadastrarAplicativo(aplicativo: any){
  return this.http.post(this.aplicativoUrl, aplicativo);
}

 //cadastrar pessoasApp
cadPessoasApp(cpf: string, idApp: any){
   return this.http.post(`${this.pessoaAplicativoUrl}/${cpf}/${idApp}`, {});
}

  //Deletar perfil por id
deletarPerfil(perfilCompleto) {
   return this.http.delete(`${this.perfilUrl}/${perfilCompleto.idPerfil}`);
}

    //Deletar aplicativo por id
deletarAplicativo(aplicativoCompleto) {
  return this.http.delete(`${this.aplicativoUrl}/${aplicativoCompleto.idApp}`);
}

getPessoasId(id: string){
  return this.http.get<any[]>(`${this.contatosUrl}/${id}`);
}

updatePessoas(contato: any){
  return this.http.put(this.contatosUrl, contato);
}

buscarPessoasAppPorId(id: string){
  return this.http.get<any[]>(`${this.pessoaAplicativoUrl}/${id}`);
}

buscarPessoasApp(){
  return this.http.get<any[]>(`${this.pessoaAplicativoUrl}`);
}

}


