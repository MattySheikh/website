(function(document) {
	var playSound = function() {
		var file = $(this).data('sound'),
			files = file.split(' ').filter(function(n){ return (n != undefined && n != '') }), // Just in case I fuck up the JS lol
			fileToPlay = files[Math.floor(Math.random() * files.length)];
		new Audio('/sounds/'+ fileToPlay + '.mp3').play();
	};

	$(document)
		.on('click', '.image-sound-click', playSound);
})(document);