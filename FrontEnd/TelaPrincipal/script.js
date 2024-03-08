
let form = document.getElementById("formulario");
let nome = document.getElementById("nomeUsuario");
let email = document.getElementById("emailUsuario");
let senha = document.getElementById("senhaUsuario");


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
let btnSair = document.getElementById("btnSair");

//cadastro de Entregadores
form.addEventListener("submit", async (event) => {
  event.stopPropagation(); 
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
    method,
    headers: {
      "Content-Type": "application/json", 
      Accept: "application/json", 
      Authorization: authorization,
    },
    body: JSON.stringify(payload), 
  });

  let modalCadastroSucesso = $("#modalCadastroSucesso");
  let modalUsuario = $("#modalUsuario");

  if (resposta.ok) {
    modalUsuario.modal("hide");
    modalCadastroSucesso.modal("show");

    setTimeout(() => {
      modalCadastroSucesso.modal("hide");
    }, 2000);

    modalCadastroSucesso.one("hidden.bs.modal", function (e) {
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

// Cadastro de Assinantes

formAssinantes.addEventListener("submit", async (event) => {
  event.stopPropagation(); 
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
      method, 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", 
        Authorization: authorization,
      },
      body: JSON.stringify(payload), 
    });

    let modalCadastroSucesso = $("#modalCadastroSucesso");
    let modalAssinantes = $("#modalUsuario");

    if (resposta.ok) {
      $("#modalCadastroSucesso").modal("show");

      
      setTimeout(() => {
        $("#modalCadastroSucesso").modal("hide");
      }, 2000);

     
      modalCadastroSucesso.one("hidden.bs.modal", function (e) {
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

fetch("http://localhost:3000/usuarios", {
  headers: {
    Authorization: authorization,
  },
})
  .then((response) => response.json())
  .then((usuariosAtivos) => {
    let row = null;
    usuariosAtivos.forEach((usuario, index) => {
      if (index % 2 === 0) {
        row = document.createElement("div");
        row.className = "row row-cols-2 justify-content-center mb-1";
      }

      let divCol = document.createElement("div");
      divCol.className = "col-sm-5 mb-3"; // Adiciona espaçamento na parte inferior da coluna

      let divCard = document.createElement("div");
      divCard.className = "card";
      divCard.style.width = "400px"; // Defina a largura desejada para o card

      let imgContainer = document.createElement("div");
      imgContainer.className = "rounded-top"; 
      imgContainer.style.height = "300px"; // Defina a altura fixa para a imagem
      imgContainer.style.width = "100%";
      imgContainer.style.overflow = "hidden";

      let img = document.createElement("img");
      img.className = "img-thumbnail";
      img.style.width = "100%";
      img.style.height = "100%"; // Faça a imagem preencher o contêiner
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
      cardText.textContent = usuario.nome; 

      divCardBody.appendChild(cardText);
      divCard.appendChild(divCardBody);
      divCol.appendChild(divCard);

      divCard.addEventListener("click", function () {
        window.location.href = `../TelaLista/index.html?usuarioId=${usuario.id}`;
      });

      row.appendChild(divCol);

      if (index % 2 !== 0 || index === usuariosAtivos.length - 1) {
        document.getElementById("card-container").appendChild(row);
      }
    });

    
    function onCardsLoaded() {
      document.body.style.display = 'none';
      void document.body.offsetHeight;
      document.body.style.display = '';
    }
    onCardsLoaded();
  });

async function getEntregadores() {
  let token = localStorage.getItem("authorization");

  let response = await fetch("http://localhost:3000/usuarios", {
    headers: {
      Authorization: token,
    },
  });

  let entregadores = await response.json();
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
btnSair.addEventListener("click", function () {
  localStorage.removeItem("authorization");
  localStorage.removeItem("user");
  window.location.href = "caminho/para/sua/pagina/de/login.html";
});
setEntregadores();
