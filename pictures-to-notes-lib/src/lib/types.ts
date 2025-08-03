export interface PictureToNotesOptions {
  canvas: HTMLCanvasElement;
  imageSource: string;
  websocketUrl: string;
  playPentatonic?: boolean;
  playFifths?: boolean;
  audioVolume?: number;
  hapticIntensity?: number;
}

export interface NoteData {
  note: string;              // e.g. "C"
  note_exact: string;        // e.g. "C4"
  octave: number;
  frequency: number;
  majorFrequencies: number[];
  minorFrequencies: number[];
  diminishedFrequencies: number[];
}