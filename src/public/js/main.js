const socket = io();
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));



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







