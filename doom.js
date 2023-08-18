let data = {
    screen: {
        width: 840,
        height: 680,
        halfWidth: null,
        halfHeight: null,
        scale: 4
    },
    projection: {
        width: null,
        height: null,
        halfWidth: null,
        halfHeight: null,
        imageData: null,
        buffer: null
    },
    render: {
        delay: 30
    },
    rayCasting: {
        incrementAngle: null,
        precision: 64
    },
    player: {
        fov: 60,
        halfFov: null,
        x: 2,
        y: 2,
        angle: 0,
        radius: 20,
        speed: {
            movement: 0.02,
            rotation: 0.7
        }
    },
    map: [
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,2],
        [2,0,0,2,2,2,2,2,0,2,2,2,0,2,2,0,2,0,2,0,2,0,2,2,0,2],
        [2,2,0,0,0,0,2,0,0,2,2,0,0,0,2,0,2,0,2,0,2,0,0,2,0,2],
        [2,0,0,0,2,0,2,0,2,2,2,2,2,0,2,2,2,0,2,0,2,2,0,2,0,2],
        [2,2,2,2,2,0,2,0,0,0,0,0,2,0,0,0,2,0,2,0,0,0,0,2,0,2],
        [2,0,0,0,0,0,2,2,2,2,2,0,2,2,2,0,0,0,2,2,2,2,2,2,0,2],
        [2,0,2,2,2,0,2,0,0,0,2,0,0,0,2,2,2,2,2,0,0,0,0,2,0,2],
        [2,0,2,0,0,0,2,0,2,0,2,0,2,0,2,0,0,0,0,2,0,0,0,2,2,2],
        [2,0,2,0,2,2,2,0,2,2,2,0,2,0,2,0,0,0,0,2,2,2,0,0,0,2],
        [2,0,2,0,0,0,0,0,2,0,0,0,2,0,2,2,2,2,0,2,0,0,0,2,0,2],
        [2,0,2,2,2,2,2,0,2,2,2,2,2,0,2,0,0,0,0,0,0,2,0,2,0,2],
        [2,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,2,2,2,2,2,2,0,0,0,2],
        [2,2,2,2,0,2,0,0,2,0,2,2,2,2,2,0,2,0,0,0,0,2,2,2,2,2],
        [2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,2,2,0,0,0,2,0,2],
        [2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,0,2,2,2,0,0,2,0,2,0,2],
        [2,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,2],
        [2,0,2,0,2,2,2,2,2,2,2,0,2,2,2,0,2,0,2,0,2,2,2,0,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    ],
    key: {
        up: {
            code: "KeyW",
            active: false
        },
        down: {
            code: "KeyS",
            active: false
        },
        left: {
            code: "KeyA",
            active: false
        },
        right: {
            code: "KeyD",
            active: false
        }
    },
    textures: [
        {
            width: 8,
            height: 8,
            bitmap: [
                [1,1,1,1,1,1,1,1],
                [0,0,0,1,0,0,0,1],
                [1,1,1,1,1,1,1,1],
                [0,1,0,0,0,1,0,0],
                [1,1,1,1,1,1,1,1],
                [0,0,0,1,0,0,0,1],
                [1,1,1,1,1,1,1,1],
                [0,1,0,0,0,1,0,0]
            ],
            colors: [
                "rgb(255, 241, 232)",
                "rgb(194, 195, 199)",
            ]
        },
        {
            width: 16,
            height: 16,
            id: "texture",
            data: null
        }
    ],
    floorTextures: [
        {
            width: 16,
            height: 16,
            id: "floor-texture",
            data: null
        }
    ],
    backgrounds: [
        {
            width: 360,
            height: 100,
            id: "background",
            data: null
        }
    ],
}

data.screen.halfWidth = data.screen.width / 2;
data.screen.halfHeight = data.screen.height / 2;
data.player.halfFov = data.player.fov / 2;
data.projection.width = data.screen.width / data.screen.scale;
data.projection.height = data.screen.height / data.screen.scale;
data.projection.halfWidth = data.projection.width / 2;
data.projection.halfHeight = data.projection.height / 2;
data.rayCasting.incrementAngle = data.player.fov / data.projection.width;


const screen = document.getElementById('canvas');
screen.width = data.screen.width;
screen.height = data.screen.height;
screen.style.border = "1px solid black";
document.body.appendChild(screen);


const screenContext = screen.getContext("2d");
screenContext.scale(data.screen.scale, data.screen.scale);
screenContext.imageSmoothingEnabled = false;


data.projection.imageData = screenContext.createImageData(data.projection.width, data.projection.height);
data.projection.buffer = data.projection.imageData.data;


let mainLoop = null;


function degreeToRadians(degree) {
    let pi = Math.PI;
    return degree * pi / 180;
}


function Color(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}


function drawPixel(x, y, color) {
    if(color.r == 255 && color.g == 0 && color.b == 255) return;
    let offset = 4 * (Math.floor(x) + Math.floor(y) * data.projection.width);
    data.projection.buffer[offset  ] = color.r;
    data.projection.buffer[offset+1] = color.g;
    data.projection.buffer[offset+2] = color.b;
    data.projection.buffer[offset+3] = color.a;
}


function drawLine(x1, y1, y2, color) {
    for(let y = y1; y < y2; y++) {
        drawPixel(x1, y, color);
    }
}


function drawFloor(x1, wallHeight, rayAngle) {
    start = data.projection.halfHeight + wallHeight + 1;
    directionCos = Math.cos(degreeToRadians(rayAngle))
    directionSin = Math.sin(degreeToRadians(rayAngle))
    playerAngle = data.player.angle
    for(y = start; y < data.projection.height; y++) {
        distance = data.projection.height / (2 * y - data.projection.height)

        tilex = distance * directionCos
        tiley = distance * directionSin
        tilex += data.player.x
        tiley += data.player.y
        tile = data.map[Math.floor(tiley)][Math.floor(tilex)]
        
        
        texture = data.floorTextures[tile]

        if(!texture) {
            continue
        }

        texture_x = (Math.floor(tilex * texture.width)) % texture.width
        texture_y = (Math.floor(tiley * texture.height)) % texture.height
        
        
        color = texture.data[texture_x + texture_y * texture.width];
        drawPixel(x1, y, color)
    }
}
let songArr = ["MF1","MF2","MF3","MF4","MF5","MF6"];

const song = songArr[(Math.floor(Math.random() * songArr.length))];


function pause() {
    var audio = document.getElementById(song);
    var btn = document.getElementById("demo");
    btn.innerHTML = "Play"
    audio.pause();
}

function play(){
    
    var audio = document.getElementById(song);
    var btn = document.getElementById("demo");
    audio.volume = 0.3;
    if(audio.paused){
        audio.play();
        btn.innerHTML = "Pause"
    }
    else{
        audio.pause();
        btn.innerHTML = "Play"
    }
}



window.onload = function() {
    loadTextures();
    loadBackgrounds();
    main();
}


function main() {
    mainLoop = setInterval(function() {
        clearScreen();
        movePlayer();
        rayCasting();
        renderBuffer();
    }, data.render.dalay);
}


function renderBuffer() {
    let canvas = document.createElement('canvas');
    canvas.width = data.projection.width;
    canvas.height = data.projection.height;
    canvas.getContext('2d').putImageData(data.projection.imageData, 0, 0);
    screenContext.drawImage(canvas, 0, 0);
}


function rayCasting() {
    let rayAngle = data.player.angle - data.player.halfFov;
    for(let rayCount = 0; rayCount < data.projection.width; rayCount++) {
        
        
        let ray = {
            x: data.player.x,
            y: data.player.y
        }

        let rayCos = Math.cos(degreeToRadians(rayAngle)) / data.rayCasting.precision;
        let raySin = Math.sin(degreeToRadians(rayAngle)) / data.rayCasting.precision;
        
        let wall = 0;
        while(wall == 0) {
            ray.x += rayCos;
            ray.y += raySin;
            wall = data.map[Math.floor(ray.y)][Math.floor(ray.x)];
        }

        let distance = Math.sqrt(Math.pow(data.player.x - ray.x, 2) + Math.pow(data.player.y - ray.y, 2));

        distance = distance * Math.cos(degreeToRadians(rayAngle - data.player.angle));

        let wallHeight = Math.floor(data.projection.halfHeight / distance);

        let texture = data.textures[wall - 1];

        let texturePositionX = Math.floor((texture.width * (ray.x + ray.y)) % texture.width);

        drawBackground(rayCount, 0, data.projection.halfHeight - wallHeight, data.backgrounds[0]);
        drawTexture(rayCount, wallHeight, texturePositionX, texture);
        drawFloor(rayCount, wallHeight, rayAngle)

        rayAngle += data.rayCasting.incrementAngle;
    }
}

function clearScreen() {
    screenContext.clearRect(0, 0, data.projection.width, data.projection.height);
}

function movePlayer() {
    if(data.key.up.active) {
        let playerCos = Math.cos(degreeToRadians(data.player.angle)) * data.player.speed.movement;
        let playerSin = Math.sin(degreeToRadians(data.player.angle)) * data.player.speed.movement;
        let newX = data.player.x + playerCos;
        let newY = data.player.y + playerSin;
        let checkX = Math.floor(newX + playerCos * data.player.radius);
        let checkY = Math.floor(newY + playerSin * data.player.radius);

        if(data.map[checkY][Math.floor(data.player.x)] == 0) {
            data.player.y = newY;
        }
        if(data.map[Math.floor(data.player.y)][checkX] == 0) {
            data.player.x = newX;
        } 

    }
    if(data.key.down.active) {
        let playerCos = Math.cos(degreeToRadians(data.player.angle)) * data.player.speed.movement;
        let playerSin = Math.sin(degreeToRadians(data.player.angle)) * data.player.speed.movement;
        let newX = data.player.x - playerCos;
        let newY = data.player.y - playerSin;
        let checkX = Math.floor(newX - playerCos * data.player.radius);
        let checkY = Math.floor(newY - playerSin * data.player.radius);

        if(data.map[checkY][Math.floor(data.player.x)] == 0) {
            data.player.y = newY;
        }
        if(data.map[Math.floor(data.player.y)][checkX] == 0) {
            data.player.x = newX;
        } 
    }
    if(data.key.left.active) {
        data.player.angle -= data.player.speed.rotation;
        if(data.player.angle < 0) data.player.angle += 360;
        data.player.angle %= 360;
    }
    if(data.key.right.active) {
        data.player.angle += data.player.speed.rotation;
        if(data.player.angle < 0) data.player.angle += 360;
        data.player.angle %= 360;
    } 
}

document.addEventListener('keydown', (event) => {
    let keyCode = event.code;

    if(keyCode === data.key.up.code) {
        data.key.up.active = true;
    } 
    if(keyCode === data.key.down.code) {
        data.key.down.active = true;
    } 
    if(keyCode === data.key.left.code) {
        data.key.left.active = true;
    } 
    if(keyCode === data.key.right.code) {
        data.key.right.active = true;
    } 
});

document.addEventListener('keyup', (event) => {
    let keyCode = event.code;

    if(keyCode === data.key.up.code) {
        data.key.up.active = false;
    } 
    if(keyCode === data.key.down.code) {
        data.key.down.active = false;
    } 
    if(keyCode === data.key.left.code) {
        data.key.left.active = false;
    } 
    if(keyCode === data.key.right.code) {
        data.key.right.active = false;
    } 
});

function drawTexture(x, wallHeight, texturePositionX, texture) {
    let yIncrementer = (wallHeight * 2) / texture.height;
    let y = data.projection.halfHeight - wallHeight;
    let color = null
    for(let i = 0; i < texture.height; i++) {
        if(texture.id) {            
            color = texture.data[texturePositionX + i * texture.width];
        } else {
            color = texture.colors[texture.bitmap[i][texturePositionX]];
        }
        drawLine(x, y, Math.floor(y + yIncrementer + 2), color);
        y += yIncrementer;
    }
}

function loadTextures() {
    for(let i = 0; i < data.textures.length; i++) {
        if(data.textures[i].id) {
            data.textures[i].data = getTextureData(data.textures[i]);
        }
    }
    for(let i = 0; i < data.floorTextures.length; i++) {
        if(data.floorTextures[i].id) {
            data.floorTextures[i].data = getTextureData(data.floorTextures[i]);
        }
    }
}

function loadBackgrounds() {
    for(let i = 0; i < data.backgrounds.length; i++) {
        if(data.backgrounds[i].id) {
            data.backgrounds[i].data = getTextureData(data.backgrounds[i]);
        }
    }
}


function getTextureData(texture) {
    let image = document.getElementById(texture.id);
    let canvas = document.createElement('canvas');
    canvas.width = texture.width;
    canvas.height = texture.height;
    let canvasContext = canvas.getContext('2d');
    canvasContext.drawImage(image, 0, 0, texture.width, texture.height);
    let imageData = canvasContext.getImageData(0, 0, texture.width, texture.height).data;
    return parseImageData(imageData);
}

function parseImageData(imageData) {
    let colorArray = [];
    for (let i = 0; i < imageData.length; i += 4) {
        colorArray.push(new Color(imageData[i], imageData[i + 1], imageData[i + 2], 255));
    }
    return colorArray;
}

screen.onclick = function() {
    if(!mainLoop) {
        main();
    }
}

window.addEventListener('blur', function(event) {
    clearInterval(mainLoop);
    pause()
    mainLoop = null;
    renderFocusLost();
});

function renderFocusLost() {
    screenContext.fillStyle = 'rgba(0,0,0,0.5)';
    screenContext.fillRect(0, 0, data.projection.width, data.projection.height);
    screenContext.fillStyle = 'white';
    screenContext.font = '10px Lucida Console';
    screenContext.fillText('CLICK TO PLAY',data.projection.halfWidth/2,data.projection.halfHeight);
}

function drawBackground(x, y1, y2, background) {
    let offset = (data.player.angle + x);
    for(let y = y1; y < y2; y++) {
        let textureX = Math.floor(offset % background.width);
        let textureY = Math.floor(y % background.height);
        let color = background.data[textureX + textureY * background.width];
        drawPixel(x, y, color); 
    }
}