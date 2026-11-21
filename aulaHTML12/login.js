// Validação do formulário de login

var form = document.getElementById("formLogin");
var email = document.getElementById("email");
var senha = document.getElementById("senha");
var erroEmail = document.getElementById("erroEmail");
var erroSenha = document.getElementById("erroSenha");
var mensagem = document.getElementById("mensagem");

function validarEmail() {
    var valor = email.value.trim();
    // formato simples: texto@texto.texto
    var formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valor === "") {
        mostrarErro(email, erroEmail, "Informe o e-mail.");
        return false;
    }
    if (!formato.test(valor)) {
        mostrarErro(email, erroEmail, "E-mail inválido.");
        return false;
    }
    limparErro(email, erroEmail);
    return true;
}

function validarSenha() {
    var valor = senha.value;

    if (valor === "") {
        mostrarErro(senha, erroSenha, "Informe a senha.");
        return false;
    }
    if (valor.length < 6) {
        mostrarErro(senha, erroSenha, "A senha precisa ter pelo menos 6 caracteres.");
        return false;
    }
    limparErro(senha, erroSenha);
    return true;
}

function mostrarErro(campo, local, texto) {
    campo.classList.add("invalido");
    campo.classList.remove("valido");
    local.textContent = texto;
}

function limparErro(campo, local) {
    campo.classList.remove("invalido");
    campo.classList.add("valido");
    local.textContent = "";
}

form.addEventListener("submit", function (evento) {
    // não deixa a página recarregar
    evento.preventDefault();
    mensagem.textContent = "";

    var emailOk = validarEmail();
    var senhaOk = validarSenha();

    if (emailOk && senhaOk) {
        mensagem.textContent = "Login validado com sucesso!";
    }
});
