const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let bricksArr = [];
let attempts = 2;
let score = 0;

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
    incX: Math.random() *5 +3,
    incY: Math.random() *-5 -3,

    paint: function(){
        ctx.beginPath();
        ctx.fillStyle = '#487eb0';
        ctx.arc(this.x, this.y, 10, 0, 2*Math.PI);
        ctx.fill();
    },

    move: function(){
        this.x += 2;
        this.y -= 2;
    },

    border: function(){
        if(ball.x+10 >= canvas.width){
            this.incX = Math.random() *-5 +2;
        }
        else if(ball.x-10 <= 0){
            this.incX = Math.random() *5 +2;
        }

        if(ball.y+10 >= canvas.height){
            if(attempts>0){
                this.y = canvas.height -60;
                this.x = canvas.width/2;
                this.incY = Math.random() *-5;
                this.incX = Math.random() *5+2;
                

                attempts--;
                console.log(attempts);
            }
            else{
                //alert('gfd');
                attempts=-1;
                //gameOver.paint()//.style.zIndex = '120';
            }
        }
        else if(ball.y-10 <= 25){
            this.incY = Math.random() *5 +2;
        }
    }
}

function playerCollision(){
    setInterval(function(){
        //console.log('fs');
        if(ball.x+10 >= player.x && ball.x-10 <= player.x + player.width){
            if(ball.y+10 >= player.y && ball.y-10 <= player.y +15){
                ball.incY=Math.random()*-10+2;
            }
        }
    }, 10)    
}

function collision(){
    setInterval(function(){
        console.log('object');
        for(let i=0; i<61; i++){
            if(ball.x+10 >= bricksArr[i].x && ball.x-10 <= bricksArr[i].x +bricksArr[i].width){
                if(ball.y+10 >= bricksArr[i].y && ball.y-10 <= bricksArr[i].y +bricksArr[i].height){
                    if(bricksArr[i].show == true){
                        //if(ball.incX <0){
                            ball.incX = ball.incX;
                            ball.incY = -ball.incY;
                        //}
                        //else{
                            //ball.incX = -2;
                            //ball.incY = 2;
                        //}
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
    let widthGap=27.27;
    
    // První řada - index 0 až 9 
    for(let i=0; i<10; i++){
        bricksArr[i] = new Brick(widthGap, 25, 120, 30, true);
        widthGap+=147.27;
        
    }

    widthGap=25;

    // Druhá řada - index 10 až 16
    for(let i=10; i<17; i++){
        bricksArr[i] = new Brick(widthGap, 80, 160, 30, true);
        widthGap+=215;
    }

    widthGap=27.27;
    
    // Třetí řada - index 17 až 26 
    for(let i=17; i<27; i++){
        bricksArr[i] = new Brick(widthGap, 135, 120, 30, true);
        widthGap+=147.27;
    }

    widthGap=25;

    // Čtvrtá řada - index 27 až 33
    for(let i=27; i<34; i++){
        bricksArr[i] = new Brick(widthGap, 190, 160, 30, true);
        widthGap+=215;
    }

    widthGap=27.27;
    
    // Pátá řada - index 34 až 43 
    for(let i=34; i<44; i++){
        bricksArr[i] = new Brick(widthGap, 245, 120, 30, true);
        widthGap+=147.27;
    }

    widthGap=25;

    // Šestá řada - index 44 až 50
    for(let i=44; i<51; i++){
        bricksArr[i] = new Brick(widthGap, 300, 160, 30, true);
        widthGap+=215;
    }

    widthGap=27.27;
    
    // Sedmá řada - index 51 až 60
    for(let i=51; i<61; i++){
        bricksArr[i] = new Brick(widthGap, 355, 120, 30, true);
        widthGap+=147.27;
    }
}

function bricksRepaint() {
    let widthGap=27.27;
    
    // První řada - index 0 až 9 
    for(let i=0; i<10; i++){
        if(bricksArr[i].show == true){
            bricksArr[i] = new Brick(bricksArr[i].x, bricksArr[i].y, 120, 30, true);
            widthGap+=147.27;
        }
    }

    widthGap=25;

    // Druhá řada - index 10 až 16
    for(let i=10; i<17; i++){
        if(bricksArr[i].show == true){
            bricksArr[i] = new Brick(bricksArr[i].x, bricksArr[i].y, 160, 30, true);
            widthGap+=215;
        }
    }

    widthGap=27.27;
    
    // Třetí řada - index 17 až 26 
    for(let i=17; i<27; i++){
        if(bricksArr[i].show == true){
            bricksArr[i] = new Brick(bricksArr[i].x, bricksArr[i].y, 120, 30, true);
            widthGap+=147.27;
        }
    }

    widthGap=25;

    // Čtvrtá řada - index 27 až 33
    for(let i=27; i<34; i++){
        if(bricksArr[i].show == true){
            bricksArr[i] = new Brick(bricksArr[i].x, bricksArr[i].y, 160, 30, true);
            widthGap+=215;
        }
    }

    widthGap=27.27;
    
    // Pátá řada - index 34 až 43 
    for(let i=34; i<44; i++){
        if(bricksArr[i].show == true){
            bricksArr[i] = new Brick(bricksArr[i].x, bricksArr[i].y, 120, 30, true);
            widthGap+=147.27;
        }
    }

    widthGap=25;

    // Šestá řada - index 44 až 50
    for(let i=44; i<51; i++){
        if(bricksArr[i].show == true){
            bricksArr[i] = new Brick(bricksArr[i].x, bricksArr[i].y, 160, 30, true);
            widthGap+=215;
        }
    }

    widthGap=27.27;
    
    // Sedmá řada - index 51 až 60
    for(let i=51; i<61; i++){
        if(bricksArr[i].show == true){
            bricksArr[i] = new Brick(bricksArr[i].x, bricksArr[i].y, 120, 30, true);
            widthGap+=147.27;
        }
    }
}


let game = {
    movement: function(){
        /*document.addEventListener('keydown', function (event){
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
        })*/

        document.addEventListener('mousemove', function(event){
            let rect = canvas.getBoundingClientRect();
            player.x = event.clientX - rect.left - player.width/2+2;
        })
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
        }, 10);
    },

    repaint: function(){
        clear();
        bricksRepaint();
        game.lives();
        game.score();
        player.paint();
        ball.paint();
    },

    lives: function(){
        ctx.beginPath();
        ctx.fillStyle = "#1289A7";
        ctx.font = '20px Fira Sans';
        ctx.fillText('Lives: ', 5, 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "#ED4C67";
        ctx.font = '20px Fira Sans';
        ctx.fillText(attempts+1, 70, 20);
        ctx.stroke();

        if(attempts ==-1){
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

        if(score >=61){
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



// START

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
