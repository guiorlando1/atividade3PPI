import express from 'express';
import path from 'path';

const host = '0.0.0.0';
const porta = 3000;

const app = express();

let listaUsuarios = [];

//configurar express para manipular corretamente os dados quando eles forem submetidos via metodo POST
app.use(express.urlencoded({extended : true })); // habilita a biblioeta query string via POST

app.use(express.static(path.join(process.cwd(), 'publico')));

function cadastrarUsuario(requisicao, resposta){
    const cnpj = requisicao.body.cnpj;
    const razaoSocial = requisicao.body.razaoSocial;
    const nomeFantasia = requisicao.body.nomeFantasia;
    const endereco = requisicao.body.endereco;
    const cidade = requisicao.body.cidade;
    const cep = requisicao.body.cep;
    const uf = requisicao.body.uf;
    const telefone = requisicao.body.telefone;
    const email = requisicao.body.email;

    //verificando se os campos não estão vazios
    if (cnpj && razaoSocial && nomeFantasia && endereco && cidade && cep && uf && telefone && email){
        listaUsuarios.push({
            cnpj : cnpj,
            razaoSocial : razaoSocial,
            nomeFantasia : nomeFantasia,
            endereco : endereco,
            cidade: cidade,
            cep : cep,
            uf : uf,
            telefone: telefone,
            email : email
        })
        resposta.redirect('/listarUsuarios');
    }
    else{
        resposta.write(`
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Cadastro de Empresas</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        <body>
            <div class="container m-5">
            <form method="POST" action="/cadastrarUsuario" class="border row g-3 needs-validation" novalidate>
                <fieldset>
                <legend>Cadastro de Empresas</legend>
                <div class="col-md-4">
                    <label for="nome" class="form-label">CNPJ</label>
                    <input type="text" class="form-control" id="cnpj" name="cnpj" value="${cnpj}" required>`);
        if (cnpj == ""){
            resposta.write(`<div class="alert alert-dark" role="alert">
            Informe o CNPJ da empresa.
          </div>`);
        }
        resposta.write(` </div>
        <div class="col-md-4">
          <label for="nome" class="form-label">Razão Social</label>
          <input type="text" class="form-control" id="razaoSocial" name="razaoSocial" value="${razaoSocial}" required>`);
        if (razaoSocial== ""){
            resposta.write(`<div class="alert alert-dark" role="alert">
            Informe a Razão Social da empresa.
          </div>`);
        }
        resposta.write(`</div>
        <div class="col-md-4">
          <label for="nome" class="form-label">Nome Fantasia</label>
          <input type="text" class="form-control" id="nomeFantasia" name="nomeFantasia" value="${nomeFantasia}" required>`);
        if (nomeFantasia == ""){
            resposta.write(`<div class="alert alert-dark" role="alert">
            Informe o Nome Fantasia da empresa.
          </div>`);
        }
        resposta.write(`</div>
        <div class="col-md-4">
          <label for="nome" class="form-label">Endereço</label>
          <input type="text" class="form-control" id="endereco" name="endereco" value="${endereco}" required>`);
        if(endereco == ""){
            resposta.write(`<div class="alert alert-dark" role="alert">
            Informe o endereço da empresa.
          </div>`);
        }
        resposta.write(`</div>
        <div class="col-md-4">
          <label for="nome" class="form-label">Cidade</label>
          <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade}" required>`);
        if (cidade == ""){
            resposta.write(`<div class="alert alert-dark" role="alert">
            Informe a cidade da empresa.
          </div>`);
        }
        resposta.write(`</div>
        <div class="col-md-4">
            <label for="nome" class="form-label">UF</label>
            <input type="text" class="form-control" id="uf" name="uf" value="${uf}" required>`);
        if (uf == ""){
            resposta.write(`<div class="alert alert-dark" role="alert">
            Informe a UF da empresa.
          </div>`);
        }
        resposta.write(`</div>
        <div class="col-md-4">
          <label for="nome" class="form-label">CEP</label>
          <input type="text" class="form-control" id="cep" name="cep" value="${cep}" required>`);
        if (cep == ""){
            resposta.write(`<div class="alert alert-dark" role="alert">
            Informe o CEP da empresa.
          </div>`);
        }
        resposta.write(`</div>
        <div class="col-md-4">
          <label for="nome" class="form-label">Email</label>
          <input type="text" class="form-control" id="email" name="email" value="${email}" required>`);
        if (email == ""){
            resposta.write(`<div class="alert alert-dark" role="alert">
            Informe o email da empresa.
          </div>`);
        }
        resposta.write(`</div>
        <div class="col-md-4">
          <label for="nome" class="form-label">Telefone</label>
          <input type="text" class="form-control" id="telefone" name="telefone" value="${telefone}" required>`);
        if (telefone == ""){
            resposta.write(`<div class="alert alert-dark" role="alert">
            Informe o telefone da empresa.
          </div>`);
        }
        resposta.write(`</div>
            <div class="col-12">
            <button class="btn btn-primary" type="submit">Cadastrar</button>
            <a class="btn btn-secondary" href="/"> Voltar </a>
            </div>
            </fieldset>
            </form>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </body>
            </html>`);
            resposta.end(); // finaliza o envio da resposta
    }
}   

//quando um usuario enviar uma requisição do tipo POST para o endpoint 'http://localhost:3000/cadastrarUsuario'
//executa a função 'cadastrarUsuario()'
app.post('/cadastrarUsuario',cadastrarUsuario);

app.get('/listarUsuarios', (req, resp) => {
  resp.write('<html>');
  resp.write('<head>');
  resp.write('<title>Resultado do Cadastro</title>');
  resp.write('<meta charset="utf-8">');
  resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
  resp.write('</head>');
  resp.write('<body>');
  resp.write('<h1>Lista de Usuários</h1>');
  resp.write('<table class="table table-striped">');
  resp.write('<tr>');
  resp.write('<th>CNPJ</th>');
  resp.write('<th>Razão Social</th>');
  resp.write('<th>Nome Fantasia</th>');
  resp.write('<th>Endereço</th>');
  resp.write('<th>Cidade</th>');
  resp.write('<th>CEP</th>');
  resp.write('<th>UF</th>');
  resp.write('<th>Telefone</th>');
  resp.write('<th>Email</th>');
  resp.write('</tr>');
  for (let i = 0; i < listaUsuarios.length; i++) {
      resp.write('<tr>');
      resp.write(`<td>${listaUsuarios[i].cnpj}</td>`);
      resp.write(`<td>${listaUsuarios[i].razaoSocial}</td>`);
      resp.write(`<td>${listaUsuarios[i].nomeFantasia}</td>`);
      resp.write(`<td>${listaUsuarios[i].endereco}</td>`);
      resp.write(`<td>${listaUsuarios[i].cidade}</td>`);
      resp.write(`<td>${listaUsuarios[i].cep}</td>`);
      resp.write(`<td>${listaUsuarios[i].uf}</td>`);
      resp.write(`<td>${listaUsuarios[i].telefone}</td>`);
      resp.write(`<td>${listaUsuarios[i].email}</td>`);
      resp.write('</tr>');
  }
  resp.write('</table>');
  resp.write('<a href="/">Voltar</a>');
  resp.write('</body>');
  resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
  resp.write('</html>');
  resp.end();
});


app.listen(porta, host, () => {
    console.log(`Servidor rodando em: http://${host}:${porta}`);
})