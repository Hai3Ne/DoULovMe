const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const message = document.getElementById('message');
const body = document.body;

// Thêm âm thanh
const bgMusic = new Audio('https://cdnjs.cloudflare.com/ajax/libs/SoundJS/1.0.1/soundjs.min.js');
bgMusic.loop = true;

let currentX = 0;
let currentY = 0;
let noButtonHoverCount = 0;
const hintThreshold = 5; 
let hintShown = false;

noButton.style.transition = 'all 0.5s ease';

// Hiệu ứng cho nút "Yes"
yesButton.addEventListener('mouseover', function() {
    yesButton.style.transform = 'scale(1.2)';
    yesButton.style.boxShadow = '0 0 20px #4CAF50';
    yesButton.style.background = 'linear-gradient(to right, #4CAF50, #8BC34A)';
});

yesButton.addEventListener('mouseout', function() {
    yesButton.style.transform = 'scale(1)';
    yesButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    yesButton.style.background = '#4CAF50';
});

noButton.addEventListener('mouseover', function() {
    noButtonHoverCount++;
    if (noButtonHoverCount >= hintThreshold && !hintShown) {
        showHint();
        hintShown = true;
    }
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    
    const buttonRect = noButton.getBoundingClientRect();
    currentX = buttonRect.left;
    currentY = buttonRect.top;
    
    const safetyMargin = 50;
    
    const maxX = viewportWidth - buttonWidth - safetyMargin;
    const maxY = viewportHeight - buttonHeight - safetyMargin;
    
    let newX, newY;
    let distance = 0;
    const minDistance = 200;
    let attempts = 0;
    const maxAttempts = 50;
    
    do {
        newX = Math.max(safetyMargin, Math.min(maxX, Math.random() * maxX));
        newY = Math.max(safetyMargin, Math.min(maxY, Math.random() * maxY));
        
        distance = Math.sqrt(Math.pow(newX - currentX, 2) + Math.pow(newY - currentY, 2));
        attempts++;
        if (attempts > maxAttempts) break;
    } while (distance < minDistance);

    noButton.style.position = 'fixed';
    noButton.style.left = newX + 'px';
    noButton.style.top = newY + 'px';
    
    const rotation = Math.random() * 20 - 10;
    noButton.style.transform = `rotate(${rotation}deg)`;
});

const sweetMessages = [
    "Anh biết mà! ❤️<br>Anh cũng yêu em nhiều lắm!",
    "Em là điều tuyệt vời nhất đã đến với anh! ❤️",
    "Cảm ơn em đã là một người vợ tuyệt vời! ❤️",
    "Mỗi ngày bên em là một ngày hạnh phúc! ❤️",
    "Anh yêu em nhiều hơn những ngôi sao trên bầu trời! ❤️"
];

yesButton.addEventListener('click', function() {
    noButton.style.display = 'none';
    yesButton.style.display = 'none';
    body.style.backgroundImage = "url('/api/placeholder/800/600')";
    body.style.transition = "all 2s ease";
    message.style.display = 'block';
    const randomMessage = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
    message.innerHTML = `${randomMessage}<br><img src="images/cuteee.gif" alt="love gif" style="border-radius: 15px; margin-top: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">`;

    createHearts();
    createFireworks();
    let messageIndex = 0;
    setInterval(() => {
        messageIndex = (messageIndex + 1) % sweetMessages.length;
        message.innerHTML = `${sweetMessages[messageIndex]}<br><img src="images/cuteee.gif" alt="love gif" style="border-radius: 15px; margin-top: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">`;
    }, 5000);
});

function createHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('heart');
        
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight;
        
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.display = 'block';
        
        body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }, 300);
}
function showHint() {
    const hintElement = document.createElement('div');
    hintElement.id = 'noButtonHint';
    hintElement.classList.add('hint-popup');
    
    const hintMessages = [
        "Êi Êi bỏ cái tay gaaa nút No coi? 😒😒😒",
        "Lì dữ hen, nhấn Yes đi em! 💖💖💖",
        "Anh biết em muốn nhấn Yes mà! 😉",
        "Quơiiiii, em yêu anh mà, phải không? ❤️",
        "Ngoan cố à bé! Nhấn Yes đi! 😍"
    ];
    
    const randomMessage = hintMessages[Math.floor(Math.random() * hintMessages.length)];
    
    hintElement.innerHTML = `
        <div class="hint-content">
            <p>${randomMessage}</p>
            <img src="/images/angry-cat.jpg" alt="hint image" style="width: 150px; border-radius: 10px;">
        </div>
    `;
    
    document.body.appendChild(hintElement);

    hintElement.style.position = 'fixed';
    hintElement.style.top = '30%';
    hintElement.style.left = '50%';
    hintElement.style.transform = 'translate(-50%, -50%)';
    hintElement.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    hintElement.style.padding = '20px';
    hintElement.style.borderRadius = '15px';
    hintElement.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    hintElement.style.zIndex = '1000';
    hintElement.style.textAlign = 'center';
    hintElement.style.color = '#e91e63';
    hintElement.style.fontSize = '18px';
    hintElement.style.fontWeight = 'bold';
    hintElement.style.animation = 'fadeIn 0.5s ease';
    setTimeout(() => {
        hintElement.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            hintElement.remove();
            hintShown = false;
        }, 500);
    }, 3000);
}

function createFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.classList.add('firework');
            
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight / 2);
            
            firework.style.left = x + 'px';
            firework.style.top = y + 'px';
            body.appendChild(firework);
            for (let j = 0; j < 20; j++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                const angle = Math.random() * Math.PI * 2;
                const speed = 1 + Math.random() * 3;
                const size = Math.random() * 5 + 2;
                
                const hue = Math.random() * 360;
                particle.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                firework.appendChild(particle);
                const animation = particle.animate([
                    { transform: 'translate(0, 0)', opacity: 1 },
                    { transform: `translate(${Math.cos(angle) * 100 * speed}px, ${Math.sin(angle) * 100 * speed}px)`, opacity: 0 }
                ], {
                    duration: 1000 + Math.random() * 1000,
                    easing: 'cubic-bezier(0,0,0.2,1)'
                });
                
                animation.onfinish = () => particle.remove();
            }
            
            setTimeout(() => {
                firework.remove();
            }, 2000);
            
        }, i * 500);
    }
}