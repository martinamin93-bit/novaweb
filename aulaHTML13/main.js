// main.js - usado no cadastro.html e no perfil.html

var formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// mostra ou limpa a mensagem de erro de um campo
function marcar(campo, idErro, texto) {
    document.getElementById(idErro).textContent = texto;
    if (campo) {
        if (texto === "") {
            campo.classList.remove("invalido");
        } else {
            campo.classList.add("invalido");
        }
    }
    return texto === "";
}

function validarNome() {
    var nome = document.getElementById("nome");
    if (nome.value.trim().length < 3) {
        return marcar(nome, "erroNome", "Informe o nome completo.");
    }
    return marcar(nome, "erroNome", "");
}

function validarEmail() {
    var email = document.getElementById("email");
    if (!formatoEmail.test(email.value.trim())) {
        return marcar(email, "erroEmail", "Informe um e-mail válido.");
    }
    return marcar(email, "erroEmail", "");
}

// ---------- Cadastro ----------
var formCadastro = document.getElementById("formCadastro");

if (formCadastro) {
    formCadastro.addEventListener("submit", function (evento) {
        evento.preventDefault();

        var senha = document.getElementById("senha");
        var confirmar = document.getElementById("confirmar");
        var cidade = document.getElementById("cidade");
        var termos = document.getElementById("termos");
        var tudoCerto = true;

        if (!validarNome()) { tudoCerto = false; }
        if (!validarEmail()) { tudoCerto = false; }

        if (senha.value.length < 6) {
            marcar(senha, "erroSenha", "A senha precisa ter pelo menos 6 caracteres.");
            tudoCerto = false;
        } else {
            marcar(senha, "erroSenha", "");
        }

        if (confirmar.value === "" || confirmar.value !== senha.value) {
            marcar(confirmar, "erroConfirmar", "As senhas não são iguais.");
            tudoCerto = false;
        } else {
            marcar(confirmar, "erroConfirmar", "");
        }

        if (cidade.value === "") {
            marcar(cidade, "erroCidade", "Selecione a cidade.");
            tudoCerto = false;
        } else {
            marcar(cidade, "erroCidade", "");
        }

        if (!termos.checked) {
            marcar(null, "erroTermos", "É preciso aceitar os termos.");
            tudoCerto = false;
        } else {
            marcar(null, "erroTermos", "");
        }

        var mensagem = document.getElementById("mensagem");
        if (tudoCerto) {
            mensagem.textContent = "Cadastro realizado com sucesso!";
        } else {
            mensagem.textContent = "";
        }
    });
}

// ---------- Perfil ----------
var formPerfil = document.getElementById("formPerfil");

if (formPerfil) {
    var sobre = document.getElementById("sobre");
    var contador = document.getElementById("contador");

    // conta os caracteres do textarea enquanto a pessoa digita
    sobre.addEventListener("input", function () {
        contador.textContent = sobre.value.length + " / 200 caracteres";
    });

    formPerfil.addEventListener("submit", function (evento) {
        evento.preventDefault();

        var nivel = document.getElementById("nivel");
        var turno = document.querySelector('input[name="turno"]:checked');
        var interesses = document.querySelectorAll('input[name="interesse"]:checked');
        var tudoCerto = true;

        if (!validarNome()) { tudoCerto = false; }
        if (!validarEmail()) { tudoCerto = false; }

        if (turno === null) {
            marcar(null, "erroTurno", "Escolha um turno.");
            tudoCerto = false;
        } else {
            marcar(null, "erroTurno", "");
        }

        if (interesses.length === 0) {
            marcar(null, "erroInteresse", "Marque pelo menos uma área.");
            tudoCerto = false;
        } else {
            marcar(null, "erroInteresse", "");
        }

        if (nivel.value === "") {
            marcar(nivel, "erroNivel", "Selecione o nível.");
            tudoCerto = false;
        } else {
            marcar(nivel, "erroNivel", "");
        }

        if (sobre.value.trim().length < 10) {
            marcar(sobre, "erroSobre", "Escreva pelo menos 10 caracteres sobre você.");
            tudoCerto = false;
        } else {
            marcar(sobre, "erroSobre", "");
        }

        var mensagem = document.getElementById("mensagem");
        if (tudoCerto) {
            mensagem.textContent = "Perfil salvo com sucesso!";
        } else {
            mensagem.textContent = "";
        }
    });
}
