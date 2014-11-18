// Playground
;
(function() {
	var $pre;
	var playground = {
		init: function() {
			this.pre_Paint().imageHolder().adjustPreHeight();
		},
		pre_Paint: function() {
			$pre = $('pre').not('.no-print').addClass('prettyprint').addClass('html');
			$pre.each(function() {
				var $this = $(this),
					html = $this.html();

				$this.parent().parent().find('.pg-col').eq(0).html(html);

				$this.html('').text(html);
			});
			return this;
		},
		imageHolder: function() {
			var hold = function($img) {
				var s = $img.attr('src');
				if (typeof s !== 'undefined' && s.indexOf('img-holder-') !== -1) {
					var sArr = s.split('-'),
						w = parseInt(sArr[2]),
						h = parseInt(sArr[3]),
						text = w + 'x' + h,
						canvas = document.createElement('canvas');
					canvas.width = w;
					canvas.height = h;
					var c = canvas.getContext('2d');
					c.fillStyle = '#DDD';
					c.rect(0, 0, w, h);
					c.fill();
					c.textAlign = 'center';
					c.font = 'bold 14px Arial';
					c.fillStyle = '#999';
					c.fillText(text, w / 2, h / 2 + 7);


					var dataURL = canvas.toDataURL();
					$img.attr('src', dataURL);
				}
			};
			$('img').each(function() {
				hold($(this));
			});
			return this;
		},
		adjustPreHeight: function() {
			$pre.each(function() {
				var $this = $(this),
					h = $this.parent().parent().find('.pg-col').eq(0).height();
				$this.css('max-height', h + 'px');
			});
			return this;
		}
	};

	$('document').ready(function() {
		playground.init();
	});
})();