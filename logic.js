document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('dartboard');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('score');
    let currentScore = 0;
    let currentPlayer = 1;

    function drawDartboard() {
        // Rysowanie tarczy
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.beginPath();
        ctx.arc(centerX, centerY, 197.75, 0, 2 * Math.PI);
        ctx.lineWidth = 55.5;
        ctx.strokeStyle = 'black';
        ctx.stroke(); 


        // Sekcje punktowe
        const colors = ['white', 'black'];
        const colors2 = ['red', 'green'];
        const sectorPoints = [10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20, 1, 18, 4, 13, 6];
        for (let i = 0; i < 20; i++) {
            const angle = ((i * 18) / 180 * Math.PI)+0.157;
            ctx.fillStyle = colors[i % 2];
            // Main area
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, 170, angle, angle + Math.PI / 10);
            ctx.lineTo(centerX, centerY);
            ctx.fill();

            // Double ring
            ctx.beginPath();
            //ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, 166, angle, angle + Math.PI / 10);
           //ctx.lineTo(centerX, centerY);
            ctx.lineWidth = 8;
            ctx.strokeStyle = colors2[i % 2];
            ctx.stroke();

            // Triple ring
            ctx.beginPath();
            ctx.arc(centerX, centerY, 103, angle, angle + Math.PI / 10);
            ctx.lineWidth = 8;
            ctx.strokeStyle = colors2[i % 2];
            ctx.stroke();


            // Numbers
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const numberRadius = 197.75;
            for (let i = 0; i < 20; i++) {
                const angle = ((i * 18) / 180 * Math.PI) + Math.PI / 10 ;
                const x = centerX + Math.cos(angle) * numberRadius;
                const y = centerY + Math.sin(angle) * numberRadius;
                ctx.fillText(sectorPoints[i].toString(), x, y);
            }



        }
        // Bullseye
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 6.35, 0, 2 * Math.PI);
        ctx.fill();

        // Outer bull
        ctx.beginPath();
        ctx.arc(centerX, centerY, 11.175, 0, 2 * Math.PI);
        ctx.lineWidth = 9.65;
        ctx.strokeStyle = 'green';
        ctx.stroke();
       

    }

    function calculatePoints(x, y) {
        const centerX = 451/2;
        const centerY = 451/2;
        const radius = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI + 189;

        if (radius < 16) return 25;

        const sectorPoints = [10, 14, 9, 12, 5, 20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8];
        const sectorIndex = Math.floor((angle / 18));
        const points = sectorPoints[sectorIndex];

        if (radius <= 170 && radius > 162) return points * 2;
        if (radius <= 162 && radius > 107) return points;
        if (radius <= 107 && radius > 99) return points * 3;
        if (radius <= 99) return points;

        return 0;
    }

    function updateScore() {
        scoreDisplay.textContent = `Punkty Gracza ${currentPlayer}: ${currentScore}`;
    }

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const points = calculatePoints(x, y);
        currentScore += points;
        updateScore();
    });

    document.getElementById('changePlayer').addEventListener('click', function() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        currentScore = 0;
        updateScore();
    });

    drawDartboard();
});
