(function($) {
	// Defined collections bound to 
	var boundCollections = boundCollections || {}
	, activeCollections = activeCollections || {};

	$.fn.boxhide = function(keyCodeSet, callback) {
		if (undefined === boundCollections[this.selector + keyCodeSet])
		{
			boundCollections[this.selector + keyCodeSet] = {id: this.selector + keyCodeSet, keySet: keyCodeSet, callbackSet: [callback]};
		}
		else if (keyCodeSet.toString() === boundCollections[this.selector + keyCodeSet].keySet.toString())
		{
			for (var i = 0; i < boundCollections[this.selector + keyCodeSet].callbackSet.length; i++)
			//if (!$.inArray(callback, boundCollections[this.selector + keyCodeSet].callbackSet))
			{
				if (callback.toString() !== boundCollections[this.selector + keyCodeSet].callbackSet[i].toString())
				{
					boundCollections[this.selector + keyCodeSet].callbackSet.push(callback);
					break;
				}
			}
		}
		else
		{
			boundCollections[this.selector + keyCodeSet] = {id: this.selector + keyCodeSet, keySet: keyCodeSet, callbackSet: [callback]};
		}

		this.keydown(function(e) {
			var code = (e.keyCode ? e.keyCode : e.which);
			if (0 !== Object.keys(activeCollections).length) {
				for (idx in activeCollections)
				{
					var safeLength = boundCollections[idx].keySet.length;
					safeLength--;
					var firstCon = (boundCollections[idx].keySet.indexOf(code) === safeLength);
					var safeIdx = activeCollections[idx].currentIndex;
					safeIdx++;
					var secondCon = (boundCollections[idx].keySet.indexOf(code) === safeIdx);
					if (secondCon)
					{
						activeCollections[idx].currentIndex++;
						e.preventDefault();
						if (firstCon)
						{
							$.each(boundCollections[idx].callbackSet, function(callback)
							{
								boundCollections[idx].callbackSet[callback]();
							});
							activeCollections = [];
							return;
						}
					}
				}
			}
			else
			{
				for (idx in boundCollections)
				{
					if (0 === boundCollections[idx].keySet.indexOf(code))
					{
						if (1 === boundCollections[idx].keySet.length)
						{
							boundCollections[idx].callback();
							return;
						}
						activeCollections[idx] = {id: idx, currentIndex:0};
					}
				}
			}
		});

		this.keyup(function() {
			activeCollections = [];
		});
	};
})(jQuery);