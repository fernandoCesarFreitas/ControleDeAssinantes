// Função para criar elementos da tabela

function criarElemento(tag, texto) {
  const elemento = document.createElement(tag);
  elemento.innerText = texto;
  return elemento;
}

// Função para criar a linha da tabela
function criarLinha(usuario) {
  const tr = document.createElement("tr");
  tr.classList.add("text-center");

  const colunas = ["id", "nome", "email"];

  colunas.forEach((coluna) => {
    const td = criarElemento("td", usuario[coluna]);
    tr.appendChild(td);
  });

  const tdAcoes = document.createElement("td");
  tdAcoes.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "p-5"
  );
  tdAcoes.style.paddingTop = "calc(1.25rem + 10px)";
  tdAcoes.style.paddingBottom = "calc(1.25rem + 10px)";

  const linkEditar = criarElemento("a", "Editar");
  linkEditar.href = "#";
  linkEditar.classList.add("btn", "btn-outline-warning", "btn-sm", "me-2");
  linkEditar.addEventListener("click", () => abrirModalEditar(usuario));

  const botaoExcluir = criarElemento("button", "Excluir");
  botaoExcluir.classList.add(
    "btn",
    "btn-outline-danger",
    "btn-sm",
    "me-2",
    "excluirBtn"
  );
  botaoExcluir.addEventListener("click", () => excluir(usuario.id));

  document.querySelector("#btnVoltar").addEventListener("click", function () {
    window.location.href = "../TelaPrincipal/index.html";l
  });

  tdAcoes.appendChild(linkEditar);
  tdAcoes.appendChild(botaoExcluir);
  tr.appendChild(tdAcoes);

  return tr;
}

// Função para abrir o modal de edição com os dados do assinante
function abrirModalEditar(usuario) {
  console.log("dentro do abrir modal editar assinante", usuario.id);
  $("#nomeUsuario").val(usuario.nome);
  $("#emailUsuario").val(usuario.email);
  $("#senhaUsuario").val(usuario.senha);
  $("#modalUsuario").modal("show");

  $("#formulario")
    .off("submit")
    .submit(async function (event) {
      event.preventDefault();

      let payload = {
        nome: $("#nomeUsuario").val().toUpperCase(),
        email: $("#emailUsuario").val().toUpperCase(),
        senha: $("#senhaUsuario").val().toUpperCase(),
      };

      console.log("payload", payload);
      // Fechar o modal após salvar
      $("#modalUsuario").modal("hide");
      let url = "http://localhost:3000/usuarios/" + usuario.id;
      let method = "put";

      let resposta = await fetch(url, {
        method, //pode ser maiusculo ou minusculo
        headers: {
          "Content-Type": "application/json", //o que esta enviando
          Accept: "application/json", //o que ira aceitar receber
          "Authorization": localStorage.getItem("authorization"),
        },
        body: JSON.stringify(payload), //converte o Json para texto
      });

      if (resposta.ok) {
        // Exibir o modal de sucesso
        $("#modalCadastroSucesso").modal("show");

        // Fechar o modal após 3 segundos (3000 milissegundos)
        setTimeout(() => {
          $("#modalCadastroSucesso").modal("hide");
        }, 2000);

        atualizarTabela();
      } else if (resposta.status == 401) {
        let dados = await resposta.json();
        alert(dados.mensagem);
      } else {
        let mensagemErro = await resposta.text();
        alert(`Erro ${resposta.status}: ${mensagemErro}`);
      }
    });
}

// Função para buscar assinantes e popular a tabela
async function buscarEntregadores() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get("usuarioId");
    let url = "http://localhost:3000/usuarios";
    let token = localStorage.getItem('authorization');

    const resposta = await fetch(url, {
      headers: {
        'Authorization': token
      }
    });

    const usuarios = await resposta.json();
    console.log(usuarios);
    const corpoTabela = document.getElementById("corpo-tabela");

    usuarios.forEach((usuario) => {
      const tr = criarLinha(usuario);
      corpoTabela.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao buscar assinantes:", error);
  }
}

async function atualizarTabela() {
  try {
    let token = localStorage.getItem('authorization');

    const resposta = await fetch("http://localhost:3000/usuarios", {
      headers: {
        'Authorization': token
      }
    });

    const usuarios = await resposta.json();

    const corpoTabela = document.getElementById("corpo-tabela");
    corpoTabela.innerHTML = ""; // Limpa a tabela antes de adicionar os novos dados

    usuarios.forEach((usuario) => {
      const tr = criarLinha(usuario);
      corpoTabela.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao buscar assinantes:", error);
  }
}

async function excluir(id) {
  // Exibir o modal
  var myModal = new bootstrap.Modal(
    document.getElementById("confirmacaoExclusaoModal")
  );
  myModal.show();

  // Definir o id do usuário a ser excluído no botão de confirmação de exclusão
  document.querySelector("#confirmarExclusaoBtn").setAttribute("data-id", id);
}

// Quando o botão "Excluir" no modal for clicado
document
  .querySelector("#confirmarExclusaoBtn")
  .addEventListener("click", async function () {
    // Obter o id do usuário a ser excluído
    const id = this.getAttribute("data-id");
    let token = localStorage.getItem('authorization');

    // Excluir o usuário
    try {
      await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "delete",
        headers: {
          'Authorization': token
        }
      });
      window.location.reload();
    } catch (error) {
      console.error("Erro ao excluir assinante:", error);
    }
  });

// Executa a função de buscar assinantes ao carregar a página
buscarEntregadores();
