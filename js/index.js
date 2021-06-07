const anim = document.getElementById("front-anim")

lottie.loadAnimation({
    container: anim, // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../images/data.json' // the path to the animation json
});