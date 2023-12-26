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

    function updateDecibelLevel() {
        analyser.getByteFrequencyData(dataArray);

        const amplitude = dataArray.reduce((acc, value) => acc + value, 0) / bufferLength;

        const decibels = 20 * Math.log10(amplitude || 1);

        console.log("Decibels:", decibels);
        if (decibels >= 15) {
            const annee = document.querySelectorAll("letter")[3];
            const canvas = document.getElementById("bonne");
            const bonane = document.querySelector("#change");
            bonane.innerHTML = "Bonne année"
            canvas.offsetHeight;
            canvas.style.transition = "visibility 1s ease"
            canvas.style.visibility = "visible"
            console.log(annee);
            annee.innerHTML = "4";
        } else {
            requestAnimationFrame(updateDecibelLevel);
        }
    }
    updateDecibelLevel();
}

window.onload = () => {
    setupAudio();
}