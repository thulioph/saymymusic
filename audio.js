(function(window) {
  'use strict';

  let audioCtx = new (window.AudioContext ||
                     window.webkitAudioContext)();

  let analyser, distortion, gainNode, biquadFilter = null;

  const Audio = {
    init() {
      this._verifySupport();
    },

    _verifySupport() {
      if (audioCtx) {
        this.InitAudio();
      } else {
        console.info('Não tem suporte.');
      }
    },

    InitAudio() {
      this._getAudio();

      analyser = audioCtx.createAnalyser();
      distortion = audioCtx.createWaveShaper();
      gainNode = audioCtx.createGain();
      biquadFilter = audioCtx.createBiquadFilter();
    },

    _getAudio() {
      const options = { audio: true };

      window.navigator
        .getUserMedia(options, this._handleAudio.bind(this), this._handleError.bind(this));
    },

    _handleAudio(stream) {
      let source = audioCtx.createMediaStreamSource(stream);

      source.connect(analyser);
      analyser.connect(distortion);
      distortion.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      this._visualize(stream);
    },

    _visualize(stream) {
      console.warn(this);
      // console.warn(stream);
    },

    _handleError(err) {
      console.info(err);
    }
  };

  Audio.init();

})(window);