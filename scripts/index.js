let gameStartTime = null;
let bestWinTime = null;
let animationFrameId = null;
let gameWon = false;
let gameOver = false;
let isPaused = false;
let gameStarted = false;
let maxHealth = 100;
let currentHealth = 100;
let maxSystemHealth = 100;
let currentSystemHealth = 70;
let shardsCollected = 0;
let keysCollected = 0;
let pauseStartTime = null; ///
let totalPausedTime = 0; ///
let lastHealthUpdateTime = null; ///
let lastBlinkTime = 0; ///
let isDangerSoundPlaying = false; ///
let blinkOn = false; ///
let dangerBlink = false; ///
let lastDirection = { x: 0, y: -1 };
let arcAngle = 0;
const bullets = [];
const keysOnMap = [];
const playingSounds = new Set();
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 768;
const playerHealthBar = document.getElementById('player-health-bar');
const systemHealthBar = document.getElementById('system-health-bar');
const keys = { w: false, a: false, s: false, d: false };
const blueCircle = { x: 323.65, y: 98.76, radius: 40 };
const orangeSquare = {
    vertices: [
        { x: 765.23, y: 433.04 },
        { x: 765.23, y: 525.04 },
        { x: 845.23, y: 525.04 },
        { x: 845.23, y: 433.04 }
    ]
};
const red = [
    { x: 159.65, y: 8.53 }, { x: 159.65, y: 217.53 },
    { x: 159.65, y: 473.53 }, { x: 159.65, y: 710.53 },
    { x: 483.65, y: 14.53 }, { x: 483.65, y: 223.53 },
    { x: 485.65, y: 477.53 }, { x: 475.65, y: 712.53 },
    { x: 801.65, y: 8.53 }, { x: 803.65, y: 223.53 },
    { x: 801.65, y: 710.53 }, { x: 1126.65, y: 12.53 },
    { x: 1125.65, y: 225.53 }, { x: 1126.65, y: 479.53 },
    { x: 1126.65, y: 712.53 }
];
const buildings = [
    [{ x: 732.23, y: 161.01 }, { x: 735.23, y: 239.01 }, { x: 783.23, y: 236.01 }, { x: 787.23, y: 279.01 }, { x: 833.23, y: 279.01 }, { x: 827.23, y: 233.01 }, { x: 848.23, y: 236.01 }, { x: 857.23, y: 276.01 }, { x: 879.23, y: 279.01 }, { x: 876.23, y: 174.01 }, { x: 813.23, y: 176.01 }, { x: 813.23, y: 201.01 }, { x: 772.23, y: 204.01 }, { x: 766.23, y: 160.01 }],
    [{ x: 1061.23, y: 420.01 }, { x: 1061.23, y: 475.01 }, { x: 1099.23, y: 538.01 }, { x: 1156.23, y: 540.01 }, { x: 1200.23, y: 492.01 }, { x: 1174.23, y: 406.01 }, { x: 1104.23, y: 423.01 }, { x: 1060.23, y: 411.01 }],
    [{ x: 1060.23, y: 674.01 }, { x: 1060.23, y: 768.01 }, { x: 1176.23, y: 766.01 }, { x: 1177.23, y: 670.01 }],
    [{ x: 756.23, y: 667.01 }, { x: 737.23, y: 728.01 }, { x: 800.23, y: 725.01 }, { x: 804.23, y: 767.01 }, { x: 851.23, y: 766.01 }, { x: 854.23, y: 726.01 }, { x: 876.23, y: 725.01 }, { x: 878.23, y: 687.01 }, { x: 821.23, y: 685.01 }, { x: 824.23, y: 661.01 }],
    [{ x: 1070.23, y: 160.01 }, { x: 1067.23, y: 215.01 }, { x: 1105.23, y: 212.01 }, { x: 1097.23, y: 259.01 }, { x: 1056.23, y: 250.01 }, { x: 1051.23, y: 297.01 }, { x: 1197.23, y: 296.01 }, { x: 1198.23, y: 156.01 }, { x: 1060.23, y: 157.01 }],
    [{ x: 1066.23, y: -0.99 }, { x: 1064.23, y: 33.01 }, { x: 1115.23, y: 37.01 }, { x: 1118.23, y: 54.01 }, { x: 1162.23, y: 54.01 }, { x: 1157.23, y: 2.01 }],
    [{ x: 756.23, y: 0.01 }, { x: 759.23, y: 46.01 }, { x: 823.23, y: 47.01 }, { x: 855.23, y: 0.01 }],
    [{ x: 415.23, y: 154.01 }, { x: 483.23, y: 153.01 }, { x: 483.23, y: 198.01 }, { x: 521.23, y: 198.01 }, { x: 525.23, y: 144.01 }, { x: 545.23, y: 143.01 }, { x: 552.23, y: 288.01 }, { x: 498.23, y: 294.01 }, { x: 423.23, y: 248.01 }, { x: 412.23, y: 152.01 }],
    [{ x: 419.23, y: -0.99 }, { x: 443.23, y: 32.01 }, { x: 504.23, y: 40.01 }, { x: 552.23, y: -0.99 }],
    [{ x: 440.23, y: 425.01 }, { x: 450.23, y: 543.01 }, { x: 546.23, y: 497.01 }, { x: 514.23, y: 431.01 }],
    [{ x: 419.23, y: 680.01 }, { x: 473.23, y: 663.01 }, { x: 540.23, y: 715.01 }, { x: 488.23, y: 747.01 }, { x: 480.23, y: 711.01 }, { x: 450.23, y: 725.01 }],
    [{ x: 120.23, y: 0.01 }, { x: 118.23, y: 44.01 }, { x: 185.23, y: 48.01 }, { x: 185.23, y: 0.01 }],
    [{ x: 97.23, y: 183.01 }, { x: 139.23, y: 152.01 }, { x: 221.23, y: 143.01 }, { x: 223.23, y: 276.01 }, { x: 158.23, y: 259.01 }, { x: 94.23, y: 266.01 }, { x: 93.23, y: 188.01 }],
    [{ x: 108.23, y: 466.01 }, { x: 173.23, y: 418.01 }, { x: 217.23, y: 458.01 }, { x: 217.23, y: 545.01 }, { x: 110.23, y: 541.01 }],
    [{ x: 93.23, y: 688.01 }, { x: 144.23, y: 661.01 }, { x: 231.23, y: 766.01 }, { x: 145.23, y: 767.01 }]
].map(building => ({
    vertices: building.map(p => ({ ...p })),
    originalVertices: building.map(p => ({ ...p })),
    hit: false,
    hits: 0,
    visible: true
}));
const redArcs = red.map(pos => ({
    x: pos.x,
    y: pos.y,
    radius: 80,
    startAngleOffset: Math.random() * 2 * Math.PI,
    hits: 0,
    visible: true
}));
const circle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    speed: 5
};
const startSound = new Audio('../sounds/start.mp3');
const dangerSound = new Audio('../sounds/red.mp3');
dangerSound.loop = true;
const healSound = new Audio('../sounds/health.mp3');
const fireSound = new Audio('../sounds/fire.mp3');
const bounceSound = new Audio('../sounds/bounce.mp3');
const uiClickSound = new Audio('../sounds/button.mp3');
const winSound = new Audio('../sounds/end.mp3');
const keyCollectSound = new Audio('../sounds/key.mp3');
const destroySound = new Audio('../sounds/destroy.mp3');
function playSound(sound) {
    try {
        const s = sound.cloneNode(true);
        s.volume = 1.0;
        s.play().then(() => playingSounds.add(s)).catch(() => { });
        s.onended = () => playingSounds.delete(s);
    } 
    catch (e) {
        console.warn(`Sound error for ${sound.src}:`, e);
    }
}
function stopDangerSound() {
    dangerSound.pause();
    dangerSound.currentTime = 0;
    isDangerSoundPlaying = false;
}
function drawRotatingArc(arc) {
    const { x, y, radius } = arc;
    const angle = arc.startAngleOffset + arcAngle;
    const startAngle = angle;
    const endAngle = angle + Math.PI / 5;
    c.beginPath();
    c.moveTo(x, y);
    c.arc(x, y, radius, startAngle, endAngle);
    c.closePath();
    c.fillStyle = 'rgba(255, 0, 0, 0.2)';
    c.fill();
    c.beginPath();
    c.arc(x, y, radius, startAngle, endAngle);
    c.strokeStyle = 'red';
    c.lineWidth = 3;
    c.shadowColor = 'red';
    c.shadowBlur = 15;
    c.stroke();
    c.shadowBlur = 0;
    c.closePath();
    const x1 = x + radius * Math.cos(startAngle);
    const y1 = y + radius * Math.sin(startAngle);
    const x2 = x + radius * Math.cos(endAngle);
    const y2 = y + radius * Math.sin(endAngle);
    c.beginPath();
    c.moveTo(x, y); 
    c.lineTo(x1, y1);
    c.moveTo(x, y); 
    c.lineTo(x2, y2);
    c.strokeStyle = 'red';
    c.lineWidth = 1.5;
    c.stroke();
    c.closePath();
}
function drawAllRedArcs() {
    redArcs.forEach(arc => {
        if (!arc.visible) return;
        drawRotatingArc(arc);
    });
}
function drawOrangeSquare() {
    const v = orangeSquare.vertices;
    c.beginPath();
    c.moveTo(v[0].x, v[0].y);
    for (let i = 1; i < v.length; i++) {
        c.lineTo(v[i].x, v[i].y);
    }
    c.closePath();
    c.fillStyle = 'orange';
    c.globalAlpha = 0.6;
    c.shadowColor = 'orange';
    c.shadowBlur = 10;
    c.fill();
    c.lineWidth = 2;
    c.strokeStyle = 'white';
    c.stroke();
    c.globalAlpha = 1;
    c.shadowBlur = 0;
}
function drawPolygon(polygon, color = 'purple') {
    if (!polygon.visible) return;
    c.beginPath();
    c.moveTo(polygon.vertices[0].x, polygon.vertices[0].y);
    for (let i = 1; i < polygon.vertices.length; i++) {
        c.lineTo(polygon.vertices[i].x, polygon.vertices[i].y);
    }
    c.closePath();
    c.fillStyle = color;
    c.shadowColor = color;
    c.shadowBlur = 20;
    c.globalAlpha = 0.4;
    c.fill();
    c.lineWidth = 2;
    c.strokeStyle = 'white';
    c.globalAlpha = 0.6;
    c.stroke();
    c.globalAlpha = 1;
    c.shadowBlur = 0;
}
function drawScene() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(image, 0, 0, canvas.width, canvas.height);
    drawOrangeSquare();
    buildings.forEach(building => {
        drawPolygon(building, 'purple');
    });
    c.beginPath();
    c.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    c.fillStyle = 'white';
    c.fill();
    c.closePath();
    bullets.forEach(bullet => {
        c.beginPath();
        c.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        c.fillStyle = 'violet';
        c.fill();
        c.closePath();
    });
    keysOnMap.forEach(key => {
        c.beginPath();
        c.arc(key.x, key.y, key.radius, 0, Math.PI * 2);
        c.fillStyle = 'red';
        c.fill();
        c.closePath();
    });
    if (blueCircle) {
        c.beginPath();
        c.arc(blueCircle.x, blueCircle.y, blueCircle.radius, 0, Math.PI * 2);
        c.fillStyle = 'blue';
        c.shadowColor = 'blue';
        c.shadowBlur = 10;
        c.fill();
        c.closePath();
        c.shadowBlur = 0;
    }
    drawAllRedArcs();
}
function isPointInPolygon(point, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;
        const intersect = ((yi > point.y) !== (yj > point.y)) &&
            (point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}
function isCircleTouchingPolygon(circle, polygon) {
    for (let i = 0; i < polygon.length; i++) {
        const a = polygon[i];
        const b = polygon[(i + 1) % polygon.length];
        const nearest = getClosestPointOnSegment(circle, a, b);
        const dist = Math.hypot(circle.x - nearest.x, circle.y - nearest.y);
        if (dist <= circle.radius) return true;
    }
    return false;
}
function getClosestPointOnSegment(circle, a, b) {
    const atob = { x: b.x - a.x, y: b.y - a.y };
    const atop = { x: circle.x - a.x, y: circle.y - a.y };
    const len = atob.x * atob.x + atob.y * atob.y;
    const dot = atop.x * atob.x + atop.y * atob.y;
    const t = Math.max(0, Math.min(1, dot / len));
    return {
        x: a.x + atob.x * t,
        y: a.y + atob.y * t
    };
}
function isCircleTouchingPoint(circle, point) {
    const dx = circle.x - point.x;
    const dy = circle.y - point.y;
    const distance = Math.hypot(dx, dy);
    return distance <= 70;
}
function getPolygonNormal(bullet, vertices) {
    let minDist = Infinity, closestNormal = { x: 0, y: 0 };
    for (let i = 0; i < vertices.length; i++) {
        const a = vertices[i], b = vertices[(i + 1) % vertices.length];
        const edge = { x: b.x - a.x, y: b.y - a.y };
        const len = Math.hypot(edge.x, edge.y);
        const normal = { x: -edge.y / len, y: edge.x / len };
        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const dist = Math.hypot(bullet.x - mid.x, bullet.y - mid.y);
        if (dist < minDist) {
            minDist = dist;
            closestNormal = normal;
        }
    }
    return closestNormal;
}
function isPlayerInRedArcZone() {
    for (const arc of redArcs) {
        if (!arc.visible) continue;
        const dx = circle.x - arc.x;
        const dy = circle.y - arc.y;
        const dist = Math.hypot(dx, dy);
        if (dist > arc.radius) continue;
        const angleToPlayer = Math.atan2(dy, dx);
        const arcAngleStart = (arc.startAngleOffset + arcAngle) % (2 * Math.PI);
        const arcAngleEnd = (arcAngleStart + Math.PI / 5) % (2 * Math.PI);
        const playerAngle = (angleToPlayer + 2 * Math.PI) % (2 * Math.PI);
        if (arcAngleStart < arcAngleEnd) {
            if (playerAngle >= arcAngleStart && playerAngle <= arcAngleEnd) return true;
        } 
        else {
            if (playerAngle >= arcAngleStart || playerAngle <= arcAngleEnd) return true;
        }
    }
    return false;
}
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}
function spawnKey() {
    const maxAttempts = 1000;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const x = Math.random() * (canvas.width - 20) + 10;
        const y = Math.random() * (canvas.height - 20) + 10;
        const key = { x, y, radius: 5 };
        if (Math.hypot(circle.x - x, circle.y - y) < circle.radius + 10) continue;
        let blocked = false;
        if (isPointInPolygon(key, orangeSquare.vertices)) blocked = true;
        if (Math.hypot(x - blueCircle.x, y - blueCircle.y) < blueCircle.radius + 10) blocked = true;
        if (blocked) continue;
        keysOnMap.push(key);
        return;
    }
    keysOnMap.push({
        x: canvas.width / 2 + 50,
        y: canvas.height / 2 + 50,
        radius: 5
    });
}
function updateHealthBar(bar, current, max) {
    const percent = (current / max) * 100;
    bar.style.width = `${percent}%`;
    if (percent > 60) bar.style.backgroundColor = 'green';
    else if (percent > 30) bar.style.backgroundColor = 'orange';
    else bar.style.backgroundColor = 'red';
}
function updatePosition() {
    let dx = 0, dy = 0;
    if (keys.w) dy = -1;
    if (keys.s) dy = 1;
    if (keys.a) dx = -1;
    if (keys.d) dx = 1;
    if (dx || dy) {
        const len = Math.hypot(dx, dy);
        let nextX = circle.x + (dx / len) * circle.speed;
        let nextY = circle.y + (dy / len) * circle.speed;
        nextX = Math.max(circle.radius, Math.min(canvas.width - circle.radius, nextX));
        nextY = Math.max(circle.radius, Math.min(canvas.height - circle.radius, nextY));
        const blocked = buildings.some(b => b.visible && isPointInPolygon({ x: nextX, y: nextY }, b.vertices)) ||
            isPointInPolygon({ x: nextX, y: nextY }, orangeSquare.vertices) ||
            Math.hypot(nextX - blueCircle.x, nextY - blueCircle.y) <= (circle.radius + blueCircle.radius);
        if (!blocked) {
            circle.x = nextX;
            circle.y = nextY;
            lastDirection = { x: dx / len, y: dy / len };
        }
    }
    for (let i = keysOnMap.length - 1; i >= 0; i--) {
        const key = keysOnMap[i];
        const dist = Math.hypot(circle.x - key.x, circle.y - key.y);
        if (dist <= circle.radius + key.radius) {
            let insideVisibleBuilding = false;
            for (const building of buildings) {
                if (building.visible && isPointInPolygon(key, building.vertices)) {
                    insideVisibleBuilding = true;
                    break;
                }
            }
            if (!insideVisibleBuilding) {
                keysOnMap.splice(i, 1);
                keysCollected++;
                playSound(keyCollectSound);
                document.getElementById('key').innerText = `KEYS : ${keysCollected}`;
                spawnKey();
            }
        }
    }
    if (isCircleTouchingPolygon(circle, orangeSquare.vertices)) {
        const shardsToGive = Math.floor(keysCollected / 5);
        if (shardsToGive > 0) {
            shardsCollected += shardsToGive;
            keysCollected -= shardsToGive * 5;
            document.getElementById('key').innerText = `KEYS : ${keysCollected}`;
            document.getElementById('shard').innerText = `SHARDS : ${shardsCollected}`;
        }
    }
    if (isCircleTouchingPoint(circle, blueCircle)) {
        if (shardsCollected > 0) {
            const healings = shardsCollected;
            shardsCollected = 0;
            currentSystemHealth = Math.min(maxSystemHealth, currentSystemHealth + maxSystemHealth * 0.05 * healings);
            currentHealth = Math.min(maxHealth, currentHealth + maxHealth * 0.10 * healings);
            playSound(healSound);
            updateHealthBar(playerHealthBar, currentHealth, maxHealth);
            updateHealthBar(systemHealthBar, currentSystemHealth, maxSystemHealth);
            document.getElementById('shard').innerText = `SHARDS : ${shardsCollected}`;
        }
    }
}
function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        let reflected = false;
        let nextX = bullet.x + bullet.vx;
        let nextY = bullet.y + bullet.vy;
        for (const building of buildings) {
            if (!building.visible) continue;
            if (isPointInPolygon({ x: nextX, y: nextY }, building.vertices)) {
                building.hits++;
                if (building.hits === 1) {
                    const cx = building.vertices.reduce((sum, p) => sum + p.x, 0) / building.vertices.length;
                    const cy = building.vertices.reduce((sum, p) => sum + p.y, 0) / building.vertices.length;
                    building.vertices = building.vertices.map(p => ({
                        x: cx + 0.7 * (p.x - cx),
                        y: cy + 0.7 * (p.y - cy)
                    }));
                }
                else if (building.hits >= 2) {
                    playSound(destroySound);
                    building.visible = false;
                }
                const norm = getPolygonNormal(bullet, building.vertices);
                const dot = bullet.vx * norm.x + bullet.vy * norm.y;
                bullet.vx -= 2 * dot * norm.x;
                bullet.vy -= 2 * dot * norm.y;
                playSound(bounceSound);
                bullet.speed = Math.max(0.5, bullet.speed - 0.5);
                const len = Math.hypot(bullet.vx, bullet.vy);
                bullet.vx = (bullet.vx / len) * bullet.speed;
                bullet.vy = (bullet.vy / len) * bullet.speed;
                bullet.collisions++;
                reflected = true;
                break;
            }
        }
        if (!reflected && isPointInPolygon({ x: nextX, y: nextY }, orangeSquare.vertices)) {
            const norm = getPolygonNormal(bullet, orangeSquare.vertices);
            const dot = bullet.vx * norm.x + bullet.vy * norm.y;
            bullet.vx -= 2 * dot * norm.x;
            bullet.vy -= 2 * dot * norm.y;
            playSound(bounceSound);
            bullet.speed = Math.max(0.5, bullet.speed - 0.5);
            const len = Math.hypot(bullet.vx, bullet.vy);
            bullet.vx = (bullet.vx / len) * bullet.speed;
            bullet.vy = (bullet.vy / len) * bullet.speed;
            bullet.collisions++;
            reflected = true;
        }
        if (!reflected && blueCircle) {
            const dist = Math.hypot(nextX - blueCircle.x, nextY - blueCircle.y);
            if (dist <= blueCircle.radius + bullet.radius) {
                const norm = {
                    x: (bullet.x - blueCircle.x) / dist,
                    y: (bullet.y - blueCircle.y) / dist
                };
                const dot = bullet.vx * norm.x + bullet.vy * norm.y;
                bullet.vx -= 2 * dot * norm.x;
                bullet.vy -= 2 * dot * norm.y;
                playSound(bounceSound);
                bullet.speed = Math.max(0.5, bullet.speed - 0.5);
                const len = Math.hypot(bullet.vx, bullet.vy);
                bullet.vx = (bullet.vx / len) * bullet.speed;
                bullet.vy = (bullet.vy / len) * bullet.speed;
                bullet.collisions++;
                reflected = true;
            }
        }
        if (!reflected) {
            for (const arc of redArcs) {
                if (!arc.visible) continue;
                const angle = arc.startAngleOffset + arcAngle;
                const start = angle;
                const end = angle + Math.PI / 5;
                const dx = bullet.x - arc.x;
                const dy = bullet.y - arc.y;
                const dist = Math.hypot(dx, dy);
                const angleToBullet = Math.atan2(dy, dx);
                const normalizedAngle = (angleToBullet + 2 * Math.PI) % (2 * Math.PI);
                const normStart = (start + 2 * Math.PI) % (2 * Math.PI);
                const normEnd = (end + 2 * Math.PI) % (2 * Math.PI);
                const inAngle = normStart < normEnd
                    ? normalizedAngle >= normStart && normalizedAngle <= normEnd
                    : normalizedAngle >= normStart || normalizedAngle <= normEnd;
                if (dist <= arc.radius && inAngle) {
                    if (!bullet.hitArcs.has(arc)) {
                        arc.hits++;
                        bullet.hitArcs.add(arc);
                        if (arc.hits >= 3) {
                            playSound(destroySound);
                            arc.visible = false;
                        }
                    }
                    bullet.vx = -bullet.vx;
                    bullet.vy = -bullet.vy;
                    playSound(bounceSound);
                    bullet.speed = Math.max(0.5, bullet.speed - 0.5);
                    const len = Math.hypot(bullet.vx, bullet.vy);
                    bullet.vx = (bullet.vx / len) * bullet.speed;
                    bullet.vy = (bullet.vy / len) * bullet.speed;
                    bullet.collisions++;
                    reflected = true;
                    break;
                }
            }
        }
        if (!reflected && (nextX <= 0 || nextX >= canvas.width)) {
            bullet.vx = -bullet.vx;
            playSound(bounceSound);
            bullet.speed = Math.max(0.5, bullet.speed - 0.5);
            const len = Math.hypot(bullet.vx, bullet.vy);
            bullet.vx = (bullet.vx / len) * bullet.speed;
            bullet.vy = (bullet.vy / len) * bullet.speed;
            bullet.collisions++;
        }
        if (!reflected && (nextY <= 0 || nextY >= canvas.height)) {
            bullet.vy = -bullet.vy;
            playSound(bounceSound);
            bullet.speed = Math.max(0.5, bullet.speed - 0.5);
            const len = Math.hypot(bullet.vx, bullet.vy);
            bullet.vx = (bullet.vx / len) * bullet.speed;
            bullet.vy = (bullet.vy / len) * bullet.speed;
            bullet.collisions++;
        }
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
        for (const arc of redArcs) {
            if (!arc.visible) continue;
            if (bullet.hitArcs.has(arc)) {
                const dx = bullet.x - arc.x;
                const dy = bullet.y - arc.y;
                const dist = Math.hypot(dx, dy);
                if (dist > arc.radius + bullet.radius + 5) {
                    bullet.hitArcs.delete(arc);
                }
            }
        }
        if (bullet.collisions >= 3) bullets.splice(i, 1);
    }
}
function fireBullet() {
    const speed = 3;
    let vx = lastDirection.x * speed;
    let vy = lastDirection.y * speed;
    if (vx === 0 && vy === 0) vy = -speed;
    playSound(fireSound);
    bullets.push({ x: circle.x, y: circle.y, vx, vy, speed, radius: 5, collisions: 0, hitArcs: new Set() });
}
function animate(timestamp) {
    const now = performance.now();
    if (isPaused && pauseStartTime === null) pauseStartTime = now;
    if (!isPaused && pauseStartTime !== null) {
        totalPausedTime += now - pauseStartTime;
        pauseStartTime = null;
    }
    if (isPaused) lastHealthUpdateTime = now;
    if (!isPaused) {
        arcAngle += 0.01;
        updatePosition();
        updateBullets();
        drawScene();
        const inRedArc = isPlayerInRedArcZone();
        const playerLow = currentHealth / maxHealth <= 0.3;
        const systemLow = currentSystemHealth / maxSystemHealth <= 0.3;
        dangerBlink = inRedArc || playerLow || systemLow;
    }
    if (!isPaused && (currentHealth > 0 || currentSystemHealth > 0)) {
        if (lastHealthUpdateTime === null) lastHealthUpdateTime = now;
        const deltaTime = (now - lastHealthUpdateTime) / 1000;
        lastHealthUpdateTime = now;
        const basePlayerRate = 1;
        const arcPenaltyRate = 0.5;
        const playerDecreaseRate = isPlayerInRedArcZone()
            ? basePlayerRate + arcPenaltyRate
            : basePlayerRate;
        const systemDecreaseRate = 0.5;
        currentHealth = Math.max(0, currentHealth - deltaTime * playerDecreaseRate);
        currentSystemHealth = Math.max(0, currentSystemHealth - deltaTime * systemDecreaseRate);
        updateHealthBar(playerHealthBar, currentHealth, maxHealth);
        updateHealthBar(systemHealthBar, currentSystemHealth, maxSystemHealth);
        if (currentHealth === 0 || currentSystemHealth === 0) {
            isPaused = true;
            gameOver = true;
            stopDangerSound();
            dangerBlink = false;
            blinkOn = false;
            document.body.style.backgroundColor = 'white';
            playSound(winSound);
            setTimeout(() => {
                showWelcomeMessage("YOU LOSS", "GIVE IT ANOTHER TRY");
            }, 1000);
        } else if (currentSystemHealth >= maxSystemHealth - 0.1) {
            currentSystemHealth = maxSystemHealth;
            updateHealthBar(systemHealthBar, currentSystemHealth, maxSystemHealth);
            isPaused = true;
            gameWon = true;
            stopDangerSound();
            dangerBlink = false;
            blinkOn = false;
            document.body.style.backgroundColor = 'white';
            playSound(winSound);
            if (gameStartTime !== null) {
                const effectiveWinTime = now - gameStartTime - totalPausedTime;
                const stored = localStorage.getItem('bestWinTime');
                bestWinTime = stored ? parseFloat(stored) : NaN;
                if (isNaN(bestWinTime) || effectiveWinTime < bestWinTime) {
                    bestWinTime = effectiveWinTime;
                    localStorage.setItem('bestWinTime', bestWinTime);
                }
                setTimeout(() => {
                    showWelcomeMessage("YOU WIN", "WANT TO SCORE MORE HIGH ??");
                }, 200);
            }
        }
    }
    if (gameStartTime !== null && !isPaused && !gameWon) {
        const effectiveTime = now - gameStartTime - totalPausedTime;
        const elapsed = Math.max(0, Math.floor(effectiveTime / 1000));
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        document.getElementById('timer').innerText = `TIME: ${minutes}:${seconds}`;
    }
    if (!gameOver && !isPaused) {
        if (dangerBlink && !isDangerSoundPlaying) {
            dangerSound.play().then(() => {
                isDangerSoundPlaying = true;
            }).catch(e => console.warn('Danger sound error:', e));
        }
        if (!dangerBlink && isDangerSoundPlaying) stopDangerSound();
        if (dangerBlink) {
            if (now - lastBlinkTime > 300) {
                blinkOn = !blinkOn;
                lastBlinkTime = now;
            }
            document.body.style.backgroundColor = blinkOn
                ? 'rgba(255, 0, 0, 0.3)'
                : 'white';
        } else {
            document.body.style.backgroundColor = 'white';
            blinkOn = false;
        }
    }
    while (keysOnMap.length < 5) spawnKey();
    animationFrameId = requestAnimationFrame(animate);
}
window.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) e.preventDefault();
    if (keys.hasOwnProperty(key)) keys[key] = true;
    else {
        if (key === 'arrowup') keys.w = true;
        if (key === 'arrowdown') keys.s = true;
        if (key === 'arrowleft') keys.a = true;
        if (key === 'arrowright') keys.d = true;
    }
    if (e.code === 'Space') fireBullet();
});
window.addEventListener('keyup', e => {
    const key = e.key.toLowerCase();
    if (keys.hasOwnProperty(key)) keys[key] = false;
    else {
        if (key === 'arrowup') keys.w = false;
        if (key === 'arrowdown') keys.s = false;
        if (key === 'arrowleft') keys.a = false;
        if (key === 'arrowright') keys.d = false;
    }
});
document.getElementById('pause').addEventListener('click', () => {
    playSound(uiClickSound);
    isPaused = true;
    stopDangerSound();
    playingSounds.forEach(s => s.pause());
});
document.getElementById('resume').addEventListener('click', () => {
    playSound(uiClickSound);
    isPaused = false;
    playingSounds.forEach(s => s.play().catch(() => { }));
    if (!gameStarted) {
        const now = performance.now();
        gameStartTime = now;
        lastHealthUpdateTime = now;
        gameStarted = true;
        requestAnimationFrame(animate);
    }
});
document.getElementById('reset').addEventListener('click', () => {
    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    playSound(uiClickSound);
    circle.x = canvas.width / 2;
    circle.y = canvas.height / 2;
    lastDirection = { x: 0, y: -1 };
    bullets.length = 0;
    keysOnMap.length = 0;
    keysCollected = 0;
    isPaused = true;
    gameOver = false;
    gameWon = false;
    gameStartTime = null;
    pauseStartTime = null;
    totalPausedTime = 0;
    lastHealthUpdateTime = null;
    gameStarted = false;
    dangerBlink = false;
    blinkOn = false;
    document.body.style.backgroundColor = 'white';
    stopDangerSound();
    currentHealth = maxHealth;
    currentSystemHealth = 70;
    playerHealthBar.style.transition = 'none';
    systemHealthBar.style.transition = 'none';
    updateHealthBar(playerHealthBar, currentHealth, maxHealth);
    updateHealthBar(systemHealthBar, currentSystemHealth, maxSystemHealth);
    setTimeout(() => {
        playerHealthBar.style.transition = 'width 0.3s linear';
        systemHealthBar.style.transition = 'width 0.3s linear';
    }, 0);
    for (const building of buildings) {
        building.hits = 0;
        building.visible = true;
        building.vertices = building.originalVertices.map(p => ({ ...p }));
    }
    for (const arc of redArcs) {
        arc.visible = true;
        arc.hits = 0;
        arc.startAngleOffset = Math.random() * 2 * Math.PI;
    }
    shardsCollected = 0;
    for (let i = 0; i < 5; i++) spawnKey();
    document.getElementById('key').innerText = `KEYS : 0`;
    document.getElementById('shard').innerText = `SHARDS : 0`;
    document.getElementById('timer').innerText = `TIME: 00:00`;
    showWelcomeMessage();
});
const image = new Image();
image.src = '../img/map.png';
image.onload = () => {
    showWelcomeMessage();
};
function showWelcomeMessage(
    title = "WELCOME TO CYBERSCAPE",
    message = "RULES :-<br/>CENTRAL HUB IS THE ORANGE COLOUR STRUCTURE<br/>BASE STATION IS THE BLUE COLOUR STRUCTURE<br/>COLLECT THE KEYS AND GO TO CENTRAL HUB TO CONVERT IT INTO THE SHARD<br/>EVERY SHARD REQUIRES 5 KEYS<br/>FROM TWO SHARD YOU CAN INCREASE THE SYSTEM HEALTH BY 5% AND PLAYER HEALTH BY 10%<br/>YOU WIN IF SYSTEM HEALTH REACHES 100%<br/>YOU WILL LOSE IF PLAYER HEALTH OR SYSTEM HEALTH BECOMES 0<br/>SURVEILLANCE TOWER CAN BE DESTROYED BY BULLETS AFTER 3 HITS<br/>BUILDINGS CAN BE DESTROYED BY BULLETS AFTER 2 HITS<br/>CENTRAL HUB AND BASE STATION CANNOT BE DESTROYED<br/>"
) {
    const overlay = document.getElementById('welcome-overlay');
    const continueButton = document.getElementById('continue-button');
    const titleElem = document.getElementById('welcome-title');
    const descElem = document.getElementById('welcome-description');
    isPaused = true;
    overlay.style.display = 'flex';
    titleElem.innerHTML = title;
    if (title === "YOU WIN" || title === "YOU LOSS") {
        const stored = localStorage.getItem('bestWinTime');
        const best = stored ? parseFloat(stored) : NaN;
        const bestFormatted = isNaN(best) ? "NOT SET" : formatTime(best);
        descElem.innerHTML = `${message}<br><br><b>BEST TIME: ${bestFormatted}</b>`;
    } 
    else descElem.innerHTML = message;
    continueButton.onclick = null;
    continueButton.addEventListener('click', async function handleContinue() {
        playSound(uiClickSound);
        continueButton.removeEventListener('click', handleContinue);
        if (!gameOver && !gameWon) playSound(startSound);
        overlay.style.display = 'none';
        isPaused = false;
        if (gameOver || gameWon) {
            document.getElementById('reset').click();
            return;
        }
        const now = performance.now();
        gameStartTime = now;
        lastHealthUpdateTime = now;
        if (!gameStarted) {
            gameStarted = true;
            requestAnimationFrame(animate);
        }
    });
}
localStorage.removeItem('bestWinTime');
for (let i = 0; i < 5; i++) spawnKey();
