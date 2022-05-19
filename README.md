# frontendDesafio
Passo a passo para a utilização do sistema:

1° - Criacão da base de dados: (para este projeto foi utilizado o MySql Workbench: usuario: root, senha: root)

    Script: create database desafio

2° - Subir os serviços do backend do projeto "desafiorestapi" (foi desenvolvido em Spring boot e jpa repository), ao final desse processo todas as tabelas necessárias ao projeto estarão criadas no banco de dados;

3° - Rodar os scripts de chave estrangeira (FOREIGN KEY), que vinculam os perfis as pessoas e o que vincula os aplicativos as pessoas:
Script: 
	use desafio

	ALTER TABLE pessoa ADD CONSTRAINT id_perfil_fk_desafio 
	FOREIGN KEY (id_perfil) REFERENCES perfil (id_perfil);
	
	ALTER TABLE pessoa_aplicativo ADD CONSTRAINT cpf_fk_pessoa_aplicativo
	FOREIGN KEY (cpf) REFERENCES pessoa (cpf);

	ALTER TABLE pessoa_aplicativo ADD CONSTRAINT id_app_fk_pessoa_aplicativo
	FOREIGN KEY (id_app) REFERENCES aplicativo (id_app);	

4° - Com o angular e o ionic instalados, execute via terminal dentro do projeto "cadPessoasApp" (FrontEnd) o comando: ionic serve. (este comando abrirá o projeto no navegador);

5° Final do processo. 
