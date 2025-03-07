const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const message = document.getElementById('message');
const body = document.body;

let currentX = 0;
let currentY = 0;

window.addEventListener('load', function() {
    noButton.style.position = 'static';
    
    const buttonRect = noButton.getBoundingClientRect();
    currentX = buttonRect.left;
    currentY = buttonRect.top;
});

noButton.addEventListener('mouseover', function() {
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

yesButton.addEventListener('click', function() {
    noButton.style.display = 'none';
    yesButton.style.display = 'none';
    message.style.display = 'block';
    message.innerHTML = 'Anh biết mà! ❤️<br>Anh cũng yêu em nhiều lắm!<br><img src="images/cuteee.gif" alt="love gif" style="border-radius: 15px; margin-top: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">';
    
    createHearts();
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