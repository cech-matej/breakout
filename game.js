const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let bricksArr = [];
let attempts = 2;
let score = 0;
let maxScore = 0;
let timer = 1000;
let plWidthTaken = false;
let ballBoostTaken = false;
let ballBoostTimer = 1000;
let end=false;
let balls = [];

let gameControl = document.getElementById("onoffswitch1");
let brickField = document.getElementById("onoffswitch2");
let cursor = document.getElementById("onoffswitch3");

function clear(color='#ecf0f1bd'){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
}

function sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

let player = {
    x: canvas.width/2-50,
    y: canvas.height-60,
    sensitivity: 45,
    borderAl: 1,
    width: 100,

    paint: function(){
        ctx.beginPath();
        //ctx.strokeStyle = '#7f49e3';
        ctx.fillStyle = '#8c7ae6';
        ctx.fillRect(this.x, this.y, this.width, 15);
        
        ctx.fill();
    }
}

let ball = {
    x: canvas.width/2,
    y: canvas.height -80,
    radius: 10,
    incX: Math.random() *5 +3,
    incY: Math.random() *-5 -3,

    paint: function(){
        ctx.beginPath();
        ctx.fillStyle = '#487eb0';
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
    },

    /*move: function(){
        if(sliderSB.value!="random"){
            this.x += slider.value;
            this.y -= slider.value;
        }
        //this.x += 2;
        //this.y -= 2;
        else{
            this.x += 2;
            this.y -= 2;
        }
    },*/

    border: function(){
        if(ball.x+ball.radius >= canvas.width){
            if(sliderSB.value!="random")
                this.incX = parseInt(-sliderSB.value);

            else
                this.incX = Math.random() *-5 +2;
        }
        else if(ball.x-ball.radius <= 0){
            if(sliderSB.value!="random")
                this.incX = parseInt(sliderSB.value);

            else
                this.incX = Math.random() *5 +2;
        }

        if(ball.y+ball.radius >= canvas.height){
            if(attempts>0){
                this.y = canvas.height -60;
                this.x = canvas.width/2;
                if(sliderSB.value!="random"){
                    this.incX = parseInt(sliderSB.value);
                    this.incY = parseInt(-sliderSB.value);
                }

                else{
                    this.incY = Math.random() *-5;
                    this.incX = Math.random() *5+2;
                }
                
                if(plWidthTaken==true){
                    plWidthTaken=false;
                        player.width=100;
                        timer=1000; 
                }
                
                if(ballBoostTaken==true){
                ballBoostTaken=false;
                    ball.radius=10;
                    ballBoostTimer=1000; 
                }
                

                attempts--;
                console.log(attempts);
            }
            else{
                //alert('gfd');
                attempts=-1;
                //gameOver.paint()//.style.zIndex = '120';
            }
        }
        else if(ball.y-ball.radius <= 25){
            if(sliderSB.value!="random"){
                this.incX = this.incX;
                this.incY = -this.incY;
            }
            else
                this.incY = Math.random() *5 +2;
        }
    }
}

/*function AddBall(x, y){
    this.x = x;
    this.y = y;
    this.incX;
    this.incY;

    if(sliderSB.value=="random"){
        this.incX = Math.random()*5;
    }
    else{
        this.incX = parseInt(sliderSB.value);
        this.incY = parseInt(sliderSB.value);
    }
        
    ctx.beginPath();
    ctx.fillStyle = '#487eb0';
    ctx.arc(this.x, this.y, 10, 0, 2*Math.PI);
    ctx.fill();
}*/

/*function addBallMove(){
    for(let i=0; i<balls.length; i++){
        balls[i].x+=balls[i].incX;
        balls[i].y-=balls[i].incY;
    }
}*/

/*function addBallCollision(){
    setInterval(function(){
        for(let b=0; b<balls.length; b++){
            for(let i=0; i<bricksArr.length; i++){
                if(balls[b].x+10 >= bricksArr[i].x && balls[b].x-10 <= bricksArr[i].x +bricksArr[i].width){
                    if(balls[b].y+10 >= bricksArr[i].y && balls[b].y-10 <= bricksArr[i].y +bricksArr[i].height){
                        if(bricksArr[i].show == true){
                            if(sliderSB.value!="random"){
                                balls[b].incX = balls[b].incX;
                                balls[b].incY = -balls[b].incY;
                            }
                            else{
                                balls[b].incX = Math.random()*-5+2;
                                balls[b].incY = Math.random()*5+2;
                            }
    
                            balls[b].incX=balls[b].incX;
                            balls[b].incY=3;
                            addBallMove();
    
                            bricksArr[i].show = false;
                            score++;
                        }
                    }
                }
            }
    
            // BORDER ADDITIONAL BALL COLLISION
            if(balls[b].x+10 >= canvas.width){
                if(sliderSB.value!="random")
                    balls[b].incX = parseInt(-sliderSB.value);
    
                else
                    balls[b].incX = Math.random() *-5 +2;
            }
            else if(balls[b].x-10 <= 0){
                if(sliderSB.value!="random")
                    balls[b].incX = parseInt(sliderSB.value);
    
                else
                    balls[b].incX = Math.random() *5 +2;
            }
    
            if(balls[b].y+10 >= canvas.height){
                if(attempts>0){
                    balls[b].y = canvas.height -60;
                    balls[b].x = canvas.width/2;
                    if(sliderSB.value!="random"){
                        balls[b].incX = parseInt(sliderSB.value);
                        balls[b].incY = parseInt(-sliderSB.value);
                    }
    
                    else{
                        balls[b].incY = Math.random() *-5;
                        balls[b].incX = Math.random() *5+2;
                    }
                    
                    if(plWidthTaken==true){
                        plWidthTaken=false;
                         player.width=100;
                         timer=1000; 
                     }
                    
    
                    attempts--;
                    console.log(attempts);
                }
                else{
                    //alert('gfd');
                    attempts=-1;
                    //gameOver.paint()//.style.zIndex = '120';
                }
            }
            else if(balls[b].y-10 <= 25){
                if(sliderSB.value!="random"){
                    balls[b].incX = balls[b].incX;
                    balls[b].incY = -balls[b].incY;
                }
                else
                    balls[b].incY = Math.random() *5 +2;
            }
        }
    },10)
    
}*/

function playerCollision(){
    setInterval(function(){
        //Player - ball collision
        if(ball.x+ball.radius >= player.x && ball.x-ball.radius <= player.x + player.width){
            if(ball.y+ball.radius >= player.y && ball.y-ball.radius <= player.y +15){
                if(sliderSB.value!="random"){
                    ball.incX = ball.incX;
                    ball.incY = -ball.incY;
                }
                else
                    ball.incY=Math.random()*-10+2;
            }
        }

        //Player - boost collision
        if(boost.x+30 >= player.x && boost.x-30 <= player.x + player.width){
            if(boost.y+30 >= player.y && boost.y-30 <= player.y +15){
                if(boostRand == 1){
                    attempts++;
                    game.repaint();
                }
                if(boostRand == 2){
                    //balls.push(new AddBall(player.x+player.width/2, player.y-30));
                    //ball.incX = -ball.incX;
                    //ball.incY = -ball.incY;
                    ball.radius += 10;
                    ballBoostTaken = true;
                }
                if(boostRand == 3){
                    player.width+=40;
                    player.x-=20;
                    plWidthTaken = true;
                }
                boost.collision=true;
                
            }
        }

    }, 10)    
}

function collision(){
    setInterval(function(){
        //console.log('object');
        if(brickField.checked == true){
            for(let i=0; i<bricksArr.length; i++){
                if(ball.x+ball.radius >= bricksArr[i].x && ball.x-ball.radius <= bricksArr[i].x +bricksArr[i].width){
                    if(ball.y+ball.radius >= bricksArr[i].y && ball.y-ball.radius <= bricksArr[i].y +bricksArr[i].height){
                        if(bricksArr[i].show == true){
                            if(sliderSB.value!="random"){
                                ball.incX = ball.incX;
                                ball.incY = -ball.incY;
                            }
                            else{
                                ball.incX = Math.random()*-5+2;
                                ball.incY = Math.random()*5+2;
                            }
                            /*bricksArr[i].x=-200;
                            console.log(bricksArr[i]);
                            bricksArr[i].y = -200;
                            game.repaint();*/
                            bricksArr[i].show = false;
                            score++;
                        }

                    }
                }
            }
        }

        if(brickField.checked == false){
            for(let i=0; i<parseInt(sliderL.value); i++){
                for(let j=0; j<10; j++){
                    if(ball.x+10 >= bricksArr[i][j].x && ball.x-10 <= bricksArr[i][j].x +bricksArr[i][j].width){
                        if(ball.y+10 >= bricksArr[i][j].y && ball.y-10 <= bricksArr[i][j].y +bricksArr[i][j].height){
                            if(bricksArr[i][j].show == true){
                                /*testArrI.push(i);
                                testArrJ.push(j);*/

                                bricksArr[i][j].show = false;
                                //ball.y+=25;
                                ball.incX = ball.incX;
                                ball.incY = -ball.incY;
                                
                                score++;
                                console.log(bricksArr[i][j].x);
                                console.log(bricksArr[i][j].y);
                                console.log(ball.x);
                                console.log(ball.y);
                            }
                        }
                    }
                    //testArrI = []; 
                    //testArrJ = [];
                }
            }
        }
    }, 10)
}

function Brick(x, y, width, height, show){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.show = show;
    ctx.beginPath();
    ctx.fillStyle = '#1abc9c';
    ctx.fillRect(x, y, width, height);

    ctx.fill();
}

function bricks() {
    let widthGap;
    let heightGap;
    if(brickField.checked==true){
        widthGap=27.27;
    
        // První řada - index 0 až 9 
        if(parseInt(sliderL.value)>=1){
            for(let i=0; i<10; i++){
                bricksArr[i] = new Brick(widthGap, 25, 120, 30, true);
                widthGap+=147.27;
                
            }
            maxScore = 10;
        }
    
        widthGap=25;
    
        // Druhá řada - index 10 až 16
        if(parseInt(sliderL.value)>=2){
            for(let i=10; i<17; i++){
                bricksArr[i] = new Brick(widthGap, 80, 160, 30, true);
                widthGap+=215;
            }
            maxScore = 17;
        }
    
        widthGap=27.27;
        
        // Třetí řada - index 17 až 26 
        if(parseInt(sliderL.value)>=3){
            for(let i=17; i<27; i++){
                bricksArr[i] = new Brick(widthGap, 135, 120, 30, true);
                widthGap+=147.27;
            }
            maxScore = 27;
        }
    
        widthGap=25;
    
        // Čtvrtá řada - index 27 až 33
        if(parseInt(sliderL.value)>=4){
            for(let i=27; i<34; i++){
                bricksArr[i] = new Brick(widthGap, 190, 160, 30, true);
                widthGap+=215;
            }
            maxScore = 34;
        }
    
        widthGap=27.27;
        
        // Pátá řada - index 34 až 43 
        if(parseInt(sliderL.value)>=5){
            for(let i=34; i<44; i++){
                bricksArr[i] = new Brick(widthGap, 245, 120, 30, true);
                widthGap+=147.27;
            }
            maxScore = 44;
        }
    
        widthGap=25;
    
        // Šestá řada - index 44 až 50
        if(parseInt(sliderL.value)>=6){
            for(let i=44; i<51; i++){
                bricksArr[i] = new Brick(widthGap, 300, 160, 30, true);
                widthGap+=215;
            }
            maxScore = 51;
        }
    
        widthGap=27.27;
        
        // Sedmá řada - index 51 až 60
        if(parseInt(sliderL.value)>=7){
            for(let i=51; i<61; i++){
                bricksArr[i] = new Brick(widthGap, 355, 120, 30, true);
                widthGap+=147.27;
            }
            maxScore = 61;
        }
    }

    else if (brickField.checked == false){
        widthGap = 27.27;
        heightGap = 25;

        for(let i=0; i<parseInt(sliderL.value);i++){
            bricksArr[i] = [];
            for(let j=0; j<10; j++){
                bricksArr[i][j] = new Brick(widthGap, heightGap, 120, 30, true);
                widthGap+=147.27;
            }
            maxScore+=10;
            widthGap = 27.27;
            heightGap+=55;
        }
    }
    
}

function bricksRepaint() {
    let widthGap;
    let heightGap;

    if(brickField.checked == true){
        widthGap=27.27;
        
        // První řada - index 0 až 9 
        if(parseInt(sliderL.value)>=1){
            for(let i=0; i<10; i++){
                if(bricksArr[i].show == true){
                    bricksArr[i] = new Brick(bricksArr[i].x, bricksArr[i].y, 120, 30, true);
                    widthGap+=147.27;
                }
            }
        }

        widthGap=25;

        // Druhá řada - index 10 až 16
        if(parseInt(sliderL.value)>=2){
            for(let i=10; i<17; i++){
                if(bricksArr[i].show == true){
                    bricksArr[i] = new Brick(bricksArr[i].x, bricksArr[i].y, 160, 30, true);
                    widthGap+=215;
                }
            }
        }

        widthGap=27.27;
        
        // Třetí řada - index 17 až 26 
        if(parseInt(sliderL.value)>=3){
            for(let i=17; i<27; i++){
                if(bricksArr[i].show == true){
                    bricksArr[i] = new Brick(bricksArr[i].x, bricksArr[i].y, 120, 30, true);
                    widthGap+=147.27;
                }
            }
        }

        widthGap=25;

        // Čtvrtá řada - index 27 až 33
        if(parseInt(sliderL.value)>=4){
            for(let i=27; i<34; i++){
                if(bricksArr[i].show == true){
                    bricksArr[i] = new Brick(bricksArr[i].x, bricksArr[i].y, 160, 30, true);
                    widthGap+=215;
                }
            }
        }

        widthGap=27.27;
        
        // Pátá řada - index 34 až 43 
        if(parseInt(sliderL.value)>=5){
            for(let i=34; i<44; i++){
                if(bricksArr[i].show == true){
                    bricksArr[i] = new Brick(bricksArr[i].x, bricksArr[i].y, 120, 30, true);
                    widthGap+=147.27;
                }
            }
        }

        widthGap=25;

        // Šestá řada - index 44 až 50
        if(parseInt(sliderL.value)>=6){
            for(let i=44; i<51; i++){
                if(bricksArr[i].show == true){
                    bricksArr[i] = new Brick(bricksArr[i].x, bricksArr[i].y, 160, 30, true);
                    widthGap+=215;
                }
            }
        }

        widthGap=27.27;
        
        // Sedmá řada - index 51 až 60
        if(parseInt(sliderL.value)>=7){
            for(let i=51; i<61; i++){
                if(bricksArr[i].show == true){
                    bricksArr[i] = new Brick(bricksArr[i].x, bricksArr[i].y, 120, 30, true);
                    widthGap+=147.27;
                }
            }
        }
    }

    else if(brickField.checked == false){
        widthGap = 27.27;
        heightGap = 25;

        for(let i=0; i<parseInt(sliderL.value);i++){
            for(let j=0; j<10; j++){
                if(bricksArr[i][j].show == true){
                    bricksArr[i][j] = new Brick(bricksArr[i][j].x, bricksArr[i][j].y, 120, 30, true);
                    widthGap+=147.27;
                }
            }
            widthGap=27.27;
            heightGap+=55;
        }
    }
}


let game = {
    movement: function(){
        if(gameControl.checked == false){
            document.addEventListener('keydown', function (event){
            switch (event.code) {
                case 'ArrowLeft':
                    if(player.x>0){
                        player.x -= player.sensitivity;
                        console.log('vlevo');
                    }
                    break;
                case 'ArrowRight':
                    if(player.x<canvas.width-player.width){
                        player.x += player.sensitivity;
                        console.log('vpravo');
                    }
                    break;
            }
            
            
            game.repaint();
        })
        }
        
        if(gameControl.checked==true){
            document.addEventListener('mousemove', function(event){
            let rect = canvas.getBoundingClientRect();
            player.x = event.clientX - rect.left - player.width/2+2;
            })
        }
        
    },

    start: function(){
        player.paint();
        ball.paint();
        playerCollision();
        collision();
        setInterval(() =>{
            ball.border();
            ball.x += ball.incX;
            ball.y += ball.incY;

            this.repaint();

            if(!end){
               if(boost.time>0)
                    boost.time--;
                else{
                    boost.paint();
                    boost.y+=parseInt(sliderBS.value);
                }

                if(boost.y>canvas.width+50 || boost.collision == true){
                    boosts();
                    //boost.time=parseInt(sliderBT.value);
                } 
            }

            if(plWidthTaken == true){
               if(timer>0)
                    timer--;
                else{
                    plWidthTaken = false;
                    timer=1000;
                    player.width=100;
                    //player.x+=50;
                } 
            }

            if(ballBoostTaken == true){
                if(ballBoostTimer>0)
                    ballBoostTimer--;
                else{
                    ballBoostTaken = false;
                    ballBoostTimer=1000;
                    ball.radius=10;
                } 
             }
            
            
        }, 10);
    },

    repaint: function(){
        clear();
        if(score<=maxScore)
            bricksRepaint();
        game.lifes();
        game.score();
        player.paint();
        ball.paint();
        /*addBallMove();
        addBallCollision();

        for(let i=0; i<balls.length; i++){
            balls[i] = new AddBall(balls[i].x, balls[i].y);
        }*/

        /*if(balls.length<=1){
            for(let i=0; i<balls.length; i++){
                balls[i].x+=balls[i].incX;
                balls[i].y-=balls[i].incY;
            }
        }*/

        if(cursor.checked == true){
            document.getElementsByTagName("canvas")[0].style.cursor = "auto";
        }
        
        else if(cursor.checked == false){
            document.getElementsByTagName("canvas")[0].style.cursor = "none";
        }
    },

    lifes: function(){
        ctx.beginPath();
        ctx.fillStyle = "#1289A7";
        ctx.font = '20px Fira Sans';
        ctx.fillText('Lifes: ', 5, 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "#ED4C67";
        ctx.font = '20px Fira Sans';
        ctx.fillText(attempts+1, 70, 20);
        ctx.stroke();

        if(attempts ==-1){
            end=true;
            ctx.beginPath();
            ctx.fillStyle = '#EE5A24';
            ctx.fillRect(0, 200, 1500, 500);
            ctx.fill();


            ctx.beginPath();
            ctx.fillStyle = "#130f40";
            ctx.font = '200px Fira Sans';
            ctx.fillText('GAME OVER', 200, 515);
            ctx.stroke();

            /*ctx.beginPath();
            ctx.fillStyle = "#130f40";
            ctx.font = '50px Fira Sans';
            ctx.fillText('Press P to play again', 500, 600);
            ctx.stroke();*/
        }
    },

    score: function(){
        ctx.beginPath();
        ctx.fillStyle = "#1289A7";
        ctx.font = '20px Fira Sans';
        ctx.fillText('Score: ', 1400, 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "#ED4C67";
        ctx.font = '20px Fira Sans';
        ctx.fillText(score, 1470, 20);
        ctx.stroke();

        if(score >=maxScore){
            end=true;
            ball.incX = 0;
            ball.incY = 0;

            ctx.beginPath();
            ctx.fillStyle = '#EE5A24';
            ctx.fillRect(0, 200, 1500, 500);
            ctx.fill();
    
    
            ctx.beginPath();
            ctx.fillStyle = "#130f40";
            ctx.font = '200px Fira Sans';
            ctx.fillText('WIN', 550, 515);
            ctx.stroke();
    
            /*ctx.beginPath();
            ctx.fillStyle = "#130f40";
            ctx.font = '50px Fira Sans';
            ctx.fillText('Press P to play again', 500, 600);
            ctx.stroke();*/
        }
    }
}

/*let gameOver = {
    paint: function(){
        ctx.beginPath();
        ctx.fillStyle = '#EE5A24';
        ctx.fillRect(0, 200, 1500, 500);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "#130f40";
        ctx.font = '200px Fira Sans';
        ctx.fillText('GAME OVER', 200, 500);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "#130f40";
        ctx.font = '50px Fira Sans';
        ctx.fillText('Press Y to play again', 500, 600);
        ctx.stroke();
        gameOver.again();
    },
    again: function(){
        document.addEventListener('keypress', function (event){
            switch (event.code) {
                case 'ArrowDown':
                    console.log('again');
                    //game.start();
                    break;
            }
            
            
            //game.repaint();
        })
    }
}*/


// --- BOOSTS ---

// keyboard only
/*class playerSpeedBoost{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.collision = false;
        this.time = sliderBT.value;
        this.image = new Image();
        this.width = 30;
        this.image.src = 'img/speed.png';
    }
    paint(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.width);
    }
}*/


class playerAdditionalLife{
    constructor(x, y){
        this.x = (Math.random()*(canvas.width-60))+30;
        this.y = y;
        this.collision = false;
        this.time = parseInt(sliderBT.value)*10;
        this.image = new Image();
        this.width = 30;
        this.image.src = 'img/life.png';
    }
    paint(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.width);
    }
}

class additionalBall{
    constructor(x, y){
        this.x = (Math.random()*(canvas.width-60))+30;
        this.y = y;
        this.collision = false;
        this.time = parseInt(sliderBT.value)*10;
        this.image = new Image();
        this.width = 30;
        this.image.src = 'img/ball.png';
    }
    paint(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.width);
    }
}

class playerWidth{
    constructor(x, y){
        this.x = (Math.random()*(canvas.width-60))+30;
        this.y = y;
        this.collision = false;
        this.time = parseInt(sliderBT.value)*10;
        this.image = new Image();
        this.width = 30;
        this.image.src = 'img/speed.png';
    }
    paint(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.width);
    }
}

let boostRand;
let boost;

function boosts(){
    boostRand = Math.floor(Math.random()*3+1);
    if(boostRand == 1){
        boost = new playerAdditionalLife(50,-50);
    }
    if(boostRand == 2){
        boost = new additionalBall(50,-50);
    }
    if(boostRand == 3){
        boost = new playerWidth(50,-50);
    }
}


// --- SLIDERS SETTINGS ---

// Player speed slider - keyboard only
/*let sliderS = document.getElementById("speed");
let outputS = document.getElementById("speedS");
outputS.innerHTML = sliderS.value;
sliderS.oninput = function() {
  outputS.innerHTML = sliderS.value;
}
player.sensitivity = parseInt(sliderS.value);*/

// Ball speed slider
let sliderSB = document.getElementById("bSpeed");
let outputSB = document.getElementById("bSpeedS");
outputSB.innerHTML = sliderSB.value;

sliderSB.oninput = function() {
    if(this.value==1)
        outputSB.innerHTML = "random";
    else
        outputSB.innerHTML = sliderSB.value;
}

// Brick layers
let sliderL = document.getElementById("layers");
let outputL = document.getElementById("layersS");
outputL.innerHTML = sliderL.value;

sliderL.oninput = function() {
  outputL.innerHTML = sliderL.value;
}

// Time until next boost
let sliderBT = document.getElementById("boostTime");
let outputBT = document.getElementById("boostTimeS");
outputBT.innerHTML = sliderBT.value;

sliderBT.oninput = function() {
  outputBT.innerHTML = sliderBT.value;
}

// Boost speed
let sliderBS = document.getElementById("boostSpeed");
let outputBS = document.getElementById("boostSpeedS");
outputBS.innerHTML = sliderBS.value;

sliderBS.oninput = function() {
  outputBS.innerHTML = sliderBS.value;
}

// --- START ---

//ball.incX = 0;
//ball.incY = 0;

function startGame() {
    ctx.beginPath();
    ctx.fillStyle = '#EE5A24';
    ctx.fillRect(0, 200, 1500, 500);
    ctx.fill();
    
    
    ctx.beginPath();
    ctx.fillStyle = "#130f40";
    ctx.font = '200px Arial';
    ctx.fillText('PLAY', 500, 500);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.fillStyle = "#130f40";
    ctx.font = '50px Arial';
    ctx.fillText('Press P to start the game', 475, 600);
    ctx.stroke();
}

let start = true;
//let restart = false;

startGame();
document.addEventListener('keydown', function (event){
    //console.log(event.code);
    switch(event.code){
        case 'KeyP':
            if(start==true){
                bricks();
                game.movement();
                game.start();
                start=false;
            }
    }
})

boosts();
