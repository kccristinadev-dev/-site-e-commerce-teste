const configuracao = {
    //temas disponiveis: marrom, roxo, verde, azul e escuro
    tema: "roxo"
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
        fundo: "#f5f3ff",
        primaria: "#4A0072",
        texto: "#1f2937",
        borda: "#c4b5fd"
    },
    azul: {
        fundo: "#eff6ff",
        primaria: "#2563eb",
        texto: "#1e293b",
        borda: "#93c5fd"
    },
    escuro: {
        fundo: "#0f172a",
        primaria: "#38bdf8",
        texto: "#4F4F4F",
        borda: "#334155"
    },
    marrom: {
        fundo: "#f3efe9",
        primaria: "#5a3e2b",
        texto: "#2b1e16",
        borda: "#d6c8bc"
    },
    verde: {
        fundo: "#f0fdf4",
        primaria: "#166534",
        texto: "#14532d",
        borda: "#86efac"
    }
};



//funcao de aplicar tema
function aplicarTema(nomeDoTema) {
    const tema = temas[nomeDoTema];
    document.documentElement.style.setProperty("--cor-primaria", tema.primaria);
document.querySelector('meta[name="theme-color"]').setAttribute('content', tema.primaria);



    document.documentElement.style.setProperty("--cor-fundo", tema.fundo);
    document.documentElement.style.setProperty("--cor-primaria", tema.primaria);
    document.documentElement.style.setProperty("--cor-texto", tema.texto);
    document.documentElement.style.setProperty("--cor-borda", tema.borda);
    
        if (!tema) {
        console.error("Tema não existe:", nomeDoTema);
        return;
    }
}



// aplica ao carregar
aplicarTema(configuracao.tema);



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
        <span>${item.nome} - ${item.quantidade}x R$${item.preco.toFixed(2)} = R$${(item.preco * item.quantidade).toFixed(2)}</span>
        <button onclick="removerItem('${item.nome}')">❌</button>
        `;
        lista.appendChild(li);
        totalGeral += item.preco * item.quantidade;
    });

    document.getElementById('totalgeral').innerHTML = `<strong>Total: R$${totalGeral.toFixed(2)}</strong>`;
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