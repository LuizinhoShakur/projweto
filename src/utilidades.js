export const catalogo = [
    {
        id:"1",
        nome:'Blusa preta do BK',
        marca:'Zara',
        preco: 1000,
        imagem: 'bj.jpg',
        feminino: false,
    },
    {
        id:"2",
        nome:'Blusa Major RD',
        marca:'Zara',
        preco: 1000,
        imagem: 'rd.jpg',
        feminino: true,
    },
    {
        id:"3",
        nome:'Blusa do Jackson',
        marca:'Zara',
        preco: 1000,
        imagem: 'jackson.jpg',
        feminino: false,
    },
    {
        id:"4",
        nome:'Blusa Daniel',
        marca:'Zara',
        preco: 1000,
        imagem: 'daniel.jpg',
        feminino: true,
    },
    {
        id:"5",
        nome:'Blusa Drake',
        marca:'Zara',
        preco: 1000,
        imagem: 'drake.jpg',
        feminino: false,

    },
    {
        id:"6",
        nome:'Blusa do Giveon',
        marca:'Zara',
        preco: 1000,
        imagem: 'giveon.jpg',
        feminino: true,
    },
    {
        id:"7",
        nome:'Blusa do Racionais',
        marca:'Zara',
        preco: 1000,
        imagem: 'racionais.jpg',
        feminino: false,
    },
    {
        id:"8",
        nome:'Blusa do Kendrick ',
        marca:'Zara',
        preco: 1000,
        imagem: 'kendrick.jpg',
        feminino: true,
    },
    
];
export function salvarLocalStorage(chave, informacao) {
    localStorage.setItem(chave, JSON.stringify(informacao));

}
export function lerLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave));

}
export function apagarDoLocalStorage(chave){
    localStorage.removeItem(chave);

}
 export function desenharProdutoCarrinhoSimples(
  idProduto,
  idContainerHtml,
  quantidadeProduto
) {
  const produto = catalogo.find((p) => p.id === idProduto);
  const containerProdutosCarrinho = document.getElementById(idContainerHtml);

  const elementoArticle = document.createElement("article"); //<article></article>
  const articleClasses = [
    "flex",
    "bg-stone-200",
    "rounded-lg",
    "p-1",
    "relative",
    "mb-2",
    "w-96",
  ];
    for(const articleClass of articleClasses){
        elementoArticle.classList.add(articleClasses);
    }
 

    
    const cartaoProdutoCarrinho = `    <article  class="flex  bg-slate-100 rounded-lg p-1 relative " >
    
    <img src="./assets/img/${produto.imagem}" alt="Carrinho: ${produto.nome}"  class="h-24 rounded-lg">
    <div class="p-2 flex flex-col justifiy-between">
    <p class="text-slate-900">${produto.nome}</p>
    <p class="text-slate-400 text-xs">Tamanho: M</p>
    <p class="text-green-700 text-lg">$${produto.preco}</p>
    </div>
    <div class='flex text-slate-950 items-end absolute bottom-0 right-2 text-lg'>
     
     <p  id='quantidade-${produto.id}' class='ml-2'>${quantidadeProduto}</p>
      
    </div> </article>`;
    elementoArticle.innerHTML = cartaoProdutoCarrinho;

   containerProdutosCarrinho.appendChild(elementoArticle)
   

}
    
    
