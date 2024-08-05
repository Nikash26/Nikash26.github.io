
let listProductHTML = document.querySelector('.list');
let listCartHTML = document.querySelector('.item');
let iconCart = document.querySelector('.icon');
let iconCartSpan = document.querySelector('.icon span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

function placed()
{
    alert("Your order has been placed");
}

    
    iconCart.addEventListener('click', () => {
        body.classList.toggle('show');
    })
    closeCart.addEventListener('click', () => {
        body.classList.toggle('show');
    })

const addDataToHTML = () => {

    if(products.length > 0) 
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('it');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="" class="im">
            <h2>${product.name}</h2>
            <div class="price">₹${product.price}</div>
            <button class="add">Add to Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
}


        const addToCart = (product_id) => {
            let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
            if(cart.length <= 0){
                cart = [{
                    product_id: product_id,
                    quantity: 1
                }];
            }else if(positionThisProductInCart < 0){
                cart.push({
                    product_id: product_id,
                    quantity: 1
                });
            }else{
                cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
            }
            addCartToHTML();
            addCartToMemory();
        }
   
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="imm">
                    <img src="${info.image}">
                </div>
                <div class="na">
                ${info.name}
                </div>
                <div class="tot">₹${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})


const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}



    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('add')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
    
    
    const initApp = () => {
        fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();
        })
    }
    
initApp();