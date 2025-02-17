let health = 100; // Plant health
        let plant = document.getElementById("plant");
        let message = document.getElementById("message");
        let button = document.getElementById("water-btn");

        function decay() {
            if (health > 0) {
                health -= 10;
                plant.style.filter = `brightness(${health}%)`;
                message.innerText = health > 50 ? "The plant looks sad 😟" : "The plant is wilting! 😢";
                
                if (health <= 0) {
                    message.innerText = "The plant has died... 😭";
                    document.body.innerHTML = "<h1>You didn't water the plant... 💀</h1>";
                }
            }
        }

        function waterPlant() {
            health = Math.min(100, health + 20); // Restore health, but not over 100
            plant.style.filter = `brightness(${health}%)`;
            message.innerText = "The plant is happy again! 😊";
        }

        button.addEventListener("click", waterPlant);
        setInterval(decay, 1000); // Plant wilts every 10 seconds
