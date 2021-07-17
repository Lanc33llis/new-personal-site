const menuIcon = document.getElementById("menu-icon")
const side = document.getElementById("side")
var menuEnabled = false
menuIcon.addEventListener("click", (ev) => {
  if (menuEnabled) {
    side.style.left = "-100%"

    scrollbar.updatePluginOptions("modal", { open: false })
    menuEnabled = false
  } else {
    side.style.left = "0%"
    scrollbar.updatePluginOptions("modal", { open: true })

    menuEnabled = true
  }
})

window.onresize = () => {
  if (window.innerWidth > 900) {
    side.style.left = "-100%"
    scrollbar.updatePluginOptions("modal", { open: false })
    menuEnabled = false
  }
}
