const form = document.getElementById('loginForm');

form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {}
    data.forEach((value,key)=>obj[key]=value);
    // fetch('/api/session/login',{
    fetch('/login/passport',{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(result=>result.json()).then(json=>{
        console.log(json);
        //form.reset()
        if(json.result==="success"){
            window.location.replace('/');
            // window.location.replace('/datos');
        }       
        else if(json.result=="error"){
            document.getElementById("idMessage").innerHTML = `${json.message} : ${json.payload.data.map( data => data.message)} `;            
        } 
    });
})