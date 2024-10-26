class Boss extends Character {
    constructor(game) {
        const width = 150; 
        const height = 150; 
        const x = game.width / 2 - width / 2; 
        const y = 0; 
        const speed = 10; 
        const myImage = 'assets/boss.png';
        const myImageDead = 'assets/boss_dead.png';

        super(game, width, height, x, y, speed, myImage, myImageDead);

        
        this.direction = "R"; 
        this.shoot(); 
    }

    shoot() {
        if (!this.dead && !this.game.ended) {
            console.log("Boss shooting...");
            const shot = new Shot(this.game, this);
            shot.speed = 30; 
            this.game.opponentShots.push(shot); 
    
           
            setTimeout(() => this.shoot(), 500); 
        }
    }


    update() {
        if (!this.dead) {
            this.y += this.speed / 3; 
    
            if (this.direction === "R") { 
                this.x += this.speed;
                if (this.x + this.width >= this.game.width) { 
                    this.direction = "L"; 
                }
            } else { 
                this.x -= this.speed;
                if (this.x <= 0) { 
                    this.direction = "R"; 
                }
            }
    
            if (this.y > this.game.height) {
                this.y = 0; 
            }
        }
    }


    collide() {
        if (this.dead) return; 
    
        if (this.health > 1) {
            this.health -= 1; 
            console.log(`Boss health: ${this.health}`);
        } else {
            this.game.SCORE += 1; 
            this.dead = true; 
            super.collide(); 
            console.log("Boss defeated!");
            setTimeout(() => {
                this.game.removeOpponent(); 
            }, 2000);
        }
    }
}