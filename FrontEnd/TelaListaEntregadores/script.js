
function criarElemento(tag, texto) {
  const elemento = document.createElement(tag);
  elemento.innerText = texto;
  return elemento;
}

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

function abrirModalEditar(usuario) {
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

      $("#modalUsuario").modal("hide");
      let url = "http://localhost:3000/usuarios/" + usuario.id;
      let method = "put";

      let resposta = await fetch(url, {
        method, 
        headers: {
          "Content-Type": "application/json", 
          Accept: "application/json", 
          "Authorization": localStorage.getItem("authorization"),
        },
        body: JSON.stringify(payload), 
      });

      if (resposta.ok) {
       
        $("#modalCadastroSucesso").modal("show");

       
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
    corpoTabela.innerHTML = ""; 

    usuarios.forEach((usuario) => {
      const tr = criarLinha(usuario);
      corpoTabela.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao buscar assinantes:", error);
  }
}

async function excluir(id) {
  
  var myModal = new bootstrap.Modal(
    document.getElementById("confirmacaoExclusaoModal")
  );
  myModal.show();


  document.querySelector("#confirmarExclusaoBtn").setAttribute("data-id", id);
}


document
  .querySelector("#confirmarExclusaoBtn")
  .addEventListener("click", async function () {
    
    const id = this.getAttribute("data-id");
    let token = localStorage.getItem('authorization');

   
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


buscarEntregadores();
