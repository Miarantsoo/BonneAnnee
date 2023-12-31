console.log("hoho");


function setupAudio(){
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({audio: true, video: false})
        .then( stream => {
            setupStream(stream);
        })
        .catch(err => {
            console.error(err);
        })
    }
}

function setupStream(stream) {
    let audioContent = new (window.AudioContext || window.webkitAudioContext)();
    let audioStream = audioContent.createMediaStreamSource( stream );
    let analyser = audioContent.createAnalyser();
    audioStream.connect(analyser);
    analyser.fftSize = 1024;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    let req;
    let count = 0
    let count3 = 0
    function updateDecibelLevel() {
        analyser.getByteFrequencyData(dataArray);

        const amplitude = dataArray.reduce((acc, value) => acc + value, 0) / bufferLength;

        const decibels = 20 * Math.log10(amplitude || 1);


        console.log('gfgbq');
        if (decibels >= 25) {
            const annee = document.querySelectorAll("letter")[3];
            const canvas = document.getElementById("bonne");
            const bonane = document.querySelector("#change");
            const milatsaka = document.getElementById("milatsaka");
            bonane.innerHTML = "Bonne année";
            canvas.offsetHeight;
            canvas.style.visibility = "visible"
          
            milatsaka.classList.add('fall');
            setTimeout(() => {
                const letterContent = document.querySelectorAll(".letter-content")[3];
                letterContent.innerHTML = 4;
                milatsaka.classList.add("rise");
            },1500);

            console.log(milatsaka);
        } else {
            req = requestAnimationFrame(updateDecibelLevel);
        }
    }
    updateDecibelLevel();
}

window.onload = () => {
    setupAudio();
}