let shop = document.getElementById("shop")

let basket = JSON.parse(localStorage.getItem("data")) || []

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
  
    localStorage.setItem("data", JSON.stringify(basket))
    
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
    localStorage.setItem("data", JSON.stringify(basket))
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



