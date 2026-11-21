// Aula 15 - JavaScript aplicado a Formulários
// 1) evento de envio (onsubmit)  2) captura em tempo real (input)  3) regras de validação próprias

var nome = document.getElementById("nome");
var email = document.getElementById("email");
var telefone = document.getElementById("telefone");
var senha = document.getElementById("senha");
var mensagem = document.getElementById("mensagem");
var previa = document.getElementById("previa");
var contador = document.getElementById("contador");
var forca = document.getElementById("forca");
var sucesso = document.getElementById("sucesso");

// ---------- funções de apoio ----------
function erro(campo, idErro, texto) {
    campo.classList.add("is-invalid");
    campo.classList.remove("is-valid");
    document.getElementById(idErro).textContent = texto;
    return false;
}

function certo(campo) {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    return true;
}

// ---------- regras de validação ----------
function validarNome() {
    var partes = nome.value.trim().split(" ");
    // regra própria: nome e sobrenome
    if (partes.length < 2 || partes[0].length < 2) {
        return erro(nome, "erroNome", "Digite nome e sobrenome.");
    }
    return certo(nome);
}

function validarEmail() {
    var formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formato.test(email.value.trim())) {
        return erro(email, "erroEmail", "Digite um e-mail válido.");
    }
    return certo(email);
}

function validarTelefone() {
    // conta só os números: DDD + 8 ou 9 dígitos
    var numeros = telefone.value.replace(/\D/g, "");
    if (numeros.length < 10 || numeros.length > 11) {
        return erro(telefone, "erroTelefone", "Digite o telefone com DDD.");
    }
    return certo(telefone);
}

function validarSenha() {
    var valor = senha.value;
    var temLetra = /[a-zA-Z]/.test(valor);
    var temNumero = /[0-9]/.test(valor);
    if (valor.length < 8 || !temLetra || !temNumero) {
        return erro(senha, "erroSenha", "A senha precisa de 8 caracteres, com letra e número.");
    }
    return certo(senha);
}

function validarMensagem() {
    if (mensagem.value.trim().length < 20) {
        return erro(mensagem, "erroMensagem", "Escreva pelo menos 20 caracteres.");
    }
    return certo(mensagem);
}

// ---------- captura em tempo real ----------
function atualizarPrevia() {
    if (nome.value === "" && mensagem.value === "") {
        previa.textContent = "Comece a digitar para ver a prévia.";
    } else {
        // textContent mostra o texto sem interpretar como HTML
        previa.textContent = nome.value + " pediu: " + mensagem.value;
    }
}

nome.addEventListener("input", function () {
    validarNome();
    atualizarPrevia();
});

email.addEventListener("input", validarEmail);

telefone.addEventListener("input", function () {
    // máscara simples: (17) 99999-9999
    var n = telefone.value.replace(/\D/g, "").substring(0, 11);
    if (n.length > 6) {
        var meio = n.length === 11 ? 7 : 6;
        telefone.value = "(" + n.substring(0, 2) + ") " + n.substring(2, meio) + "-" + n.substring(meio);
    } else if (n.length > 2) {
        telefone.value = "(" + n.substring(0, 2) + ") " + n.substring(2);
    } else {
        telefone.value = n;
    }
    validarTelefone();
});

senha.addEventListener("input", function () {
    var valor = senha.value;
    var pontos = 0;
    if (valor.length >= 8) { pontos++; }
    if (/[a-zA-Z]/.test(valor) && /[0-9]/.test(valor)) { pontos++; }
    if (/[^a-zA-Z0-9]/.test(valor)) { pontos++; }

    forca.className = "form-text";
    if (valor === "") {
        forca.textContent = "Força da senha: -";
    } else if (pontos <= 1) {
        forca.textContent = "Força da senha: fraca";
        forca.classList.add("fraca");
    } else if (pontos === 2) {
        forca.textContent = "Força da senha: média";
        forca.classList.add("media");
    } else {
        forca.textContent = "Força da senha: forte";
        forca.classList.add("forte");
    }
    validarSenha();
});

mensagem.addEventListener("input", function () {
    contador.textContent = mensagem.value.length + " / 300 caracteres";
    validarMensagem();
    atualizarPrevia();
});

// ---------- evento de envio (chamado pelo onsubmit do form) ----------
function validarFormulario(evento) {
    // como é só front-end, não envia para servidor
    evento.preventDefault();

    var nomeOk = validarNome();
    var emailOk = validarEmail();
    var telefoneOk = validarTelefone();
    var senhaOk = validarSenha();
    var mensagemOk = validarMensagem();

    if (nomeOk && emailOk && telefoneOk && senhaOk && mensagemOk) {
        sucesso.classList.remove("d-none");
    } else {
        sucesso.classList.add("d-none");
    }
    return false;
}
