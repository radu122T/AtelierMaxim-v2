let shop = document.getElementById("shop")

let basket = JSON.parse(sessionStorage.getItem("data")) || []

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, display, tip, price, desc, img } = x
      let search = basket.find((x) => x.id === id) || []
            return `
    <div class="item ${display} ${tip}" id=product-id-${id}>
      <div>
          <img src=${img} alt="produs">
            <div class="details">
                <p>${desc}</p>
                <div class="priceQuantity">
                    <div class="buttons">
                        <span>Cantitate:</span>
                        <div class='quantityButtons'>
                            <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                            <div id=${id} class="quantity">
                                ${search.item === undefined ? 0 : search.item}
                            </div>
                            <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                        </div>

                    </div>
                    <h2> ${price} Lei</h2>
                </div>
                <div class="productButtons">
			    		    <button onclick="increment(${id})" class='addToCart'>Adauga in cos</button>
			    		    <button><a href="/produs.html">Personalizeaza</a></button>
			          </div>
            </div>
        </div>  
      </div>
    `
    })
    .join(""))
}

generateShop()



let increment = (id) => {
    let selectedItem = id
    let product=document.getElementById(`product-id-${selectedItem.id}`)
    let addToCart= Array.from(product.getElementsByClassName('addToCart'))[0]
    let search = basket.find((x) => x.id === selectedItem.id)
    if (search === undefined ) {
      basket.push({
        id: selectedItem.id,
        item: 1,
      })
    } else {
      search.item += 1
    }
    
    update(selectedItem.id)
  
    sessionStorage.setItem("data", JSON.stringify(basket))
    window.location.reload()
}


let decrement = (id) => {
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)
  
    if (search === undefined) return
    else if (search.item === 0) return
    else {
      search.item -= 1
    }
    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0)
    // console.log(basket)
    sessionStorage.setItem("data", JSON.stringify(basket))
  }
  let update = (id) => {
    let search = basket.find((x) => x.id === id)
    // console.log(search.item)
    document.getElementById(id).innerHTML = search.item
    calculation()
  }
  
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
  }
  
calculation()

let removeItem = (id) => {
    window.location.reload()
    let selectedItem = id
  // console.log(selectedItem.id)
    basket = basket.filter((x) => x.id !== selectedItem.id)
    TotalAmount()
    sessionStorage.setItem("data", JSON.stringify(basket))
    if (basket.length===0)
    window.location.reload()
  }

let cartDrawer = document.getElementById("cartDrawer")
  console.log(cartDrawer)
let generateDrawer = () => {
    return (cartDrawer.innerHTML =cartDrawer.innerHTML+ basket
      .map((x) => {
        let { id, item } = x
        let search = shopItemsData.find((y) => y.id === id) || []
        return `
          <div class='container'>
            <div class='cartDrawerDetails'>
              <p><img src=${search.img} alt="" />${search.desc}</p>
              <div>${search.price}</div>
              <div>${item}</div>
            </div>
            <div class='erase' onclick="removeItem(${id})">Sterge</div>
          </div>
                `   
}).join(""))
} 
generateDrawer()
let totalAmount = document.getElementById("totalAmount")
console.log(totalAmount)
let TotalAmount = () => {
  if (basket.length !== 0) {
      let amount = basket
          .map((x) => {
              let { item, id } = x
              let search = shopItemsData.find((y) => y.id === id) || []
              
              
      return item * search.price 
  })
  .reduce((x, y) => x + y, 0)
  
  // console.log(amount)
  totalAmount.innerHTML = basket
          .map((x) => {
              let { item, id } = x
              let search = shopItemsData.find((y) => y.id === id) || []
              return `
                  <p>${search.desc}<span>x ${item},</span><span>${search.price*item} Lei</span></p>
                  `
          }).join("")
  totalAmount.innerHTML =  `
    <div class="priceDrawer">
        <h4>Pret curier: 20 Lei</h4>
        <h2>Pret total : ${amount + 20} Lei</h2>
    </div>
    <div class=containerC>
        <button class="checkout">Vezi cosul</button>
    </div>`
  } else return
}

TotalAmount()
  //sortare

const shp =  document.getElementsByClassName('shop')[0]
const buttonsSecond = document.querySelectorAll('[data-second]')
buttonsSecond.forEach(button => {
    button.addEventListener('click', () => {
        const offs = button.dataset.second
        if( offs === 'noutati') { 
            Array.prototype.forEach.call(shp.children, child => {
                if (child.classList.contains('noutatiProduse')){
                    child.classList.remove('noDisplay') 
                    child.classList.add('display')
                }
                else {
                    child.classList.add('noDisplay')
                    child.classList.remove('display')}
                    
        })
    }
        else {
            Array.prototype.forEach.call(shp.children, child => {
                if (child.classList.contains('celeMaiVanduteProduse')){
                    child.classList.remove('noDisplay') 
                    child.classList.add('display')}
                else {
                    child.classList.add('noDisplay')
                    child.classList.remove('display')}
        })}

    })
})



