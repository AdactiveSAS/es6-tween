import {
  add,
  remove,
  now,
  Plugins
}
  from './core'
import Easing from './Easing'
import InterTween from 'intertween'
import NodeCache from './NodeCache'
import EventClass from './Event'

// Events list
export const EVENT_UPDATE = 'update'
export const EVENT_COMPLETE = 'complete'
export const EVENT_START = 'start'
export const EVENT_REPEAT = 'repeat'
export const EVENT_REVERSE = 'reverse'
export const EVENT_PAUSE = 'pause'
export const EVENT_PLAY = 'play'
export const EVENT_RS = 'restart'
export const EVENT_STOP = 'stop'
export const EVENT_SEEK = 'seek'

let _id = 0 // Unique ID
const defaultEasing = Easing.Linear.None

class Tween extends EventClass {
  constructor (node, object) {
    super()

    this.id = _id++
    if (typeof node !== 'undefined' && !object && !node.nodeType) {
      object = this.object = node
      node = null
    } else if (typeof node !== 'undefined') {
      this.node = node
      if (typeof object === 'object') {
        object = this.object = NodeCache(node, object)
      } else {
        this.object = object
      }
    }
    let isArr = this.isArr = Array.isArray(object)
    this._valuesStart = isArr ? [] : {}
    this._valuesEnd = null

    this._duration = 1000
    this._easingFunction = defaultEasing

    this._startTime = 0
    this._delayTime = 0
    this._repeat = 0
    this._r = 0
    this._isPlaying = false
    this._yoyo = false
    this._reversed = false

    this._onStartCallbackFired = false
    this._pausedTime = null
    this._isFinite = true

    return this
  }

  isPlaying () {
    return this._isPlaying
  }

  isStarted () {
    return this._onStartCallbackFired
  }

  reverse () {
    const {
      _reversed
    } = this

    this._reversed = !_reversed

    return this
  }

  reversed () {
    return this._reversed
  }

  pause () {
    if (!this._isPlaying) {
      return this
    }

    this._isPlaying = false

    remove(this)
    this._pausedTime = now()

    return this.emit(EVENT_PAUSE, this.object)
  }

  play () {
    if (this._isPlaying) {
      return this
    }

    this._isPlaying = true

    this._startTime += now() - this._pausedTime
    add(this)
    this._pausedTime = now()

    return this.emit(EVENT_PLAY, this.object)
  }

  restart (noDelay) {
    this._repeat = this._r
    this._startTime = now() + (noDelay ? 0 : this._delayTime)

    if (!this._isPlaying) {
      add(this)
    }

    return this.emit(EVENT_RS, this._object)
  }

  seek (time, keepPlaying) {
    this._startTime = now() + Math.max(0, Math.min(
      time, this._duration))

    this.emit(EVENT_SEEK, time, this._object)

    return keepPlaying ? this : this.pause()
  }

  duration (amount) {
    this._duration = typeof (amount) === 'function' ? amount(this._duration) : amount

    return this
  }

  to (properties, duration = 1000) {
    this._valuesEnd = properties

    if (typeof duration === 'number' || typeof (duration) === 'function') {
      this._duration = typeof (duration) === 'function' ? duration(this._duration) : duration
    } else if (typeof duration === 'object') {
      for (let prop in duration) {
        if (this[prop]) {
          this[prop](...(Array.isArray(duration) ? duration : [duration]))
        }
      }
    }

    return this
  }

  render () {
    if (this._rendered) {
      return this
    }

    let {
      _valuesEnd,
      _valuesStart,
      object,
      Renderer
    } = this

    for (let property in _valuesEnd) {
      let start = object[property]
      let end = _valuesEnd[property]

      if (Plugins[property]) {
        _valuesEnd[property] = new Plugins[property](this, start, end)
        continue
      }

      if (object[property] === undefined) {
        continue
      }

      if (typeof start === 'number' && typeof end === 'number') {
        _valuesStart[property] = start
        _valuesEnd[property] = end
      } else {
        _valuesEnd[property] = InterTween(start, end)
      }
    }

    if (Renderer && this.node) {
      this.__render = new Renderer(this, object, _valuesEnd)
    }

    return this
  }

  start (time) {
    this._startTime = time !== undefined ? time : now()
    this._startTime += this._delayTime

    add(this)

    this._isPlaying = true

    return this
  }

  stop () {
    let {
      _isPlaying,
      object
    } = this

    if (!_isPlaying) {
      return this
    }

    remove(this)
    this._isPlaying = false

    return this.emit(EVENT_STOP, object)
  }

  end () {
    const {
      _startTime,
      _duration
    } = this

    return this.update(_startTime + _duration)
  }

  delay (amount) {
    this._delayTime = typeof (amount) === 'function' ? amount(this._delayTime) : amount
    this._startTime += this._delayTime

    return this
  }

  repeat (amount) {
    this._repeat = typeof (amount) === 'function' ? amount(this._repeat) : amount
    this._r = this._repeat
    this._isFinite = isFinite(amount)

    return this
  }

  repeatDelay (amount) {
    this._repeatDelayTime = typeof (amount) === 'function' ? amount(this._repeatDelayTime) : amount

    return this
  }

  reverseDelay (amount) {
    this._reverseDelayTime = typeof (amount) === 'function' ? amount(this._reverseDelayTime) : amount

    return this
  }

  yoyo (state) {
    this._yoyo = typeof (state) === 'function' ? state(this._yoyo) : state

    return this
  }

  easing (fn) {
    this._easingFunction = fn

    return this
  }

  reassignValues () {
    const {
      _valuesStart,
      _valuesEnd,
      object,
      isArr
    } = this

    for (let property in _valuesEnd) {
      if (isArr) {
        property *= 1
      }

      let start = _valuesStart[property]
      let end = _valuesEnd[property]

      object[property] = typeof end === 'function' ? end(0) : start
    }

    return this
  }

  get (time) {
    this.update(time)
    return this.object
  }

  update (time, preserve) {
    let {
      _onStartCallbackFired,
      _easingFunction,
      _repeat,
      _repeatDelayTime,
      _reverseDelayTime,
      _yoyo,
      _reversed,
      _startTime,
      _duration,
      _valuesStart,
      _valuesEnd,
      object,
      _isFinite,
      __render
    } = this

    let elapsed
    let value
    let property

    time = time !== undefined ? time : now()

    if (time < _startTime) {
      return true
    }

    if (!_onStartCallbackFired) {
      if (!this._rendered) {
        this.render()
        this._rendered = true
      }

      this.emit(EVENT_START, object)

      this._onStartCallbackFired = true
    }

    elapsed = (time - _startTime) / _duration
    elapsed = elapsed > 1 ? 1 : elapsed
    elapsed = _reversed ? 1 - elapsed : elapsed

    for (property in _valuesEnd) {
      value = _easingFunction[property] ? _easingFunction[property](elapsed) : typeof _easingFunction === 'function' ? _easingFunction(elapsed) : defaultEasing(elapsed)

      let start = _valuesStart[property]
      let end = _valuesEnd[property]

      if (end.update) {
        end.update(value, elapsed)
      } else if (typeof end === 'number') {
        object[property] = start + (end - start) * value
      } else if (typeof end === 'function') {
        object[property] = end(value)
      }
    }

    if (__render) {
      __render.update(object, elapsed)
    }

    this.emit(EVENT_UPDATE, object, elapsed)

    if (elapsed === 1 || (_reversed && elapsed === 0)) {
      if (_repeat) {
        if (_isFinite) {
          this._repeat--
        }

        if (_yoyo) {
          this._reversed = !_reversed
        }

        this.emit(_yoyo && !_reversed ? EVENT_REVERSE : EVENT_REPEAT, object)

        if (!_reversed && _repeatDelayTime) {
          this._startTime = time + _repeatDelayTime
        } else if (_reversed && _reverseDelayTime) {
          this._startTime = time + _reverseDelayTime
        } else {
          this._startTime = time
        }

        return true
      } else {
        if (!preserve) {
          remove(this)
        }
        this.emit(EVENT_COMPLETE, object)
        this._repeat = this._r

        return false
      }
    }

    return true
  }
}

export default Tween
