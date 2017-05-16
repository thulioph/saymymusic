(function() {
	'use strict';

	const menubar = require('menubar');

	const options = {
		tooltip: 'Say my music.',
		icon: 'src/images/IconTemplate.png',
		width: 300,
		height: 500,
		resizable: false,
		showDockIcon: true,
		alwaysOnTop: false,
		dir: './'
	};

	const menuBar = menubar(options);

	// ====

	menuBar.on('ready', () => {
		console.log('app is ready');
	});

	menuBar.on('show', () => {
		console.log('App is show');
	});

	menuBar.on('hide', () => {
		console.log('App is hide');
	});

})();