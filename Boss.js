class Boss extends Character {
    constructor(game) {
        // Aumentar el tamaño del jefe
        const width = 150; // Ancho más grande para el jefe
        const height = 150; // Altura más grande para el jefe
        const x = game.width / 2 - width / 2; // Centrar horizontalmente
        const y = 0; // Aparecer en la parte superior
        const speed = 10; // Doble de velocidad que los triángulos normales
        const myImage = 'assets/boss.png';
        const myImageDead = 'assets/boss_dead.png';

        super(game, width, height, x, y, speed, myImage, myImageDead);

        
        this.direction = "R"; // Comienza moviéndose hacia la derecha
        this.shoot(); // Iniciar disparos del jefe
    }

    shoot() {
        if (!this.dead && !this.game.ended) {
            console.log("Boss shooting...");
            const shot = new Shot(this.game, this);
            shot.speed = 30; // Aumentar la velocidad del disparo hacia abajo
            this.game.opponentShots.push(shot); // Añadir el disparo a la lista de disparos del oponente
    
            // Disparar cada medio segundo
            setTimeout(() => this.shoot(), 500); // Ajusta el tiempo según prefieras
        }
    }


    /**
     * Sobrescribir el método `update` para darle movimiento único al jefe
     */
    update() {
        if (!this.dead) {
            // Movimiento hacia abajo, pero más lento que la velocidad horizontal
            this.y += this.speed / 3; // Disminuir el descenso vertical
    
            // Movimiento horizontal con rebote en los bordes
            if (this.direction === "R") { // Mover a la derecha
                this.x += this.speed;
                if (this.x + this.width >= this.game.width) { // Si toca el borde derecho
                    this.direction = "L"; // Cambiar dirección a la izquierda
                }
            } else { // Mover a la izquierda
                this.x -= this.speed;
                if (this.x <= 0) { // Si toca el borde izquierdo
                    this.direction = "R"; // Cambiar dirección a la derecha
                }
            }
    
            // Asegúrate de que siga dentro de la pantalla verticalmente
            if (this.y > this.game.height) {
                this.y = 0; // Regresa a la parte superior si baja demasiado
            }
        }
    }

    /**
     * Sobrescribir el método `collide` para manejar las colisiones del jefe
     */
    collide() {
        if (this.health > 1) {
            this.health -= 1; // El jefe pierde vida pero no muere instantáneamente
            console.log(`Boss health: ${this.health}`);
        } else {
            super.collide(); // Llamar al método de Character para "matar" al jefe
            console.log("Boss defeated!");
            setTimeout(() => {
                this.game.removeOpponent(); // Verificar si se termina el juego
            }, 2000);
        }
    }
}