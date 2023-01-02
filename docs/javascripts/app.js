const hamburgerButton = document.getElementById('hamborgir')
const lol=document.getElementById('navbarRightAlignExample')
const navList = document.getElementById('nav-list')

function toggleButton() {
    hamburgerButton.setAttribute("aria-expanded","false")
    hamburgerButton.setAttribute("class","navbar-toggler collapsed")
    // navList.classList.toggle('show')

    // lol.setAttribute("class","navbar-collapse collapsing")
    lol.setAttribute("class","navbar-collapse collapse")

    console.log("called")
}


// // let bg = document.getElementById("bg")
// let moon = document.getElementById("moon")
// let mountain = document.getElementById("mountain")
// let road = document.getElementById("road")

// window.addEventListener('scroll',function(){
//     var value = window.scrollY;

//     // bg.style.top= value*0.5+'px';
//     // moon.style.transform='translateY('+ value*(-0.5)+'px)';
//     moon.style.left= -value*0.5+'px';
//     mountain.style.top= -value*0.1+'px';
//     road.style.top= value*0.3+'px';

// })