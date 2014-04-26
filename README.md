# boxhide.js

## jQuery plugin: Assign specific key events to a callback


This plugin is great for developers who want to offer keyboard short cuts for their users.

## Structure:

**3** items are needed

1. *Selector* Ex: ```$("#input_sample")```
2. *Key-set* Ex: ```$("#input_sample").boxhide([17, 69, 84])``` [These are Cntrl, e, t]
3. *Callback* Ex: ```$("#input_sample").boxhide([17, 69, 84], function() { console.log('Event Fired!'); });```

Using the above structure, you can also compound key-sets with more callbacks:

```
$("#input_sample").boxhide([17, 69, 84], function() { console.log('Event Fired!'); });
$("#input_sample").boxhide([17, 69, 84], function() { console.log('Different Event Fired!'); });
```

Using the same key-set you can register multiple callbacks but never the **exact** same callback avoiding the same event being triggered twice.

Likewise you can register different key-sets with the same callback:

```
$("#input_sample").boxhide([17, 69, 81], function() { console.log('Event Fired!'); });
$("#input_sample").boxhide([17, 69, 84], function() { console.log('Event Fired!'); });
```

This allows you to define different key-sets but have the same callback registered and triggered.

## Examples uses:

```
<input type='text' id='input_sample'>
<input type='checkbox' id='box' />
```

Above there are two form elements. The first has an id of *input_sample* and the second has an id of *box*

In order to register a series of key events with them, simply do the following:

```
// 17 = Cntrl, 69 = e, 84 = t
$("#input_sample").boxhide([17, 69, 84], function() { console.log('Event Fired!'); });
$("#input_sample").boxhide([17, 69, 81], function() { $("#box").click(); });
```

Lastly, you can register the body element to boxhide.

```
$("body").boxhide([17, 81], function() { $("#input_sample").remove(); $("#box").remove(); });
```