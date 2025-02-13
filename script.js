document.addEventListener('DOMContentLoaded', function () {
    const textContainer = document.getElementById('text-container');
    const audioPlayer = document.getElementById('audio-player');
    const startButton = document.getElementById('start-button');

    // Messages and their durations
    const messages = [
        { text: "...", duration: 1200 },
        { text: "I'm in love", duration: 500 },
        { text: "I'm in luv", duration: 500 },
        { text: "I'm in ♡", duration: 800 },
        { text: "With", duration: 450 },
        { text: "The Girl", duration: 300 },
        { text: "Next Door", duration: 1100 },
        { text: "Never Been", duration: 800 },
        { text: "So In Love", duration: 500 },
        { text: "With A Girl", duration: 500 },
        { text: "Like This", duration: 400 },
        { text: "Before,", duration: 1000 },
        { text: "She got ", duration: 733 },
        { text: "No Idea", duration: 733 },
        { text: "How i'm", duration: 733 },
        { text: "Really Feeling", duration: 2000 },
        { text: "I'm in love.", duration: 500 },
        { text: "I'm in luv", duration: 500 },
        { text: "I'm in ♡♡", duration: 800 },
        { text: "With", duration: 450 },
        { text: "The Girl", duration: 300 },
        { text: "Next Door", duration: 1000 },
        { text: "♫♪", duration: 3000 }
    ];

    // Background and font settings with durations
    const colorSettings = [
        { background: "#fff", fontColor: "#1c1c1c", duration: 400 },
        { background: "#222", fontColor: "#fff", duration: 200 },
        { background: "#fff", fontColor: "#1c1c1c", duration: 400 },
        { background: "#222", fontColor: "#fff", duration: 400 },
        { background: "#fff", fontColor: "#1c1c1c", duration: 500 },
        { background: "#fff", fontColor: "#1c1c1c", duration: 400 },
        { background: "#222", fontColor: "#fff", duration: 200 },
        { background: "#fff", fontColor: "#1c1c1c", duration: 400 },
        { background: "#222", fontColor: "#fff", duration: 400 },
        { background: "#fff", fontColor: "#1c1c1c", duration: 6733 },
        { background: "#222", fontColor: "#fff", duration: 5000 },
        { background: "#fff", fontColor: "#1c1c1c", duration: 400 },
        { background: "#222", fontColor: "#fff", duration: 200 },
        { background: "#fff", fontColor: "#1c1c1c", duration: 400 },
        { background: "#222", fontColor: "#fff", duration: 400 },
        { background: "#fff", fontColor: "#1c1c1c", duration: 500 },
        { background: "#fff", fontColor: "#1c1c1c", duration: 400 },
        { background: "#222", fontColor: "#fff", duration: 200 },
       
        

    //10249
        
    ];

    let index = 0;
    let colorIndex = 0;
    let isPlaying = false;
    let loopCompleted = false;

    function changeBackgroundAndFont() {
        const currentColors = colorSettings[colorIndex % colorSettings.length];
        document.body.style.backgroundColor = currentColors.background;
        textContainer.style.color = currentColors.fontColor;

        // Schedule the next background/font change
        setTimeout(() => {
            colorIndex++;
            changeBackgroundAndFont();
        }, currentColors.duration);
    }

    function applyGradientEffect() {
        const word = "Feeling";
        const speed = 150;
        const color1 = "#333";
        const color2 = "#ff6b6b";
        let position = 0;

        const interval = setInterval(() => {
            let gradientHTML = "";
            for (let i = 0; i < word.length; i++) {
                if (i <= position) {
                    gradientHTML += `<span style="color: ${color2};">${word[i]}</span>`;
                } else {
                    gradientHTML += `<span style="color: ${color1};">${word[i]}</span>`;
                }
            }

            textContainer.innerHTML = `Really ${gradientHTML}`;
            position++;

            if (position >= word.length) {
                clearInterval(interval);
            }
        }, speed);
    }

    function applyFontAnimation(messageText) {
        const fonts = [
            "Arial", "Verdana", "Times New Roman", "Georgia", "Bebas Neue",
            "Comic Sans MS", "Impact", "Tahoma", "Lucida Console", "Garamond"
        ];
        const fontChangeSpeed = 100; // in milliseconds
        let fontIndex = 0;
        const totalDuration = messages[index].duration; // match message duration
        const repetitions = Math.floor(totalDuration / fontChangeSpeed);
        let iteration = 0;

        const interval = setInterval(() => {
            textContainer.style.fontFamily = fonts[fontIndex];
            fontIndex = (fontIndex + 1) % fonts.length;
            iteration++;

            if (iteration >= repetitions) {
                clearInterval(interval);
            }
        }, fontChangeSpeed);
    }

    function changeText() {
        const currentMessage = messages[index];

        // Update text and apply effects
        if (currentMessage.text === "Really Feeling") {
            textContainer.innerHTML = `Really <span id="feeling-text">Feeling</span>`;
            applyGradientEffect();
        } else {
            textContainer.textContent = currentMessage.text;
        }

        // Apply font animation for specific messages
        if (["I'm in love.", "I'm in luv", "I'm in ♡♡"].includes(currentMessage.text)) {
            applyFontAnimation(currentMessage.text);
        }

        if (currentMessage.text === "..." && loopCompleted) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
            loopCompleted = false;
        
            // Reset the color index to restart colorSettings
            colorIndex = 0;
        }
        

        if (index === messages.length - 1) {
            loopCompleted = true;
        }

        index = (index + 1) % messages.length;

        // Update text after its duration
        setTimeout(changeText, currentMessage.duration);
    }

    startButton.addEventListener('click', function () {
        if (!isPlaying) {
            audioPlayer.play();
            isPlaying = true;
            textContainer.style.display = 'block';
            changeText();
            startButton.style.display = 'none';

            // Start background and font updates
            changeBackgroundAndFont();
        }
    });
});
