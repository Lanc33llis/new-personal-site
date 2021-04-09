var showingBools = [false, false, false, false]
var headers = document.querySelectorAll("h1.home-header-detail")
var data = document.querySelectorAll(".hidden")

function showData(i) {
    data.forEach((e, k) => {
        if (k == i) {
            if (!showingBools[i]) {
                e.classList.remove("hidden")
                headers[i].classList.add("selected")
                showingBools[i] = true
            } else {
                e.classList.add("hidden")
                headers[i].classList.remove("selected")
                showingBools[i] = false
            }
        } else {
            e.classList.add("hidden")
            headers[k].classList.remove("selected")
            showingBools[k] = false
        }
    })
}

var i = 0, h = 0
var programmerPhotos = ["images/cogle.gif", "images/equipotential3d.png", "images/equipotentialflat.png", "images/opencv.gif"]
var gdPhotos = ["images/LE Logo.svg", "images/s2swebsite.jpg", "images/oldpersonalwebsite.png", "images/frenchfriedlogo.svg"]
var programmerData = document.querySelector(".programmer > img")
var gdData = document.querySelector(".gd > img")
setInterval(x => {
    i++
    h++
    
    if(i == programmerPhotos.length) {
        i = 0
    }
    if(h == gdPhotos.length) {
        h = 0
    }

    programmerData.src = programmerPhotos[i]
    gdData.src = gdPhotos[h]
}, 2000)

//-------------------- sim stuff --------------------//

var Engine = Matter.Engine, 
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies
    Vector = Matter.Vector
    Body = Matter.Body
Matter.use(MatterAttractors)

var stars = []
const numStars = 300

const G = 6.67384e-11
const sunMass = 10e11

function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

var starSprite;
function preload() {
    starSprite = loadImage('../images/star-sprite.png');
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight)
    cnv.style('position', 'absolute')
    cnv.style('top', '0')
    cnv.style('left', '0')
    cnv.style('z-index', '-1')

    let engine = Engine.create()
    Engine.run(engine)

    let world = engine.world
    world.gravity.scale = 0

    let center = Matter.Bodies.circle(windowWidth * 3/4, windowHeight / 2, 6, {
        plugin: {
            attractors: [
                function(a, b) {
                    //F = G * ((mass1 * mass2) / d^2)
                    let x1 = a.position.x, y1 = a.position.y, x2 = b.position.x, y2 = b.position.y
                    let acc = G * sunMass / Math.pow(Math.hypot(x2 - x1, y2 - y1), 2)

                    let vec = Matter.Vector.sub(a.position, b.position)
                    vec = Vector.normalise(vec)
                    vec = Vector.mult(vec, acc)

                    Body.setVelocity(b, Vector.add(b.velocity, vec))
                }
            ]
        },
        isStatic: true
    })

    stars.push(center)

    let defaultOptions = {
        frictionAir: 0,
        frictionStatic: 0,
        mass: 1e-1,
        collisionFilter: {
            group: -1
        }
    }

    let dy = (windowWidth / 2) - (windowWidth * 3/4), dy1 = (windowHeight / 2) + (windowWidth * 3/4)

    for (let i = 0; i < numStars; i++) {
        let c = Bodies.circle(randomNum(0, (windowWidth * 3/4) * 2), randomNum(dy, dy1), randomNum(2, 6), defaultOptions)
        //small eccentric estimation of the orbital speed
        // v = sqrt(GM/r)

        let vec = Vector.sub(center.position, c.position)
        let r = Vector.magnitude(vec)
        let vel = Vector.mult(Vector.normalise(Vector.perp(Vector.sub(center.position, c.position))), Math.sqrt(G * sunMass / r))

        Body.setVelocity(c, vel)

        stars.push(c)
    }

    World.add(world, stars)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    //bodies position do not adjust for resized window...
}

function draw() {
    background(0)

    stars.forEach((c, i) => {
        if (i !=  0) {
            push()
            let center = stars[0]
            translate(c.position.x, c.position.y)
            let v = Vector.perp(Vector.sub(center.position, c.position), true)
            rotate(Math.atan2(v.y, v.x))
            image(starSprite, 0, 0, c.circleRadius * 4, c.circleRadius * 2)
            pop()
        } else {
            circle(c.position.x, c.position.y, c.circleRadius * 2)
        }
    })
}