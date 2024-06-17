var aside = document.getElementsByTagName("ASIDE")[0];
var aside_retract = document.getElementById("aside_left");
var main = document.getElementsByTagName("MAIN")[0];

var aside_retracted = false;

aside_retract.addEventListener("click", (event)=>{
    if (aside_retracted) {
        main.style.width = "100%";
        aside_retracted = false;
    }
    else {
        main.style.width = "calc(100vw - 2em)";
        aside_retracted = true;
    }
   
})