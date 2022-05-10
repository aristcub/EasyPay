const language = document.querySelector(".language");
language.addEventListener("click", () => {
  let id = language.checked;

  if (id == true) {
    location.href = "es/index.html";
  }
});
