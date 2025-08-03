import { notesInKey, pentatonicKeys } from '../data/keys';
import type { NoteData } from '../../types';

/**
 * Get all chords from a note map (e.g., for color mapping).
 */
export function getAllChords(notesMap: NoteData[]): any[] {
  return notesMap
    .filter(note => note.octave >= 2 && note.octave <= 6)
    .map((note, index) => ({
      key: index,
      quality: 'major',
      frequencies: note.majorFrequencies,
      note: note.note,
      noteExact: note.note_exact,
      octave: note.octave
    }));
}

/**
 * Get chords in a given key and quality.
 */
export function getChordsInKey(key: string, quality: 'major' | 'minor', notesMap: NoteData[]): any[] {
  const chords: any[] = [];

  notesMap.forEach((note, index) => {
    if (note.octave < 2 || note.octave > 7) return;
    if (!notesInKey[quality][key].includes(note.note)) return;

    const noteIndex = notesInKey[quality][key].indexOf(note.note);

    const chord = {
      key: index,
      note: note.note,
      noteExact: note.note_exact,
      octave: note.octave
    };

    if (quality === 'major') {
      if ([0, 3, 4].includes(noteIndex)) {
        chords.push({ ...chord, quality: 'major', frequencies: note.majorFrequencies });
      } else if ([1, 2, 5].includes(noteIndex)) {
        chords.push({ ...chord, quality: 'minor', frequencies: note.minorFrequencies });
      } else {
        chords.push({ ...chord, quality: 'diminished', frequencies: note.diminishedFrequencies });
      }
    } else if (quality === 'minor') {
      if ([0, 3, 4].includes(noteIndex)) {
        chords.push({ ...chord, quality: 'minor', frequencies: note.minorFrequencies });
      } else if ([2, 5, 6].includes(noteIndex)) {
        chords.push({ ...chord, quality: 'major', frequencies: note.majorFrequencies });
      } else {
        chords.push({ ...chord, quality: 'diminished', frequencies: note.diminishedFrequencies });
      }
    }
  });

  return chords;
}

/**
 * Get pentatonic scale notes in a key.
 */
export function getPentatonicScaleInKey(
  key: string,
  quality: 'major' | 'minor',
  notesMap: NoteData[]
): any[] {
  return notesMap.filter(note =>
    pentatonicKeys[quality][key].includes(note.note)
  );
}

/**
 * Trim an array from both sides evenly to a target length.
 */
export function evenlyTrimArray<T>(arr: T[], targetLength: number): T[] {
  if (arr.length <= targetLength) return arr;

  const result = [...arr];
  while (result.length > targetLength) {
    result.length % 2 === 0 ? result.shift() : result.pop();
  }

  return result;
}
