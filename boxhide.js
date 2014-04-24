(function($) {
	// Defined collections bound to 
	var boundCollections = boundCollections || []
	, activeCollections = activeCollections || []
	, collectionIndex = collectionIndex || 0;

	$.fn.boxhide = function(keyCodeSet, callback) {
		for (boundCollectionIdx in boundCollections) {
			if (boundCollections[boundCollectionIdx].keySet !== keyCodeSet)
			{
				collectionIndex++;
				boundCollections[collectionIndex] = {id: collectionIndex, keySet: keyCodeSet, callback: callback};
			}
		}

		if (0 === Object.keys(boundCollections).length) {
			boundCollections[collectionIndex] = {id: collectionIndex, keySet: keyCodeSet, callback: callback};
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
							boundCollections[idx].callback();
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