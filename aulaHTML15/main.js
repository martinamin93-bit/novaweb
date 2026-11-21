// Aula 15 - JavaScript aplicado a Formulários - Desafios 1 a 10

// ---------- Desafio 1: contador de caracteres ----------
var comentario = document.getElementById("comentario");
var contador = document.getElementById("contador");
var btnComentario = document.getElementById("btnComentario");

comentario.addEventListener("input", function () {
    var restam = 140 - comentario.value.length;
    contador.textContent = restam;

    if (restam <= 0) {
        // o maxlength do textarea já impede de digitar mais
        contador.classList.add("erro");
        btnComentario.disabled = true;
    } else {
        contador.classList.remove("erro");
        btnComentario.disabled = false;
    }
});

document.getElementById("formComentario").addEventListener("submit", function (event) {
    event.preventDefault();
});

// ---------- Desafio 2: confirmação de senha ----------
var senha = document.getElementById("senha");
var confirmaSenha = document.getElementById("confirmaSenha");
var msgSenha = document.getElementById("msgSenha");
var btnCadastrar = document.getElementById("btnCadastrar");

function conferirSenhas() {
    if (confirmaSenha.value === "") {
        msgSenha.textContent = "";
        btnCadastrar.disabled = true;
    } else if (senha.value === confirmaSenha.value) {
        msgSenha.textContent = "As senhas coincidem";
        msgSenha.className = "mt-2 mb-2 sucesso";
        btnCadastrar.disabled = false;
    } else {
        msgSenha.textContent = "As senhas são diferentes";
        msgSenha.className = "mt-2 mb-2 erro";
        btnCadastrar.disabled = true;
    }
}

senha.addEventListener("input", conferirSenhas);
confirmaSenha.addEventListener("input", conferirSenhas);

document.getElementById("formSenha").addEventListener("submit", function (event) {
    event.preventDefault();
});

// ---------- Desafio 3: total do pedido ----------
var produto = document.getElementById("produto");
var quantidade = document.getElementById("quantidade");
var total = document.getElementById("total");

function calcularTotal() {
    var preco = Number(produto.value);
    var qtd = Number(quantidade.value);
    if (qtd < 0) {
        qtd = 0;
    }
    var valor = preco * qtd;
    // toFixed(2) deixa duas casas e o replace troca o ponto pela vírgula
    total.textContent = "Total: R$ " + valor.toFixed(2).replace(".", ",");
}

produto.addEventListener("change", calcularTotal);
quantidade.addEventListener("input", calcularTotal);

// ---------- Desafio 4: gerar JSON ----------
document.getElementById("formProduto").addEventListener("submit", function (event) {
    event.preventDefault();

    var objeto = {
        nome: document.getElementById("nomeProduto").value,
        categoria: document.getElementById("categoria").value,
        preco: Number(document.getElementById("preco").value)
    };

    var texto = JSON.stringify(objeto, null, 2);
    console.log(texto);
    document.getElementById("saidaJson").textContent = texto;
});

// ---------- Desafio 5: máscara de telefone ----------
var telefone = document.getElementById("telefone");

telefone.addEventListener("keyup", function () {
    // tira tudo que não é número
    var n = telefone.value.replace(/\D/g, "").substring(0, 11);

    if (n.length > 7) {
        telefone.value = "(" + n.substring(0, 2) + ") " + n.substring(2, 7) + "-" + n.substring(7);
    } else if (n.length > 2) {
        telefone.value = "(" + n.substring(0, 2) + ") " + n.substring(2);
    } else {
        telefone.value = n;
    }
});

// ---------- Desafio 6: selects dependentes ----------
var departamento = document.getElementById("departamento");
var funcionario = document.getElementById("funcionario");

var pessoas = {
    TI: ["Allan", "Beatriz", "Carlos"],
    RH: ["Daniela", "Eduardo"]
};

departamento.addEventListener("change", function () {
    // limpa as opções antigas
    funcionario.innerHTML = "";

    var lista = pessoas[departamento.value];
    if (lista) {
        for (var i = 0; i < lista.length; i++) {
            var opcao = document.createElement("option");
            opcao.textContent = lista[i];
            funcionario.appendChild(opcao);
        }
    }
});

// ---------- Desafio 7: lista de habilidades ----------
var habilidade = document.getElementById("habilidade");
var listaHabilidades = document.getElementById("listaHabilidades");

function adicionarHabilidade() {
    var texto = habilidade.value.trim();
    if (texto === "") {
        return;
    }

    var balao = document.createElement("span");
    balao.className = "balao";
    balao.textContent = texto;

    var fechar = document.createElement("button");
    fechar.type = "button";
    fechar.textContent = "X";
    fechar.addEventListener("click", function () {
        balao.remove();
    });

    balao.appendChild(fechar);
    listaHabilidades.appendChild(balao);
    habilidade.value = "";
    habilidade.focus();
}

document.getElementById("btnHabilidade").addEventListener("click", adicionarHabilidade);

habilidade.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        adicionarHabilidade();
    }
});

// ---------- Desafio 8: verificação de idade ----------
var nascimento = document.getElementById("nascimento");
var avisoIdade = document.getElementById("avisoIdade");
var btnFinalizar = document.getElementById("btnFinalizar");

nascimento.addEventListener("change", function () {
    if (nascimento.value === "") {
        avisoIdade.textContent = "";
        btnFinalizar.disabled = false;
        return;
    }

    // o valor vem como AAAA-MM-DD
    var partes = nascimento.value.split("-");
    var ano = Number(partes[0]);
    var mes = Number(partes[1]);
    var dia = Number(partes[2]);

    var hoje = new Date();
    var idade = hoje.getFullYear() - ano;

    // se ainda não fez aniversário este ano, tira 1
    var mesAtual = hoje.getMonth() + 1;
    if (mesAtual < mes || (mesAtual === mes && hoje.getDate() < dia)) {
        idade = idade - 1;
    }

    if (idade < 18) {
        avisoIdade.textContent = "Apenas para maiores de idade";
        btnFinalizar.disabled = true;
    } else {
        avisoIdade.textContent = "";
        btnFinalizar.disabled = false;
    }
});

document.getElementById("formIdade").addEventListener("submit", function (event) {
    event.preventDefault();
});

// ---------- Desafio 9: selecionar todos ----------
var todos = document.getElementById("todos");
var itens = document.querySelectorAll(".item");

todos.addEventListener("change", function () {
    for (var i = 0; i < itens.length; i++) {
        itens[i].checked = todos.checked;
    }
});

for (var i = 0; i < itens.length; i++) {
    itens[i].addEventListener("change", function () {
        // o principal só fica marcado se todos os itens estiverem marcados
        var marcados = document.querySelectorAll(".item:checked").length;
        todos.checked = marcados === itens.length;
    });
}

// ---------- Desafio 10: tema escuro com localStorage ----------
var temaEscuro = document.getElementById("temaEscuro");

// ao abrir a página, aplica o tema que ficou salvo
if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("dark-theme");
    temaEscuro.checked = true;
}

temaEscuro.addEventListener("change", function () {
    if (temaEscuro.checked) {
        document.body.classList.add("dark-theme");
        localStorage.setItem("tema", "escuro");
    } else {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("tema", "claro");
    }
});
