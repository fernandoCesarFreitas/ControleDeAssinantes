let email = document.getElementById("email");
let senha = document.getElementById("password");
let form = document.getElementById("formulario");

form.addEventListener("submit", async (event) => {
  event.stopPropagation(); 
  event.preventDefault();

  let payload = {
    email: email.value,
    senha: senha.value,
  };
  let url = "http://localhost:3000/login";
  let method = "post";

  let resposta = await fetch(url, {
    method, 
    headers: {
      "Content-Type": "application/json", 
      Accept: "application/json", 
    },
    body: JSON.stringify(payload), 
  });

  if (resposta.ok) {
    let dados = await resposta.json();
    localStorage.setItem("authorization", `${dados.type} ${dados.token}`);
    sessionStorage.setItem("authorization", `${dados.type} ${dados.token}`); 
    localStorage.setItem("user", JSON.stringify(dados.usuario));
    window.location.href = "../TelaPrincipal/index.html"; 
  } else if (resposta.status == 401) {
    let dados = await resposta.json();
    alert(dados.mensagem);
  } else {
    alert("Algo deu errado!");
  }
});
