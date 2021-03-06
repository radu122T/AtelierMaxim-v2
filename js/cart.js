let basket = JSON.parse(sessionStorage.getItem("data")) || []

generateCart = {
    shoppingCart : document.getElementById("shopping-cart"),
    label : document.getElementById("label"),
    generateCartItems() {
        if (basket.length !== 0) {
            return (this.shoppingCart.innerHTML = basket
                .map((x) => {
                    let { id, item } = x
                    let search = shopItemsData.find((y) => y.id === id) || []
                    return `
                        <div class="cart-item">
                                <div class=cartImg>
                                    <img src=${search.img} alt="" />
                                    <i onclick="interact.removeItem(${id})" class="fa-solid fa-xmark" id="firstx"></i>
                                </div>
                                
                            <div class="details">
                                <div class="title-price-x">
                                    <p>${search.desc}</p>
                                </div>
    
                                <div class="buttons">
                                    <span>Cantitate: </span>
                                    <i onclick="interact.decrement(${id})" class="fa-solid fa-minus"></i>
                                    <div id=${id} class="quantity">${item}</div>
                                    <i onclick="interact.increment(${id})" class="fa-solid fa-plus"></i>
                                </div>
                                <h3> ${item * search.price} lei</h3>
                                
                            </div>
                            <i onclick="interact.removeItem(${id})" class="fa-solid fa-xmark" id="secondx"></i>
                        </div>
                            `   
            }).join(""))
        } else {
            this.shoppingCart.innerHTML = ``
            this.label.innerHTML = `
            <h2>Nu aveti nimic in cos</h2>
            <a href="index.html">
                <button class="HomeBtn">Inapoi la prima pagina</button>
            </a>
            `
        }
    }
}

interact={
    increment(id) {
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
    
    generateCart.generateCartItems()
        this.update(selectedItem.id)
        sessionStorage.setItem("data", JSON.stringify(basket))
    },

    decrement(id){
        let selectedItem = id
        let search = basket.find((x) => x.id === selectedItem.id)
    
        if (search === undefined) return
        else if (search.item === 0) return
        else {
        search.item -= 1
    }
        this.update(selectedItem.id)
        basket = basket.filter((x) => x.item !== 0)
        generateCart.generateCartItems()
        sessionStorage.setItem("data", JSON.stringify(basket))
    },
    
    update(id){
        let search = basket.find((x) => x.id === id)
      // console.log(search.item)
        document.getElementById(id).innerHTML = search.item
        this.calculation()
        total.totalAmount()
    },
    
    removeItem(id){
        let selectedItem = id
      // console.log(selectedItem.id)
        basket = basket.filter((x) => x.id !== selectedItem.id)
        generateCart.generateCartItems()
        total.totalAmount()
        sessionStorage.setItem("data", JSON.stringify(basket))
        if (basket.length===0)
        window.location.reload()
    },
    
    clearCart(){
        basket = []
        generateCart.generateCartItems()
        sessionStorage.setItem("data", JSON.stringify(basket))
    },
    calculation(){
        let cartIcon = document.getElementById("cartAmount")
        cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
    }
    
}

total = {
    totalAmount() {
        if (basket.length !== 0) {
            let amount = basket
                .map((x) => {
                    let { item, id } = x
                    let search = shopItemsData.find((y) => y.id === id) || []
                    
                    
            return item * search.price 
        })
        .reduce((x, y) => x + y, 0)
        
        // console.log(amount)
        generateCart.label.innerHTML = basket
                .map((x) => {
                    let { item, id } = x
                    let search = shopItemsData.find((y) => y.id === id) || []
                    return `
                        <p>${search.desc}<span>x ${item},</span><span>${search.price*item} Lei</span></p>
                        `
                }).join("")
            generateCart.label.innerHTML = generateCart.label.innerHTML + `
        <h3> Produse </h3>
        <h4>Pret curier Rapid: 20 Lei</h4>
        <h2>Pret total : ${amount + 20} Lei</h2>
        <div class=containerC>
            <button class="checkout">Plata cu cardul</button>
        </div>`
    
        } else return
    }
}

facturare = {
    cb: document.querySelector('#fac'),
    fact() {
        this.cb.addEventListener('change', ()=> {
        if(!cb.checked){
            document.querySelector('.payment').style.display = "block"}
        else {
            document.querySelector('.payment').style.display = "none"
        }
    })},
    shippingReload() {
        if (basket.length===0) {
            document.querySelector('.shipping').style.display="none"
        }
        else {
            document.querySelector('.shipping').style.display="block"
        }},
    reload() { 
            window.location.reload
        }
}


let main = ()=> {
    generateCart.generateCartItems()
    total.totalAmount()
    interact.calculation()
    facturare.fact()
    facturare.shippingReload()

}

main()

if (basket.length===0) {
    facturare.reload()
}