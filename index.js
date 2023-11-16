const background_color = 'black'
const width = 512
const height = 512

const canvas = document.getElementById('screen')
const c = canvas.getContext('2d')

class Vec2 {
    constructor(x,y) {
        this.x = x
        this.y = y
    }
}

class Rectangle {
    constructor({position,size}) {
        this.position = position
        this.size = size
        this.velocity = new Vec2(0,0)
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,this.size.x,this.size.y)
    }

    update() {
        this.draw()

        if (false) {

        }
    }
}

const player = new Rectangle({
    position: new Vec2(0,0),
    size: new Vec2(50,50)
})
const enemy = new Rectangle({
    position: new Vec2(100,0),
    size: new Vec2(50,50)
})





const init = () => {
    canvas.width = width
    canvas.height = height
    c.fillStyle = background_color
    c.fillRect(0,0,canvas.width,canvas.height)
}



const clear_background = () => {
    c.fillStyle = background_color
    c.fillRect(0,0,width,height)
}

const update = () => {
    window.requestAnimationFrame(update)
    clear_background()
    player.draw()
    enemy.draw()
}





init()
update()