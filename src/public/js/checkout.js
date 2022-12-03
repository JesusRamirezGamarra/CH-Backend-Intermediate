sumar = () => {
    // const $total = document.getElementById('total').innerHTML;
    let subtotal = 0;
    [ ...document.getElementsByClassName( "montoProducto" ) ].forEach(  ( element ) =>{
        if(element.innerHTML !== '') subtotal += parseFloat(element.innerHTML);
    });
    //$total.innerHTML = subtotal;
    document.getElementById('total').innerHTML = subtotal;
}
sumar();