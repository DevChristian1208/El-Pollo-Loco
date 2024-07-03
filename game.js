let canvas; 
let world;
let keyboard = new Keyboard();

let gameOver = false;

function init() {
    canvas = document.getElementById('canvas');
    showStartScreen();

}

function fullscreen(){
    let fullscreen = document.getElementById('canvasDiv');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    document.getElementById('canvas').style.width = '-webkit-fill-available';
    document.getElementById('canvas').style.height = '-webkit-fill-available';
    document.getElementById('fullScrenButton').style.display = 'none';
    document.getElementById('exitFullScreenButton').style.display = 'block';
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
}
 
function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }

function showStartScreen() {
    const ctx = canvas.getContext('2d');
    const startImage = new Image();
    startImage.src = './img/9_intro_outro_screens/start/startscreen_1.png';

    startImage.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
        canvas.addEventListener('click', startGame);
        
    };
}

function startGame() {
    document.getElementById('gameInfoButton').style.display = 'none';
    document.getElementById('legalNotice').style.display = 'none';
    canvas.removeEventListener('click', startGame); 
    initLevel();
    world = new World(canvas, keyboard);
    document.getElementById('startButton').style.display = 'none';

}


function showGameOverImage() {
    const canvas = document.getElementById('canvas'); 
    const ctx = canvas.getContext('2d');
    const gameOverImage = new Image();
    gameOverImage.src = './img/9_intro_outro_screens/game_over/game over!.png';
    
    gameOverImage.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(gameOverImage, 0, 0, canvas.width, canvas.height);
        gameOver = true; 
    };

}

function muteSound() {
    if (world) {
        world.stopAllSounds();
        document.getElementById('muteButton').style.display = 'none'; 
        document.getElementById('speakerButton').style.display = 'block'; 
    }
}

function unmuteSound() {
    if (world) {
        world.startAllSounds(); 
        document.getElementById('muteButton').style.display = 'block'; 
        document.getElementById('speakerButton').style.display = 'none'; 
    }
}

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38) {
        keyboard.UP = true;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(e.keyCode == 68) {
        keyboard.D = true;
    }

});  

window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38) {
        keyboard.UP = false;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(e.keyCode == 68) {
        keyboard.D = false;
    }

}); 