export class ChordPlayer {
  private audioContext: AudioContext;
  private isPlaying: boolean = false;
  private soundStyle: 'analog' | 'digital' = 'analog';

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
  }

  playChord(frequencies: number[], volume: number = 0.3) {
    if (this.soundStyle === 'digital') {
      const now = this.audioContext.currentTime;
      const attackTime = 0.1;
      const noteLength = 1.0;
      const sustainLevel = 1;
      const releaseTime = 0.1;

      frequencies.forEach(freq => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'triangle';
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(volume, now + attackTime);
        gain.gain.setValueAtTime(sustainLevel, now + noteLength - releaseTime);
        gain.gain.linearRampToValueAtTime(0, now + noteLength);

        osc.start(now);
        osc.stop(now + noteLength);
      });
    } else {
      // Analog mode (use pre-recorded samples)
      console.warn('Analog playback is not yet implemented.');
    }
  }
}
