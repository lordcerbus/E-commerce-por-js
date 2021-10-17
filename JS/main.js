// Funçao de chamada para o arquivo JSON   

async function requestJSON() { // assync função que chama o arquivo
     let response = await fetch('./JS/teste.json')  // fetch importa o arquivo json
     let data = await response.json('./JS/teste.json') // da a resposta do arquivo
     return data  // retorno da função 
}
const data1 = await requestJSON('./JS/teste.json') // variavel que retorna o objeto json
// console.log(data1) // nesse caso temos um objeto com 3 arrays com 1 objeto em cada

// ----------------------------------------------------------------------------------------------------------------//

let armazenamento = sessionStorage // usaremos .setitem() e .getitem()
let arraydeprodutos = data1["products"]

//                                                   controles

let perPage = 10 // Numero de elementos por pagina

//  constante que armazena as paginas 
const state = {
    page: 1,
    perPage ,
    totalPage: Math.ceil(arraydeprodutos.length / perPage), // numero de paginas totais
    maxVisibleButtons: 3 // numero de botões
    
}

// metodo de seleção do elemento pelos seletores de css
const html = {
    get(element){
        return document.querySelector(element)
    }
} 

// criação dos controles da pagina e incremento das funções 
const controls = {
    next() {
        state.page++
        let lastpage = state.page > state.totalPage
        if(lastpage){
        state.page--
        } // incremetan o numero da pagina ao clicar e verifica uma condição para o maior numero de pagina
    },
    prev(){
        state.page--
        if(state.page < 1){
        state.page++
        } // decrementa o numero de paginas e verifica outra condição para o menor numero de pagina
    },
    goTo(page){
            if (page < 1) {
                page = 1
            }
            state.page = +page

            if(page > state.totalPage){
                state.page = state.totalPage
            } // vai ate a pagina do numero descrito
    },
    createListeners(){
    html.get('.next').addEventListener('click',() => {
        controls.next()
        list.update()
        buttons.update()
    })
    html.get('.prev').addEventListener('click',() => {
        controls.prev()
        list.update()
        buttons.update()
    })
    } // cria os eventos de forma dinamica 
} 

const buttons = {
    element: html.get('.number'), // elemento que recebe os botões
    element2: html.get('.numbers'),
 create(number) { 
     const button = document.createElement('div')
     button.innerHTML = number;

     if(state.page == number){
         button.classList.add('active')
     }

     button.addEventListener('click',(event)=>{
        const page = event.target.innerText
        controls.goTo(page)
        update()
     })
    
     buttons.element.appendChild(button)

 }, // função que cria os botoes
 update() {
    buttons.element.innerHTML = " "
    const {maxLeft, maxRight} = buttons.calculateMaxVisible()
    for(let page = maxLeft; page <= maxRight; page++){
    buttons.create(page) 
    }
 }, // função que atualiza os boto~es a cada click
 calculateMaxVisible() {
     let maxLeft = (state.page - Math.floor(state.maxVisibleButtons / 2))
     let maxRight = (state.page + Math.floor(state.maxVisibleButtons / 2))
     if(maxLeft < 1) {
         maxLeft = 1
         maxRight = state.maxVisibleButtons
     }
     if (maxRight > state.totalPage) {
         maxLeft = state.totalPage - (state.maxVisibleButtons - 1)
        maxRight = state.totalPage    
    }
    if (maxLeft < 1 ) maxLeft = 1
    return {maxLeft, maxRight}
 }
}

// Função que cria o template dos cards

let container = document.querySelector('#space-store')
const anunciotemplate = `<div class="fundo" id="cart-fundo"></div>
                    <ul id="carrocel">
                        <li><button id="ai1" class="ai"></button>
                        </li>
                        <li><button id="ai2" class="ai"></button>
                        </li>
                        <li><button id="ai3" class="ai"></button>
                        </li>
                    </ul>
                    <div class="txt">
                        <h5 id="name"></h5>
                        <h4 id="currency"></h3>
                        <h3 id="price"></h2>
                        <button id="addtocart" type="submit">+</button>
                    </div>`

//                                               Paginação                                                       //

const list = {
    create() {
        const anunciospace = document.createElement('div')
                     anunciospace.classList.add('anuncio')
                     anunciospace.innerHTML = anunciotemplate
                     container.appendChild(anunciospace)

                     // Escopo global de variaveis 
let description = document.querySelectorAll('#name')
let price = document.querySelectorAll('#price')
let currency = document.querySelectorAll('#currency')
let image1 = document.querySelectorAll('#ai1')
let image2 = document.querySelectorAll('#ai2')
let image3 = document.querySelectorAll('#ai3')
let principal = document.querySelectorAll('#cart-fundo')

// funções para atribuir os dados dos carts

    var dadosproduto = arraydeprodutos.map(({description})=>{
        return description
    })
    description.forEach((e)=>{
        e.innerHTML = dadosproduto.shift()
    })
    dadosproduto = arraydeprodutos.map(({price})=>{
        return price
    })
    price.forEach((e)=>{
        e.innerHTML = Number(dadosproduto.shift()).toFixed(2)
    })
    dadosproduto = arraydeprodutos.map(({currency})=>{
        return currency
    })
    currency.forEach((e)=>{
        e.innerHTML = dadosproduto.shift()
    })
    dadosproduto = arraydeprodutos.map(({img1})=>{
        return img1
    })
    image1.forEach((e)=>{
       e.style.backgroundImage = 'url('+ dadosproduto.shift()+')'
    })
    dadosproduto = arraydeprodutos.map(({img2})=>{
        return img2
    })
    image2.forEach((e)=>{
       e.style.backgroundImage = 'url('+ dadosproduto.shift()+')'
       
    })
    dadosproduto = arraydeprodutos.map(({img3})=>{
        return img3
    })
    image3.forEach((e)=>{
       e.style.backgroundImage = 'url('+ dadosproduto.shift()+')'
    })
    dadosproduto = arraydeprodutos.map(({img3})=>{
        return img3
    })
    principal.forEach((e)=>{ // percorre os fundos do anuncio e adiciona a url com metodo shift() sempre tirando um valor do array 
        e.style.backgroundImage = 'url('+ dadosproduto.shift()+')' 
    })

    // Função do carrocel de imagens

    let botoes = document.querySelectorAll('.ai')
        botoes.forEach((e)=>{
            var bkgout = e.closest('.anuncio') // pega o elemento mais proximo do elemento que recebeu o evento
            var bkgout1 = bkgout.querySelector('.fundo') // pegando o elemento alvo do background
            e.addEventListener('click',switchbkg)
            function switchbkg(e) {
               let bkgin = [e.target.style.backgroundImage] // adicionando as url´s para criar um array 
               bkgout1.style.backgroundImage = bkgin.shift() // usando o shift() para alternar entre os url´s
            }
        })
    }, // metodo de criação dos elementos que populam a lista
    update() {
        html.get('.space').innerHTML = ""
        let page = state.page - 1
        let start  = page * state.perPage
        let end = start + state.perPage
        const paginateditems = arraydeprodutos.slice(start,end)
        paginateditems.forEach(list.create)
    }, // metodo de atualização dos elementos da lista 
    calculos() {  // Escopo de variavel dos calculos 
        let valorsomar = []
    let addcart = document.querySelectorAll('#addtocart')
    addcart.forEach((e)=>{
        e.addEventListener('click',addproductprice)
        function addproductprice() {
            var src = e.closest('.anuncio').querySelector('.fundo').style.backgroundImage.replace(/["'()]/g,"").replace("url","")
            let preco = Number(e.closest('.anuncio').querySelector('#price').textContent)
            let nome = e.closest('.anuncio').querySelector('#name').textContent
            let currency = e.closest('.anuncio').querySelector('#currency').textContent
            let cartofprice = document.querySelector('#cart-finish')
            const carttemplate =   `<img src="${src}" alt="">                
                    <button id="removecart" type="submit">x</button>
                            <h5>${nome}</h5>
                            <h3>${currency}</h3>
                            <h2>${preco.toFixed(2)}</h2>`;  // criaçao do template string 
            var gerationcart = document.createElement('div')
            gerationcart.classList.add('produto')
            cartofprice.appendChild(gerationcart)
            gerationcart.innerHTML = carttemplate
                 listadecompras()
    // Somatoria de valores 
                    valorsomar.push(preco) // puxando o valor para dentro do sessionstorage
                    var totalpreco = Number(valorsomar.reduce((total, currentElement) => total + currentElement,0)) // reduce sendo usada para somar valores 
                    armazenamento.setItem('valor',totalpreco) // seta o valor no sessionstorage
                    mostravalor()
    // Remoção do cart 
                    var removecart = document.querySelectorAll('#removecart')
            removecart.forEach((e)=>{
                e.addEventListener('click',deleteproduct)
                    function deleteproduct(e){
                        var cartremove = e.target.closest('.produto') // pega a div principal do anuncio 
                        var precoremove = cartremove.querySelector('h2').textContent // pega o preço do anuncio diretamente no local onde event acontece
                        cartofprice.removeChild(cartremove) //  remove a div
                        const lista = html.get('#cart-store .cart')
                        var tamanholista = lista.children.length * 7.5
                        var tamanhoitem = lista.children.length
                        if (tamanhoitem >= 1) {
                            lista.style.display = 'grid'
                            lista.style.height = `${tamanholista}%`
                        } 
                        if (tamanhoitem < 1) {
                            lista.style.display = 'none'
                        }          
    // Subtração de valores     
                        var ind = valorsomar.findIndex(i=> i == Number(precoremove)) // mostra o indice do elemento no array  
                        valorsomar.splice(ind,1) // remove o item que corresponde ao index indicado em 'ind'
                        var totalpreco = Math.abs(Number(valorsomar.reduce((total ,currentElement ) => total - currentElement,0))) // faz a subtraça~de valores pelo reduce e converte de negativo para positivo pelo math.abs()
                        armazenamento.setItem('valor',totalpreco) // seta o valor no sessionstorage
                        mostravalor()
                        titlelist()

                    }
             })      
        }
                          
    })
    }
}

// -----------------------------------------------------------------------------------------------------------------------------------------//

//                                                            Filtragem de produtos                                                         //
const search = document.querySelector('#search')
search.addEventListener('input',mostrarsearch) // evento input acionado a cada mudança 
function mostrarsearch(e){
    const valorinput = e.target.value.trim().toLowerCase()  // lê o valor do input, remove os espaços vazios ( trim()) e adiciona o leito para maiusculo
     const filtrodeanuncio = Array.from(container.children) // função array.from() cria array do html collection 
    filtrodeanuncio.filter(e =>!e.querySelector('#name').textContent.toLowerCase().includes(valorinput) //  função include checa em cada elemento a presença do caracter digitado no input 
    ).forEach((e)=>{
        e.classList.add('remove') // adiciona a classe que "some" com os elementos que n correspondem ao match do caracter digitado
    })
    filtrodeanuncio
    .filter(e =>e.querySelector('#name').textContent.includes(valorinput)
    ).forEach((e)=>{
        e.classList.remove('remove') //  remove a classe quando o match acontece 
    })
}

//----------------------------------------------------------------------------------------------------------------------------------------//

//                                                     Função de ajuste da lista de compras                                  //
let title = html.get('#cart-store h1')
const lista = html.get('#cart-store .cart')
   function listadecompras() {
    var tamanholista = lista.children.length * 7.5
    var tamanhoitem = lista.children.length
    if (tamanhoitem < 1 ){
        lista.style.display = 'none'
        title.innerHTML = 'Empty cart, please return to store'
    }
        if (tamanhoitem >= 1) {
            lista.style.display = 'grid'
            lista.style.height = `${tamanholista}%`
            title.innerHTML = 'Welcome to you cart, check yous orders!'
        }
         //  desenvolver logica que a cada 2 itens 
         // a lista cresça 9% para um total de 20 itens
    
}
//                                                             Requerimento                                                       //
  
//                                                               Função de envio                                                  //
html.get('#sendorders').addEventListener('click',enviarpedido)
function enviarpedido() {
    var finallist = document.querySelector('.cart')
    finallist.innerHTML = ''
    finallist.style.display = 'none'
    armazenamento.clear()
    mostravalor()
    titlelist()

alert('Pedido enviado!')
}

//                                                      Função do titulo da lista 
 
function titlelist() {
    if (lista.children.length < 1){
    title.innerHTML = 'Empty cart, please return to store'
} else {
    title.innerHTML = 'Welcome to you cart, check yous orders!'
}
}

function mostravalor() {
    document.querySelector('.cabecalho')
    .querySelector('h4')
    .querySelector('span')
    .innerHTML = Number(armazenamento.getItem('valor')).toFixed(2) // exibição do valor
} 
//                                                     Escopo de funçoes constantes                                                  //
function update() {
    titlelist()
    listadecompras()
    list.update()
    buttons.update()
    controls.createListeners()
    list.calculos()
 } // função que armazena as principais
 
 function init() {
     update()
} // função que armazena e inicializa junto do DOM
init() // chamda da função