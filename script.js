const playPentatonic = false;
const playFifths = true;

import notesMap from './piano_notes.js';

let fifthsKeys = {
    "major": {
      "C": ["C", "G", "D", "A", "E", "B", "F#"],
      "F": ["F", "A#", "D#", "G#", "C#", "F#", "B#"]
    },
    "minor": {
      "A": ["A", "E", "B", "F#", "C#", "G#", "D#"],
      "D": ["D", "G", "C", "F", "A#", "D#", "G#"]
    },
    "colors": {
      "C": {"RGB": [255, 0, 0]},
      "G": {"RGB": [255, 165, 0]},
      "D": {"RGB": [255, 255, 0]},
      "A": {"RGB": [0, 255, 0]},
      "E": {"RGB": [0, 255, 255]},
      "B": {"RGB": [0, 0, 255]},
      "F#": {"RGB": [128, 0, 128]},
      "F": {"RGB": [255, 192, 203]},
      "A#": {"RGB": [255, 20, 147]},
      "D#": {"RGB": [147, 112, 219]},
      "G#": {"RGB": [75, 0, 130]},
      "C#": {"RGB": [72, 61, 139]},
      "F#": {"RGB": [47, 79, 79]},
      "B#": {"RGB": [70, 130, 180]}
    }
  }

const circleOfFifthsChords = notesMap.filter(note => {
    return [
        'G2', 'G3', 'G4', 'G5', 'G6', 
        'D2', 'D3', 'D4', 'D5', 'D6', 
        'A2', 'A3', 'A4', 'A6', 'A6', 
        'F2', 'F3', 'F4', 'F5', 'F6', 
        'C2', 'C3', 'C4', 'C5', 'C6', 
        'B2', 'B3', 'B4', 'B5', 'B6',
        'A#2', 'A#3', 'A#4', 'A#5', 'A#6',
        'D#2', 'D#3', 'D#4', 'D#5', 'D#6',
        'G#2', 'G#3', 'G#4', 'G#5', 'G#6',
        'C#2', 'C#3', 'C#4', 'C#5', 'C#6',
        'F#2', 'F#3', 'F#4', 'F#5', 'F#6',
    ].includes(note.note_exact);
});

window.onload = function() {
    // Websocket for sending image data
    const socket = new WebSocket('ws://localhost:8000/ws/send/image-processor/test/test');

    // Event: Connection opened
    socket.addEventListener('open', () => {
        console.log('WebSocket connection established');
    });

    // Event: Connection closed
    socket.addEventListener('close', () => {
        console.log('WebSocket connection closed');
    });

    // Event: WebSocket error
    socket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
    });

    let images = [
        {
            filenameOriginal: 'output_images/vermeer -- combined all colors.png',
            filenameShifted: 'output_images/vermeer -- combined forced colors.png',
            title: 'Vermeer',
            width: 600,
            height: 672,
        },
        {
            filenameOriginal: 'output_images/turner -- combined all colors.png',
            filenameShifted: 'output_images/turner -- combined forced colors.png',
            title: 'Turner',
            width: 1600,
            height: 1067,
        },
        {
            filenameOriginal: 'output_images/bazille_family reunion -- combined all colors.png',
            filenameShifted: 'output_images/bazille_family reunion -- combined forced colors.png',
            title: 'Bazille',
            width: 904,
            height: 600,
        },
        {
            filenameOriginal: 'output_images/leo putz_Halbindianerin mit Früchten -- combined all colors.png',
            filenameShifted: 'output_images/leo putz_Halbindianerin mit Früchten -- combined forced colors.png',
            title: 'Putz',
            width: 662,
            height: 722,
        },
        {
            filenameOriginal: 'output_images/cavalcanti_mulata against a green background -- combined all colors.png',
            filenameShifted: 'output_images/cavalcanti_mulata against a green background -- combined forced colors.png',
            title: 'Cavalcanti',
            width: 562,
            height: 722,
        },
        {
            filenameOriginal: 'output_images/unknown 1640 -- combined all colors.png',
            filenameShifted: 'output_images/unknown 1640 -- combined forced colors.png',
            title: 'Unknown',
            width: 814,
            height: 722,
        },
        {
            filenameOriginal: 'output_images/alfred-sisley_autumn-banks-of-the-seine-near-bougival-1873 -- combined all colors.png',
            filenameShifted: 'output_images/alfred-sisley_autumn-banks-of-the-seine-near-bougival-1873 -- combined forced colors.png',
            title: 'Autumn banks of the Seine',
            width: 1024,
            height: 1024,
        },
        {
            filenameOriginal: 'output_images/algernon-talmage_the-lake-district-for-holidays-honister-crag-london-midland-and-scottish-railway-poster-artwork -- combined all colors.png',
            filenameShifted: 'output_images/algernon-talmage_the-lake-district-for-holidays-honister-crag-london-midland-and-scottish-railway-poster-artwork -- combined forced colors.png',
            title: 'The Lake District', 
            width: 1024,
            height: 1024,
        },
        {
            filenameOriginal: 'output_images/armand-guillaumin_echo-rock-1905 -- combined all colors.png',
            filenameShifted: 'output_images/armand-guillaumin_echo-rock-1905 -- combined forced colors.png',
            title: 'Echo Rock', 
            width: 1024,
            height: 1024,
        },
        {
            filenameOriginal: 'output_images/benjamin-brown_eucalypti-near-arch-beach-california -- combined all colors.png',
            filenameShifted: 'output_images/benjamin-brown_eucalypti-near-arch-beach-california -- combined forced colors.png',
            title: 'Euclaypti near Arch Beach', 
            width: 1024,
            height: 1024,
        },
        {
            filenameOriginal: 'output_images/benjamin-brown_grand-canyon -- combined all colors.png',
            filenameShifted: 'output_images/benjamin-brown_grand-canyon -- combined forced colors.png',
            title: 'Grand Canyon', 
            width: 1024,
            height: 1024,
        },
        {
            filenameOriginal: 'output_images/benjamin-brown_poppies-and-eucalyptus -- combined all colors.png',
            filenameShifted: 'output_images/benjamin-brown_poppies-and-eucalyptus -- combined forced colors.png',
            title: 'Poppy and Eucalyptus', 
            width: 1024,
            height: 1024,
        },
        {
            filenameOriginal: 'output_images/cezanne_still life with apples_1895 -- combined all colors.png',
            filenameShifted: 'output_images/cezanne_still life with apples_1895 -- combined forced colors.png',
            title: 'Still life with apples', 
            width: 1014,
            height: 742,
        },
        {
            filenameOriginal: 'output_images/kahlo_viva la vida_1954 -- combined all colors.png',
            filenameShifted: 'output_images/kahlo_viva la vida_1954 -- combined forced colors.png',
            title: 'Viva la vida', 
            width: 1035,
            height: 742,
        },
        {
            filenameOriginal: 'output_images/Linda10 (1) -- combined all colors.png',
            filenameShifted: 'output_images/Linda10 (1) -- combined forced colors.png',
            title: 'Linda 10', 
            width: 3000,
            height: 4000,
        },
        {
            filenameOriginal: 'output_images/Ljus från lampa och omgivning -- combined all colors.png',
            filenameShifted: 'output_images/Ljus från lampa och omgivning -- combined forced colors.png',
            title: 'Ljust från lampa och omgivning', 
            width: 2096,
            height: 2956,
        },
        {
            filenameOriginal: 'output_images/VAZQUEZ_Emmanuel_Honorato_01-scaled -- combined all colors.png',
            filenameShifted: 'output_images/VAZQUEZ_Emmanuel_Honorato_01-scaled -- combined forced colors.png',
            title: 'Emmanuel Honorato', 
            width: 2560,
            height: 1449,
        },
        {
            filenameOriginal: 'output_images/warhol_Capa do álbum Velvet Underground & Nico_1967 -- combined all colors.png',
            filenameShifted: 'output_images/warhol_Capa do álbum Velvet Underground & Nico_1967 -- combined forced colors.png',
            title: 'Capa do álbum Velvet Underground & Nico', 
            width: 736,
            height: 737,
        },
        {
            filenameOriginal: 'output_images/warhol_flowers_1970 -- combined all colors.png',
            filenameShifted: 'output_images/warhol_flowers_1970 -- combined forced colors.png',
            title: 'Flowers 1970', 
            width: 731,
            height: 743,
        },
        {
            filenameOriginal: 'output_images/warhol_mao -- combined all colors.png',
            filenameShifted: 'output_images/warhol_mao -- combined forced colors.png',
            title: 'Mao', 
            width: 336,
            height: 387,
        },
        {
            filenameOriginal: 'output_images/warhol_self portrait_1972 -- combined all colors.png',
            filenameShifted: 'output_images/warhol_self portrait_1972 -- combined forced colors.png',
            title: 'Self portrait 1972', 
            width: 1486,
            height: 740,
        },
        {
            filenameOriginal: 'output_images/warhol_sunset_1972 -- combined all colors.png',
            filenameShifted: 'output_images/warhol_sunset_1972 -- combined forced colors.png',
            title: 'Sunset 1972', 
            width: 733,
            height: 739,
        },
        {
            filenameOriginal: 'output_images/warhol_vesuvius_1985 -- combined all colors.png',
            filenameShifted: 'output_images/warhol_vesuvius_1985 -- combined forced colors.png',
            title: 'Versuvius 1985', 
            width: 966,
            height: 744,
        },
        {
            filenameOriginal: 'output_images/kaggle dataset1 -- combined all colors.png',
            filenameShifted: 'output_images/kaggle dataset1 -- combined forced colors.png',
            title: 'Kaggle dataset1', 
            width: 1024,
            height: 1024,
        },
        {
            filenameOriginal: 'output_images/kaggle dataset2 -- combined all colors.png',
            filenameShifted: 'output_images/kaggle dataset2 -- combined forced colors.png',
            title: 'Kaggle dataset2', 
            width: 800,
            height: 800,
        },
        {
            filenameOriginal: 'output_images/kaggle dataset3 -- combined all colors.png',
            filenameShifted: 'output_images/kaggle dataset3 -- combined forced colors.png',
            title: 'Kaggle dataset3', 
            width: 1024,
            height: 772,
        },
        {
            filenameOriginal: 'output_images/kaggle dataset4 -- combined all colors.png',
            filenameShifted: 'output_images/kaggle dataset4 -- combined forced colors.png',
            title: 'Kaggle dataset4', 
            width: 1024,
            height: 768,
        },
        {
            filenameOriginal: 'output_images/kaggle dataset5 -- combined all colors.png',
            filenameShifted: 'output_images/kaggle dataset5 -- combined forced colors.png',
            title: 'Kaggle dataset5', 
            width: 1024,
            height: 685,
        },
        {
            filenameOriginal: 'output_images/60_colors_chart.png',
            filenameShifted: 'output_images/60_colors_chart.png',
            title: 'Color chart',
            width: 793,
            height: 746,
        },
        {
            filenameOriginal: 'input_images/circleoffifths.png',
            filenameShifted: 'input_images/circleoffifths.png',
            title: 'Circle of Fifths',
            width: 1024,
            height: 1024,
        }
    ]

let colorMode = 'original';
let currentImageIndex = 0;

document.getElementById('set-colors-original').addEventListener('click', function() {
    colorMode = 'original';
    setImage(currentImageIndex);
});
document.getElementById('set-colors-shifted').addEventListener('click', function() {
    colorMode = 'shifted';
    setImage(currentImageIndex);
});
    


 let imagePickerContainer = document.getElementById('image-picker-container')

    for (let i in images) {
        let btn = document.createElement('button');
        btn.style.marginRight = '5px';
        btn.style.whiteSpace = 'nowrap';
        btn.style.marginBottom = '16px';
        btn.innerText = images[i].title;
        btn.onclick = function() {
            currentImageIndex = i;
            setImage(i);
        }
        imagePickerContainer.appendChild(btn);
    }
	// Get the HTML Canvas
  const canvas = document.getElementById("image_canvas");
  //canvas.click()
  // Get the canvas context
  let ctx = canvas.getContext('2d', { willReadFrequently: true });
  
  const currentHoverColorContainer = document.getElementById('currentHoverColorContainer');
  const mostSimilarColorContainer = document.getElementById('mostSimilarColorContainer');
  const currentChordContainer = document.getElementById('currentChordContainer');
  const currentChordRootContainer = document.getElementById('currentChordRootContainer');
  const currentColorFrame = document.getElementById('currentColorFrame');
  
  // pentatonic HTML
  const currentPentatonicColorFrame = document.getElementById('currentPentatonicColorFrame');
  const currentNoteContainer = document.getElementById('currentNoteContainer');
  const currentNoteOriginalColorContainer = document.getElementById('currentNoteOriginalColorContainer');
  const colorVectorContainer = document.getElementById('colorVectorContainer');

  // circle of fifths HTML
  const currentFifthColorFrame = document.getElementById('mostSimilarColorContainer');
  const currentFifthNoteContainer = document.getElementById('currentChordContainer');
  const fifthColorVectorContainer = document.getElementById('fifthColorVectorContainer');

  if (!playPentatonic) {
    currentPentatonicColorFrame.style.display = 'none';
    colorVectorContainer.style.display = 'none';
    currentNoteContainer.style.display = 'none';
    currentNoteOriginalColorContainer.style.display = 'none';
  }
  currentFifthColorFrame.style.display = 'none';
  fifthColorVectorContainer.style.display = 'none';
  currentFifthNoteContainer.style.display = 'none';
  //currentFifthNoteOriginalColorContainer.style.display = 'none';
  // Set this variable to any image source
  const params = new URLSearchParams(window.location.search);
  let IMAGE_SRC = params.get('imageSource')
  function setImage(index) {
    const image = new Image();
   // console.log(colorMode)
    if (colorMode === 'original') {
        image.src = images[index].filenameOriginal;
    } else if (colorMode === 'shifted') {
        image.src = images[index].filenameShifted;
    }
    console.log(IMAGE_SRC)
    
    image.onload = function() {
        let maxWidth = canvas.width;
        let maxHeight = canvas.height;

        // Calculate scaling factors
        let widthScale = maxWidth / image.width;
        let heightScale = maxHeight / image.height;
        let scaleFactor = Math.min(widthScale, heightScale);

        let scaledWidth = image.width * scaleFactor;
        let scaledHeight = image.height * scaleFactor;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the image proportionately
        ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);
        }
    }
  

	// Create a new image and add it to your canvas
  const img = new Image();
    // Wait for the image to load before drawing to the canvas
    img.addEventListener('load', function() {
        ctx.drawImage(img, 0, 0);
    }, false);
  img.src = IMAGE_SRC;
  // This is important to avoid cross origin errors
  img.setAttribute('crossOrigin', '');
  //setImage()
  // Add a function to the mousemove event to get pixel data
  // NOTE: You should probably debounce this
  
  canvas.onmousemove = function(e) {
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    let colorData = ctx.getImageData(mouseX, mouseY, 1, 1).data;
    let colorVector = [
        ctx.getImageData(mouseX-25, mouseY-25, 1, 1).data,
        ctx.getImageData(mouseX+0, mouseY-25, 1, 1).data,
        ctx.getImageData(mouseX+25, mouseY-25, 1, 1).data,
        ctx.getImageData(mouseX-25, mouseY+0, 1, 1).data,
        ctx.getImageData(mouseX+0, mouseY+0, 1, 1).data,
        ctx.getImageData(mouseX+25, mouseY+0, 1, 1).data,
        ctx.getImageData(mouseX-25, mouseY+25, 1, 1).data,
        ctx.getImageData(mouseX+0, mouseY+25, 1, 1).data,
        ctx.getImageData(mouseX+25, mouseY+25, 1, 1).data,
    ]
    colorVectorContainer.innerHTML = colorVector.map(c => `<span style="background-color: rgb(${c[0]}, ${c[1]}, ${c[2]}); min-width: 20px; min-height: 20px; display: inline-block;"></span>`).join('');
    fifthColorVectorContainer.innerHTML = colorVector.map(c => `<span style="background-color: rgb(${c[0]}, ${c[1]}, ${c[2]}); min-width: 20px; min-height: 20px; display: inline-block;"></span>`).join('');
    let pentatonicVector = colorVector.map(c => ({'mostSimilarColor': findMostSimilarRGB([c[0], c[1], c[2]], pentatonicColors).closestColor, 'originalColor': [c[0], c[1], c[2]], 'mostSimilarColorIndex': findMostSimilarRGB([c[0], c[1], c[2]], pentatonicColors).colorIndex, 'frequency': pentatonic_in_key[findMostSimilarRGB([c[0], c[1], c[2]], pentatonicColors).colorIndex].frequency, 'noteExact': pentatonic_in_key[findMostSimilarRGB([c[0], c[1], c[2]], pentatonicColors).colorIndex].noteExact}));
    //console.table(pentatonicVector);

    let mostSimilarColor, mostSimilarColorIndex, chord, currentRGBA;

    if (playPentatonic) {  
        pentatonicPlayer.playNotes(pentatonicVector);
    }
    if (playFifths) {
        mostSimilarColor = findMostSimilarRGB([colorData[0], colorData[1], colorData[2]], circleOfFifths).closestColor;
        mostSimilarColorIndex = findMostSimilarRGB([colorData[0], colorData[1], colorData[2]], circleOfFifths).colorIndex;
        chord = chords_used[mostSimilarColorIndex];
        chordPlayer.playChord(chord);
    } else {
        mostSimilarColor = findMostSimilarRGB([colorData[0], colorData[1], colorData[2]], colors).closestColor;
        mostSimilarColorIndex = findMostSimilarRGB([colorData[0], colorData[1], colorData[2]], colors).colorIndex;
        chord = chords_used[mostSimilarColorIndex];
        chordPlayer.playChord(chord);
    }
    


    currentHoverColorContainer.style.backgroundColor = currentRGBA;
    currentHoverColorContainer.innerHTML = `R: ${colorData[0]}<br>G: ${colorData[1]}<br>B: ${colorData[2]}`;
    //mostSimilarColorContainer.innerHTML = `Most similar color: rgba(${mostSimilarColor[0]}, ${mostSimilarColor[1]}, ${mostSimilarColor[2]})`;
    mostSimilarColorContainer.style.backgroundColor = `rgba(${mostSimilarColor[0]}, ${mostSimilarColor[1]}, ${mostSimilarColor[2]})`;
    mostSimilarColorContainer.innerHTML = `R: ${mostSimilarColor[0]}<br>G: ${mostSimilarColor[1]}<br>B: ${mostSimilarColor[2]} <br>Note: ${chord.note}`;
    currentChordContainer.innerHTML = `${chord.note} ${chord.quality}`;
    currentChordRootContainer.innerHTML = `${chord.noteExact}`;
    currentColorFrame.style.left = `${(mostSimilarColorIndex * 20)-6}px`;

    console.log('socket.readyState: ' + socket.readyState);

    if (socket.readyState === WebSocket.OPEN) {
        const imageData = {
            position: {
                x: mouseX,
                y: mouseY
            },
            color: {
                r: colorData[0],
                g: colorData[1],
                b: colorData[2],
            },
        }
        console.log(imageData);
        socket.send(JSON.stringify(imageData));
    }
    }  
}

class PentatonicPlayer {
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.isPlaying = false;
        this.reverb = reverb;
        this.currentNotes = []; // Store the current notes
        this.lastPlayedNoteExact = null;
        this.keepPlaying = false; // Flag to control the playback loop
        this.soundStyle = 'analog'; // set to either analog or digital
        this.playChords = false; // set to false to play only single notes, set to true to play chords.
        //this.currentPlayback = new Promise(function(resolve, reject){}); // Store the current playback timeout
    }
  
   // similar to the chord player, but this loops through the pentatonic notes and play each not for 1 second. 
    playNotes(notes) {

        if (this.currentNotes.length < 9 && this.isPlaying === false) {
            this.currentNotes = notes; // Store the current notes
            this.playCurrentNotes();
        }


        // compare if the new input notes are the same as the current notes, if not, stop the current notes and play the new notes
        // if (JSON.stringify(notes) === JSON.stringify(this.currentNotes) && this.isPlaying) {
        //     console.log('same notes')
        //     return;
        // } else {
        //     this.keepPlaying = false; // Stop the current playback loop
        //     this.isPlaying = false; 
        //     this.currentNotes = notes; // Store the current notes
        //     if (!this.isPlaying && this.currentNotes.length > 0) {
        //         console.log('play notes')
        //         this.keepPlaying = true; // Set the flag to keep playing the current notes
        //         this.playCurrentNotes(); // Start playing the current notes
        //     }
        // }
        

        
    }

    playCurrentFirstNote() {
        let note = this.currentNotes[0];
        currentNoteContainer.innerHTML = note.noteExact;
        currentNoteContainer.style.backgroundColor = `rgba(${note.mostSimilarColor[0]}, ${note.mostSimilarColor[1]}, ${note.mostSimilarColor[2]})`;
        currentNoteOriginalColorContainer.style.backgroundColor = `rgba(${note.originalColor[0]}, ${note.originalColor[1]}, ${note.originalColor[2]})`;
        currentPentatonicColorFrame.style.left = `${(note.mostSimilarColorIndex * 20)-6}px`;
        if (this.soundStyle === 'digital') {
            
            const now = this.audioContext.currentTime;
            const attackTime = 0.1;
            const decayTime = 0;
            const sustainLevel = 1;
            const releaseTime = 0.01;
            const noteLength = 1; // Length of each note in seconds

            const oscillator = this.audioContext.createOscillator();
            oscillator.type = 'triangle';
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.reverb);
            this.reverb.connect(this.audioContext.destination);

            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(1, now + attackTime);
            gainNode.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime);

            oscillator.frequency.setValueAtTime(note.frequency, now);
            oscillator.start(now);

            gainNode.gain.setValueAtTime(sustainLevel, now + noteLength - releaseTime);
            gainNode.gain.linearRampToValueAtTime(0, now + noteLength);
            oscillator.stop(now + noteLength);
            //new Promise(resolve => setTimeout(resolve, noteLength * 1000));
        } else if (this.soundStyle = 'analog') {
            let filename = `${note.noteExact}.mp3`;
            let filePath = 'piano_notes/piano-mp3/';
            let audio = new Audio(filePath + filename);
            audio.play();
        }
        
    }

    playCurrentNotes() {   
        this.playCurrentFirstNote();
        let noteInterval = setInterval(() => {
            //console.log('playing note')
            if (this.currentNotes.length > 0) {
                this.isPlaying = true;
                if (this.lastPlayedNoteExact != this.currentNotes[0].noteExact) {
                    this.playCurrentFirstNote();
                }
                this.lastPlayedNoteExact = this.currentNotes[0].noteExact
                this.currentNotes.shift();
            } else if (this.currentNotes.length === 0) {
                clearInterval(noteInterval);
                this.isPlaying = false;
            }
        }, 250);


        // Wait for the note to finish before playing the next one
        //new Promise(resolve => setTimeout(resolve, noteLength * 1000));
        //this.isPlaying = false;    
    }
    
}

class ChordPlayer {
    constructor(audioContext, reverb) {
      this.audioContext = audioContext;
      this.reverb = reverb;
      this.isPlaying = false;
      this.currentFrequencies = null; // Store the current chord
      this.currentChord = null; // Store the current chord
      this.keepPlaying = false; // Flag to control the playback loop
      this.soundStyle = 'analog'; // set to either analog or digital
    }
  
    playChord(chord) {

        this.currentFrequencies = chord.frequencies; // Store the current chord
        this.currentChord = chord; // Store the current chord
        //this.playCurrentChord(); // Start playing the current chord
        if (!this.isPlaying) {
        //this.keepPlaying = true; // Set the flag to keep playing the current chord
        this.playCurrentChord(); // Start playing the current chord
        }
    }
  
    playCurrentChord() {
        if (this.soundStyle == 'digital') {
            if (!this.currentFrequencies || !this.keepPlaying) {
            // If there are no frequencies to play or the flag is false, stop playing
            this.isPlaying = false;
            return;
            }

            this.isPlaying = true;
            const now = this.audioContext.currentTime;
            const attackTime = 0.1;
            const decayTime = 0;
            const sustainLevel = 1;
            const releaseTime = .01;
            const noteLength = 1; // Length of each note

            this.currentFrequencies.forEach(frequency => {
                const oscillator = this.audioContext.createOscillator();
                oscillator.type = 'triangle';
                const gainNode = this.audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(this.reverb);
                this.reverb.connect(this.audioContext.destination);

                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(1, now + attackTime);
                gainNode.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime);

                oscillator.frequency.setValueAtTime(frequency, now);
                oscillator.start(now);

                gainNode.gain.setValueAtTime(sustainLevel, now + noteLength - releaseTime);
                gainNode.gain.linearRampToValueAtTime(0, now + noteLength);
                oscillator.stop(now + noteLength);
            });
    
            // Schedule the next play after the current play is finished
            setTimeout(() => {
                this.isPlaying = false;
                // If keepPlaying is still true, play the chord again
                if (this.keepPlaying) {
                this.playCurrentChord();
                }
            }, noteLength * 1000); // Convert seconds to milliseconds
        } else if (this.soundStyle == 'analog') {
            
            if (this.isPlaying !== true) {
                let chordQuality = '';
                let filePath = '';
                let filename = '';
                let noteName = '';
                if (this.playChords) {
                    filePath = 'piano_triads/';
                } else {
                    filePath = 'piano_notes/';
                }
                
                
                switch (this.currentChord.quality) {
                    case 'diminished':
                        chordQuality = 'dim';
                        break;
                    case 'major':
                        chordQuality = 'maj';
                        break;
                    case 'minor':
                        chordQuality = 'min';
                        break;
                }  
                if (this.playChords) {
                    noteName = this.currentChord.note.replaceAll('#', 's');
                    filename = `${noteName}_${chordQuality}_${this.currentChord.octave}_0.wav`;
                } else {
                    noteName = this.currentChord.note.replaceAll('#', 's');
                    filename = `${noteName}${this.currentChord.octave}.mp3`;
                    //console.log(filename)
                }
                
                let audio = new Audio(filePath + filename);
                audio.volume = 0.3;
                audio.play();
                let isPlayingMuter = this.isPlaying;
                setTimeout(()=>{
                    this.isPlaying = false;
                }, 2250)
                this.isPlaying = true;
            }
        }
    }
  
    // Method to stop playing the current chord and prepare for a new one
    setNewChord(frequencies) {
      this.keepPlaying = false; // Stop the current playback loop
      setTimeout(() => {
        this.playChord(frequencies); // Play the new chord after a short delay
      }, 50); // Short delay to ensure the current playing stops
    }
  }
  
  
  // Usage
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const reverb = createReverb(audioContext);
  const chordPlayer = new ChordPlayer(audioContext, reverb);
  const pentatonicPlayer = new PentatonicPlayer(audioContext, reverb);
  
  function createReverb(audioContext) {
    const reverb = audioContext.createConvolver();
    const sampleRate = audioContext.sampleRate;
    const length = sampleRate * 0.2; // 2 seconds of reverb
    const impulse = audioContext.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < impulse.numberOfChannels; channel++) {
        const impulseChannelData = impulse.getChannelData(channel);
        for (let i = 0; i < length; i++) {
            // Fill the buffer with white noise
            impulseChannelData[i] = (Math.random() * 2 - 1) * 0.2; // Lower volume of reverb
        }
    }
    
    reverb.buffer = impulse;
    return reverb;
}


// let colors = [
//     [0, 0, 0], [25, 0, 0], [50, 0, 0], [75, 0, 0], [100, 0, 0],
//     [125, 0, 0], [150, 25, 0], [175, 50, 0], [200, 75, 0], [225, 100, 0],
//     [255, 125, 0], [255, 150, 25], [255, 175, 50], [255, 200, 75], [255, 225, 100],
//     [255, 255, 125], [225, 255, 150], [200, 255, 175], [175, 255, 200], [150, 255, 225],
//     [125, 255, 255], [100, 225, 255], [75, 200, 255], [50, 175, 255], [25, 150, 255],
//     [0, 125, 255], [0, 100, 225], [0, 75, 200], [0, 50, 175], [0, 25, 150],
//     [0, 0, 125], [25, 0, 100], [50, 0, 75], [75, 0, 50], [100, 0, 25],
//     [125, 125, 125], [150, 150, 150], [175, 175, 175], [200, 200, 200], [225, 225, 225],
//     [255, 255, 255], [255, 230, 230], [255, 205, 205], [255, 180, 180], [255, 155, 155],
//     [255, 130, 130], [255, 105, 105], [255, 80, 80], [255, 55, 55], [255, 30, 30]
// ]

// rearranged version with darker colors first, this is an array of 50 colors to be used together with the chords_in_key array of 50 chords
// let colors = [
//     [0, 0, 0], [25, 0, 0], [0, 0, 125], [50, 0, 0], [25, 0, 100], [75, 0, 0], 
//     [50, 0, 75], [75, 0, 50], [100, 0, 0], [100, 0, 25], [125, 0, 0], [0, 25, 150], 
//     [0, 50, 175], [150, 25, 0], [0, 75, 200], [175, 50, 0], [0, 100, 225], 
//     [200, 75, 0], [255, 55, 55], [0, 125, 255], [255, 80, 80], [225, 100, 0], [125, 125, 125], 
//     [25, 150, 255], [255, 105, 105], [255, 125, 0], [150, 150, 150], [50, 175, 255], [255, 130, 130], 
//     [255, 150, 25], [175, 175, 175], [255, 155, 155], [75, 200, 255], [255, 175, 50], [255, 180, 180], 
//     [200, 200, 200], [100, 225, 255], [255, 200, 75], [255, 205, 205], [255, 225, 100], [225, 225, 225], 
//     [125, 255, 255], [150, 255, 225], [175, 255, 200], [255, 230, 230], [200, 255, 175], [225, 255, 150], 
//     [255, 255, 125], [255, 30, 30], [255, 255, 255]
// ];

// version with 60 color values.
let colors = [
    [208, 72, 154], [236, 24, 121], [236, 28, 35], [250, 164, 23], [241, 235, 32], [154, 201, 59], [113, 193, 82], [111, 197, 164], [59, 184, 235], [67, 111, 182], [90, 80, 162], [134, 80, 160],
    [214, 111, 171], [237, 95, 141], [240, 90, 65], [251, 181, 75], [244, 235, 98], [173, 211, 96], [141, 199, 116], [136, 209, 181], [109, 192, 236], [101, 133, 193], [117, 105, 174], [154, 108, 177],
    [223, 144, 189], [243, 135, 166], [243, 134, 99], [254, 197, 119], [248, 239, 139], [191, 222, 135], [170, 213, 150], [171, 219, 196], [149, 207, 242], [134, 153, 205], [143, 134, 190], [171, 137, 190],
    [230, 179, 209], [247, 174, 193], [248, 168, 141], [255, 215, 161], [249, 244, 176], [212, 228, 174], [196, 225, 181], [196, 228, 213], [183, 221, 244], [169, 182, 220], [175, 167, 210], [196, 171, 211],
    [241, 214, 232], [250, 213, 221], [253, 210, 191], [254, 234, 204], [252, 249, 215], [231, 241, 212], [225, 239, 216], [226, 240, 232], [220, 236, 250], [209, 214, 236], [209, 206, 233], [222, 210, 229]
  ];

colors = evenlyTrimArray(colors, 60);

// this is an array of 20 colors to be used together with the pentatonic_in_key array of 20 notes
let pentatonicColors = [
    [0, 0, 0],
    [25, 0, 0],
    [50, 0, 0],
    [75, 0, 50],
    [0, 25, 150],
    [175, 50, 0],
    [0, 125, 255],
    [255, 80, 80],
    [50, 175, 255],
    [255, 150, 25],
    [75, 200, 255],
    [255, 175, 50],
    [100, 225, 255],
    [255, 200, 75],
    [255, 225, 100],
    [150, 255, 225],
    [255, 230, 230],
    [200, 255, 175],
    [255, 255, 125],
    [255, 255, 255]
];

let circleOfFifths = [
    [255, 0, 0],
    [255, 165, 0],
    [255, 255, 0],
    [0, 255, 0],
    [0, 255, 255],
    [0, 0, 255],
    [128, 0, 128],
    [255, 192, 203],
    [255, 20, 147],
    [147, 112, 219],
    [75, 0, 130],
    [72, 61, 139],
    [47, 79, 79],
    [70, 130, 180]
];


// Function to calculate Euclidean distance between two RGB values
function rgbDistance(rgb1, rgb2) {
    return Math.sqrt(
        Math.pow(rgb1[0] - rgb2[0], 2) +
        Math.pow(rgb1[1] - rgb2[1], 2) +
        Math.pow(rgb1[2] - rgb2[2], 2)
    );
}

// Function to find the most similar RGB value from an array
function findMostSimilarRGB(targetRGB, colorArray) {
    let closestColor = colorArray[0];
    let smallestDistance = rgbDistance(targetRGB, closestColor);

    for (let i = 1; i < colorArray.length; i++) {
        const currentDistance = rgbDistance(targetRGB, colorArray[i]);
        if (currentDistance < smallestDistance) {
            smallestDistance = currentDistance;
            closestColor = colorArray[i];
        }
    }

    return {'closestColor': closestColor, colorIndex: colorArray.indexOf(closestColor)};
}





// Assuming `notesMap` is already populated with your JSON data
// For example, you might have fetched it like so:

let notesInKey = {
    "major": {
    'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    'C#': ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C'],
    'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    'D#': ['D#', 'F', 'G', 'G#', 'A#', 'C', 'D'],
    'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    'F': ['F', 'G', 'A', 'A#', 'C', 'D', 'E'],
    'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F'],
    'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    'G#': ['G#', 'A#', 'C', 'C#', 'D#', 'F', 'G'],
    'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    'A#': ['A#', 'C', 'D', 'D#', 'F', 'G', 'A'],
    'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
    },
    "minor": {
    'C': ['C', 'D', 'D#', 'F', 'G', 'G#', 'A#'],
    'C#': ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'],
    'D': ['D', 'E', 'F', 'G', 'A', 'A#', 'C'],
    'D#': ['D#', 'F', 'F#', 'G#', 'A#', 'B', 'C#'],
    'E': ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
    'F': ['F', 'G', 'G#', 'A#', 'C', 'C#', 'D#'],
    'F#': ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'],
    'G': ['G', 'A', 'A#', 'C', 'D', 'D#', 'F'],
    'G#': ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'],
    'A': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    'A#': ['A#', 'C', 'C#', 'D#', 'F', 'F#', 'G#'],
    'B': ['B', 'C#', 'D', 'E', 'F#', 'G', 'A']
    }
}


function getAllChords(notesMap) {
    const chords = [];
    notesMap.forEach((note, index) => {
        if (note.octave < 2 || note.octave > 6) {
            return;
        }
        chords.push({key: index, quality: 'major', frequencies: note.majorFrequencies, note: note.note, noteExact: note.note_exact, octave: note.octave});
    });
    return chords;
}

function getChordsInKey(key, quality, notesMap) {
    const chords = [];
    notesMap.forEach((note, index) => {
        if (note.octave < 2 || note.octave > 7) {
            return;
        }
        if (notesInKey[quality][key].includes(note.note)) {
            const noteIndex = notesInKey[quality][key].indexOf(note.note);
            if (quality === "major") {
                if ([0, 3, 4].includes(noteIndex)) {
                    chords.push({key: index, quality: 'major', frequencies: note.majorFrequencies, note: note.note, noteExact: note.note_exact, octave: note.octave});
                } else if ([1, 2, 5].includes(noteIndex)) {
                    chords.push({key: index, quality: 'minor', frequencies: note.minorFrequencies, note: note.note, noteExact: note.note_exact, octave: note.octave});
                } else if (noteIndex === 6) {
                    chords.push({key: index, quality: 'diminished', frequencies: note.diminishedFrequencies, note: note.note, noteExact: note.note_exact, octave: note.octave});
                }
            } else if (quality === "minor") {
                if ([0, 3, 4].includes(noteIndex)) {
                    chords.push({key: index, quality: 'minor', frequencies: note.minorFrequencies, note: note.note, noteExact: note.note_exact, octave: note.octave});
                } else if ([2, 5, 6].includes(noteIndex)) {
                    chords.push({key: index, quality: 'major', frequencies: note.majorFrequencies, note: note.note, noteExact: note.note_exact, octave: note.octave});
                } else if (noteIndex === 1) {
                    chords.push({key: index, quality: 'diminished', frequencies: note.diminishedFrequencies, note: note.note, noteExact: note.note_exact, octave: note.octave});
                }
            }
        }
    });
    //console.log(chords.length, ' chords created in key ', key);
    return chords;
}

function trimArray(arr, outputLength) {
    
    let removeStart = true; // Flag to alternate between removing from start and end

    while (arr.length > outputLength) {
        if (removeStart) {
            arr.shift(); // Remove from start
        } else {
            arr.pop(); // Remove from end
        }
        removeStart = !removeStart; // Toggle flag
    }

    return arr;
}

function evenlyTrimArray(arr, n) {
    if (arr.length <= n) {
        return arr;
    }
    let arrayMiddle = [...arr];
    arrayMiddle.shift();
    arrayMiddle.pop();
    let trimmedArray = [];
    let numberToRemove = arr.length - n;
    let step = arrayMiddle.length / numberToRemove;
    let indexesToRemove = [];
    for (let i = 1; i < numberToRemove+1; i++) {
        indexesToRemove.push(Math.round((step*i) - (step / 2)));
    }
    for (let i = 0; i < arrayMiddle.length; i++) {
        if (!indexesToRemove.includes(i)) {
            trimmedArray.push(arr[i]);
        }
    }
    trimmedArray.unshift(arr[0]);
    trimmedArray.push(arr[arr.length-1]);
    return trimmedArray;
}


let pentatonicKeys = {
    "major": {
        "C": ["C", "D", "E", "G", "A"],
        "C#": ["C#", "D#", "F", "G#", "A#"], 
        "D": ["D", "E", "F#", "A", "B"],
        "D#": ["D#", "F", "G", "A#", "C"], 
        "E": ["E", "F#", "G#", "B", "C#"],
        "F": ["F", "G", "A", "C", "D"], 
        "F#": ["F#", "G#", "A#", "C#", "D#"],
        "G": ["G", "A", "B", "D", "E"], 
        "G#": ["G#", "A#", "C", "D#", "F"], 
        "A": ["A", "B", "C#", "E", "F#"],
        "A#": ["A#", "C", "D", "F", "G"],
        "B": ["B", "C#", "D#", "F#", "G#"]
    },
    "minor": {
        "C": ["C", "D#", "F", "G", "A#"],
        "C#": ["C#", "E", "F#", "G#", "B"],
        "D": ["D", "F", "G", "A", "C"],
        "D#": ["D#", "F#", "G#", "A#", "C#"],
        "E": ["E", "G", "A", "B", "D"],
        "F": ["F", "G#", "A#", "C", "D#"],
        "F#": ["F#", "A", "B", "C#", "E"],
        "G": ["G", "A#", "C", "D", "F"],
        "G#": ["G#", "B", "C#", "D#", "F#"],
        "A": ["A", "C", "D", "E", "G"],
        "A#": ["A#", "C#", "D#", "F", "G#"],
        "B": ["B", "D", "E", "F#", "A"]
    }
};


function getPentatonicScaleInKey(key, quality, notesMap) {
    const scale = [];
    notesMap.forEach((note, index) => {
        if (pentatonicKeys[quality][key].includes(note.note)) {
            scale.push({key: index, note: note.note, frequency: note.frequency, noteExact: note.note_exact});
        }
    });
    return scale;
}

let pentatonic_in_key = getPentatonicScaleInKey('C', 'major', notesMap);
pentatonic_in_key = trimArray(pentatonic_in_key, 20)







// let preferedKey = prompt('enter the prefered key as a capital letter with sharp sign (if wanted).');
// let preferedQuality = prompt('enter the prefered quality as either "major" or "minor".');
// let chords_used = getChordsInKey(preferedKey, preferedQuality, notesMap);
//let chords_used = getChordsInKey('C', 'major', notesMap);
let chords_used = getAllChords(notesMap);
//console.log('chords_used : ', chords_used)
chords_used = evenlyTrimArray(chords_used, 60);



let colorMapContainer = document.getElementById('colorMapContainer');

for (let i in colors) {
    let chordAsString = ''
    if (chords_used[i].quality === 'major') {
        chordAsString = chords_used[i].note
    } else if (chords_used[i].quality === 'minor') {
        chordAsString = chords_used[i].note.toLowerCase() + 'm'
    } else if (chords_used[i].quality === 'diminished') {
        chordAsString = chords_used[i].note + 'dim'
    }
    colorMapContainer.innerHTML += `<div style="position: relative; height: 20px; width: 12px; background-color: rgba(${colors[i][0]}, ${colors[i][1]}, ${colors[i][2]})">
        <span style="font-size: 8px; min-width: 20px; text-align: center; position: absolute; left: -4px; top: -12px;">${chordAsString}</span>
    </div>`;
}

if (playPentatonic) {
    let pentatonicColorMapContainer = document.getElementById('pentatonicColorMapContainer');
    for (let i in pentatonicColors) {
        pentatonicColorMapContainer.innerHTML += `<div style="position: relative; height: 20px; width: 12px; background-color: rgba(${pentatonicColors[i][0]}, ${pentatonicColors[i][1]}, ${pentatonicColors[i][2]})">
            <span style="font-size: 8px; min-width: 20px; text-align: center; position: absolute; left: -4px; top: -12px;">${pentatonic_in_key[i].noteExact}</span>
        </div>`;
    }
}