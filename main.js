// Desafio: método de ponto ou colchetes

// Desafio com notação de colchetes:
/* const cliente = {
  nome: "Mariana",
  idade: 35,
  genero: "Feminino",
};

cliente["estado"] = "Pernambuco";

console.log("Meu nome é " + cliente.nome + " e moro na cidade de " + cliente.estado); */

// Desafio com notação de ponto:
/* cliente = {
    nome: 'Mariana', 
    idade: 35,
    genero: 'Feminino'
 }

cliente.estado = 'Pernambuco'

 alert('Olá, meu nome é ' + cliente.nome + ' e moro no estado de ' + cliente.estado + '.') */

let listaDeItens = [];
let itemAEditar;

const form = document.getElementById("form-itens");
const itensInput = document.getElementById("receber-item");
const ulItens = document.getElementById("lista-de-itens");
const ulItensComprados = document.getElementById("itens-comprados");
const listaRecuperada = localStorage.getItem("listadeItens");

function atualizarLocalStorage() {
  localStorage.setItem("listaDeItens", JSON.stringify(listaDeItens));
}

// (valores omitidos, 0, null, NaN, undefined, "", false) << retornam false

if (listaRecuperada) {
  listaDeItens = JSON.parse(listaRecuperada);
} else {
  listaDeItens = [];
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  salvarItem();
  mostrarItem();
  itensInput.focus();
});

function salvarItem() {
  const comprasItem = itensInput.value;
  const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase());

  if (checarDuplicado) {
    alert("Item já cadastrado!");
  } else {
    listaDeItens.push({
      valor: comprasItem,
      checar: false,
    });
  }
  itensInput.value = "";
}

function mostrarItem() {
  ulItens.innerHTML = "";
  ulItensComprados.innerHTML = "";
  listaDeItens.forEach((elemento, index) => {
    if (elemento.checar) {
      ulItensComprados.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" checked class="is-clickable" />
            <span class="itens-comprados is-size-5">${elemento.valor}</span>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>`;
    } else {
      ulItens.innerHTML += `
    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}"${
        index !== Number(itemAEditar) ? "disableb" : ""
      }></input>
        </div>

        <div>
        ${
          index === Number(itemAEditar)
            ? '<button onClick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>'
            : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'
        }
        <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>`;
    }
  });

  const inputsCheck = document.querySelectorAll('input[type="checkbox"]');

  inputsCheck.forEach((i) => {
    i.addEventListener("click", (evento) => {
      valorDoElemento = evento.target.parentElement.parentElement.getAttribute("data-value");
      listaDeItens[valorDoElemento].checar = evento.target.checked;
      mostrarItem();
    });
  });

  const deletarObjetos = document.querySelectorAll(".deletar");

  deletarObjetos.forEach((i) => {
    i.addEventListener("click", (evento) => {
      valorDoElemento = evento.target.parentElement.parentElement.getAttribute("data-value");
      listaDeItens.splice(valorDoElemento, 1);
      mostrarItem();
    });
  });

  const editarItens = document.querySelectorAll(".editar");

  editarItens.forEach((i) => {
    i.addEventListener("click", (evento) => {
      itemAEditar = evento.target.parentElement.parentElement.getAttribute("data-value");
      mostrarItem();
    });
  });

  atualizarLocalStorage();
}

function salvarEdicao() {
  // O seletor foi corrigido para ter a sintaxe CSS correta
  const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);

  // Imprime o valor no console para ter certeza de que estamos pegando o elemento certo
  console.log(itemEditado.value);

  listaDeItens[itemAEditar].valor = itemEditado.value;
  itemAEditar = -1; // Reseta o itemAEditar para que nenhum item esteja em modo de edição
  mostrarItem();
}
