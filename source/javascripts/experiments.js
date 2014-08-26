(function(document) {
	var playSound = function() {
		var file = $(this).data('sound');
		new Audio('/sounds/'+ file + '.mp3').play();
	};

	$(document)
		.on('click', '.image-sound-click', playSound);
})(document);