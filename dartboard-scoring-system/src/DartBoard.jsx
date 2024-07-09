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
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, 170, angle, angle + Math.PI / 10);
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'grey';
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.arc(centerX, centerY, 166, angle, angle + Math.PI / 10);
            ctx.lineWidth = 8;
            ctx.strokeStyle = colors2[i % 2];
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(centerX, centerY, 103, angle, angle + Math.PI / 10);
            ctx.lineWidth = 8;
            ctx.strokeStyle = colors2[i % 2];
            ctx.stroke();

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
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 6.35, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX, centerY, 11.175, 0, 2 * Math.PI);
        ctx.lineWidth = 9.65;
        ctx.strokeStyle = 'green';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerX, centerY, 171, Math.PI/20, 2 * Math.PI + Math.PI/20);
        ctx.arc(centerX, centerY, 163, Math.PI/20, 2 * Math.PI + Math.PI/20);
        ctx.arc(centerX, centerY, 108, Math.PI/20, 2 * Math.PI + Math.PI/20);
        ctx.arc(centerX, centerY, 100, Math.PI/20, 2 * Math.PI + Math.PI/20);
        ctx.arc(centerX, centerY, 16, Math.PI/20, 2 * Math.PI + Math.PI/20);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'grey';
        ctx.stroke(); 

        ctx.beginPath();
        ctx.arc(centerX, centerY, 6.35, Math.PI/20, 2 * Math.PI + Math.PI/20);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'grey';
        ctx.stroke(); 
    };

    const calculatePoints = (x, y) => {
        const centerX = 451/2;
        const centerY = 451/2;
        const radius = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI + 189;
        if (radius < 6.35) return 50;
        if (radius < 16) return 25;

        const sectorPoints = [110, 14, 9, 12, 5, 20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11];
        const sectorIndex = Math.floor((angle / 18));
        const points = sectorPoints[sectorIndex];

        if (radius <= 170 && radius > 162) return points * 2;
        if (radius <= 162 && radius > 107) return points;
        if (radius <= 107 && radius > 99) return points * 3;
        if (radius <= 99) return points;

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
