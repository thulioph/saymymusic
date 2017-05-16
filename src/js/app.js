(function() {
	'use strict';

	const menubar = require('menubar');

	const options = {
		tooltip: 'Say my music.',
		icon: 'src/images/IconTemplate.png',
		width: 300,
		height: 300,
		resizable: false,
		showDockIcon: true,
		alwaysOnTop: false,
		dir: './'
	};

	const menuBar = menubar(options);

	// ====

	menuBar.on('ready', (evt) => {
		console.log('app is ready', evt);
	});

	menuBar.on('show', (evt) => {
		console.log('App is show', evt);
	});

	menuBar.on('hide', (evt) => {
		console.log('App is hide', evt);
	});

})();