//sortare

const thirdSection =  document.getElementsByClassName('thirdSection')[0]
const buttonsSecond = document.querySelectorAll('[data-second]')
buttonsSecond.forEach(button => {
    button.addEventListener('click', () => {
        const offs = button.dataset.second
        if( offs === 'noutati') { 
            Array.prototype.forEach.call(thirdSection.children, child => {
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
            Array.prototype.forEach.call(thirdSection.children, child => {
                if (child.classList.contains('celeMaiVanduteProduse')){
                    child.classList.remove('noDisplay') 
                    child.classList.add('display')}
                else {
                    child.classList.add('noDisplay')
                    child.classList.remove('display')}
        })}

    })
})


// + - items on products

const quantButton = document.querySelectorAll(".quantityButton")
console.log(quantButton)
quantButton.forEach(button => button.addEventListener("click", iter)) 
function iter(evt) {
    let oldValue = this.nextElementSibling
    if (!oldValue) 
        oldValue = this.previousElementSibling

    if(evt.target.classList.contains('plus'))
        if (oldValue.value>98)
            oldValue.value===98
        else{
            oldValue.value++
        }
        
    else if (oldValue.value>1) 
        oldValue.value--
    else
        oldValue.value = 1
}
