let saldoActual;

function getTransactions() {
const id = document.getElementById("userId").value;

fetch("http://localhost:3000/transacciones", {
    method: "POST",
    headers: {
    "Content-Type": "application/json; charset=utf-8",
    Connection: "keep-alive",
    Accept: "*",
    },
    body: JSON.stringify({ id }),
})
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function doTransaction() {
  const id = document.getElementById("userId").value;
  const saldo = document.getElementById("saldo").value;

  fetch("http://localhost:3000/transaccion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Connection: "keep-alive",
      Accept: "*",
    },
    body: JSON.stringify({ id, saldo }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function signIn(event) {
  const userId = event.elements.userId.value;

  fetch(`http://localhost:3000/users/${userId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) console.log("User not found / Verify your credentials");
      else {
        sessionStorage.setItem("user", JSON.stringify(data[0]));
        location.href = "./../Home/index.html";
      }
    });
}

window.load = () => {
  const form = document.getElementById("loginForm");
  function handleForm(event) {
    event.preventDefault();
  }
  form.addEventListener("submit", handleForm);
};
//recargar----------------------------------
function recarga() {
  const id = document.getElementById("id").value;
  const saldo = document.getElementById("saldo").value;

  fetch("http://localhost:3000/actSaldo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Connection: "keep-alive",
      Accept: "*",
    },
    body: JSON.stringify({ saldo, id }),
  }).then((data) => {
    if (data.message) console.log("User not found / Verify your credentials");
    else {
      location.href = "./../Home/index.html";
    }
  });
}

//pagar parqueadero--------------------------------------------
async function getSaldo(id) {
  return fetch(`http://localhost:3000/saldo/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => (saldoActual = parseInt(data.saldo) || 0));
}

async function pagar() {
  const time = document.getElementById("time").value;
  const vehicle = document.getElementById("vehicle").value;
  var rate = 0;
  if (vehicle == "car") {
    rate = 500;
  } else {
    rate = 200;
  }
  
  total = rate * time;

  const userData = JSON.parse(sessionStorage.getItem("user"));
  const id = userData.id;
  let saldo = await getSaldo(id);

  if (saldo >= total) {
    fetch("http://localhost:3000/transaccion", {
      method: "POST",
      body: JSON.stringify({ id, saldo: -total }),
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      if (data.message) console.log("User not found / Verify your credentials");
      else {
        const balance = document.querySelector(".balance");
        balance.innerHTML = "$ " + (saldo - total);
        const routes = document.querySelectorAll(".route");
        closePopUp();
        const times = document.getElementById("time");
        times.value = "0";

        routes.forEach((route) => {
          if (route.dataset.route === "") route.firstChild.click();
        });
      }
    });
  } else {
    window.alert("no tienes dinero suficiente");
  }
}


function closePopUp() {
    const popUp = document.querySelector(".pop-up");
    popUp.classList.remove("active")
}

function openPopUp() {
    const popUp = document.querySelector(".pop-up");
    popUp.classList.add("active")
}