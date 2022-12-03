const form = document.getElementById('registerForm');

form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {}
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/user',{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(result=>result.json()).then(json=>{
        console.log(json);
        //form.reset()
        if(json.status==="success"){
            window.location.replace('/');
        }       
        else if(json.status=="error"){
            document.getElementById("idMessage").innerHTML = `${json.message} : ${json.payload.data.map( data => data.message)} `;            
        } 
    });
})