var language = document.querySelector(".language");
language.addEventListener('click',idioma);

function idioma(){
    let id=language.checked;
  
    if (id==true){
      location.href="es/index.html"
    } else {
      location.href="index.html"
    }
  }