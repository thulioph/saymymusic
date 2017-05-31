(function(window) {
	'use strict';

		let audio, audioCtx, source, analyser, fbc_array, canvas, canvasCtx, bars, bar_x, bar_width, bar_height;

		function Init() {
			InitAudio();
			// GetUserAudio();

			CreateAudioCtx();

			CreateCanvas();
			DefineSizesCanvas();

			FrameLooper();
		}

		// ====

		function InitAudio() {
			audio = new Audio();

			audio.src = './src/assets/Haikaiss - RAP LORD (VIDEOCLIPE OFICIAL).mp3';

			audio.loop = true;
			audio.controls = true;
			audio.autoplay = true;

			audio.crossOrigin = 'anonymous';
		}

		function GetUserAudio() {
			let constraints = window.constraints = {
				audio: true,
				video: false
			};

			navigator.mediaDevices.getUserMedia(constraints)
				.then((stream) => {
					audio.srcObject = stream.getAudioTracks();
				})
				.catch((err) => {
					console.info(err);
				});

			// window.navigator.getUserMedia({audio: true}, (audio) => {
			// 	console.warn(audio);
			// }, (err) => {
			// 	console.info(err);
			// });
		}

		// ====

		function CreateAudioCtx() {
			audioCtx = new window.AudioContext();

			source = audioCtx.createMediaElementSource(audio);
			analyser = audioCtx.createAnalyser();
			fbc_array = new Uint8Array(analyser.frequencyBinCount);

			source.connect(analyser);
			analyser.connect(audioCtx.destination);
		}

		// ====

		function CreateCanvas() {
			canvas = document.getElementById('analyser');
	    canvasCtx = canvas.getContext('2d');
		}

		function DefineSizesCanvas() {
			canvas.width = (window.innerWidth - 20);
	    canvas.height = 300;
		}

		function Render() {
			canvasCtx.clearRect(10, 10, canvas.width, canvas.height);
	    canvasCtx.fillStyle = '#F00';
	    bars = 120;

	    for (let i = 0; i < bars; i++) {
	    	bar_width = canvas.width / bars;
	    	bar_x = i * (bar_width + 5);
	    	bar_height = -(fbc_array[i]);
	    	canvasCtx.fillRect(bar_x, canvas.height, bar_width, bar_height);
	    }
		}

		function FrameLooper() {
			window.requestAnimationFrame(FrameLooper);
			analyser.getByteFrequencyData(fbc_array);

			Render();
		}

		// ====

		window.addEventListener('load', Init, false);
		window.addEventListener('resize', DefineSizesCanvas, false);
})(window);