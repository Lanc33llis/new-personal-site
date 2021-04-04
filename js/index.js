var Engine = Matter.Engine, 
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies
    Vector = Matter.Vector
    Body = Matter.Body
Matter.use(MatterAttractors)

var stars = []
const numStars = 350

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

    let center = Matter.Bodies.circle(windowWidth * 3/4, windowHeight / 2, 3, {
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
        mass: 1e-1
    }

    for (let i = 0; i < numStars; i++) {
        let c = Bodies.circle(randomNum(0, windowWidth * 3/4 + windowWidth), randomNum(-windowHeight / 2, windowHeight * 3/2), 3, defaultOptions)
        //small eccentric estimation of the orbital speed
        // v = sqrt(GM/r)
        let vec = Vector.sub(center.position, c.position)
        let r = Vector.magnitude(vec)
        let vel = Vector.mult(Vector.normalise(Vector.perp(Vector.sub(center.position, c.position))), Math.sqrt(G * sunMass / r))
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

    stars.forEach(c => {
        //can probably use p5 sprite alongside animation for trial
        //p5 graphics to rotate?
        image(starSprite, c.position.x, c.position.y, c.circleRadius * 4, c.circleRadius * 4)
    })
}