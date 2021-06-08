const anim = document.getElementById("front-anim")

lottie.loadAnimation({
    container: anim, // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../images/data.json' // the path to the animation json
});

var Scrollbar = window.Scrollbar;
//might need to change this to main because mobiles may ignore body tags
Scrollbar.init(document.querySelector('body'));

const menuIcon = document.getElementById("menu-icon")
const side = document.getElementById('side')
var menuEnabled = false
menuIcon.addEventListener('click', ev => {
    if (menuEnabled) {
        side.style.marginLeft = "0"
        menuEnabled = false
    }
    else {
        side.style.marginLeft = "100%"
        menuEnabled = true
    }
})