
let basket = JSON.parse(sessionStorage.getItem("data")) || []
generateShop = {
    shop:document.getElementById("shop"),
    generateShopItems() {
        return (this.shop.innerHTML = shopItemsData
            .map((x) => {
                let { id, display, tip, price, desc, img } = x
                let search = basket.find((x) => x.id === id) || []
                return `
                    <div class="item ${display} ${tip}" id=product-id-${id}>
                        <div>
                            <a href="/produs.html"><img src=${img} alt="produs"></a>
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
      

}
generateShop.generateShopItems()


interact = {
    increment(id) {
        window.location.reload()
        let selectedItem = id
        let search = basket.find((x) => x.id === selectedItem.id)
        if (search === undefined ) {
            basket.push({
            id: selectedItem.id,
            item: 1,
        })
        } else {
            search.item += 1
        }
        let flex = () => {cartDrawer.style.display='flex'}
        setTimeout(flex,1)
        this.update(selectedItem.id)
        sessionStorage.setItem("data", JSON.stringify(basket))
    },
    
    decrement(id) {
        window.location.reload()
        let selectedItem = id
        let search = basket.find((x) => x.id === selectedItem.id)
        if (search === undefined) return
        else if (search.item === 0) return
        else {
            search.item -= 1
        }
        
        this.update(selectedItem.id)
        basket = basket.filter((x) => x.item !== 0)
        sessionStorage.setItem("data", JSON.stringify(basket))
    },

    update(id) {
        let search = basket.find((x) => x.id === id)
        document.getElementById(id).innerHTML = search.item
        calculation()
    },

    calculation() {
        let cartIcon = document.getElementById("cartAmount")
        cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
    },
    
    removeItem(id){
        window.location.reload()
        let selectedItem = id
    
        basket = basket.filter((x) => x.id !== selectedItem.id)
        total.totalAmount()
        sessionStorage.setItem("data", JSON.stringify(basket))
        
      }
    
}


interact.calculation()

generateCartDrawer = {
    cartDrawer : document.getElementById("cartDrawer"),
    generateDrawer(){
    return (cartDrawer.innerHTML =cartDrawer.innerHTML+ basket
        .map((x) => {
            let { id, item } = x
            let search = shopItemsData.find((y) => y.id === id) || []
            return `
                <div class='container'>
                    <div class='cartDrawerDetails'>
                        <p><img src=${search.img} alt="" />${search.desc}</p>
                        <div>${search.price}</div>
                        <div class="drawerQuantity">
                        <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                        <div class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="fa-solid fa-plus"></i></div>
                    </div>
                    <div class='erase' onclick="removeItem(${id})">Sterge</div>
                </div>
                `   
    }).join(""))
    },
    cartDrawerDisplay() {if (basket.length!=0) {cartDrawer.style.display='flex'}} 
}

generateCartDrawer.generateDrawer()


total = {
    totalAmount: document.getElementById("totalAmount"),
    totalAmount (){
        if (basket.length !== 0) {
            let amount = basket
                .map((x) => {
                    let { item, id } = x
                    let search = shopItemsData.find((y) => y.id === id) || []
            return item * search.price 
        })
        .reduce((x, y) => x + y, 0)
        this.totalAmount.innerHTML = basket
                .map((x) => {
                    let { item, id } = x
                    let search = shopItemsData.find((y) => y.id === id) || []
                    return `
                        <p>${search.desc}<span>x ${item},</span><span>${search.price*item} Lei</span></p>
                        `
                }).join("")

        this.totalAmount.innerHTML =  `
            <div class="priceDrawer">
                <h4>Pret curier: 20 Lei</h4>
                <h2>Pret total : ${amount + 20} Lei</h2>
            </div>
            <div class=containerC>
                <a href="/cart.html" class="checkout">Vezi cosul</a>
            </div>`
        } else return
    }
}


total.totalAmount()

let drawerButton = document.getElementById('closeDrawer')

closeDrawer = {
    button () {
        drawerButton.addEventListener('click', () => {
            cartDrawer.style.display='none'
        })
    },
    
    esc () {
        document.addEventListener('keydown', function(event){
        if(event.key === "Escape"){
        cartDrawer.style.display = 'none'
    }
    })},

    outside(){
        document.addEventListener('click', (event) => {
        const withinBoundaries = event.composedPath().includes(cartDrawer)
        if (!withinBoundaries) {
            cartDrawer.style.display = 'none'
    }})}
}




sortInter = {
    shop:document.getElementsByClassName('shop')[0],
    buttonsSecond: document.querySelectorAll('[data-second]'),
    inter() {
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
                })
            }
        })
    })
}}


