var Engine = Matter.Engine, 
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies
Matter.use(MatterAttractors)

var engine
var world
var center
var stars = []
var c1
const numStars = 50

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight)
    cnv.style('position', 'absolute')
    cnv.style('top', '0')
    cnv.style('left', '0')
    cnv.style('z-index', '-1')
    engine = Engine.create()
    Engine.run(engine)
    world = engine.world
    world.gravity.scale = 0

    center = Matter.Bodies.circle(windowWidth * 3/4, windowHeight / 2, 5, {
        plugin: {
            attractors: [
                function(a, b) {
                    return {
                        x: (a.position.x - b.position.x) * 1e-6,
                        y: (a.position.y - b.position.y) * 1e-6
                    }
                }
            ]
        },
        isStatic: true
    })

    c1 = Bodies.circle(25, 25, 5)
    //add velocity that allows orbit...

    stars.push(center, c1)

    World.add(world, stars)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    //bodies position do not adjust for resized window...
}

function draw() {
    background(0)

    stars.forEach(c => {
        circle(c.position.x, c.position.y, c.circleRadius)
    })
}