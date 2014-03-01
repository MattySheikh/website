$w = $(window);
$d = $(document);

(function (window, document, $window, $document) {
	if (window.$) {
		// jQuery quickEach, like each but gives jQueryified element
		if ($.fn.quickEach === undefined) {
			$.fn.quickEach = (function () {
				var jq = jQuery([1]);
				return function (c) {
					var i = -1,
						el,
						len = this.length;
					try {
						while (++i < len && (el = jq[0] = this[i]) && c.call(jq, i, el) !== false);
					} catch (e) {
						delete jq[0];
						throw e;
					}
					delete jq[0];
					return this;
				};
			}());
		}
		// Custom toggle based on boolean value
		$.fn.showIf = function (bool) {
			return this[bool ? 'show' : 'hide']();
		};
		// Class toggle for single select menus (removes class from all siblings)
		$.fn.sibClass = function (className) {
			this.addClass(className).siblings().removeClass(className);
			return this;
		};
		// Forces an item to be rendered by the browser, useful for CSS animations
		$.fn.draw = function () {
			this.get(0).clientLeft;
			return this;
		};
	}

	window.onresize = function(e) {
		$('#subbar').showIf(window.outerWidth > 860);
	}

	$d
	.on('click', '#display-subbar', function() {
		$('#subbar').toggle();
	})
})(this, document, $w, $d);