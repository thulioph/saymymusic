(function(window) {

	'use strict';

	const language = document.getElementById('language-select');
	const transcription = document.getElementById('transcription-area');
	const logs = document.getElementById('logs-area');
	const notification = document.getElementById('notification');

	const play = document.getElementById('play-button');
	const stop = document.getElementById('stop-button');

	let SpeechRecognition = window.SpeechRecognition ||
													window.webkitSpeechRecognition ||
													null;

	let recognizer = null;

	// ====

	class Api {
		constructor() {
		}

		fromGoogle(data) {
			let output = data;

			window.axios
				.get('https://api.genius.com/search', {
					params: {
						q: encodeURI(output)
					},
					headers: {
						'Authorization': 'Bearer 2veGhg2CggLtDXKqe2O9VwdBU2KHRY_qbzQzJ-t-XIgcRTCPdnwikB8eWEF67bHn'
					}
				})
				.then((response) => console.warn(response))
				.catch((err) => console.info(err));
		}
	};

	// ====

	const APP = {
		init() {
			this._verifySupport();
		},

		_verifySupport() {
			if (SpeechRecognition) {
				this.InitSpeech();
				console.warn(`Tem suporte \o/`);
			} else {
				console.info('Não tem suporte.');
			}
		},

		InitSpeech() {
			recognizer = new SpeechRecognition();
			transcription.textContent = '';

			recognizer.addEventListener('result', this._handleRecognizer, false);
			recognizer.addEventListener('error', this._handleRecognizerError.bind(this), false);
			recognizer.addEventListener('end', this._handleRecognizerEnd.bind(this), false);

			this._setListeners(recognizer);
		},

		_handleRecognizer(evt) {
			this._api = new Api();

			for (let i = evt.resultIndex; i < evt.results.length; i++) {
				if (evt.results[i].isFinal) {
					transcription.textContent = evt.results[i][0].transcript;
				} else {
					transcription.textContent += evt.results[i][0].transcript;
				}
			}

			this._api.fromGoogle(transcription.textContent)
		},

		displayLog(msg) {
			logs.textContent = msg;
		},

		_handleRecognizerError(evt) {
			this.displayLog(`Recognition error ${evt.message}`);
		},

		_handleRecognizerEnd(evt) {
			this.displayLog('Recognition ended.');
		},

		_setListeners() {
			play.addEventListener('click', this._handleClickPlay, false);
			stop.addEventListener('click', this._handleClickStop, false);
		},

		_handleClickPlay(evt) {
			evt.preventDefault();

			this.classList.add('is-loading');
			notification.classList.remove('is-hide');

			console.warn('Iniciando..');

			transcription.textContent = '';

			recognizer.lang = language.value;
    	recognizer.continuous = true;
     	recognizer.interimResults = false;

			try {
				recognizer.start();
			} catch (ex) {
				this.displayLog(`Ocorreu algum erro: ${ex.message}`);
			}
		},

		_handleClickStop(evt) {
			evt.preventDefault();

			play.classList.remove('is-loading');
			notification.classList.add('is-hide');

			console.warn('Parando..');

			recognizer.stop();
		}
	};

	// ====

	APP.init();

})(window);