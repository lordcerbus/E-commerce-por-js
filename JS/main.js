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

// Função que cria o template dos cards
let container = document.querySelector('#space-store')
let arraydeprodutos = data1["products"]
arraydeprodutos.forEach(() => {
    let anunciospace = document.createElement('div')
    anunciospace.classList.add('anuncio')
    container.appendChild(anunciospace)
    anunciospace.innerHTML = 
                `<div class="fundo" id="cart-fundo"></div>
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
                        <h3 id="currency"></h3>
                        <h2 id="price"></h2>
                        <button id="addtocart" type="submit">+</button>
                    </div>`
       
})

// --------------------------------------------------------------------------------------------//

// Escopo de variavel dos calculos 
let valorsomar = []
let addcart = document.querySelectorAll('#addtocart')
addcart.forEach((e)=>{
    e.addEventListener('click',addproductprice)
    function addproductprice() {
        var src = e.closest('.anuncio').querySelector('.fundo').style.backgroundImage.substring(5,163)
        var preco = Number(e.closest('.anuncio').querySelector('#price').textContent)
        var nome = e.closest('.anuncio').querySelector('#name').textContent
        var currency = e.closest('.anuncio').querySelector('#currency').textContent
        let cartofprice = document.querySelector('#cart-finish')
        var gerationcart = document.createElement('div')
        gerationcart.classList.add('produto')
        cartofprice.appendChild(gerationcart)
        gerationcart.innerHTML = 
               `<img src="${src}" alt="">
               <button id="removecart" type="submit">x</button>
                <h5>${nome}</h5>
                <h3>${currency}</h3>
                <h2>${preco.toFixed(2)}</h2>`;
                valorsomar.push(preco)
        var totalpreco = Number(valorsomar.reduce((total, currentElement) => total + currentElement,0))
                armazenamento.setItem('valor',totalpreco) 
                document.querySelector('.cabecalho').querySelector('h4').querySelector('span').innerHTML = Number(armazenamento.getItem('valor')).toFixed(2)
                document.querySelector('#valor').innerHTML = Number(armazenamento.getItem('valor')).toFixed(2)
        var removecart = document.querySelectorAll('#removecart')
        removecart.forEach((e)=>{
            e.addEventListener('click',deleteproduct)
                function deleteproduct(e){
                    var cartremove = e.target.closest('.produto')
                    var precoremove = cartremove.querySelector('h2').textContent
                    cartofprice.removeChild(cartremove)
                    var ind = valorsomar.findIndex(i=> i == Number(precoremove)) // mostra o indice do elemento no array  
                    valorsomar.splice(ind,1)
                    var totalpreco = Math.abs(Number(valorsomar.reduce((total ,currentElement ) => total - currentElement,0)))
                    armazenamento.setItem('valor',totalpreco) 
                    document.querySelector('.cabecalho').querySelector('h4').querySelector('span').innerHTML = Number(armazenamento.getItem('valor')).toFixed(2)
                    document.querySelector('#valor').innerHTML = Number(armazenamento.getItem('valor')).toFixed(2)
                }
         })       
    }
                      
})

// -----------------------------------------------------------------------------------------------------------//

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

// --------------------------------------------------------------------------------------------------------------------------------------//

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

// -----------------------------------------------------------------------------------------------------------------------------------------//

/* let phone = document.getElementById('phone')
let message = document.getElementById('message')

// buttons
let linkHandler = document.getElementById('by-link')
let popUpHandler = document.getElementById('by-popup')

// font: 
let isMobile = (function(a) {
    if ( /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)) ) {
        return true
    } else {
        return false
    }
})(navigator.userAgent || navigator.vendor || window.opera)

const makeLink = function(mode) {

    let mount = function() {
        if ( isMobile ) {
            let target = `whatsapp://send?`
            if ( !!phone && phone.value !== '' ) {
                target += `phone=${encodeURIComponent(phone.value)}&`
            }
            if ( !!message && message.value !== '' ) {
                target += `text=${encodeURIComponent(message.value)}`
            }
            return target
        } else {
            let target = `https://api.whatsapp.com/send?`
            if ( !!phone && phone.value !== '' ) {
                target += `phone=${encodeURIComponent(phone.value)}&`
            }
            if ( !!message && message.value !== '' ) {
                target += `text=${encodeURIComponent(message.value)}`
            }
            return target
        }
    
    }

    let openLink = function() {
        $('#console-container').append(`<span class="col px-0"><b>Link</b>: ${mount()}</span><br><br>`)
    }

    let openPopUp = function() {
        let h = 650,
            w = 550,
            l = Math.floor(((screen.availWidth || 1024) - w) / 2),
            t = Math.floor(((screen.availHeight || 700) - h) / 2)
        // open popup
        let options = `height=600,width=550,top=${t},left=${l},location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=0`
        $('#console-container').append(`<span class="col px-0"><b>PopUp URL</b>: ${mount()}</span><br><span class="col px-0"><b>PopUp options</b>: ${options}</span><br><br>`)
    }
    
    switch (mode) {
        case 'link':
            openLink()
        break
        case 'popup':
            openPopUp()
        break
    }
} 

// events handler(s)
linkHandler.addEventListener('click', function(e) {
    makeLink('link')
}, false)
popUpHandler.addEventListener('click', function(e) {
    makeLink('popup')
}, false) */

/*
Eu estava com muita preguiça de criar elementos HTML um a um, então gastei dez minutos e fiz uma função:

elementFactory(e) {
 const f = elementFactory

 if (Array.isArray(e)) {
  return e.map(f)
 }

 let { tag, children } = e

 if (typeof children !== 'undefined') {
  delete e.children
  children = children.map(f)
 }

 delete e.tag
 let o = Object.assign(document.createElement(tag), e)

 o.append(children || [])

 return o
}

Como usa? Simples, basta passar as propriedades dos elementos como objetos.

elementFactory({
 tag: 'tr',
 children: [
  {
   tag: 'td',
   textContent: 'col #1'
  },
  {
   tag: 'td',
   textContent: 'col #2'
  }
 ]
}])
*/