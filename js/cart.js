let label = document.getElementById("label")
let ShoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(sessionStorage.getItem("data")) || []

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

calculation()

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (ShoppingCart.innerHTML = basket
            .map((x) => {
                let { id, item } = x
                let search = shopItemsData.find((y) => y.id === id) || []
                return `
                    <div class="cart-item">
                            <div class=cartImg>
                                <img src=${search.img} alt="" />
                                <i onclick="removeItem(${id})" class="fa-solid fa-xmark" id="firstx"></i>
                            </div>
                            
                        <div class="details">
                            <div class="title-price-x">
                                <p>${search.desc}</p>
                            </div>

                            <div class="buttons">
                                <span>Cantitate: </span>
                                <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                                <div id=${id} class="quantity">${item}</div>
                                <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                            </div>
                            <h3> ${item * search.price} lei</h3>
                            
                        </div>
                        <i onclick="removeItem(${id})" class="fa-solid fa-xmark" id="secondx"></i>
                    </div>
                        `   
        }).join(""))
    } else {
        ShoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Nu aveti nimic in cos</h2>
        <a href="index.html">
            <button class="HomeBtn">Inapoi la prima pagina</button>
        </a>
        `
    }
}

generateCartItems()

let increment = (id) => {
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) {
    basket.push({
        id: selectedItem.id,
        item: 1,
    })
} else {
    search.item += 1
}

    generateCartItems()
    update(selectedItem.id)
    sessionStorage.setItem("data", JSON.stringify(basket))
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
    generateCartItems()
    sessionStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
    let search = basket.find((x) => x.id === id)
  // console.log(search.item)
    document.getElementById(id).innerHTML = search.item
    calculation()
    TotalAmount()
}

let removeItem = (id) => {
    let selectedItem = id
  // console.log(selectedItem.id)
    basket = basket.filter((x) => x.id !== selectedItem.id)
    generateCartItems()
    TotalAmount()
    sessionStorage.setItem("data", JSON.stringify(basket))
    if (basket.length===0)
    window.location.reload()
}

let clearCart = () => {
    basket = []
    generateCartItems()
    sessionStorage.setItem("data", JSON.stringify(basket))
}

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
    label.innerHTML =label.innerHTML + basket
            .map((x) => {
                let { item, id } = x
                let search = shopItemsData.find((y) => y.id === id) || []
                return `
                    <p>${search.desc}<span>x ${item},</span><span>${search.price*item} Lei</span></p>
                    `
            }).join("")
    label.innerHTML = label.innerHTML + `<h4>Pret curier Rapid: 20 Lei
    <h2>Pret total : ${amount + 20} Lei</h2>
    <div class=containerC>
        <button class="checkout">Plata cu cardul</button>
    </div>`

    } else return
}

TotalAmount()


let cb = document.querySelector('#fac')
cb.addEventListener('change', ()=> {
    if(!cb.checked){
        document.querySelector('.payment').style.display = "block"}
    else {
        document.querySelector('.payment').style.display = "none"
    }
})

let shippingReload = () => {
    if (basket.length===0) {
        document.querySelector('.shipping').style.display="none"
    }
    else {
        document.querySelector('.shipping').style.display="block"
    }
}

shippingReload()

