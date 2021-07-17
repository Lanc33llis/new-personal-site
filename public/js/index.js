const frontAnim = document.getElementById("front-anim")
const astroAnim = document.getElementById("astro-anim")
const gdAnim = document.getElementById("gd-anim")
const programmerAnim = document.getElementById("programmer-anim")

lottie.loadAnimation({
  container: frontAnim, // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "../images/data.json", // the path to the animation json
})

lottie.loadAnimation({
  container: astroAnim, // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "../images/stargirl.json", // the path to the animation json
})

lottie.loadAnimation({
  container: gdAnim, // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "../images/graphicdesigner.json", // the path to the animation json
})

lottie.loadAnimation({
  container: programmerAnim, // the dom element that will contain the animation
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "../images/programmer.json", // the path to the animation json
})
