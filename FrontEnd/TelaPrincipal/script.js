// ref formulario entregadores
let form = document.getElementById("formulario");
let nome = document.getElementById("nomeUsuario");
let email = document.getElementById("emailUsuario");
let senha = document.getElementById("senhaUsuario");

// ref formulario assinantes
let formAssinantes = document.getElementById("formAssinantes");
let codigoAssinante = document.getElementById("codigoAssinante");
let nomeAssinante = document.getElementById("nomeAssinante");
let ruaAssinante = document.getElementById("ruaAssinante");
let numeroAssinante = document.getElementById("numeroAssinante");
let bairroAssinante = document.getElementById("bairroAssinante");
let cidadeAssinante = document.getElementById("cidadeAssinante");
let ordemAssinante = document.getElementById("ordemAssinante");
let coordenadasAssinante = document.getElementById("coordenadasAssinante");
let selectTipo = document.getElementById("selectTipo");
let selectEntregador = document.getElementById("selectEntregador");
let descricao = document.getElementById("descricao");
let inputImagem = document.getElementById("imagem").files[0];


form.addEventListener("submit", async (event) => {
  event.stopPropagation(); //para nao recarregar a pagina
  event.preventDefault();

  let payload = {
    nome: nome.value.toUpperCase(),
    email: email.value.toUpperCase(),
    senha: senha.value,
  };
  console.log(payload);
  let url = "http://localhost:3000/usuarios";
  let method = "post";

  let resposta = await fetch(url, {
    method, //pode ser maiusculo ou minusculo
    headers: {
      "Content-Type": "application/json", //o que esta enviando
      Accept: "application/json", //o que ira aceitar receber
    },
    body: JSON.stringify(payload), //converte o Json para texto
  });

  let modalCadastroSucesso = $("#modalCadastroSucesso");
  let modalUsuario = $("#modalUsuario");

  if (resposta.ok) {
    modalUsuario.modal("hide");
    // Exibir o modal de sucesso
    modalCadastroSucesso.modal("show");

    // Adicionar um ouvinte de evento para o evento 'hidden.bs.modal'
    modalCadastroSucesso.one("hidden.bs.modal", function (e) {
      // Redirecionar somente quando o modal for fechado
      window.location.href = "../TelaPrincipal/index.html";
    });
  } else if (resposta.status == 401) {
    let dados = await resposta.json();
    alert(dados.mensagem);
  } else {
    let mensagemErro = await resposta.text();
    alert(`Erro ${resposta.status}: ${mensagemErro}`);
  }
});

formAssinantes.addEventListener("submit", async (event) => {
  event.stopPropagation(); //para nao recarregar a pagina
  event.preventDefault();
  let imagem = document.querySelector("#imagem").files[0];
  let base64data = "";

  let reader = new FileReader();
  reader.readAsDataURL(imagem);
  reader.onloadend = async function () {
    base64data = reader.result;

    let payload = {
      codigo: codigoAssinante.value.toUpperCase(),
      nome: nomeAssinante.value.toUpperCase(),
      rua: ruaAssinante.value.toUpperCase(),
      numero: numeroAssinante.value.toUpperCase(),
      numero: numeroAssinante.value.toUpperCase(),
      bairro: bairroAssinante.value.toUpperCase(),
      cidade: cidadeAssinante.value.toUpperCase(),
      ordem: ordemAssinante.value,
      coordenadas: coordenadasAssinante.value.toUpperCase(),
      tipo: selectTipo.value.toUpperCase(),
      entregador: selectEntregador.value.toUpperCase(),
      descricao: descricao.value.toUpperCase(),
      imagem: base64data,
    };
    console.log(payload);

    $("#modalAssinantes").modal("hide");
    let url = "http://localhost:3000/assinantes";
    let method = "post";

    let resposta = await fetch(url, {
      method, //pode ser maiusculo ou minusculo
      headers: {
        "Content-Type": "application/json", //o que esta enviando
        Accept: "application/json", //o que ira aceitar receber
      },
      body: JSON.stringify(payload), //converte o Json para texto
    });

    let modalCadastroSucesso = $("#modalCadastroSucesso");
    let modalAssinantes = $("#modalUsuario");

    if (resposta.ok) {
     $("#modalCadastroSucesso").modal("show");

      // Fechar o modal após 3 segundos (3000 milissegundos)
      setTimeout(() => {
        $("#modalCadastroSucesso").modal("hide");
      }, 2000);

      // Adicionar um ouvinte de evento para o evento 'hidden.bs.modal'
      modalCadastroSucesso.one("hidden.bs.modal", function (e) {
        // Redirecionar somente quando o modal for fechado
        window.location.href = "../TelaPrincipal/index.html";
      });
    } else if (resposta.status == 401) {
      let dados = await resposta.json();
      alert(dados.mensagem);
    } else {
      let mensagemErro = await resposta.text();
      alert(`Erro ${resposta.status}: ${mensagemErro}`);
    }
  };
});

fetch("http://localhost:3000/usuarios")
  .then((response) => response.json())
  .then((usuariosAtivos) => {
    let row = null;
    usuariosAtivos.forEach((usuario, index) => {
      // Para cada 2 usuários, criamos uma nova linha
      if (index % 2 === 0) {
        row = document.createElement("div");
        row.className = "row row-cols-2";
      }

      let divCol = document.createElement("div");
      divCol.className = "col-sm-6 mb-4";

      let divCard = document.createElement("div");
      divCard.className = "card";

      let imgContainer = document.createElement("div");
      imgContainer.className = "rounded-top"; // Adiciona a classe rounded-top
      imgContainer.style.height = "300px"; // Ajuste para a altura desejada
      imgContainer.style.width = "100%";
      imgContainer.style.overflow = "hidden";

      let img = document.createElement("img");
      img.className = 'img-thumbnail';
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      img.alt = "Imagem do usuário";

      let loadImage = (src, fallback) => {
        let tempImg = new Image();
        tempImg.onload = () => (img.src = src);
        tempImg.onerror = fallback;
        tempImg.src = src;
      };

      let loadGenericImage = () =>
        loadImage("../assets/imagem_generica.jpg", null);
      let loadJpegImage = () =>
        loadImage(`../assets/${usuario.nome}.jpg`, loadPngImage);
      let loadPngImage = () =>
        loadImage(`../assets/${usuario.nome}.png`, loadGenericImage);
      let loadJpegImage2 = () =>
        loadImage(`../assets/${usuario.nome}.jpeg`, loadJpegImage);

      loadJpegImage2();

      imgContainer.appendChild(img);
      divCard.appendChild(imgContainer);

      let divCardBody = document.createElement("div");
      divCardBody.className = "card-body";

      let cardText = document.createElement("p");
      cardText.className = "card-text";
      cardText.textContent = usuario.nome; // Ou qualquer outro texto que você queira exibir

      divCardBody.appendChild(cardText);
      divCard.appendChild(divCardBody);
      divCol.appendChild(divCard);

      divCard.addEventListener('click', function() {
        window.location.href = `../TelaLista/index.html?usuarioId=${usuario.id}`;
      });
      // href="../TelaLista/index.html"

      row.appendChild(divCol);

      // Se for o segundo card ou o último usuário, adicionamos a linha ao container
      if (index % 2 !== 0 || index === usuariosAtivos.length - 1) {
        document.getElementById("card-container").appendChild(row);
      }
    });
  });

async function getEntregadores() {
  let response = await fetch("http://localhost:3000/usuarios");
  let entregadores = await response.json();
  console.log(entregadores);
  return entregadores;
}

async function setEntregadores() {
  let entregadores = await getEntregadores();
  let selectOption = document.createElement("option");
  selectOption.innerText = "Selecione";
  selectEntregador.appendChild(selectOption);

  for (let entregador of entregadores) {
    let option = document.createElement("option");
    option.value = entregador.id;
    option.innerText = entregador.nome;
    selectEntregador.appendChild(option);
  }
}
setEntregadores();
