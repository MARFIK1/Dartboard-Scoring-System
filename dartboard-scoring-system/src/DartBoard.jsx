import React, { useRef, useEffect, useState } from 'react';

function Dartboard() {
    const canvasRef = useRef(null);
    const [currentScore, setCurrentScore] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState(1);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        drawDartboard(ctx);
    }, []);

    const drawDartboard = (ctx) => {
        const centerX = 451 / 2;
        const centerY = 451 / 2;

        ctx.beginPath();
        ctx.arc(centerX, centerY, 197.75, 0, 2 * Math.PI);
        ctx.lineWidth = 55.5;
        ctx.strokeStyle = 'black';
        ctx.stroke(); 


        const colors = ['white', 'black'];
        const colors2 = ['red', 'green'];
        const sectorPoints = [10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20, 1, 18, 4, 13, 6];
        for (let i = 0; i < 20; i++) {
            const angle = ((i * 18) / 180 * Math.PI)+0.157;
            ctx.fillStyle = colors[i % 2];
            ctx.beginPath();
            ctx.moveTo(centerX + 18 * Math.cos(angle + (Math.PI / 180)/2), centerY + 18 * Math.sin(angle + (Math.PI / 180)/2));
            ctx.arc(centerX, centerY, 99, angle + (Math.PI / 180)/2, angle + Math.PI / 10  - (Math.PI / 180)/2);
            ctx.arc(centerX, centerY, 18, angle + Math.PI / 10  - (Math.PI / 180)/2, angle + (Math.PI / 180)/2, true);
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'grey';
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(centerX + 107 * Math.cos(angle + (Math.PI / 180)/2), centerY + 107 * Math.sin(angle + (Math.PI / 180)/2));
            ctx.arc(centerX, centerY, 162, angle + (Math.PI / 180)/2, angle + Math.PI / 10  - (Math.PI / 180)/2);
            ctx.arc(centerX, centerY, 107, angle + Math.PI / 10  - (Math.PI / 180)/2, angle + (Math.PI / 180)/2, true);
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'grey';
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(centerX + 99 * Math.cos(angle + (Math.PI / 180)/2), centerY + 99 * Math.sin(angle + (Math.PI / 180)/2));
            ctx.arc(centerX, centerY, 107, angle + (Math.PI / 180)/2, angle + Math.PI / 10  - (Math.PI / 180)/2);
            ctx.arc(centerX, centerY, 99, angle + Math.PI / 10  - (Math.PI / 180)/2, angle + (Math.PI / 180)/2, true);
            ctx.lineWidth = 4;
            ctx.fillStyle = colors2[i % 2];
            ctx.strokeStyle = 'grey';
            ctx.stroke();
            ctx.fill();
    
            ctx.beginPath();
            ctx.moveTo(centerX + 162 * Math.cos(angle + (Math.PI / 180)/2), centerY + 162 * Math.sin(angle + (Math.PI / 180)/2));
            ctx.arc(centerX, centerY, 170, angle + (Math.PI / 180)/2, angle + Math.PI / 10  - (Math.PI / 180)/2);
            ctx.arc(centerX, centerY, 162, angle + Math.PI / 10  - (Math.PI / 180)/2, angle + (Math.PI / 180)/2, true);
            ctx.lineWidth = 4;
            ctx.fillStyle = colors2[i % 2];
            ctx.strokeStyle = 'grey';
            ctx.stroke();
            ctx.fill();
    
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
         
        ctx.beginPath();
        ctx.arc(centerX, centerY, 6.35, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'grey';
        ctx.stroke(); 

        ctx.beginPath();
        ctx.arc(centerX, centerY,  6.35, 0, 2 * Math.PI);
        ctx.arc(centerX, centerY, 16, 0, 2 * Math.PI, true);
        ctx.fillStyle = 'green';
        ctx.fill();
    };

    const calculatePoints = (x, y) => {
        const centerX = 451/2;
        const centerY = 451/2;
        const radius = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI + 189;
        
        if (radius < 5.5) return 50;
        if (radius < 17 && radius > 7) return 25;

        const sectorPoints = [11, 14, 9, 12, 5, 20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11];
        const sectorIndex = Math.floor((angle / 18));
        const points = sectorPoints[sectorIndex];
        
        if (radius <= 170  && radius > 162) return points * 2;
        if (radius <= 160 && radius > 109) return points;
        if (radius <= 107 && radius > 99) return points * 3;
        if (radius <= 99 && radius > 18) return points;

        return 0;
    };

    const updateScore = (points) => {
        setCurrentScore(currentScore + points);
    };

    const handleCanvasClick = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const points = calculatePoints(x, y);
        updateScore(points);
    };

    const handleChangePlayer = () => {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        setCurrentScore(0);
    };

    return (
        <div>
            <canvas ref={canvasRef} width="451" height="451" onClick={handleCanvasClick} />
            <div id="score">Punkty Gracza {currentPlayer}: {currentScore}</div>
            <button onClick={handleChangePlayer}>Zmień gracza</button>
        </div>
    );
}

export default Dartboard;
