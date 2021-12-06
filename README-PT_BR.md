# Cadastro de Médicos

## Linguagem utilizada

### Back-End

* ###### Java 11
* ###### Spring Boot
* ###### Hibernate 

### Front-End

Simples interface para interagir com a API, utilizando:
* ###### React
* ###### Material-UI

##### Imagem de exemplo do Front-end
![Sander Mendes App Doctor's Management](https://raw.githubusercontent.com/sandermendes/spring-boot-app-test/master/assets/spring-boot-main-screen-demo.png)

## Como usar

Faça o [download](https://github.com/sandermendes/spring-boot-app-test/archive/refs/heads/master.zip) ou clone o repo:

```sh
git clone https://github.com/sandermendes/spring-boot-app-test.git
```

Acesse a pasta em questão

### Instalação via Docker Compose

Utilizando o Docker Compose:

```sh
docker-compose up
```

## Documentação

### Endpoints
##### Resumo básico

* {url}/api/doctor - **Retorna todos registros**

* {url}/api/doctor/[id] - **Retorna um registro conforme o código**

* {url}/api/doctor/add - **Adiciona um registro**

* {url}/api/doctor/edit/[id] - **Atualiza um registro conforme o código**

* {url}/api/doctor/delete/[id] - **Exclui um registro conforme o código**

***Mais detalhes*** sobre os endpoints, podem ser localizados com o link a seguir do Postman,
foi documentada utilizando a ferramenta:

[![Open Documentation on Postman](https://raw.githubusercontent.com/sandermendes/app-test/a1823009dc6d2cf8f417c8e578744dcf2068b866/assets/postman-doc-button.svg)](https://www.postman.com/sandercmendes/workspace/sander-workspace/documentation/18173115-24025273-6481-48fd-a015-8d6e40ab97a5)

