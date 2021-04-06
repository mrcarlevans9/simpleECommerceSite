let cart= document.querySelectorAll('.add__button');
let products=[
    {
        name: 'Bay Rum',
        tag: 'beardOil1',
        price: 10,
        inCart:0
    },
    {
        name: 'Sandalwood',
        tag: 'beardOil2',
        price: 10,
        inCart:0
    },
    {
        name: 'Citrus',
        tag: 'beardOil3',
        price: 10,
        inCart:0
    },
    {
        name: 'Bay Rum',
        tag: 'beardBalm-main1',
        price: 10,
        inCart:0
    },
    {
        name: 'Sandalwood',
        tag: 'beardBalm-main2',
        price: 10,
        inCart:0
    },
    {
        name: 'Citrus',
        tag: 'beardBalm-main3',
        price: 10,
        inCart:0
    }
];

for(let i=0; i<cart.length; i++) {
    cart[i].addEventListener('click',()=>{
        cartNumbers(products[i])
        totalCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers=parseInt(productNumbers);
    if (productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1)
        document.querySelector('.cart span').textContent =productNumbers+1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent =1;
    }
   
    setItems(product);
    

}

function setItems(product){
    let cartItems=localStorage.getItem('productsInCart');
       cartItems=JSON.parse(cartItems);
     
   
     if(cartItems !=null){
        if(cartItems[product.tag] ==undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
            
        }
        cartItems[product.tag].inCart+=1;
    }else{
         product.inCart=1;
     cartItems={
        [product.tag]:product
    }
   
    }
    
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}

function totalCost(product){
    
    let cartCost=localStorage.getItem('totalCost');
    
  
    

    if(cartCost!=null){
        cartCost=parseInt(cartCost)
        localStorage.setItem("totalCost",cartCost + product.price)
    }else{
     localStorage.setItem('totalCost',product.price);   
    }

}
function displayCart(){
    let cartItems= localStorage.getItem('productsInCart')
    
    cartItems=JSON.parse(cartItems);
    
    console.log(cartItems)
    
    
    let productContainer = document.querySelector(".cart__products");
    
    if(cartItems&&productContainer ){
        
        productContainer.innerHTML='';
        
        Object.values(cartItems).map(item=>{
            productContainer.innerHTML+=
            `
            <div class="cart__product">
                <i class="fas fa-times-circle"></i>
                <img src="./img/${item.tag}.jpg" class="cart__img">
                <span>${item.name}</span>
                </div>
               
                <div class="price">
                ${item.price}
                </div>
               
                <div class="quantity">
                <i class="fas fa-arrow-circle-left"></i>
                <span>${item.inCart}</span>
                <i class="fas fa-arrow-circle-right"></i>

                </div>
                <div class="total">${item.inCart*item.price}</div>
            
            `
        })


    }
}
onLoadCartNumbers();
displayCart();