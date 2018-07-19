// Enemies our player must avoid
class Enemy {
    constructor(x, y, z, a, b) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    // sets random speed
    this.z = (Math.floor(Math.random() * 5) + 2);
    this.a = (Math.floor(Math.random() * 700) + 500);
    this.b = b;
    
    this.sprite = 'images/enemy-bug.png';
    }
    
    update(dt) {
        // speed
        this.x = this.x + this.z;
        // loop function
        // resets starting point after bug passes random point between 500 and 800
        if (this.x > this.a) {
            this.x = this.b; 
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};

// Add 100 to score when player reaches water
score = 0;

function addScore() {
    let scoreMore = 100;
    score += scoreMore;
}

hearts = 3;

function removeHeart() {
    let lessHeart = 1;
    hearts -= lessHeart;
}

function endGame() {
    allEnemies.length = 0;
    player.sprite = 'images/enemy-bug.png';
    document.getElementById('hearts').remove();
    document.getElementById('win-text').innerHTML = "<strong>FINAL SCORE</strong>: " + score + "<br>" + "Oh no! You turned into a bug!"
}

function newGame() {
    location.reload();
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 400;
    }

    update(dt){
        // collision detection
        for (let enemy of allEnemies) {
            if (this.x >= enemy.x - 70 && this.x <= enemy.x + 80 && this.y >= enemy.y - 20 && this.y <= enemy.y + 20) {
                this.x = 200;
                this.y = 400;
                removeHeart();
                if (hearts == 2) {
                    // remove heart from lives
                    document.getElementById('hearts').lastChild.previousSibling.classList.remove('fa-heart');
                } else if (hearts == 1) {
                    // remove heart from lives
                    document.getElementById('hearts').firstChild.nextSibling.classList.remove('fa-heart')
                } else if (hearts === 0) {
                // activate loss/restart modal, change character to bug, remove enemies
                    endGame();
                    setTimeout(function() {
                        modal.style.display = 'block';
                    }, 500);
                }
            }
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }


    handleInput() {
        if (event.keyCode == 37) {
            if (this.x <= 0) {
                this.x = 0;
            } else {
            this.x = this.x - 100;
            }
        } else if (event.keyCode == 38) {
            // after game over, allow player to move but not beyond
            // top border, and don't add to score when reaching top row
            if (this.y <= 70 && this.y >= -15 && hearts === 0) {
                this.y = -15;
            // prevent player from going beyond top row
            // send player back to start upon reaching top row
            } else if (this.y <= 70 && this.y >= -15) {
                this.y = -15;
                setTimeout(function() {
                    player.x = 200;
                    player.y = 400;
                    // add to score when reaching top row
                    addScore();
                    document.getElementById('score').innerHTML = score;
                }, 100);
            } else {
                this.y = this.y - 83;
            }
        } else if (event.keyCode == 39) {
            if (this.x >= 400) {
                this.x = 400;
            } else {
            this.x = this.x + 100;
            }
        } else if (event.keyCode == 40) {
            if (this.y >= 400) {
                this.y = 400;
            } else {
                this.y = this.y + 83;
            }
        } 
    }
}

// Place the player object in a variable called player
let player = new Player();

// Place enemy objects in enemy variables
let enemy = new Enemy(180, 226, this.z, this.a, -400);
let enemy2 = new Enemy(-200, 226, this.z, this.a, -200);
let enemy3 = new Enemy(-150, 145, this.z, this.a, -300);
let enemy4 = new Enemy(100, 145, this.z, this.a, -200);
let enemy5 = new Enemy(-100, 60, this.z, this.a, -100);
let enemy6 = new Enemy(-400, 60, this.z, this.a, -300);
let enemy7 = new Enemy(-240, 60, this.z, this.a, -270);
let enemy8 = new Enemy(-200, 226, 2, this.a, -100);

// Place all enemy objects in an array called allEnemies
let allEnemies = [
    enemy,
    enemy2,
    enemy3,
    enemy4,
    enemy5,
    enemy6,
    enemy7,
    enemy8
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Modal script
const modal = document.getElementById('modal'),
    extBtn = document.getElementsByClassName('exit-btn')[0],
    matches = document.getElementsByClassName('match');

extBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickOutModal);

function closeModal() {
    modal.style.display = 'none';
}

function clickOutModal(e) {
    if (e.target == modal) {
    modal.style.display = 'none';
    }
}