var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite

const lerp = (start,end,alpha) => start + (end - start) * alpha
const min = (a,b) => a < b ? a : b
const max = (a,b) => a < b ? b : a

const background_color = '#000000'
const width = 800
const height = 600

const canvas = document.getElementById('screen')
const c = canvas.getContext('2d')

const input = {}
const map = []

class Vec2 {
    constructor(x,y) {
        this.x = x
        this.y = y
    }
}

class Rectangle {
    constructor({position,size,isStatic,color}) {
        this.body = Bodies.rectangle(position.x,position.y,size.x,size.y,{isStatic: isStatic})
        this.color = color
        this.velocity = new Vec2(0,0)
    }

    jump() {
        if (this.is_on_floor() != false) {
            this.velocity.y = -20
        }
    }

    update() {
    }
}


const friction = .1
const acceleration = .2
const max_speed = 10
const gravity = .98


const init = () => {
    canvas.width = width
    canvas.height = height

    var engine = Engine.create()
    var render = Render.create({
        element: document.body,
        engine: engine
    });
    var runner = Runner.create()
    
    var player = new Rectangle({
        position: new Vec2(50,0),
        size: new Vec2(50,50),
        static: false,
        color: '#FF5555',
    })
    
    var ground = new Rectangle({
        position: new Vec2(0,200),
        size: new Vec2(500,50),
        static: true,
        color: '#FF5555',
    })
    
    Composite.add(engine.world, [player.body,ground.body])
    
    Render.run(render)
    
    Runner.run(runner, engine)
    //Composite.add(engine.world, [ground])
}

const update = () => {
    window.requestAnimationFrame(update)
    clear_background()

    if (input.a) {
        player.velocity.x = lerp(player.velocity.x,-5,acceleration)
    }
    if (input.d) {
        player.velocity.x = lerp(player.velocity.x,5,acceleration)
    }
    if (!input.a && !input.d) {
        player.velocity.x = lerp(player.velocity.x,0,friction)
    }

    if (input.w) {
        player.jump()
    }

    
}



init()
//update()

window.addEventListener('keydown',(event) => {
    input[event.key] = true
})

window.addEventListener('keyup',(event) => {
    input[event.key] = false
})