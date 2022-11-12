const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
let addProductForm = document.getElementById('addProductForm')
const handleAddProductSubmit = (evt,form,route) =>{
    evt.preventDefault()
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value,key)=>obj[key]=value);
    fetch(route,{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res =>res.json())
    .then(json=>console.log(json));
}
addProductForm.addEventListener('submit',(e)=>handleAddProductSubmit(e,e.target,'/api/product'))
let updateProductForm = document.getElementById('updateProductForm')
const handleUpdateProductSubmit = (evt,form,route) =>{
    evt.preventDefault()
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value,key)=>obj[key]=value);
    fetch(route,{
        method:"PUT",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res =>res.json())
    .then(json=>console.log(json));
}
updateProductForm.addEventListener('submit',(e)=>handleUpdateProductSubmit(e,e.target,'/api/product'))
let findProduct = document.getElementById('id')
const handleFindProductSubmit = (evt,form,route) =>{
    // evt.preventDefault()
    // let formData = form.value
    // let obj = {};
    // formData.forEach((value,key)=>obj[key]=value);
    fetch(route+form.value,{
        method:"GET",
        // body:JSON.stringify(obj),
        headers:{
            // Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
    // .then(response=>{
    //     console.log(response.status)
    //     return response;
    // })
    // .then(result=> { 
    //     console.log(result)
    //     if( result.status =='404') thows 
    //     else return result.json()
    // })
    .then((response) => {
        if (response.ok) {  return response.json(); }
        return Promise.reject(response); 
    })    
    .then(json=>{
        if(json.status==="success"){
            // console.log(json);
            document.forms.updateProductForm.elements.name.value = json.payload.data.name;
            document.forms.updateProductForm.elements.description.value = json.payload.data.description;
            document.forms.updateProductForm.elements.price.value = json.payload.data.price;
            document.forms.updateProductForm.elements.stock.value = json.payload.data.stock;
            document.forms.updateProductForm.elements.thumbnail.value = json.payload.data.thumbnail;
            document.images.imageUpdateProduct.src = json.payload.data.thumbnail;

        }       
        else if(json.status=="error"){
            document.getElementById("idMessageUpdateProduct").innerHTML = `${json.message} : ${json.payload.data.map( data => data.message)} `;            
        } 
    })
    .catch((response) => {
        console.log(response.status, response.statusText);
        response.json()
        .then( json  => {
            console.log(json);
            document.forms.updateProductForm.elements.name.value = 'Not Fount';
            document.forms.updateProductForm.elements.description.value = 'Not Fount';
            document.forms.updateProductForm.elements.price.value = 'Not Fount';
            document.forms.updateProductForm.elements.stock.value = 'Not Fount';
            document.forms.updateProductForm.elements.thumbnail.value = json.payload.data.thumbnail;
            document.images.imageUpdateProduct.src = json.payload.data.thumbnail;            
        })
    });    
    
}
findProduct.addEventListener('blur',(e)=>handleFindProductSubmit(e,e.target,'/api/product/'))




let socket= io({
    autoConnect:true
})
socket.on('lista',data=>{
    let log = "";// document.getElementById('lista');
    let list = "";
    Array.from(data).forEach(product => {
        if(!product.id) return ''
        list = list+`
    <tr>
        <th scope="row">${product.id}</th>
        <td>${product.code} </td>
        <td>${product.name} </td>
        <td>${product.description} </td>
        <td>${product.price} </td>
        <td>${product.stock} </td>
        <td> <img src="${product.thumbnail}" alt="El enlace no esta disponible" width="60"></td>    
        <td><button type="submit" formaction="/api/carts/products/${product.id}"> +1 </button></td> 
    </tr>`
    });
    console.log(list);
    //log.innerHTML = list;
    //document.getElementById("productosForm").reset()
})