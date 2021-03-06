// Open and connect input socket
let socket = io('/');

// Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Player connected");
  socket.emit('gimmeMap');
});

//map setup
let map = [];
let mapWidth, mapHeight;
let mapScale;

socket.on('heresMap', function(mapInfo) {
    map = mapInfo.m;
    mapWidth = mapInfo.w;
    mapHeight = mapInfo.h;
    console.log(mapHeight);
    // console.log('map received:', map);
});

function setup(){
    //maybe adjust to make relative later?
    createCanvas(windowWidth, windowHeight);
    noStroke();
    rectMode(CORNER);
    // console.log(mapHeight);
    // mapScale = windowHeight / mapHeight;
    
    socket.on('update', function(m){
        // console.log('beat');
        mapScale = windowHeight / mapHeight;
        map = m;
    });
}

function draw(){
    background(120);
    // console.log(map);
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            push();
            fill(map[x][y]);
            rect(x * mapScale, y * mapScale, mapScale, mapScale);
            pop();
        }
    }
}

function keyPressed(){
    if (keyCode === UP_ARROW || keyCode === 87){ //w
        socket.emit('up');
        // console.log('up');
    }
    if (keyCode === DOWN_ARROW || keyCode === 83){//s
        socket.emit('down');
        // console.log('down');
        // snake.setDir(0,1);
    }
    if (keyCode === LEFT_ARROW || keyCode === 65 ){//a
        // snake.setDir(-1,0);
        socket.emit('left');
        // console.log('left');

    }
    if (keyCode === RIGHT_ARROW || keyCode === 68 ){//d
        // snake.setDir(1,0);
        socket.emit('right');
        // console.log('right');
        
    }
}