## Objects

<dl>
<dt><a href="#TWEEN">TWEEN</a> : <code>object</code></dt>
<dd><p>Lightweight, effecient and modular ES6 version of tween.js</p>
</dd>
<dt><a href="#Timeline">Timeline</a> : <code>object</code></dt>
<dd><p>Timeline main constructor.</p>
<p>It works same as <code>Tween</code> instance, using <code>.repeat</code>, <code>.restart</code> or <code>etc</code> works like a <code>Tween</code>, so please see <code>Tween</code> class for methods</p>
</dd>
<dt><a href="#Tween">Tween</a> : <code>object</code></dt>
<dd><p>Tween main constructor</p>
</dd>
</dl>

<a name="TWEEN"></a>

## TWEEN : <code>object</code>
Lightweight, effecient and modular ES6 version of tween.js

**Kind**: global namespace  
**License**: MIT  
**Copyright**: 2017 @dalisoft and es6-tween contributors  
**Example**  
```js
// ES6const {add, remove, isRunning, autoPlay} = TWEEN
```

* [TWEEN](#TWEEN) : <code>object</code>
    * [.now](#TWEEN.now) ⇒
    * [.Plugins](#TWEEN.Plugins) : <code>object</code>
    * [.Easing](#TWEEN.Easing) : <code>object</code>
    * [.Interpolation](#TWEEN.Interpolation) : <code>object</code>
    * [.add(tween)](#TWEEN.add)
    * [.onTick(fn)](#TWEEN.onTick)
    * [.autoPlay(state)](#TWEEN.autoPlay)
    * [.removeAll()](#TWEEN.removeAll)
    * [.get(tween)](#TWEEN.get) ⇒ [<code>Tween</code>](#Tween)
    * [.has(tween)](#TWEEN.has) ⇒ <code>Boolean</code>
    * [.remove(tween)](#TWEEN.remove)
    * [.update(time, [preserve])](#TWEEN.update)
    * [.isRunning()](#TWEEN.isRunning) ⇒ <code>Boolean</code>

<a name="TWEEN.now"></a>

### TWEEN.now ⇒
Get browser/Node.js current time-stamp

**Kind**: static property of [<code>TWEEN</code>](#TWEEN)  
**Returns**: Normalised current time-stamp in milliseconds  
**Example**  
```js
TWEEN.now
```
<a name="TWEEN.Plugins"></a>

### TWEEN.Plugins : <code>object</code>
The plugins store object

**Kind**: static namespace of [<code>TWEEN</code>](#TWEEN)  
**Example**  
```js
let num = Plugins.num = function (node, start, end) {return t => start + (end - start) * t}
```
<a name="TWEEN.Easing"></a>

### TWEEN.Easing : <code>object</code>
List of full easings

**Kind**: static namespace of [<code>TWEEN</code>](#TWEEN)  
**Example**  
```js
import {Tween, Easing} from 'es6-tween'// then set via new Tween({x:0}).to({x:100}, 1000).easing(Easing.Quadratic.InOut).start()
```
<a name="TWEEN.Interpolation"></a>

### TWEEN.Interpolation : <code>object</code>
List of full Interpolation

**Kind**: static namespace of [<code>TWEEN</code>](#TWEEN)  
**Example**  
```js
import {Interpolation, Tween} from 'es6-tween'let bezier = Interpolation.Beziernew Tween({x:0}).to({x:[0, 4, 8, 12, 15, 20, 30, 40, 20, 40, 10, 50]}, 1000).interpolation(bezier).start()
```
<a name="TWEEN.add"></a>

### TWEEN.add(tween)
Adds tween to list

**Kind**: static method of [<code>TWEEN</code>](#TWEEN)  

| Param | Type | Description |
| --- | --- | --- |
| tween | [<code>Tween</code>](#Tween) | Tween instance |

**Example**  
```js
let tween = new Tween({x:0})tween.to({x:200}, 1000)TWEEN.add(tween)
```
<a name="TWEEN.onTick"></a>

### TWEEN.onTick(fn)
Adds ticker like event

**Kind**: static method of [<code>TWEEN</code>](#TWEEN)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | callback |

**Example**  
```js
TWEEN.onTick(time => console.log(time))
```
<a name="TWEEN.autoPlay"></a>

### TWEEN.autoPlay(state)
Runs update loop automaticlly

**Kind**: static method of [<code>TWEEN</code>](#TWEEN)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Boolean</code> | State of auto-run of update loop |

**Example**  
```js
TWEEN.autoPlay(true)
```
<a name="TWEEN.removeAll"></a>

### TWEEN.removeAll()
Removes all tweens from list

**Kind**: static method of [<code>TWEEN</code>](#TWEEN)  
**Example**  
```js
TWEEN.removeAll() // removes all tweens, stored in global tweens list
```
<a name="TWEEN.get"></a>

### TWEEN.get(tween) ⇒ [<code>Tween</code>](#Tween)
**Kind**: static method of [<code>TWEEN</code>](#TWEEN)  
**Returns**: [<code>Tween</code>](#Tween) - Matched tween  

| Param | Type | Description |
| --- | --- | --- |
| tween | [<code>Tween</code>](#Tween) | Tween Instance to be matched |

**Example**  
```js
TWEEN.get(tween)
```
<a name="TWEEN.has"></a>

### TWEEN.has(tween) ⇒ <code>Boolean</code>
**Kind**: static method of [<code>TWEEN</code>](#TWEEN)  
**Returns**: <code>Boolean</code> - Status of Exists tween or not  

| Param | Type | Description |
| --- | --- | --- |
| tween | [<code>Tween</code>](#Tween) | Tween Instance to be matched |

**Example**  
```js
TWEEN.has(tween)
```
<a name="TWEEN.remove"></a>

### TWEEN.remove(tween)
Removes tween from list

**Kind**: static method of [<code>TWEEN</code>](#TWEEN)  

| Param | Type | Description |
| --- | --- | --- |
| tween | [<code>Tween</code>](#Tween) | Tween instance |

**Example**  
```js
TWEEN.remove(tween)
```
<a name="TWEEN.update"></a>

### TWEEN.update(time, [preserve])
Updates global tweens by given time

**Kind**: static method of [<code>TWEEN</code>](#TWEEN)  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>number</code> \| <code>Time</code> | Timestamp |
| [preserve] | <code>Boolean</code> | Prevents tween to be removed after finish |

**Example**  
```js
TWEEN.update(500)
```
<a name="TWEEN.isRunning"></a>

### TWEEN.isRunning() ⇒ <code>Boolean</code>
The state of ticker running

**Kind**: static method of [<code>TWEEN</code>](#TWEEN)  
**Returns**: <code>Boolean</code> - Status of running updates on all tweens  
**Example**  
```js
TWEEN.isRunning()
```
<a name="Timeline"></a>

## Timeline : <code>object</code>
Timeline main constructor.It works same as `Tween` instance, using `.repeat`, `.restart` or `etc` works like a `Tween`, so please see `Tween` class for methods

**Kind**: global namespace  
**Extends**: [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| [params] | <code>Object</code> | Default params for new tweens |

**Example**  
```js
let tl = new Timeline({delay:200})
```

* [Timeline](#Timeline) : <code>object</code>
    * [.fromTo(nodes, from, to, params)](#Timeline+fromTo)
    * [.from(nodes, from, params)](#Timeline+from)
    * [.to(nodes, to, params)](#Timeline+to)
    * [.addLabel(name, offset)](#Timeline+addLabel)
    * [.add(tween, position)](#Timeline+add)

<a name="Timeline+fromTo"></a>

### timeline.fromTo(nodes, from, to, params)
**Kind**: instance method of [<code>Timeline</code>](#Timeline)  

| Param | Type | Description |
| --- | --- | --- |
| nodes | <code>Array.&lt;Element&gt;</code> | DOM Elements Collection (converted to Array) |
| from | <code>object</code> | Initial value |
| to | <code>object</code> | Target value |
| params | <code>object</code> | Options of tweens |

**Example**  
```js
tl.fromTo(nodes, {x:0}, {x:200}, {duration:1000, stagger:200})
```
<a name="Timeline+from"></a>

### timeline.from(nodes, from, params)
**Kind**: instance method of [<code>Timeline</code>](#Timeline)  

| Param | Type | Description |
| --- | --- | --- |
| nodes | <code>Array.&lt;Element&gt;</code> | DOM Elements Collection (converted to Array) |
| from | <code>object</code> | Initial value |
| params | <code>object</code> | Options of tweens |

**Example**  
```js
tl.from(nodes, {x:200}, {duration:1000, stagger:200})
```
<a name="Timeline+to"></a>

### timeline.to(nodes, to, params)
**Kind**: instance method of [<code>Timeline</code>](#Timeline)  

| Param | Type | Description |
| --- | --- | --- |
| nodes | <code>Array.&lt;Element&gt;</code> | DOM Elements Collection (converted to Array) |
| to | <code>object</code> | Target value |
| params | <code>object</code> | Options of tweens |

**Example**  
```js
tl.to(nodes, {x:200}, {duration:1000, stagger:200})
```
<a name="Timeline+addLabel"></a>

### timeline.addLabel(name, offset)
Add label to Timeline

**Kind**: instance method of [<code>Timeline</code>](#Timeline)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Label name |
| offset | <code>any</code> | Label value, can be `number` and/or `string` |

**Example**  
```js
tl.add('label1', 200)
```
<a name="Timeline+add"></a>

### timeline.add(tween, position)
Add tween to Timeline

**Kind**: instance method of [<code>Timeline</code>](#Timeline)  

| Param | Type | Description |
| --- | --- | --- |
| tween | [<code>Tween</code>](#Tween) | Tween instance |
| position | <code>position</code> | Can be label name, number or relative number to label |

**Example**  
```js
tl.add(new Tween(node, {x:0}).to({x:200}, 200))
```
<a name="Tween"></a>

## Tween : <code>object</code>
Tween main constructor

**Kind**: global namespace  
**Extends**: [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Object</code> \| <code>Element</code> | Node Element or Tween initial object |
| [object] | <code>Object</code> | If Node Element is using, second argument is used for Tween initial object |

**Example**  
```js
let tween = new Tween(myNode, {width:'100px'}).to({width:'300px'}, 2000).start()
```

* [Tween](#Tween) : <code>object</code>
    * _instance_
        * [.setMaxListener(count)](#Tween+setMaxListener)
        * [.on(event, callback)](#Tween+on)
        * [.once(event, callback)](#Tween+once)
        * [.off(event, callback)](#Tween+off)
        * [.emit(event)](#Tween+emit)
        * [.isPlaying()](#Tween+isPlaying) ⇒ <code>boolean</code>
        * [.isStarted()](#Tween+isStarted) ⇒ <code>boolean</code>
        * [.reverse([state])](#Tween+reverse)
        * [.reversed()](#Tween+reversed) ⇒ <code>boolean</code>
        * [.pause()](#Tween+pause)
        * [.play()](#Tween+play)
        * [.restart([noDelay])](#Tween+restart)
        * ~~[.seek(time, [keepPlaying])](#Tween+seek)~~
        * [.duration(amount)](#Tween+duration)
        * [.to(properties, [duration])](#Tween+to)
        * [.start(time)](#Tween+start)
        * [.stop()](#Tween+stop)
        * [.delay(amount)](#Tween+delay)
        * [.chainedTweens(arguments)](#Tween+chainedTweens)
        * [.repeat(amount)](#Tween+repeat)
        * [.reverseDelay(amount)](#Tween+reverseDelay)
        * [.yoyo(state, [_easingReverse])](#Tween+yoyo)
        * [.easing(_easingFunction)](#Tween+easing)
        * [.interpolation(_interpolationFunction)](#Tween+interpolation)
        * [.update(time, [preserve], [forceTime])](#Tween+update)
    * _static_
        * [.fromTo(node, object, to, params)](#Tween.fromTo)
        * [.to(node, to, params)](#Tween.to)
        * [.from(node, from, params)](#Tween.from)

<a name="Tween+setMaxListener"></a>

### tween.setMaxListener(count)
Sets max `event` listener's count to Events system

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | Event listener's count |

<a name="Tween+on"></a>

### tween.on(event, callback)
Adds `event` to Events system

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Event listener name |
| callback | <code>function</code> | Event listener callback |

<a name="Tween+once"></a>

### tween.once(event, callback)
Adds `event` to Events system.Removes itself after fired once

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Event listener name |
| callback | <code>function</code> | Event listener callback |

<a name="Tween+off"></a>

### tween.off(event, callback)
Removes `event` from Events system

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Event listener name |
| callback | <code>function</code> | Event listener callback |

<a name="Tween+emit"></a>

### tween.emit(event)
Emits/Fired/Trigger `event` from Events system listeners

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Event listener name |

<a name="Tween+isPlaying"></a>

### tween.isPlaying() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Tween</code>](#Tween)  
**Returns**: <code>boolean</code> - State of playing of tween  
**Example**  
```js
tween.isPlaying() // returns `true` if tween in progress
```
<a name="Tween+isStarted"></a>

### tween.isStarted() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Tween</code>](#Tween)  
**Returns**: <code>boolean</code> - State of started of tween  
**Example**  
```js
tween.isStarted() // returns `true` if tween in started
```
<a name="Tween+reverse"></a>

### tween.reverse([state])
Reverses the tween state/direction

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| [state] | <code>boolean</code> | Set state of current reverse |

**Example**  
```js
tween.reverse()
```
<a name="Tween+reversed"></a>

### tween.reversed() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Tween</code>](#Tween)  
**Returns**: <code>boolean</code> - State of reversed  
**Example**  
```js
tween.reversed() // returns `true` if tween in reversed state
```
<a name="Tween+pause"></a>

### tween.pause()
Pauses tween

**Kind**: instance method of [<code>Tween</code>](#Tween)  
**Example**  
```js
tween.pause()
```
<a name="Tween+play"></a>

### tween.play()
Play/Resume the tween

**Kind**: instance method of [<code>Tween</code>](#Tween)  
**Example**  
```js
tween.play()
```
<a name="Tween+restart"></a>

### tween.restart([noDelay])
Restarts tween from initial value

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| [noDelay] | <code>boolean</code> | If this param is set to `true`, restarts tween without `delay` |

**Example**  
```js
tween.restart()
```
<a name="Tween+seek"></a>

### ~~tween.seek(time, [keepPlaying])~~
***Deprecated***

Seek tween value by `time`. Note: Not works as excepted. PR are welcome

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>Time</code> | Tween update time |
| [keepPlaying] | <code>boolean</code> | When this param is set to `false`, tween pausing after seek |

**Example**  
```js
tween.seek(500)
```
<a name="Tween+duration"></a>

### tween.duration(amount)
Sets tween duration

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | Duration is milliseconds |

**Example**  
```js
tween.duration(2000)
```
<a name="Tween+to"></a>

### tween.to(properties, [duration])
Sets target value and duration

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| properties | <code>object</code> |  | Target value (to value) |
| [duration] | <code>number</code> \| <code>Object</code> | <code>1000</code> | Duration of tween |

**Example**  
```js
let tween = new Tween({x:0}).to({x:100}, 2000)
```
<a name="Tween+start"></a>

### tween.start(time)
Start the tweening

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>number</code> \| <code>string</code> | setting manual time instead of Current browser timestamp or like `+1000` relative to current timestamp |

**Example**  
```js
tween.start()
```
<a name="Tween+stop"></a>

### tween.stop()
Stops the tween

**Kind**: instance method of [<code>Tween</code>](#Tween)  
**Example**  
```js
tween.stop()
```
<a name="Tween+delay"></a>

### tween.delay(amount)
Set delay of tween

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | Sets tween delay / wait duration |

**Example**  
```js
tween.delay(500)
```
<a name="Tween+chainedTweens"></a>

### tween.chainedTweens(arguments)
Chained tweens

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| arguments | <code>any</code> | Arguments list |

**Example**  
```js
tween.chainedTweens(tween1, tween2)
```
<a name="Tween+repeat"></a>

### tween.repeat(amount)
Sets how times tween is repeating

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>amount</code> | the times of repeat |

**Example**  
```js
tween.repeat(5)
```
<a name="Tween+reverseDelay"></a>

### tween.reverseDelay(amount)
Set delay of each repeat alternate of tween

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | Sets tween repeat alternate delay / repeat alternate wait duration |

**Example**  
```js
tween.reverseDelay(500)
```
<a name="Tween+yoyo"></a>

### tween.yoyo(state, [_easingReverse])
Set `yoyo` state (enables reverse in repeat)

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>boolean</code> | Enables alternate direction for repeat |
| [_easingReverse] | <code>function</code> | Easing function in reverse direction |

**Example**  
```js
tween.yoyo(true)
```
<a name="Tween+easing"></a>

### tween.easing(_easingFunction)
Set easing

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| _easingFunction | <code>function</code> | Easing function, applies in non-reverse direction if Tween#yoyo second argument is applied |

**Example**  
```js
tween.easing(Easing.Elastic.InOut)
```
<a name="Tween+interpolation"></a>

### tween.interpolation(_interpolationFunction)
Set interpolation

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| _interpolationFunction | <code>function</code> | Interpolation function |

**Example**  
```js
tween.interpolation(Interpolation.Bezier)
```
<a name="Tween+update"></a>

### tween.update(time, [preserve], [forceTime])
Updates initial object to target value by given `time`

**Kind**: instance method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>Time</code> | Current time |
| [preserve] | <code>boolean</code> | Prevents from removing tween from store |
| [forceTime] | <code>boolean</code> | Forces to be frame rendered, even mismatching time |

**Example**  
```js
tween.update(100)
```
<a name="Tween.fromTo"></a>

### Tween.fromTo(node, object, to, params)
Easier way to call the Tween

**Kind**: static method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Element</code> | DOM Element |
| object | <code>object</code> | Initial value |
| to | <code>object</code> | Target value |
| params | <code>object</code> | Options of tweens |

**Example**  
```js
Tween.fromTo(node, {x:0}, {x:200}, {duration:1000})
```
<a name="Tween.to"></a>

### Tween.to(node, to, params)
Easier way calling constructor only applies the `to` value, useful for CSS Animation

**Kind**: static method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Element</code> | DOM Element |
| to | <code>object</code> | Target value |
| params | <code>object</code> | Options of tweens |

**Example**  
```js
Tween.to(node, {x:200}, {duration:1000})
```
<a name="Tween.from"></a>

### Tween.from(node, from, params)
Easier way calling constructor only applies the `from` value, useful for CSS Animation

**Kind**: static method of [<code>Tween</code>](#Tween)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Element</code> | DOM Element |
| from | <code>object</code> | Initial value |
| params | <code>object</code> | Options of tweens |

**Example**  
```js
Tween.from(node, {x:200}, {duration:1000})
```
