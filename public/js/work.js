var slide

const splideOptsNorm = {
  type: "loop",
  cover: "true",
  heightRatio: 0.5,
  padding: {
    left: "5rem",
    right: "5rem",
  },
  gap: "30px",
}

const splideOptsSmall = {
  type: "loop",
  cover: "true",
  heightRatio: 0.9,
  gap: "30px",
}

document.addEventListener("DOMContentLoaded", function () {
  slide = new Splide(".splide", splideOptsNorm).mount()
})

window.onresize = () => {
  if (window.innerWidth <= 600) {
    slide.destroy()
    slide = new Splide(".splide", splideOptsSmall).mount()
  } else {
    slide.destroy()
    slide = new Splide(".splide", splideOptsNorm).mount()
  }
}
