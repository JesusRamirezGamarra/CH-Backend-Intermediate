let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');
let buyThings = [];
let totalCard = 0;
let countProduct = 0;
const searchForm = document.getElementById('searchForm');


searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(document.forms.searchForm.q.value.trim())
        window.location.replace('/api/product/search/'+ document.forms.searchForm.q.value.trim());


    // const term = document.forms.searchForm.q.value.trim()
    // if (term){
    //     const data = new FormData(searchForm);
    //     // const obj = {}
    //     // data.forEach((value,key)=>obj[key]=value);
    //     // fetch('/api/session/login',{
    //     let formData = new FormData(searchForm);
    //     let obj = {};
    //     formData.forEach((value,key)=>obj[key]=value);
    //     fetch('/api/product/search/' + term,{
    //         method:"GET",
    //         // body:JSON.stringify(obj),
    //         headers:{
    //             "Content-Type":"application/json"
    //         }
    //     })
    //     .then(result=>result.json()).then(json=>{
    //         console.log(json);
    //         // form.reset()
    //         // if(json.result==="success"){
    //         //     window.location.replace('/');
    //         //     // window.location.replace('/datos');
    //         // }       
    //         // else if(json.result=="error"){
    //         //     document.getElementById("idMessage").innerHTML = `${json.message} : ${json.payload.data.map( data => data.message)} `;            
    //         // } 
    //     });
    // }        
})
showCart = () => document.getElementById("products-id").style.display = "block";
closeBtn = () => document.getElementById("products-id").style.display = "none";
addProduct = (domumentItemProduct) =>{
    const infoProduct = {
        image: domumentItemProduct.parentElement.querySelector('div img').src,
        title: domumentItemProduct.parentElement.querySelector('h3').textContent,
        price: domumentItemProduct.parentElement.querySelector('p').textContent.split(' ')[1],
        id: domumentItemProduct.parentElement.dataset.id,
        fyh: new Date().getTime(),
        amount: 1
    }    
    readTheContent(infoProduct);    
}
deleteProduct = (domumentItemProduct) =>{
    const deleteId = domumentItemProduct.dataset.id
    buyThings.forEach(value => {
        if (value.id == deleteId) {
            let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
            totalCard =  totalCard - priceReduce;
            totalCard = totalCard.toFixed(2);
        }
    });
    buyThings = buyThings.filter(product => product.id !== deleteId);
    countProduct--;
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}
readTheContent = (infoProduct) =>{
    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);
    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                product.fyh =  new Date().getTime();
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings,infoProduct]
        countProduct++;
    }
    loadHtml();
}
loadHtml = () =>{
    clearHtml();
    buyThings = buyThings.sort(function(a,b){
        return  new Date(b.fyh) - new Date(a.fyh);
    });
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="${title}">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">$ ${price}</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}" onclick="deleteProduct(this)">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                </path>
                </svg>            
            </span>
        `;        
        containerBuyCart.appendChild(row);
        priceTotal.innerHTML = totalCard;
        amountProduct.innerHTML = countProduct;
    });
}
clearHtml = () =>containerBuyCart.innerHTML = '';



// // // let socket= io({
// // //     autoConnect:true
// // // })
// window.onload = function () {
//     // console.log("function called...");
//     // [... document.forms.updateProductForm.elements].forEach(el => el.disabled  = true );
//     fetch('/api/product/',{
//         method:"GET",
//         headers:{
//             // Accept: "application/json",
//             "Content-Type":"application/json"
//         }
//     })
//     .then((response) => {
//         if (response.ok) {  return response.json(); }
//         return Promise.reject(response); 
//     })    
//     // .then(json=>{
//     //     if(json.result==="success"){
//     //         // document.getElementById("idMessageUpdateProduct").innerHTML = `${json.message} Found`;            
//     //     }
//     //     else if(json.result=="error"){
//     //         // document.getElementById("idMessageUpdateProduct").innerHTML = `${json.message} `;                     
//     //     }
//     // })
//     // .catch((response) => {
//     //     response.json()
//     //     .then( json  => {
//     //         // document.getElementById("idMessageProduct").innerHTML = `Found 0 product's , try again if the error persists contact support`
//     //     })
//     // })
//     .finally(() =>{
//         // [... document.forms.updateProductForm.elements].forEach(el => el.disabled  = false );
//     });         
// }




// socket.on('lista',data=>{
//     let log = "";// document.getElementById('lista');
//     let list = "";
//     Array.from(data).forEach(product => {
//         if(!product.id) return ''
//         list = list+`
//     <tr>
//         <th scope="row">${product.id}</th>
//         <td>${product.code} </td>
//         <td>${product.name} </td>
//         <td>${product.description} </td>
//         <td>${product.price} </td>
//         <td>${product.stock} </td>
//         <td> <img src="${product.thumbnail}" alt="El enlace no esta disponible" width="60"></td>    
//         <td><button type="submit" formaction="/api/carts/products/${product.id}"> +1 </button></td> 
//     </tr>`
//     });
//     console.log(list);
//     //log.innerHTML = list;
//     //document.getElementById("productosForm").reset()
// })

// let deleteForm = document.getElementById('deleteForm')
// const deleteSubmit = async(evt,form,route) =>{
//     evt.preventDefault()
//     let formData = new FormData(form);
//     let obj = {};
//     formData.forEach((value,key)=>obj[key]=value);
//     fetch(route,{
//         method:"DELETE",
//         body:JSON.stringify(obj),
//         headers:{
//             "Content-Type":"application/json"
//         }
//     }).then(res =>res.json()).then(json=>console.log(json));
//     await sleep(900)
//     window.location.href = "http://localhost:8080/"
// }
// deleteForm.addEventListener('submit',(e)=>deleteSubmit(e,e.target,'/api/products'))







