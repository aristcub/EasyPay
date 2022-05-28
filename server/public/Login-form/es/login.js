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
          location.href = "../../Home/es/index.html";
        }
      });
  }