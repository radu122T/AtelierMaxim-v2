let interact = {
    increment(id) {
        let selectedItem = id
        let search = basket.find((x) => x.id === selectedItem.id)
        if (search === undefined ) {
            basket.push({
            id: id,
            item: 1,
            })
        } else {
            search.item += 1
        }
        let flex = () => {cartDrawer.style.display='flex'}
        setTimeout(flex,1)
        
        sessionStorage.setItem("data", JSON.stringify(basket))
        
    },
    
    // window.location.reload()
    
    decrement(id){
        console.log(id)
       
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
        this.calculation()
    },

    calculation() {
        let cartIcon = document.getElementById("cartAmount")
        cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
    },

    
    removeItem(id) {
        let selectedItem = id
        basket = basket.filter((x) => x.id !== selectedItem.id)
        total.totalAmount()
        sessionStorage.setItem("data", JSON.stringify(basket))
        
    }
}