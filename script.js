const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const message = document.getElementById('message');
const body = document.body;

const bgMusic = new Audio('https://cdnjs.cloudflare.com/ajax/libs/SoundJS/1.0.1/soundjs.min.js');
bgMusic.loop = true;

let currentX = 0;
let currentY = 0;
let noButtonHoverCount = 0;
const hintThreshold = 3;
let hintShown = false;
const selfieThreshold = 5;
let selfieTaken = false;

noButton.style.transition = 'all 0.5s ease';

yesButton.addEventListener('mouseover', function () {
    yesButton.style.transform = 'scale(1.2)';
    yesButton.style.boxShadow = '0 0 20px #4CAF50';
    yesButton.style.background = 'linear-gradient(to right, #4CAF50, #8BC34A)';
});

yesButton.addEventListener('mouseout', function () {
    yesButton.style.transform = 'scale(1)';
    yesButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    yesButton.style.background = '#4CAF50';
});

noButton.addEventListener('mouseover', function () {
    noButtonHoverCount++;

    if (noButtonHoverCount >= selfieThreshold && !selfieTaken && !hintShown) {
        selfieTaken = true;
        createFlashEffect();

        setTimeout(() => {
            showFakeSelfie();
        }, 500);
    }

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
    "Anh biết mà! ❤️<br>Anh cũng yêu em nhiều lắm! Chúc em 8/3 hạnh phúc!",
    "Gửi đến người phụ nữ tuyệt vời nhất trong cuộc đời anh! Chúc em ngày 8/3 tràn ngập niềm vui! ❤️",
    "Cảm ơn em đã là một người vợ tuyệt vời! Chúc em ngày Quốc tế Phụ nữ thật hạnh phúc! ❤️",
    "Ngày 8/3 ý nghĩa - Người phụ nữ anh yêu nhất trên đời! ❤️",
    "Mỗi ngày bên em là một ngày hạnh phúc! Chúc em 8/3 thật nhiều niềm vui và điều ước trở thành hiện thực! ❤️"
];

yesButton.addEventListener('click', function () {
    noButton.style.display = 'none';
    yesButton.style.display = 'none';

    const heading = document.querySelector('h1');
    heading.innerHTML = "Em Là Tình Yêu Của Đời Anh! ❤️";
    heading.classList.remove('animate__heartBeat');
    heading.classList.add('animate__bounceIn');
    heading.style.color = '#ff4081';
    heading.style.fontSize = '3.5rem';

    createTitleHearts(heading);

    body.style.backgroundImage = "url('/api/placeholder/800/600')";
    body.style.transition = "all 2s ease";

    message.style.display = 'block';

    const randomMessage = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
    message.innerHTML = `${randomMessage}<br><img src="images/cuteee.gif" alt="love gif" style="border-radius: 15px; margin-top: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">`;

    showWomenDaySpecial();

    createHearts();
    createFireworks();

    let messageIndex = 0;
    setInterval(() => {
        messageIndex = (messageIndex + 1) % sweetMessages.length;
        message.innerHTML = `${sweetMessages[messageIndex]}<br><img src="images/cuteee.gif" alt="love gif" style="border-radius: 15px; margin-top: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">`;
    }, 5000);
});

function showWomenDaySpecial() {
    createFlowers();

    const specialMessage = document.createElement('div');
    specialMessage.classList.add('special-message');
    specialMessage.innerHTML = `
        <div class="women-day-special">
            <h2>Chúc Mừng Ngày 8/3!</h2>
            <p>Gửi đến người phụ nữ tuyệt vời nhất - vợ yêu của anh</p>
            <div class="flower-decoration">🌹💐🌷🌸</div>
        </div>
    `;
    body.appendChild(specialMessage);

    setTimeout(() => {
        specialMessage.style.opacity = "1";
        specialMessage.style.transform = "translateY(0)";
    }, 500);

    setTimeout(() => {
        specialMessage.style.opacity = "0";
        specialMessage.style.transform = "translateY(-20px)";
        setTimeout(() => {
            specialMessage.remove();
        }, 1000);
    }, 5000);
}

function createFlowers() {
    const flowers = ['🌹', '🌷', '🌸', '🌺', '🌻', '🌼'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.classList.add('flower');
            flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];

            const x = Math.random() * window.innerWidth;
            const delay = Math.random() * 5;
            const size = Math.random() * 20 + 20;

            flower.style.left = x + 'px';
            flower.style.top = window.innerHeight + 'px';
            flower.style.animationDelay = delay + 's';
            flower.style.fontSize = size + 'px';

            body.appendChild(flower);

            setTimeout(() => {
                flower.remove();
            }, 10000);
        }, i * 300);
    }
}

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
    hintElement.style.top = '80px';
    hintElement.style.right = '20px';
    hintElement.style.transform = 'none';
    hintElement.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    hintElement.style.padding = '15px';
    hintElement.style.borderRadius = '15px';
    hintElement.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    hintElement.style.zIndex = '1000';
    hintElement.style.textAlign = 'center';
    hintElement.style.color = '#e91e63';
    hintElement.style.fontSize = '16px';
    hintElement.style.fontWeight = 'bold';
    hintElement.style.animation = 'slideInRight 0.5s ease';
    hintElement.style.maxWidth = '250px';

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideOutRight {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(50px); }
        }
    `;

    document.head.appendChild(style);

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
function createFlashEffect() {
    const flash = document.createElement('div');
    flash.classList.add('camera-flash');

    document.body.appendChild(flash);

    setTimeout(() => {
        flash.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => {
            flash.remove();
        }, 500);
    }, 200);

    const shutterSound = new Audio('data:audio/wav;base64,UklGRl9vT19CAMERA_SHUTTER');
    shutterSound.volume = 0.5;
    shutterSound.play().catch(err => console.log('Audio không thể phát:', err));
}

function showFakeSelfie() {
    const selfieContainer = document.createElement('div');
    selfieContainer.classList.add('fake-selfie-container');

    const funnyExpressions = [
        "😱",
        "😳",
        "🤔",
        "🤨",
        "😒"
    ];

    const funnyTitles = [
        "Gòi gòi , A chụp lại em không chịu yes gòi!",
        "QUoiwiiiiiii, đây sẽ là bằng chứng e xa lánh tui!",
        "Chụp được em rồi nhé! chạy đằng chời nhoaaa?",
        "Chồng em đã thuê chúng tôi theo dõi em đấy!",
        "Máy quét tình yêu phát hiện người đang tránh né!"
    ];

    const randomExpression = funnyExpressions[Math.floor(Math.random() * funnyExpressions.length)];
    const randomTitle = funnyTitles[Math.floor(Math.random() * funnyTitles.length)];

    selfieContainer.innerHTML = `
    <div class="selfie-header">
        <span class="camera-icon">📸</span>
        <span class="selfie-title">${randomTitle}</span>
        <span class="close-button">×</span>
    </div>
    <div class="selfie-content">
        <div class="selfie-frame">
            <div class="selfie-expression">${randomExpression}</div>
            <div class="selfie-caption">Khoảnh khắc em cố né tránh nút "Yes"</div>
        </div>
        <div class="selfie-message">Đã chụp được ${noButtonHoverCount} lần em cố tránh bày tỏ tình yêu trong ngày 8/3! 😂</div>
        <div class="auto-send-container">
            <button class="selfie-share-button">Gửi về "máy chủ của chồng" (<span id="countdown">4</span>)</button>
            <p class="countdown-message">Tự động gửi sau <span id="countdown-text">4</span> giây...</p>
        </div>
    </div>
`;

    document.body.appendChild(selfieContainer);
    setTimeout(() => {
        selfieContainer.style.transform = 'translateY(0)';
        selfieContainer.style.opacity = '1';

        let countdown = 4;
        const countdownElement = document.getElementById('countdown');
        const countdownTextElement = document.getElementById('countdown-text');
        const shareButton = selfieContainer.querySelector('.selfie-share-button');

        const timer = setInterval(() => {
            countdown -= 1;
            if (countdownElement) countdownElement.textContent = countdown;
            if (countdownTextElement) countdownTextElement.textContent = countdown;

            shareButton.style.backgroundColor = '#f44336';
            setTimeout(() => {
                shareButton.style.backgroundColor = '#4CAF50';
            }, 300);

            if (countdown <= 0) {
                clearInterval(timer);
                handleShareButtonClick();
            }
        }, 1000);

        shareButton.addEventListener('click', handleShareButtonClick);

        function handleShareButtonClick() {
            clearInterval(timer);

            const countdownMessage = selfieContainer.querySelector('.countdown-message');
            if (countdownMessage) countdownMessage.style.display = 'none';

            shareButton.innerHTML = `
                <span class="loading-spinner"></span>
                <span>Đang gửi dữ liệu...</span>
            `;
            shareButton.disabled = true;
            shareButton.style.backgroundColor = '#888';
            shareButton.style.width = '100%';
            shareButton.style.display = 'flex';
            shareButton.style.alignItems = 'center';
            shareButton.style.justifyContent = 'center';

            const progressContainer = document.createElement('div');
            progressContainer.classList.add('progress-container');
            progressContainer.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="progress-status">Đang tải dữ liệu... <span class="progress-percent">0%</span></div>
            `;
            shareButton.parentNode.insertBefore(progressContainer, shareButton.nextSibling);
            const progressFill = progressContainer.querySelector('.progress-fill');
            const progressPercent = progressContainer.querySelector('.progress-percent');
            const progressStatus = progressContainer.querySelector('.progress-status');
            let progress = 0;
            const progressInterval = setInterval(() => {
                if (progress < 30) {
                    progress += 1;
                } else if (progress < 60) {
                    progress += 0.7;
                } else if (progress < 85) {
                    progress += 0.4;
                } else if (progress < 95) {
                    progress += 0.2;
                }

                if (progress >= 100) {
                    progress = 100;
                    clearInterval(progressInterval);
                }
                progressFill.style.width = `${progress}%`;
                progressPercent.textContent = `${Math.floor(progress)}%`;
                if (progress < 30) {
                    progressStatus.textContent = `Đang nén dữ liệu... ${Math.floor(progress)}%`;
                } else if (progress < 60) {
                    progressStatus.textContent = `Đang kết nối máy chủ... ${Math.floor(progress)}%`;
                } else if (progress < 85) {
                    progressStatus.textContent = `Đang tải lên hình ảnh... ${Math.floor(progress)}%`;
                } else {
                    progressStatus.textContent = `Đang xác thực dữ liệu... ${Math.floor(progress)}%`;
                }
                if (progress >= 100) {
                    progressStatus.textContent = `Hoàn thành 100%`;
                    progressStatus.style.color = '#4CAF50';

                    setTimeout(() => {
                        showFakeSendingReport();
                        setTimeout(() => {
                            selfieContainer.style.transform = 'translateY(20px)';
                            selfieContainer.style.opacity = '0';
                            setTimeout(() => {
                                selfieContainer.remove();
                            }, 300);
                        }, 500);
                    }, 500);
                }
            }, 50);
            setTimeout(() => {
                showFakeSendingReport();
                setTimeout(() => {
                    selfieContainer.style.transform = 'translateY(20px)';
                    selfieContainer.style.opacity = '0';
                    setTimeout(() => {
                        selfieContainer.remove();
                    }, 300);
                }, 100);
            }, 100);
        }
    }, 10);
    const closeButton = selfieContainer.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        selfieContainer.style.transform = 'translateY(20px)';
        selfieContainer.style.opacity = '0';
        setTimeout(() => {
            selfieContainer.remove();
        }, 300);
    });
}

function showFakeSendingReport() {
    const reportContainer = document.createElement('div');
    reportContainer.classList.add('fake-report-container');

    reportContainer.innerHTML = `
        <div class="report-header">
            <span class="report-icon">📨</span>
            <span class="report-title">Báo cáo gửi đi</span>
            <span class="close-button">×</span>
        </div>
        <div class="report-content">
            <div class="loading-animation">
                <div class="loading-bar"></div>
            </div>
            <div class="report-message">Đang gửi về "máy chủ chồng" của em...</div>
            <div class="report-details">
                <p>Đã gửi: <span class="sending-status success">✓</span> Hình ảnh né tránh tình yêu</p>
                <p>Đang gửi: <span class="sending-status pending">⟳</span> Tọa độ vị trí</p>
                <p>Chờ gửi: <span class="sending-status pending">⌛</span>😏</p>
            </div>
        </div>
    `;

    document.body.appendChild(reportContainer);

    setTimeout(() => {
        reportContainer.style.transform = 'translateY(0)';
        reportContainer.style.opacity = '1';

        setTimeout(() => {
            const reportMessage = reportContainer.querySelector('.report-message');
            reportMessage.innerHTML = 'ĐÙAA THÔIIIIIIIIII! Yên tâm, không ai theo dõi em đâu! 🤣';
            reportMessage.style.color = '#4CAF50';
            reportMessage.style.fontWeight = 'bold';
            reportMessage.style.fontSize = '18px';

            const sendingStatuses = reportContainer.querySelectorAll('.sending-status');
            sendingStatuses.forEach(status => {
                status.innerHTML = '✗';
                status.classList.remove('success', 'pending');
                status.classList.add('failed');
            });

            const loadingBar = reportContainer.querySelector('.loading-bar');
            loadingBar.style.animationPlayState = 'paused';
            loadingBar.style.width = '30%';
            loadingBar.style.backgroundColor = '#e91e63';

            setTimeout(() => {
                alert('Nhấn Yes lẹ lên nha bé kiaaaa!💕🌹');

                highlightYesButton();

                reportContainer.style.transform = 'translateY(20px)';
                reportContainer.style.opacity = '0';
                setTimeout(() => {
                    reportContainer.remove();
                }, 300);
            }, 3000);
        }, 3000);
    }, 10);

    const closeButton = reportContainer.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        reportContainer.style.transform = 'translateY(20px)';
        reportContainer.style.opacity = '0';
        setTimeout(() => {
            reportContainer.remove();
        }, 300);
    });
}

function highlightYesButton() {
    yesButton.style.transform = 'scale(1.5)';
    yesButton.style.boxShadow = '0 0 30px #4CAF50';
    yesButton.style.animation = 'super-pulse 1s infinite';

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes super-pulse {
            0% { transform: scale(1.5); }
            50% { transform: scale(1.8); }
            100% { transform: scale(1.5); }
        }
    `;
    document.head.appendChild(style);
}
function createTitleHearts(titleElement) {
    const heartSymbols = ['❤️', '💖', '💕', '💘', '💓'];
    const heartCount = 8;

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.classList.add('title-heart');

            const angle = (i / heartCount) * 2 * Math.PI;
            const distance = 80 + Math.random() * 40;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            heart.style.position = 'absolute';
            heart.style.fontSize = '1.5rem';
            heart.style.transform = `translate(${x}px, ${y}px)`;
            heart.style.opacity = '0';

            titleElement.appendChild(heart);

            setTimeout(() => {
                heart.style.transition = 'all 3s ease-out';
                heart.style.opacity = '1';
                heart.style.transform = `translate(${x * 1.5}px, ${y - 100}px)`;
                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }, 100);
        }, i * 300);
    }
}