document.addEventListener("DOMContentLoaded", function () {
  new Splide(".splide", {
    type: "loop",
    cover: "true",
    heightRatio: 0.5,
    padding: {
      left: "5rem",
      right: "5rem",
    },
    gap: "30px",
  }).mount()
})
