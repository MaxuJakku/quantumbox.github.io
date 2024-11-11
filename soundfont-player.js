document.addEventListener('DOMContentLoaded', () => {
    const soundfontInput = document.getElementById('soundfontInput');
    const playButton = document.getElementById('playButton');
    const pianoRoll = document.getElementById('pianoRoll'); // Assuming pianoRoll element for note input

    let audioContext = null;
    let soundfont = null;

    soundfontInput.addEventListener('change', handleFileUpload);
    playButton.addEventListener('click', playSoundFont);

    function handleFileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            loadSoundFont(e.target.result);
        };
        reader.readAsArrayBuffer(file);
    }

    function loadSoundFont(arrayBuffer) {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        audioContext.decodeAudioData(arrayBuffer, (buffer) => {
            soundfont = buffer;
            console.log('SoundFont loaded.');
        }, (error) => {
            console.error('Error decoding SoundFont:', error);
        });
    }

    function playSoundFont() {
        if (!audioContext || !soundfont) {
            console.log('SoundFont not loaded yet.');
            return;
        }

        // Example playback based on piano roll input
        const notes = getPianoRollNotes(); // Implement this function based on your piano roll
        notes.forEach(note => {
            const source = audioContext.createBufferSource();
            source.buffer = soundfont;
            source.connect(audioContext.destination);
            source.start(audioContext.currentTime + note.time); // Schedule based on note timing
        });
    }

    function getPianoRollNotes() {
        // Implement this function to return notes based on piano roll input
        // For example:
        return [
            { time: 0, pitch: 'C4' },
            { time: 1, pitch: 'E4' },
            { time: 2, pitch: 'G4' }
        ];
    }
});
