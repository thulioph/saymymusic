(function(window) {
  'use strict';

  let audioCtx = new (window.AudioContext ||
                     window.webkitAudioContext)();

  let analyser, distortion, gainNode, source, fbc_array, biquadFilter = null;

  let canvas, canvasCtx, bars, bar_x, bar_width, bar_height;

  const Audio = {
    init() {
      this.InitAudio();
      // this._verifySupport();
    },

    // _verifySupport() {
    //   if (audioCtx) {
    //     this.InitAudio();
    //   } else {
    //     console.info('Não tem suporte.');
    //   }
    // },

    InitAudio() {
      this.createCanvas();
      this.defineSizesCanvas();

      this._getAudio();
    },

    _getAudio() {
      const audio = new Audio();

      audio.src = './assets/Haikaiss - RAP LORD (VIDEOCLIPE OFICIAL).mp3';

      audio.loop = true;
      audio.controls = true;
      audio.autoplay = true;

      audio.crossOrigin = 'anonymous';

      this._handleAudio(audio)

      // const options = { audio: true };

      // window.navigator.getUserMedia(options, this._handleAudio.bind(this, audio), this._handleError.bind(this));
    },

    _handleAudio(audio) {
      console.warn('audio', audio);

      source = audio.createMediaElementSource(audio);
      analyser = audio.createAnalyser();
      fbc_array = new Uint8Array(analyser.frequencyBinCount);

      source.connect(analyser);
      analyser.connect(audio.destination);

      this._visualize(fbc_array);
    },

    _visualize() {
      canvasCtx.clearRect(10, 10, canvas.width, canvas.height);
      canvasCtx.fillStyle = '#363636';
      bars = 120;

      for (let i = 0; i < bars; i++) {
        bar_width = canvas.width / bars;
        bar_x = i * (bar_width + 5);
        bar_height = -(fbc_array[i]);
        canvasCtx.fillRect(bar_x, canvas.height, bar_width, bar_height);
      }
    },

    _handleError(err) {
      console.info(err);
    },

    createCanvas() {
      canvas = document.getElementById('analyser');
      canvasCtx = canvas.getContext('2d');
    },

    defineSizesCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    },

    frameLooper() {
      window.requestAnimationFrame(this.frameLooper);
      analyser.getByteFrequencyData(fbc_array);

      this._visualize();
    },
  };

  Audio.init();

})(window);