# TO DO LIST - NEXT.JS

## Sobre o projeto

O projeto é uma To Do List simples, feito com o objetivo de aprimorar meus conhecimentos e ter em meu portfólio um projeto com o acrônimo CRUD.
O projeto está sendo desenvolvido com as tecnologias Typescript, Next.js, Tailwind e MySQL com o ORM Prisma.

## Observações do projeto

* Projeto FullStack com foco no Back End, visto que a interface está bem simples. 
* O yaml do kubernetes e o Dockerfile estão prontos para serem usados.
* A porta da aplicação em containers é a 70 e caso queira rodar sem containers é a porta 3000.
* Eu usei o banco de dados MySQL no desenvolvimento mas ao rodar a aplicação em containers eu uso a imagem do bd postgres.


### Iniciando a aplicação localmente sem o uso de containers:

Primeiro, crie um banco de dados chamado "db" e prepare o ambiente de desenvolvimento:

-> criando um banco de dados chamado "db":

```bash
>   mysql -h localhost -u root -p

>   CREATE DATABASE db;
```

-> montando o ambiente de desenvolvimento:

```bash
>   yarn install
>   npx prisma db push
```


Segundo, execute o servidor:

```bash
>   yarn dev
# or
>   npm run dev
```


## Desenvolvendo o Projeto

#### A seguir, alguns comandos que eu usei na montagem do ambiente de desenvolvimento

Montando setup TS, Next.js e Tailwind:

```bash
>   npx create-next-app@latest nomeDoProjeto --typescript --eslint
>   cd pastaDoProjeto
>   npm install -D tailwindcss postcss autoprefixer
>   npx tailwindcss init -p
```

Para mais os detalhes de configurações, acesse:
<https://tailwindcss.com/docs/guides/nextjs>

Em seguida, fiz a instalação do Prisma e configurei

Instalando o Prisma:

```bash
>   npm install prisma --save-dev
>   npx prisma init
```

Criando um banco de dados chamado "db":

```bash
>   mysql -h localhost -u root -p

>   CREATE DATABASE db;
```

Após eu ter montado o Schema no arquivo schema.prisma e ter criado o banco de dados, eu criei uma tabela com base no modelo configurado anteriormente no schema.prisma, usando o seguinte comando:

```bash
>   npx prisma db push
```
