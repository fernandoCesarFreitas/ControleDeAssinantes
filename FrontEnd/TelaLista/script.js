
function criarElemento(tag, texto) {
  const elemento = document.createElement(tag);
  elemento.innerText = texto;
  return elemento;
}

document.querySelector("#btnVoltar").addEventListener("click", function () {
  window.location.href = "../TelaPrincipal/index.html";
});

function criarLinha(assinante) {
  const tr = document.createElement("tr");
  tr.classList.add("text-center");

  const colunas = [
    "codigo",
    "nome",
    "rua",
    "numero",
    "bairro",
    "cidade",
    "coordenadas",
  ];

  colunas.forEach((coluna) => {
    const td = criarElemento("td", assinante[coluna]);
    td.classList.add("align-middle", "text-wrap", "text-truncate"); 
    td.style.maxWidth = "260px"; 
    tr.appendChild(td);
  });

  const tdAcoes = document.createElement("td");
  tdAcoes.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "p-5",
    "align-middle", 
    "text-wrap", 
    "text-truncate" 
  );
  tdAcoes.style.maxWidth = "230px"; 

  const divAcoes = document.createElement("div");
  divAcoes.style.overflowX = "auto";
  // Remov
  const linkEditar = document.createElement("a");
  linkEditar.href = "#";
  linkEditar.classList.add("btn", "btn-outline-warning", "btn-sm", "me-2");

  const span = document.createElement("span");
  span.style.display = "flex";
  span.style.alignItems = "center";

  const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgIcon.setAttribute("width", "16");
  svgIcon.setAttribute("height", "16");
  svgIcon.setAttribute("fill", "currentColor");
  svgIcon.classList.add("bi", "bi-pencil");
  svgIcon.style.marginRight = "3px";

  const pathIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathIcon.setAttribute(
    "d",
    "M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
  );

  svgIcon.appendChild(pathIcon);

  span.appendChild(svgIcon);

  const textNode = document.createTextNode("Editar");
  span.appendChild(textNode);

  linkEditar.appendChild(span);

  linkEditar.addEventListener("click", () => abrirModalEditar(assinante));

  const botaoExcluir = document.createElement("button");
  botaoExcluir.classList.add("btn", "btn-outline-danger", "btn-sm", "me-2");

  const spanExcluir = document.createElement("span");
  spanExcluir.style.display = "flex";
  spanExcluir.style.alignItems = "center";

  const svgIconExcluir = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgIconExcluir.setAttribute("width", "16");
  svgIconExcluir.setAttribute("height", "16");
  svgIconExcluir.setAttribute("fill", "currentColor");
  svgIconExcluir.classList.add("bi", "bi-trash");
  svgIconExcluir.style.marginRight = "3px";

  const pathIconExcluir1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathIconExcluir1.setAttribute(
    "d",
    "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
  );

  const pathIconExcluir2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathIconExcluir2.setAttribute(
    "d",
    "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
  );

  svgIconExcluir.appendChild(pathIconExcluir1);
  svgIconExcluir.appendChild(pathIconExcluir2);

  spanExcluir.appendChild(svgIconExcluir);

  const textNodeExcluir = document.createTextNode("Excluir");
  spanExcluir.appendChild(textNodeExcluir);

  botaoExcluir.appendChild(spanExcluir);

  botaoExcluir.addEventListener("click", () => excluir(assinante.id));

  const svgIconVer = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgIconVer.setAttribute("width", "16");
  svgIconVer.setAttribute("height", "16");
  svgIconVer.setAttribute("fill", "currentColor");
  svgIconVer.classList.add("bi", "bi-eye");
  svgIconVer.style.marginRight = "3px";

  const pathIconVer1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathIconVer1.setAttribute(
    "d",
    "M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
  );

  const pathIconVer2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathIconVer2.setAttribute(
    "d",
    "M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
  );

  svgIconVer.appendChild(pathIconVer1);
  svgIconVer.appendChild(pathIconVer2);

  const linkVer = document.createElement("a");
  linkVer.href = "#";
  linkVer.classList.add(
    "btn",
    "btn-outline-info",
    "btn-sm",
    "d-flex",
    "align-items-center"
  );

  linkVer.appendChild(svgIconVer);

  const textNodeVer = document.createTextNode("Ver");
  linkVer.appendChild(textNodeVer);

  linkVer.addEventListener("click", () => abrirModalVer(assinante));

  tdAcoes.appendChild(linkEditar);
  tdAcoes.appendChild(botaoExcluir);
  tdAcoes.appendChild(linkVer);

  tr.appendChild(tdAcoes);

  return tr;
}

var indiceAtual = 0;
var assinantes = [];

async function buscarAssinantesC() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get("usuarioId");
    let url = "http://localhost:3000/assinantes";
    let token = localStorage.getItem("authorization");

    if (usuarioId) {
      url = `http://localhost:3000/assinantesPorEntregador/${usuarioId}`;
    }

    const resposta = await fetch(url, {
      headers: {
        Authorization: authorization,
      },
    });

    assinantes = await resposta.json();
  } catch (error) {
    console.error("Erro ao buscar assinantes:", error);
  }
}

async function abrirModalVer(assinante) {
  // Se a lista de assinantes estiver vazia, busque os assinantes
  if (assinantes.length === 0) {
    await buscarAssinantesC();
  }

  // Encontre o índice do assinante no array
  indiceAtual = assinantes.findIndex((a) => a.codigo === assinante.codigo);

  // Preencha os campos do modal com as informações do assinante
  $("#modalVerAssinante #codigoAssinante").text(assinante.codigo);
  $("#modalVerAssinante #ordemAssinante").text(assinante.ordemEntrega);
  $("#modalVerAssinante #nomeAssinante").text(assinante.nome);
  $("#modalVerAssinante #ruaAssinante").text(assinante.rua);
  $("#modalVerAssinante #numeroAssinante").text(assinante.numero);
  $("#modalVerAssinante #bairroAssinante").text(assinante.bairro);
  $("#modalVerAssinante #cidadeAssinante").text(assinante.cidade);
  $("#modalVerAssinante #coordenadasAssinante").attr(
    "href",
    "https://www.google.com/maps/place/" +
      encodeURIComponent(assinante.coordenadas)
  );
  if (assinante.tipo == 1) {
    $("#modalVerAssinante #tipoAssinante").text("Diário");
  } else if (assinante.tipo == 2) {
    $("#modalVerAssinante #tipoAssinante").text("Semanal");
  }

  // Preencha o carrossel com a imagem do assinante
  var carouselInner = $("#modalVerAssinante .carousel-inner");
  carouselInner.empty();
  var carouselItem = $('<div class="carousel-item active"></div>');
  var img = $('<img class="d-block w-100" alt="Imagem do assinante">');
  img.attr("src", assinante.imagem);
  carouselItem.append(img);
  carouselInner.append(carouselItem);

  // Abra o modal
  $("#modalVerAssinante").modal("show");
}

$("#modalVerAssinante .carousel-control-prev").click(function (event) {
  event.preventDefault();
  if (indiceAtual > 0) {
    indiceAtual--;
    abrirModalVer(assinantes[indiceAtual]);
  }
});

$("#modalVerAssinante .carousel-control-next").click(function (event) {
  event.preventDefault();
  if (indiceAtual < assinantes.length - 1) {
    indiceAtual++;
    abrirModalVer(assinantes[indiceAtual]);
  }
});

function abrirModalEditar(assinante) {
  console.log("dentro do abrir modal editar assinante", assinante.id);
  $("#codigoAssinante").val(assinante.codigo);
  $("#nomeAssinante").val(assinante.nome);
  $("#ruaAssinante").val(assinante.rua);
  $("#numeroAssinante").val(assinante.numero);
  $("#bairroAssinante").val(assinante.bairro);
  $("#cidadeAssinante").val(assinante.cidade);
  $("#coordenadasAssinante").val(assinante.coordenadas);
  $("#selectTipo").val(assinante.tipo);
  $("#selectEntregador").val(assinante.usuario_id);
  $("#ordemAssinante").val(assinante.ordemEntrega);
  $("#descricao").val(assinante.descricao);
  $("#modalAssinantes").modal("show");

  $("#formAssinantes")
    .off("submit")
    .submit(async function (event) {
      event.preventDefault();
      let imagem = document.querySelector("#imagem").files[0];
      let base64data = "";

      let reader = new FileReader();
      reader.readAsDataURL(imagem);
      reader.onloadend = async function () {
        base64data = reader.result;

        let payload = {
          codigo: $("#codigoAssinante").val().toUpperCase(),
          nome: $("#nomeAssinante").val().toUpperCase(),
          rua: $("#ruaAssinante").val().toUpperCase(),
          numero: $("#numeroAssinante").val().toUpperCase(),
          bairro: $("#bairroAssinante").val().toUpperCase(),
          cidade: $("#cidadeAssinante").val().toUpperCase(),
          coordenadas: $("#coordenadasAssinante").val().toUpperCase(),
          tipo: $("#selectTipo").val().toUpperCase(),
          entregador: $("#selectEntregador").val(),
          ordem: $("#ordemAssinante").val(),
          descricao: $("#descricao").val().toUpperCase(),
          imagem: base64data,
        };

        $("#modalAssinantes").modal("hide");
        let url = "http://localhost:3000/assinantes/" + assinante.id;
        let method = "put";

        let resposta = await fetch(url, {
          method, 
          headers: {
            "Content-Type": "application/json", 
            Accept: "application/json", 
            Authorization: authorization,
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
      };
    });
}

async function buscarAssinantes() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get("usuarioId");
    let url = "http://localhost:3000/assinantes";
    let token = localStorage.getItem("authorization");

    if (usuarioId) {
      url = `http://localhost:3000/assinantesPorEntregador/${usuarioId}`;
    }

    const resposta = await fetch(url, {
      headers: {
        Authorization: authorization,
      },
    });

    const assinantes = await resposta.json();
    console.log(assinantes);
    const corpoTabela = document.getElementById("corpo-tabela");

    assinantes.forEach((assinante) => {
      const tr = criarLinha(assinante);
      corpoTabela.appendChild(tr);
    });

    const totalAssinantes = assinantes.length;
    const assinantesDiarios = assinantes.filter(
      (assinante) => assinante.tipo == 1
    ).length;
    const assinantesSemanais = assinantes.filter(
      (assinante) => assinante.tipo == 2
    ).length;

    document.querySelector("#totalAssinantes").textContent = totalAssinantes;
    document.querySelector("#assinantesDiarios").textContent =
      assinantesDiarios;
    document.querySelector("#assinantesSemanais").textContent =
      assinantesSemanais;
  } catch (error) {
    console.error("Erro ao buscar assinantes:", error);
  }
}

async function atualizarTabela() {
  try {
    let token = localStorage.getItem("authorization");

    const resposta = await fetch("http://localhost:3000/assinantes", {
      headers: {
        Authorization: authorization,
      },
    });

    const assinantes = await resposta.json();

    const corpoTabela = document.getElementById("corpo-tabela");
    corpoTabela.innerHTML = ""; // Limpa a tabela antes de adicionar os novos dados

    assinantes.forEach((assinante) => {
      const tr = criarLinha(assinante);
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
    // Obter o id do assinante a ser excluído
    const id = this.getAttribute("data-id");
    let token = localStorage.getItem("authorization");

    try {
      await fetch(`http://localhost:3000/assinantes/${id}`, {
        method: "delete",
        headers: {
          Authorization: token,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Erro ao excluir assinante:", error);
    }
  });

async function buscarNomeEntregadorEAtualizarTitulo() {
  const urlParams = new URLSearchParams(window.location.search);
  const usuarioId = urlParams.get("usuarioId");
  let token = localStorage.getItem("authorization");

  if (usuarioId) {
    try {
      const resposta = await fetch(
        `http://localhost:3000/usuarios/${usuarioId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(resposta);
      if (!resposta.ok) {
        throw new Error(`Erro ao buscar entregador: ${resposta.status}`);
      }

      const entregador = await resposta.json();
      const tituloTabela = document.getElementById("titulo-tabela");
      tituloTabela.textContent = `Tabela de Assinantes - ${entregador.nome}`;
    } catch (error) {
      console.error("Erro ao buscar entregador:", error);
    }
  }
}

buscarNomeEntregadorEAtualizarTitulo();
buscarAssinantes();
