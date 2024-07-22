import React, { useRef, useEffect, useState } from 'react';

function Dartboard() {
    const canvasRef = useRef(null);
    const [scores, setScores] = useState(() => {
        const savedScores = JSON.parse(localStorage.getItem('dartScores'));
        return savedScores || { player1: 501, player2: 501 };
    });
    const [currentPlayer, setCurrentPlayer] = useState(() => {
        const savedCurrentPlayer = JSON.parse(localStorage.getItem('currentPlayer'));
        return savedCurrentPlayer || 1;
    });
    const [throws, setThrows] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [startRound, setStartRound] = useState(501);
    const [throwHistory, setThrowHistory] = useState(() => {
        const savedHistory = JSON.parse(localStorage.getItem('throwHistory'));
        return savedHistory || [];
    });
    const [selectedThrow, setSelectedThrow] = useState(null);

    useEffect(() => {
        localStorage.setItem('dartScores', JSON.stringify(scores));
    }, [scores]);

    useEffect(() => {
        localStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
    }, [currentPlayer]);


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        drawDartboard(ctx);
    }, []);

    useEffect(() => {
        localStorage.setItem('throwHistory', JSON.stringify(throwHistory));
    }, [throwHistory]);

    const drawDartboard = (ctx) => {
        const centerX = 451 / 2;
        const centerY = 451 / 2;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        ctx.beginPath();
        ctx.arc(centerX, centerY, 197.75, 0, 2 * Math.PI);
        ctx.lineWidth = 55.5;
        ctx.strokeStyle = 'black';
        ctx.stroke(); 

        const colors = ['white', 'black'];
        const colors2 = ['red', 'green'];
        const sectorPoints = [10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20, 1, 18, 4, 13, 6];
        for (let i = 0; i < 20; i++) {
            const angle = ((i * 18) / 180 * Math.PI) + 0.157;
            ctx.fillStyle = colors[i % 2];
            ctx.beginPath();
            ctx.moveTo(centerX + 18 * Math.cos(angle + (Math.PI / 180) / 2), centerY + 18 * Math.sin(angle + (Math.PI / 180) / 2));
            ctx.arc(centerX, centerY, 99, angle + (Math.PI / 180) / 2, angle + Math.PI / 10  - (Math.PI / 180) / 2);
            ctx.arc(centerX, centerY, 18, angle + Math.PI / 10  - (Math.PI / 180) / 2, angle + (Math.PI / 180) / 2, true);
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'grey';
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(centerX + 107 * Math.cos(angle + (Math.PI / 180) / 2), centerY + 107 * Math.sin(angle + (Math.PI / 180) / 2));
            ctx.arc(centerX, centerY, 162, angle + (Math.PI / 180) / 2, angle + Math.PI / 10  - (Math.PI / 180) / 2);
            ctx.arc(centerX, centerY, 107, angle + Math.PI / 10  - (Math.PI / 180) / 2, angle + (Math.PI / 180) / 2, true);
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'grey';
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(centerX + 99 * Math.cos(angle + (Math.PI / 180) / 2), centerY + 99 * Math.sin(angle + (Math.PI / 180) / 2));
            ctx.arc(centerX, centerY, 107, angle + (Math.PI / 180) / 2, angle + Math.PI / 10  - (Math.PI / 180) / 2);
            ctx.arc(centerX, centerY, 99, angle + Math.PI / 10  - (Math.PI / 180) / 2, angle + (Math.PI / 180) / 2, true);
            ctx.lineWidth = 4;
            ctx.fillStyle = colors2[i % 2];
            ctx.strokeStyle = 'grey';
            ctx.stroke();
            ctx.fill();
    
            ctx.beginPath();
            ctx.moveTo(centerX + 162 * Math.cos(angle + (Math.PI / 180) / 2), centerY + 162 * Math.sin(angle + (Math.PI / 180) / 2));
            ctx.arc(centerX, centerY, 170, angle + (Math.PI / 180) / 2, angle + Math.PI / 10  - (Math.PI / 180) / 2);
            ctx.arc(centerX, centerY, 162, angle + Math.PI / 10  - (Math.PI / 180) / 2, angle + (Math.PI / 180) / 2, true);
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
                const angle = ((i * 18) / 180 * Math.PI) + Math.PI / 10;
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
        const centerX = 451 / 2;
        const centerY = 451 / 2;
        const radius = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI + 189;
        
        if (radius < 5.5) { 
            return { points: 50, isDouble: false }; }
        if (radius < 17 && radius > 7) { 
            return { points: 25, isDouble: false }; }

        const sectorPoints = [11, 14, 9, 12, 5, 20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11];
        const sectorIndex = Math.floor((angle / 18));
        const points = sectorPoints[sectorIndex];
        
        if (radius <= 170  && radius > 162) {
            return { points: points * 2, isDouble: true };
        }
        if (radius <= 160 && radius > 109) {
            return { points: points, isDouble: false };
        }
        if (radius <= 107 && radius > 99) {
            return { points: points * 3, isDouble: false };
        }
        if (radius <= 99 && radius > 18) {
            return { points: points, isDouble: false };
        }

        return { points: 0, isDouble: false };
    };

    const handleCanvasClick = (event) => {
        if (gameOver)
            return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const { points, isDouble } = calculatePoints(x, y);
        const newScores = { ...scores };
        let i = 1;
        if (currentPlayer === 1) {
            if(newScores.player1 - points === 0 && isDouble === true) {
                setGameOver(true);
                setWinner(1);
            }
            else if(newScores.player1 - points > 1) {
                newScores.player1 = newScores.player1 - points;
            }
            else {
                newScores.player1 = startRound;
                i = 3;
            }

        } 
        else {
            if(newScores.player2 - points === 0 && isDouble === true) {
                setGameOver(true);
                setWinner(2);
            }
            else if(newScores.player2 - points > 1) {
                newScores.player2 = newScores.player2 - points;
            }
            else {
                newScores.player2 = startRound;
                i = 3;
            }
        }

        setScores(newScores);
        setThrows(throws + i);
        drawDart(x, y, currentPlayer);

        const newThrow = { player: currentPlayer, points: points, x, y };
        setThrowHistory([newThrow, ...throwHistory]);

        if (throws + i > 2) {
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
            setThrows(0);
            if (currentPlayer === 1) {
                setStartRound(scores.player2);
            }
            if (currentPlayer === 2) {
                setStartRound(scores.player1);
            }
        }
    };

    const drawDart = (x, y, player) => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = player === 1 ? 'orange' : 'blue';
        ctx.fill();
    };

    const handleReset = () => {
        setScores({ player1: 501, player2: 501 });
        setCurrentPlayer(1);
        setThrows(0);
        setGameOver(false);
        setWinner(null);
        setThrowHistory([]);
        setSelectedThrow(null);
        localStorage.removeItem('dartScores');
        localStorage.removeItem('currentPlayer');
        localStorage.removeItem('throws');
        localStorage.removeItem('throwHistory');
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        drawDartboard(ctx);
    };

    const handleThrowClick = (throwDetails) => {
        setSelectedThrow(throwDetails);
        const ctx = canvasRef.current.getContext('2d');
        drawDartboard(ctx);
        drawDart(throwDetails.x, throwDetails.y, throwDetails.player);
    };

    const handleShowAll = () => {
        setSelectedThrow(null);
        const ctx = canvasRef.current.getContext('2d');
        drawDartboard(ctx);
        throwHistory.forEach((throwDetails) => {
            drawDart(throwDetails.x, throwDetails.y, throwDetails.player);
        });
    };

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <button onClick={handleReset} style={{ position: 'absolute', top: 10, left: 10 }}>Reset</button>
                <canvas ref={canvasRef} width="451" height="451" onClick={handleCanvasClick} />
                <div id="score">
                    <div style={{ color: currentPlayer === 1 ? 'orange' : 'black' }}>
                        Gracz 1: {scores.player1}
                        {currentPlayer === 1 && (
                            <div>
                                {[...Array(3 - throws)].map((_, i) => (
                                    <span key={i}>&#9679; </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div style={{ color: currentPlayer === 2 ? 'blue' : 'black' }}>
                        Gracz 2: {scores.player2}
                        {currentPlayer === 2 && (
                            <div>
                                {[...Array(3 - throws)].map((_, i) => (
                                    <span key={i}>&#9679; </span>
                                ))}
                            </div>
                        )}
                    </div>
                    {gameOver && (
                        <div>
                            <h2>Gra zakończona!</h2>
                            <p>Wygrał gracz {winner}!</p>
                        </div>
                    )}
                </div>
            </div>
            <div style={{ marginLeft: '50px', maxHeight: '510px', overflowY: 'auto', scrollbarWidth: 'none', width: '400px' }}>
                <h3>Historia rzutów</h3>
                <button onClick={handleShowAll}>Pokaż wszystkie</button>
                <table border="1" style={{ width: '100%', marginTop: '50px' }}>
                    <thead>
                        <tr>
                            <th>Gracz</th>
                            <th>Punkty</th>
                            <th>Akcja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {throwHistory.map((throwDetails, index) => (
                            <tr key={index}>
                                <td style={{ backgroundColor: throwDetails.player === 1 ? 'orange' : 'blue', color: 'white' }}>
                                    {throwDetails.player}
                                </td>
                                <td>{throwDetails.points}</td>
                                <td><button onClick={() => handleThrowClick(throwDetails)}>Pokaż</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dartboard;
