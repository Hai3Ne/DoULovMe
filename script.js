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
    
    // Đảm bảo khoảng cách từ viền màn hình
    const safetyMargin = 50;
    
    // Giới hạn vị trí mới trong phạm vi an toàn của màn hình
    const maxX = viewportWidth - buttonWidth - safetyMargin;
    const maxY = viewportHeight - buttonHeight - safetyMargin;
    
    let newX, newY;
    let distance = 0;
    const minDistance = 200;
    let attempts = 0;
    const maxAttempts = 50;
    
    do {
        // Tính toán vị trí mới hoàn toàn nằm trong màn hình
        newX = Math.max(safetyMargin, Math.min(maxX, Math.random() * maxX));
        newY = Math.max(safetyMargin, Math.min(maxY, Math.random() * maxY));
        
        distance = Math.sqrt(Math.pow(newX - currentX, 2) + Math.pow(newY - currentY, 2));
        attempts++;
        
        // Tránh vòng lặp vô hạn nếu không thể tìm thấy vị trí thỏa mãn
        if (attempts > maxAttempts) break;
    } while (distance < minDistance);
    
    // Áp dụng vị trí mới
    noButton.style.position = 'fixed'; // Sử dụng fixed thay vì absolute
    noButton.style.left = newX + 'px';
    noButton.style.top = newY + 'px';
    
    const rotation = Math.random() * 20 - 10;
    noButton.style.transform = `rotate(${rotation}deg)`;
});

yesButton.addEventListener('click', function() {
    noButton.style.display = 'none';
    yesButton.style.display = 'none';
    message.style.display = 'block';
    message.innerHTML = 'Anh biết mà! ❤️<br>Anh cũng yêu em nhiều lắm!<br><img src="/api/placeholder/300/200" alt="love image" style="border-radius: 15px; margin-top: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">';
    
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