import { ChordPlayer } from './audio/ChordPlayer';
import { PentatonicPlayer } from './audio/PentatonicPlayer';
import { findMostSimilarRGB } from './utils/colorUtils';
import { PictureToNotesOptions } from '../types';

export class PictureToNotes {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private imageSource: string;
  private socket: WebSocket;
  private chordPlayer: ChordPlayer;
  private pentatonicPlayer: PentatonicPlayer;
  private playPentatonic: boolean;
  private playFifths: boolean;
  private audioVolume: number;
  private hapticIntensity: number;

  constructor(options: PictureToNotesOptions) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!;
    this.imageSource = options.imageSource;
    this.playPentatonic = options.playPentatonic ?? false;
    this.playFifths = options.playFifths ?? true;
    this.audioVolume = options.audioVolume ?? 0.3;
    this.hapticIntensity = options.hapticIntensity ?? 0.5;

    this.socket = new WebSocket(options.websocketUrl);
    this.socket.addEventListener('open', () => console.log('WebSocket connected'));
    this.socket.addEventListener('close', () => console.log('WebSocket disconnected'));
    this.socket.addEventListener('error', (err) => console.error('WebSocket error:', err));

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.chordPlayer = new ChordPlayer(audioContext);
    this.pentatonicPlayer = new PentatonicPlayer(audioContext);
  }

  public start() {
    this.loadAndRenderImage();
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  private loadAndRenderImage() {
    const img = new Image();
    img.src = this.imageSource;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const scale = Math.min(this.canvas.width / img.width, this.canvas.height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      this.ctx.drawImage(img, 0, 0, w, h);
    };
  }

  private handleMouseMove(e: MouseEvent) {
    const { offsetX, offsetY } = e;
    const colorData = this.ctx.getImageData(offsetX, offsetY, 1, 1).data;

    if (this.playPentatonic) {
      // TODO: Implement pentatonic logic
    }

    if (this.playFifths) {
      // TODO: Implement circle-of-fifths logic
    }

    if (this.socket.readyState === WebSocket.OPEN && this.hapticIntensity !== 0) {
      const payload = {
        intensity: this.hapticIntensity,
        image_data: {
          position: { x: offsetX, y: offsetY },
          color: { r: colorData[0], g: colorData[1], b: colorData[2] }
        }
      };
      this.socket.send(JSON.stringify(payload));
    }
  }
}
