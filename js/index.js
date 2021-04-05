var showingStudent = false, showingProgrammer = false, showingGD = false, showingResearch = false

var studentData = document.querySelectorAll(".student")
var programmerData = document.querySelectorAll(".programmer")
var gdData = document.querySelectorAll(".gd")
var researcherData = document.querySelectorAll(".researcher")

function showStudent() {
    studentData.forEach(e => {
        if (!showingStudent) {
            e.classList.remove("hidden")
            showingStudent = true
        } else {
            e.classList.add("hidden")
            showingStudent = false
        }
    })
    programmerData.forEach(e => {
        e.classList.add("hidden")
        showingProgrammer = false
    })
    gdData.forEach(e => {
        e.classList.add("hidden")
        showingGD = false
    })
    researcherData.forEach(e => {
        e.classList.add("hidden")
        showingResearch = false
    })
}

function showProgrammer() {
    programmerData.forEach(e => {
        if (!showingProgrammer) {
            e.classList.remove("hidden")
            showingProgrammer = true
        } else {
            e.classList.add("hidden")
            showingProgrammer = false
        }
    })
    studentData.forEach(e => {
        e.classList.add("hidden")
        showingStudent = false
    })
    gdData.forEach(e => {
        e.classList.add("hidden")
        showingGD = false
    })
    researcherData.forEach(e => {
        e.classList.add("hidden")
        showingResearch = false
    })
}

function showGraphicDesign() {

}

function showResearch() {

}
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
        // let vel = Vector.mult(Vector.normalise(Vector.perp(Vector.sub(center.position, c.position))), 0)
        Body.setVelocity(c, vel)

        stars.push(c)
    }
    // let c1 = Bodies.circle(1600, 400, 5, defaultOptions)

    World.add(world, stars)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    //bodies position do not adjust for resized window...
}

function draw() {
    background(0)

    stars.forEach((c, i) => {
        //can probably use p5 sprite alongside animation for trial
        //p5 graphics to rotate?
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