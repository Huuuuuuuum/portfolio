/*-----------------------------------------*/
/*-------------------DATA------------------*/
/*-----------------------------------------*/

const des = {
    data: {
        description:"Gestion des données",
        list: [
            {"SQL" : "","level":4},
            {"PL/SQL" : "","level":4},
            {"MySQL" : "","level":3}, 
            {"MariaDB" : "","level":2}, 
            {"MongoDB" : "","level":2},
            {"DataWarehouse" : "","level":2},
        ]
    },
    dev: {
        description:"Réalisation et optimisation d'application web et logicielle",
        list: [
            {"JavaScript" : "","level":3},
            {"HTML 5" : "","level":3},
            {"CSS 3" : "","level":3},
            {"PHP": "","level":4},
            {"Symfony" : "","level":2},
            {"C" : "","level":3},
            {"Java" : "","level":4},
            {"Python" : "","level":4},
            {"Langchain" : "","level":3},
            {"Ollama" : "","level":3},
        ]
    },
    project: {
        description:"Travail d'équipe et gestion de projet",
        list: [
            {"GitLab" : "","level":3},
            {"GitHub" : "","level":2},
            {"Gantt" : "","level":3},
            {"Kanban" : "","level":2},
            {"SCRUM" : "","level":3},
        ]
    }
}

const level = {
    "1":"#2e3938",
    "2":"#357671",
    "3":"#76cec7",
    "4":"#00ffea",
}

/*-----------------------------------------*/
/*----------------VARIABLES----------------*/
/*-----------------------------------------*/

/*----Aside----*/
var aside = document.getElementsByTagName("ASIDE")[0];
var aside_retract = document.getElementById("aside_left");
var main = document.getElementsByTagName("MAIN")[0];
var aside_retracted = false;


/*----Compétences----*/
var description = document.getElementsByClassName("competences_descriptions")[0];
var circles = document.getElementsByClassName("competence_circle");
var circle_selected = circles[0];

/*----Projet----*/
var left_arrow = document.getElementById("left_arrow");
var right_arrow = document.getElementById("right_arrow"); 
var slider = document.getElementsByClassName("slider_images")[0];
let slider_images = document.getElementsByClassName("slider_image");

/*-----------------------------------------*/
/*------------EVENTS LISTENERS-------------*/
/*-----------------------------------------*/

aside_retract.addEventListener("click", (event)=>{
    if (aside_retracted) {
        aside_retracted = false;
        aside_retract.innerHTML=">"
        main.style.width = "100%";
    }
    else {
        aside_retracted = true;
        aside_retract.innerHTML="<"
        main.style.width = "calc(100vw - 2em)";
    }
   
})

for (let circle of circles) {
    console.log(circle.id);
    if (circle.id != "") {
        circle.addEventListener("click", (event)=>{
            if (circle_selected != null) {
                circle_selected.classList.toggle("competence_circle_selected");
            }
            if (circle_selected == event.target || circle_selected == event.target.parentElement) {
                circle_selected = null;
            }
            else{
                if (event.target.classList.contains("competence_circle")) {
                    circle_selected = event.target;
                }
                else {
                    circle_selected = event.target.parentElement;
                }
                circle_selected.classList.toggle("competence_circle_selected")
                competence_description();
            }  
        
        })
    }
   
}

left_arrow.addEventListener("click", slide);
right_arrow.addEventListener("click", slide);
window.addEventListener("resize", resize_image);


function resize_image (event) {

    new_left =  String(-offset*ratio*100) + "vw";
    console.log(new_left)
    for (let image of slider_images) {
        image.style.left = new_left;
    }

}

function slide (event) {

    image_width_px = Number((getComputedStyle(slider_images[0]).getPropertyValue("width")).replace("px",""));
    image_width = ratio * 100;

    current_left = getComputedStyle(slider_images[0]).getPropertyValue("left");
    current_left = current_left.replace("px", "");       
    let a = Number(current_left) / image_width_px;
   
    if (Number.isInteger(a) || a.toFixed(1) == parseFloat(parseInt(a))) {

        if (event.target == left_arrow) {

            offset -=1;  
            if (offset == -1) {
                offset = number_images-1;
                new_left = String((number_images-1)*(-image_width)) + "vw";
            }
            else {
                new_left = "calc(" + current_left + "px + " + String(image_width) + "vw)"
            }
            for (let image of slider_images) {
                image.style.left = new_left;
            }

        }   

        if (event.target == right_arrow) {
            offset +=1; 
            if (offset == number_images) {
                offset = 0;
                
                new_left = "0px";   
            }
            else {
                new_left = "calc(" + current_left + "px + -" + String(image_width) + "vw)";
            }
            for (let image of slider_images) {
                image.style.left = new_left;
            } 
        }
    }
}

/*-----------------------------------------*/
/*----------------FUNCTIONS----------------*/
/*-----------------------------------------*/


function competence_description() {
    description.innerHTML='';
    for (let circle of circles) {
        if (circle.classList.contains("competence_circle_selected")) {
            first_des = document.createElement("h3");
            first_des.innerText  = des[circle.id]["description"];
            description.appendChild(first_des);

            list = document.createElement("ul");
            list.classList.toggle("competences_list");

            for (let item of des[circle.id]["list"]) {
                list_item = document.createElement("li");
                list_item.innerHTML = Object.keys(item)[0];
                
                level_circle = document.createElement("div");
                level_circle.classList.toggle("competences_levels_circle");
                level_circle.style.backgroundColor = level[item["level"]];
            
                list.appendChild(list_item);
                list.appendChild(level_circle);
            }
            description.appendChild(list);

        }
        
    }
}


function get_number_images() {
    let i = 0;
    for (let image of slider_images) {
        i++;
    }

    return i;
}

/*-----------------------------------------*/
/*--------------------MAIN-----------------*/
/*-----------------------------------------*/




competence_description();
var number_images = get_number_images();
var offset = 0;
var ratio = Number((getComputedStyle(slider_images[0]).getPropertyValue("width")).replace("px","")) / Number(window.innerWidth);