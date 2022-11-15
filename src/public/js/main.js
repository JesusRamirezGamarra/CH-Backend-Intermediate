
// let socket= io({
//     autoConnect:true
// })
window.onload = function () {
    console.log("function called...");
    // [... document.forms.updateProductForm.elements].forEach(el => el.disabled  = true );
    // fetch('/api/product/',{
    //     method:"GET",
    //     headers:{
    //         // Accept: "application/json",
    //         "Content-Type":"application/json"
    //     }
    // })
    // .then((response) => {
    //     if (response.ok) {  return response.json(); }
    //     return Promise.reject(response); 
    // })    
    // .then(json=>{
    //     if(json.result==="success"){
    //         document.forms.updateProductForm.elements.name.value = json.payload.data.name;
    //         document.forms.updateProductForm.elements.description.value = json.payload.data.description;
    //         document.forms.updateProductForm.elements.price.value = json.payload.data.price;
    //         document.forms.updateProductForm.elements.stock.value = json.payload.data.stock;
    //         document.forms.updateProductForm.elements.thumbnail.value = json.payload.data.thumbnail;
    //         document.images.imageUpdateProduct.src = json.payload.data.thumbnail;
    //         document.getElementById("idMessageUpdateProduct").innerHTML = `${json.message} Found`;            
    //     }
    //     else if(json.result=="error"){
    //         document.forms.updateProductForm.elements.name.value = 'Not Found';
    //         document.forms.updateProductForm.elements.description.value = 'Not Found';
    //         document.forms.updateProductForm.elements.price.value = '',
    //         document.forms.updateProductForm.elements.stock.value = '';
    //         document.forms.updateProductForm.elements.thumbnail.value = 'Not Found';
    //         document.images.imageUpdateProduct.src = json.payload.data.thumbnail;            
    //         document.getElementById("idMessageUpdateProduct").innerHTML = `${json.message} `;                     
    //     }
    // })
    // .catch((response) => {
    //     response.json()
    //     .then( json  => {

    //         document.getElementById("idMessageProduct").innerHTML = `Found 0 product's , try again if the error persists contact support`
    //     })
    // })
    // .finally(() =>{
    //     // [... document.forms.updateProductForm.elements].forEach(el => el.disabled  = false );
    // });         
}




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







