class d {
  audioContext;
  isPlaying = !1;
  soundStyle = "analog";
  constructor(t) {
    this.audioContext = t;
  }
  playChord(t, a = 0.3) {
    if (this.soundStyle === "digital") {
      const e = this.audioContext.currentTime, i = 0.1, o = 1, l = 1, h = 0.1;
      t.forEach((r) => {
        const s = this.audioContext.createOscillator(), n = this.audioContext.createGain();
        s.type = "triangle", s.frequency.value = r, s.connect(n), n.connect(this.audioContext.destination), n.gain.setValueAtTime(0, e), n.gain.linearRampToValueAtTime(a, e + i), n.gain.setValueAtTime(l, e + o - h), n.gain.linearRampToValueAtTime(0, e + o), s.start(e), s.stop(e + o);
      });
    } else
      console.warn("Analog playback is not yet implemented.");
  }
}
class u {
  audioContext;
  isPlaying = !1;
  soundStyle = "analog";
  constructor(t) {
    this.audioContext = t;
  }
  playNotes(t, a = 300) {
    if (this.soundStyle === "digital") {
      let e = 0;
      const i = () => {
        e < t.length && (this.playNote(t[e]), e++, setTimeout(i, a));
      };
      i();
    } else
      console.warn("Analog playback is not yet implemented.");
  }
  playNote(t) {
    const a = this.audioContext.createOscillator(), e = this.audioContext.createGain(), i = this.audioContext.currentTime;
    a.type = "sine", a.frequency.value = t, a.connect(e), e.connect(this.audioContext.destination), e.gain.setValueAtTime(0, i), e.gain.linearRampToValueAtTime(0.5, i + 0.05), e.gain.linearRampToValueAtTime(0, i + 0.25), a.start(i), a.stop(i + 0.3);
  }
}
class y {
  canvas;
  ctx;
  imageSource;
  socket;
  chordPlayer;
  pentatonicPlayer;
  playPentatonic;
  playFifths;
  audioVolume;
  hapticIntensity;
  constructor(t) {
    this.canvas = t.canvas, this.ctx = this.canvas.getContext("2d", { willReadFrequently: !0 }), this.imageSource = t.imageSource, this.playPentatonic = t.playPentatonic ?? !1, this.playFifths = t.playFifths ?? !0, this.audioVolume = t.audioVolume ?? 0.3, this.hapticIntensity = t.hapticIntensity ?? 0.5, this.socket = new WebSocket(t.websocketUrl), this.socket.addEventListener("open", () => console.log("WebSocket connected")), this.socket.addEventListener("close", () => console.log("WebSocket disconnected")), this.socket.addEventListener("error", (e) => console.error("WebSocket error:", e));
    const a = new (window.AudioContext || window.webkitAudioContext)();
    this.chordPlayer = new d(a), this.pentatonicPlayer = new u(a);
  }
  start() {
    this.loadAndRenderImage(), this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }
  loadAndRenderImage() {
    const t = new Image();
    t.src = this.imageSource, t.crossOrigin = "anonymous", t.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const a = Math.min(this.canvas.width / t.width, this.canvas.height / t.height), e = t.width * a, i = t.height * a;
      this.ctx.drawImage(t, 0, 0, e, i);
    };
  }
  handleMouseMove(t) {
    const { offsetX: a, offsetY: e } = t, i = this.ctx.getImageData(a, e, 1, 1).data;
    if (this.playPentatonic, this.playFifths, this.socket.readyState === WebSocket.OPEN && this.hapticIntensity !== 0) {
      const o = {
        intensity: this.hapticIntensity,
        image_data: {
          position: { x: a, y: e },
          color: { r: i[0], g: i[1], b: i[2] }
        }
      };
      this.socket.send(JSON.stringify(o));
    }
  }
}
export {
  y as default
};
