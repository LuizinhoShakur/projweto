import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades";

const idsProdutosCarrinhosComQuantidades = lerLocalStorage('carrinho') ??{};
function abrirCarrinho(){
    document.getElementById('carrinho').classList.add('right-[0px]');
    document.getElementById('carrinho').classList.remove('right-[-360px]');
   
}
function fecharCarrinho(){
    document.getElementById('carrinho').classList.remove('right-[0px]');
    document.getElementById('carrinho').classList.add('right-[-360px]');
}
function irParaCheckout(){
    if (Object.keys(idsProdutosCarrinhosComQuantidades).length === 0) {
        return;
      }
      window.location.href = "./checkout.html";
    }

 export function inicializarCarrinho(){
    const botaofecharCarrinho = document.getElementById('fechar-carrinho');
     const botaoabrirCarrinho = document.getElementById('abrir-carrinho');
     const botaoIrParaCheckout = document.getElementById("finalizar-compra");



     botaofecharCarrinho.addEventListener("click",fecharCarrinho);
     botaoabrirCarrinho.addEventListener("click", abrirCarrinho);
     botaoIrParaCheckout.addEventListener("click", irParaCheckout);
     
}

function removerDoCarrinho(idProduto){
        delete idsProdutosCarrinhosComQuantidades[idProduto];
        salvarLocalStorage('carrinho', idsProdutosCarrinhosComQuantidades)
        atualizarPrecoCarrinho();
        renderizarProdutosCarrinho();
}
function incrementarQuantidadeProduto(idProduto){
    idsProdutosCarrinhosComQuantidades[idProduto]++;
    salvarLocalStorage('carrinho', idsProdutosCarrinhosComQuantidades)
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto)
}
function decrementarQuantidadeProduto(idProduto){
    if(idsProdutosCarrinhosComQuantidades[idProduto] === 1){
      
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutosCarrinhosComQuantidades[idProduto]--;
    salvarLocalStorage('carrinho', idsProdutosCarrinhosComQuantidades)
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto)
   
}
function atualizarInformacaoQuantidade(idProduto){
   document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutosCarrinhosComQuantidades[idProduto];

}
function desenharProdutonoCarrinho(idProduto){
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinho = document.getElementById('produtos-carrinho');

    const elementoArticle = document.createElement('article');
    const articleClasses = [
        'flex' ,
         'bg-slate-100',
          'rounded-lg',
           'p-1',
            'relative',
        
    ];
    for(const articleClass of articleClasses){
        elementoArticle.classList.add(articleClasses);
    }
 

    
    const cartaoProdutoCarrinho = `    <article  class="flex  bg-slate-100 rounded-lg p-1 relative " >
    <button id="remover-item-${produto.id}"><i class="fa-solid fa-circle-xmark text-slate-500  hover:text-slate-800 absolute top-0  right-2"></i></button>
    <img src="./assets/img/${produto.imagem}" alt="Carrinho: ${produto.nome}"  class="h-24 rounded-lg">
    <div class="p-2 flex flex-col justifiy-between">
    <p class="text-slate-900">${produto.nome}</p>
    <p class="text-slate-400 text-xs">Tamanho: M</p>
    <p class="text-green-700 text-lg">$${produto.preco}</p>
    </div>
    <div class='flex text-slate-950 items-end absolute bottom-0 right-2 text-lg'>
     <button id='decrementar-produto-${produto.id}'>-</button> 
     <p  id='quantidade-${produto.id}' class='ml-2'>${idsProdutosCarrinhosComQuantidades[produto.id]}</p>
     <button class='ml-2' id='incrementar-produto-${produto.id}'>+</button> 
    </div> </article>`;
    elementoArticle.innerHTML = cartaoProdutoCarrinho;

   containerProdutosCarrinho.appendChild(elementoArticle)
   document.getElementById(`decrementar-produto-${produto.id}`).addEventListener('click',() => decrementarQuantidadeProduto(produto.id));
   document.getElementById(`incrementar-produto-${produto.id}`).addEventListener('click', () => incrementarQuantidadeProduto(produto.id));
   document.getElementById(`remover-item-${produto.id}`).addEventListener('click', () => removerDoCarrinho(produto.id));

}
 export     function renderizarProdutosCarrinho(){
    const containerProdutosCarrinho = document.getElementById('produtos-carrinho')
       
       containerProdutosCarrinho.innerHTML = "";

       for(const idProduto in idsProdutosCarrinhosComQuantidades){
           desenharProdutonoCarrinho(idProduto);
       }
       
}
 export function AdicionarAoCarrinho(idProduto){
    if(idProduto in idsProdutosCarrinhosComQuantidades){
        incrementarQuantidadeProduto(idProduto)
        return;

    }
    idsProdutosCarrinhosComQuantidades[idProduto] =1
    salvarLocalStorage('carrinho', idsProdutosCarrinhosComQuantidades)
     desenharProdutonoCarrinho(idProduto);
     atualizarPrecoCarrinho()
    
   
}
 export function atualizarPrecoCarrinho(){
    const precoCarrinho = document.getElementById('preco-total')
    let precoTotalCarrinho = 0
    for(const idProdutoNoCarrinho in idsProdutosCarrinhosComQuantidades){
        precoTotalCarrinho += catalogo.find((p) => p.id === idProdutoNoCarrinho).preco  * idsProdutosCarrinhosComQuantidades[idProdutoNoCarrinho];
    }
    precoCarrinho.innerText = `Total:$${precoTotalCarrinho}`
}