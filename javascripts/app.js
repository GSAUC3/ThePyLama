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

