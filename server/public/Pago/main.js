async function getSaldo(id){

    return fetch(`http://localhost:3000/saldo/${id}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => saldoActual = parseInt(data.saldo) || 0);
}
function sumaSaldo(saldo){
    const saldoActual = await getSaldo(id);
    return saldoActual+saldo;
}

function recarga(){
    const id = document.getElementById('id').value;
    const saldoNuevo = document.getElementById('saldo').value;
    
    
    fetch('http://localhost:3000/actSaldo', {
        method: "post",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Connection': 'keep-alive',
            'Accept': '*',
        },
        body: JSON.stringify({saldoNuevo, id}),
    });
}
