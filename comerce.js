const configuracao = {
    //temas disponiveis: marrom, roxo, verde, azul e escuro
    tema: "roxo",
    modo: "claro"
};

//--------dados das categorias-----------
const categorias = [{
    id: "camisetas",
    nome: "Camisetas",
    img: "Camisas.jpg"
},
    {
        id: "calcas",
        nome: "Calças",
        img: "calsas.jpg"
    },
    {
        id: "sapatos",
        nome: "Sapatos",
        img: "sapatos.jpg"
    },

    {
        id: "acessorios",
        nome: "Acessórios",
        img: "acessorio.jpg"
    }];

//--------dados de detalhe produto-----------
const produtos = [{
    categoria: "camisetas",
    nome: "Camisa Preta",
    img: "Camiseta1.jpg",
    detalhe: "Camisa preta de manga longa",
    preco: 40
},
    {
        categoria: "camisetas",
        nome: "Camisa Branca",
        img: "Camiseta2.jpg",
        detalhe: "Camisa preta confortável",
        preco: 30
    },
    {
        categoria: "camisetas",
        nome: "Camisa Marrom",
        img: "Camiseta3.jpg",
        detalhe: "Camisa marrom estilosa",
        preco: 35
    },
    {
        categoria: "calcas",
        nome: "Calça Jeans",
        img: "Calsa1.jpg",
        detalhe: "Calça jeans azul",
        preco: 90
    },
    {
        categoria: "calcas",
        nome: "Calça pano",
        img: "Calsa2.jpg",
        detalhe: "Calça de pano rosa",
        preco: 90
    },
    {
        categoria: "calcas",
        nome: "Calça Jeans",
        img: "Calsa3.jpg",
        detalhe: "Calça jeans azul",
        preco: 90
    }];




//------------cores de temas----------------

const temas = {
  roxo: {
    claro: {
      fundo: "#F4F3FF",
      primaria: "#5B21B6",
      texto: "#1F2937",
      borda: "#DDD6FE"
    },
    escuro: {
      fundo: "#0F1025",
      primaria: "#8B5CF6",
      texto: "#E5E7EB",
      borda: "#312E81"
    }
  },

  azul: {
    claro: {
      fundo: "#F1F5F9",
      primaria: "#2563EB",
      texto: "#1E293B",
      borda: "#BFDBFE"
    },
    escuro: {
      fundo: "#0B1220",
      primaria: "#60A5FA",
      texto: "#E5E7EB",
      borda: "#1E3A8A"
    }
  },

  verde: {
    claro: {
      fundo: "#F0FDF4",
      primaria: "#15803D",
      texto: "#14532D",
      borda: "#BBF7D0"
    },
    escuro: {
      fundo: "#071A12",
      primaria: "#22C55E",
      texto: "#DCFCE7",
      borda: "#14532D"
    }
  },

  vermelho: {
    claro: {
      fundo: "#FEF2F2",
      primaria: "#B91C1C",
      texto: "#450A0A",
      borda: "#FECACA"
    },
    escuro: {
      fundo: "#1A0B0B",
      primaria: "#EF4444",
      texto: "#FEE2E2",
      borda: "#7F1D1D"
    }
  },

  laranja: {
    claro: {
      fundo: "#FFF7ED",
      primaria: "#C2410C",
      texto: "#431407",
      borda: "#FED7AA"
    },
    escuro: {
      fundo: "#1C0F05",
      primaria: "#FB923C",
      texto: "#FFEDD5",
      borda: "#9A3412"
    }
  },

  rosa: {
    claro: {
      fundo: "#FFF1F2",
      primaria: "#BE185D",
      texto: "#4A044E",
      borda: "#FBCFE8"
    },
    escuro: {
      fundo: "#1F0A14",
      primaria: "#F472B6",
      texto: "#FCE7F3",
      borda: "#9D174D"
    }
  },

  marrom: {
    claro: {
      fundo: "#F5EFE9",
      primaria: "#5A3E2B",
      texto: "#2B1E16",
      borda: "#D6C8BC"
    },
    escuro: {
      fundo: "#1C120C",
      primaria: "#C4A484",
      texto: "#EFE6DC",
      borda: "#4A2E1F"
    }
  }
};



//funcao  que aplica o tema claro e escuro
function aplicarTema(nomeTema, modo) {
  const tema = temas[nomeTema]?.[modo];

  if (!tema) {
    console.error("Tema ou modo inválido:", nomeTema, modo);
    return;
  }

  document.documentElement.style.setProperty("--cor-fundo", tema.fundo);
  document.documentElement.style.setProperty("--cor-primaria", tema.primaria);
  document.documentElement.style.setProperty("--cor-texto", tema.texto);
  document.documentElement.style.setProperty("--cor-borda", tema.borda);

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", tema.primaria);
  }
}
function atualizarTema() {
  aplicarTema(configuracao.tema, configuracao.modo);
}
function alternarModo() {
  configuracao.modo =
    configuracao.modo === "claro" ? "escuro" : "claro";

  atualizarTema();
}
// aplica ao carregar
aplicarTema(configuracao.tema, configuracao.modo);


//-informaçoes que estao sendo atualizadas----
let produtoAtual = null;

let categoriaAtual = null;



//-----------trocar telas---------------
function trocartela(id) {
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');

}



//---------trocar tela de produtos---------
function mostrarprodutos(id) {
    document.querySelectorAll('.produto').forEach(p => p.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');
}






//---------trocar anbos das telas-----------//
function mostrarElemento(id) {
    document.querySelectorAll('.tela, .produto').forEach(el => el.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');


}




//------funçaos que mostra cada produto da caregoria--------------------‐-------///
function mostrarProdutosCategoria(categoria) {
    categoriaAtual = categoria;

    // Esconde todas as telas de produtos
    document.querySelectorAll('.produto').forEach(p => p.classList.remove('ativa'));

    // Remove qualquer tela de produto antiga da mesma categoria
    let divProduto = document.getElementById(`prod-${categoria}`);
    if (!divProduto) {
        divProduto = document.createElement('div');
        divProduto.className = 'produto ativa';
        divProduto.id = `prod-${categoria}`;

        // Botão voltar
        const btnFechar = document.createElement('button');
        btnFechar.className = 'fechar';
        btnFechar.innerHTML = '&lt;';
        btnFechar.onclick = () => mostrarElemento('categorias');

        // Input busca
        const inputBusca = document.createElement('input');
        inputBusca.type = 'text';
        inputBusca.placeholder = 'Buscar produto...';
        inputBusca.className = 'input-busca-produto';
        inputBusca.oninput = () => buscarProduto(categoria);

        const wrapper = document.createElement('div');
        wrapper.className = 'produto-wrapper';

        const container = document.createElement('div');
        container.className = 'container-produto';
        container.id = `lista-${categoria}`;

        wrapper.appendChild(container);
        divProduto.appendChild(btnFechar);
        divProduto.appendChild(inputBusca);
        divProduto.appendChild(wrapper);

        document.querySelector('main').appendChild(divProduto);
    } else {
        divProduto.classList.add('ativa');
    }

    // Pocura os produtos
    const container = document.getElementById(`lista-${categoria}`);
    container.innerHTML = '';
    produtos.filter(p => p.categoria === categoria).forEach(produto => {
        const div = document.createElement('div');
        div.className = 'produtos';
        div.onclick = () => abrirdetalhe(produtos.indexOf(produto));
        div.innerHTML = `
        <div class="conteudo">
        <img src="${produto.img}" alt="${produto.nome}">
        <h2>${produto.nome}</h2>
               <p>R$ ${produto.preco.toFixed(2)}</p></div>
        `;
        container.appendChild(div);
    });
}





//função do input de busca na categoria
function buscarProduto(categoria) {
    const valor = document.querySelector(`#prod-${categoria} input`).value.toLowerCase();
    const container = document.getElementById(`lista-${categoria}`);
    container.querySelectorAll('.produtos').forEach(prod => {
        const nome = prod.querySelector('h2').innerText.toLowerCase();
        prod.style.display = nome.includes(valor) ? 'block': 'none';
    });
}





//funcao que busca em todas categorias
function buscarCategorias() {
    const valor = document.getElementById('busca-categorias').value.toLowerCase();
    const container = document.getElementById('lista-categorias');
    container.innerHTML = '';
    categorias.filter(cat => cat.nome.toLowerCase().includes(valor))
    .forEach(cat => {
        const div = document.createElement('div');
        div.className = 'categoria';
        div.onclick = () => mostrarProdutosCategoria(cat.id);
        div.innerHTML = `<img src="${cat.img}" alt="${cat.nome}"><h2>${cat.nome}</h2>`;
        container.appendChild(div);
    });
}




//----funcao para mostrar produtos da categorias--------
function mostrarCategorias() {
    const container =
    document.getElementById('lista-categorias');
    container.innerHTML = "";
    categorias.forEach(cat => {
        const div =
        document.createElement('div');
        div.className = "categoria";
        div.onclick = () => mostrarProdutosCategoria(cat.id);
        div.innerHTML =
        `<img src ="${cat.img}" alt="${cat.nome}">
        <h2>${cat.nome}</h2>`;

        container.appendChild(div);
    });
    mostrarVitrineGeral();
}




// produtos juntos
function mostrarVitrineGeral() {
    const container = document.getElementById('lista-produtos');
    container.innerHTML = '';

    produtos.forEach((produto, index) => {
        const div = document.createElement('div');
        
        div.className = 'produtos';
        div.onclick = () => abrirdetalhe(index);
        
        div.innerHTML = `
        <img src="${produto.img}" alt="${produto.nome}">
        <h2>${produto.nome}</h2>
                       <p>R$ ${produto.preco.toFixed(2)}</p> 
`;
        container.appendChild(div);
    });
}




//funcao que ve produto atual e mostra o detalhe dele
function abrirdetalhe(index) {
    produtoAtual = {
        ...produtos[index],
        quantidade: 1
    };

    atualizarTela();
    mostrarElemento('detalhe-produto');
}
function voltarParaCategoria() {
    if (categoriaAtual) {
        mostrarElemento(`prod-${categoriaAtual}`);
    }
    else {
        mostrarElemento('categorias');
    }
}




//---botões de somar e subtrair valor-----
function calcular(acao) {
    if (!produtoAtual) return;

    if (acao === 'soma') produtoAtual.quantidade++;
    if (acao === 'menos' && produtoAtual.quantidade > 1) produtoAtual.quantidade--;

    atualizarTela();
}





//----atualiza para cada um o seu detalhe----
function atualizarTela() {

    document.getElementById('img').src = produtoAtual.img;
    document.getElementById('detalhe').innerText = produtoAtual.nome;
    document.getElementById('descricao').innerText = produtoAtual.detalhe;
    document.getElementById('quantidade').innerText = produtoAtual.quantidade;

    document.getElementById('preco').innerText =
    `Valor unitário: R$ ${produtoAtual.preco.toFixed(2)}`;
    document.getElementById('total-produt').innerText =
    `Total: R$ ${(produtoAtual.preco * produtoAtual.quantidade).toFixed(2)}`;
}



// --- Inicializa carrinho do localStorage ---
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

// --- Adicionar produto ---
function adicionarCarrinho() {
    if (!produtoAtual) return;
    alert("Produto adicionado ao carrinho!");

    let itemExistente = carrinho.find(p => p.nome === produtoAtual.nome);
    if (itemExistente) {
        itemExistente.quantidade += produtoAtual.quantidade;
    } else {
        carrinho.push({
            ...produtoAtual
        });
    }

    salvarCarrinho();
}

// --- Remover produto ---
function removerItem(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    salvarCarrinho();
}




// --- Atualizar visual do carrinho ---
function atualizarCarrinho() {
    const lista = document.querySelector('#carrinho .carrinho-de-produtos');
    lista.innerHTML = '';

    let totalGeral = 0;

    carrinho.forEach(item => {
        const li = document.createElement('li');
li.innerHTML = `
  <div>
  <span id= "nomep" >${item.nome} </span>
    <span>${item.quantidade} × </span>
  <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
   <button onclick="removerItem('${item.nome}')">❌</button>
   <br>        <button class="var" onclick="alterarQuantidadeCarrinho('${item.nome}', 'menos')">−</button>
    <button class="var" onclick="alterarQuantidadeCarrinho('${item.nome}', 'soma')">+</button>
  </div>

`;

        lista.appendChild(li);
        totalGeral += item.preco * item.quantidade;
    });

    document.getElementById('totalgeral').innerHTML = `<strong>Total: R$${totalGeral.toFixed(2)}</strong>`;
}

function alterarQuantidadeCarrinho(nome, acao) {
    const item = carrinho.find(p => p.nome === nome);
    if (!item) return;

    if (acao === 'soma') {
        item.quantidade++;
    }

    if (acao === 'menos') {
        item.quantidade--;
        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(p => p.nome !== nome);
        }
    }

    salvarCarrinho();
}



// --- Enviar pedido pelo WhatsApp ---
function enviarWhatsApp() {
    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    let mensagem = "Olá! Gostaria de comprar:\n\n";
    carrinho.forEach(item => {
        mensagem += `- ${item.nome} - ${item.quantidade}x R$${item.preco.toFixed(2)} = R$${(item.preco * item.quantidade).toFixed(2)}\n`;
    });

    let total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    mensagem += `\nTotal: R$${total.toFixed(2)}`;

    const numero = "5511934374980"; // seu número com DDD
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}

// --- Inicializa visual ao carregar ---
atualizarCarrinho();
mostrarCategorias();