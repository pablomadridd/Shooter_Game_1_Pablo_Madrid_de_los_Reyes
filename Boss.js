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

        this.health = 3; // Jefe con más vida
        this.direction = "R"; // Comienza moviéndose hacia la derecha
        this.shoot(); // Iniciar disparos del jefe
    }


    shoot() {
        if (!this.dead && !this.game.ended) {
            console.log("Boss shooting...");
            this.game.shoot(this); // Usa el mismo método shoot() que los oponentes normales
            setTimeout(() => this.shoot(), 1000); // Dispara cada segundo (ajusta el tiempo si lo prefieres)
        }
    }


    /**
     * Sobrescribir el método `update` para darle movimiento único al jefe
     */
    update() {
        if (!this.dead) {
            this.y += this.speed; // Movimiento hacia abajo
    
            // Movimiento horizontal con rebote
            if (this.direction === "R") { // Moviéndose a la derecha
                this.x += this.speed;
                if (this.x + this.width >= this.game.width) { // Si llega al borde derecho
                    this.direction = "L"; // Cambiar dirección a izquierda
                }
            } else { // Moviéndose a la izquierda
                this.x -= this.speed;
                if (this.x <= 0) { // Si llega al borde izquierdo
                    this.direction = "R"; // Cambiar dirección a derecha
                }
            }
    
            // Si el jefe se mueve fuera de la pantalla verticalmente, reiniciar su posición
            if (this.y > this.game.height) {
                this.y = 0; // Vuelve a la parte superior
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