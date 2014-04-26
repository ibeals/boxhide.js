/*
 The MIT License (MIT)

Copyright (c) 2014 Ian Beals

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
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