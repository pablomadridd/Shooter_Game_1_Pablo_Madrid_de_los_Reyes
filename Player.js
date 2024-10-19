/**
 * Main character of the game. Inherits from the Character class
 * @extends Character
 */
class Player extends Character {
    /**
    * Initializes a player
    * @param game {Game} The instance of the game to which the player belongs
    */

    constructor (game) {
        const height = PLAYER_HEIGHT * game.width / 100,
            width = PLAYER_WIDTH * game.width / 100,
            x = game.width / 2 - width / 2,
            y = game.height - height,
            speed = PLAYER_SPEED,
            myImage = PLAYER_PICTURE,
            myImageDead = PLAYER_PICTURE_DEAD;
            

        super(game, width, height, x, y, speed, myImage, myImageDead);
        this.LIVES = 3;
    }

    /**
     * Update the position attributes of the player and the shots based on the keys pressed
     */
    update () {
        if (!this.dead) {
            switch (this.game.keyPressed) {
            case KEY_LEFT:
                if (this.x > this.speed) {
                    this.x -= this.speed;
                }
                break;
            case KEY_RIGHT:
                if (this.x < this.game.width - this.width - this.speed) {
                    this.x += this.speed;
                }
                break;
            case KEY_SHOOT:
                this.game.shoot(this);
                break;
            }
        }
    }

    /**
     * Kill the player
     */
    collide() {
        if (!this.dead && this.LIVES > 0) {
            this.LIVES -= 1;
            if (this.LIVES > 0) {
                // Muerte temporal
                this.dead = true;
                this.image.src = this.myImageDead;
                setTimeout(() => {
                    this.dead = false;
                    this.image.src = this.myImage;
                }, 2000);
            } else {
                // Muerte permanente
                super.collide();
                this.game.endGame();
            }
        }
    }
}