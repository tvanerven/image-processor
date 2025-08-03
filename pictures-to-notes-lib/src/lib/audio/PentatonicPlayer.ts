export class PentatonicPlayer {
  private audioContext: AudioContext;
  private isPlaying: boolean = false;
  private soundStyle: 'analog' | 'digital' = 'analog';

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
  }

  playNotes(frequencies: number[], interval: number = 300) {
    if (this.soundStyle === 'digital') {
      let index = 0;
      const playNext = () => {
        if (index < frequencies.length) {
          this.playNote(frequencies[index]);
          index++;
          setTimeout(playNext, interval);
        }
      };
      playNext();
    } else {
      console.warn('Analog playback is not yet implemented.');
    }
  }

  private playNote(frequency: number) {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    const now = this.audioContext.currentTime;

    osc.type = 'sine';
    osc.frequency.value = frequency;

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.05);
    gain.gain.linearRampToValueAtTime(0, now + 0.25);

    osc.start(now);
    osc.stop(now + 0.3);
  }
}
