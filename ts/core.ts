/* global process */
import { cancelAnimationFrame, requestAnimationFrame, root } from './shim'

declare let process: any

/**
 * Lightweight, effecient and modular ES6 version of tween.js
 * @copyright 2017 @dalisoft and es6-tween contributors
 * @license MIT
 * @namespace TWEEN
 * @example
 * // ES6
 * const {add, remove, isRunning, autoPlay} = TWEEN
 */
const _tweens = []
let isStarted = false
let _autoPlay = false
let _tick
const _ticker = requestAnimationFrame
const _stopTicker = cancelAnimationFrame

/**
 * Adds tween to list
 * @param {Tween} tween Tween instance
 * @memberof TWEEN
 * @example
 * let tween = new Tween({x:0})
 * tween.to({x:200}, 1000)
 * TWEEN.add(tween)
 */
const add = (tween) => {
  _tweens.push(tween)

  if (_autoPlay && !isStarted) {
    _tick = _ticker(update)
    isStarted = true
  }
}

/**
 * @returns {Array<Tween>} List of tweens in Array
 * @memberof TWEEN
 * TWEEN.getAll() // list of tweens
 */
const getAll = () => _tweens

/**
 * Runs update loop automaticlly
 * @param {Boolean} state State of auto-run of update loop
 * @example TWEEN.autoPlay(true)
 * @memberof TWEEN
 */
const autoPlay = (state: boolean) => {
  _autoPlay = state
}

/**
 * Removes all tweens from list
 * @example TWEEN.removeAll() // removes all tweens, stored in global tweens list
 * @memberof TWEEN
 */
const removeAll = () => {
  _tweens.length = 0
}

/**
 * @param {Tween} tween Tween Instance to be matched
 * @return {Tween} Matched tween
 * @memberof TWEEN
 * @example
 * TWEEN.get(tween)
 */
const get = (tween) => {
  for (let i = 0; i < _tweens.length; i++) {
    if (tween === _tweens[i]) {
      return _tweens[i]
    }
  }

  return null
}

/**
 * @param {Tween} tween Tween Instance to be matched
 * @return {Boolean} Status of Exists tween or not
 * @memberof TWEEN
 * @example
 * TWEEN.has(tween)
 */
const has = (tween) => {
  return get(tween) !== null
}
/**
 * Removes tween from list
 * @param {Tween} tween Tween instance
 * @memberof TWEEN
 * @example
 * TWEEN.remove(tween)
 */
const remove = (tween) => {
  const i = _tweens.indexOf(tween)
  if (i !== -1) {
    _tweens.splice(i, 1)
  }
}

const now = (function () {
  if (typeof (process) !== 'undefined' && process.hrtime !== undefined) {
    return function () {
      const time = process.hrtime()

      // Convert [seconds, nanoseconds] to milliseconds.
      return time[0] * 1000 + time[1] / 1000000
    }
    // In a browser, use window.performance.now if it is available.
  } else if (root.performance !== undefined &&
    root.performance.now !== undefined) {
    // This must be bound, because directly assigning this function
    // leads to an invocation exception in Chrome.
    return root.performance.now.bind(root.performance)
    // Use Date.now if it is available.
  } else {
    const offset = root.performance && root.performance.timing && root.performance.timing.navigationStart ? root.performance.timing.navigationStart : Date.now()
    return function () {
      return Date.now() - offset
    }
  }
}())

/**
 * Updates global tweens by given time
 * @param {number|Time} time Timestamp
 * @param {Boolean=} preserve Prevents tween to be removed after finish
 * @memberof TWEEN
 * @example
 * TWEEN.update(500)
 */
const update = (time: number, preserve?: boolean) => {
  time = time !== undefined ? time : now()

  _tick = _ticker(update)

  if (_tweens.length === 0) {
    _stopTicker(_tick)
    isStarted = false
    return false
  }

  let i = 0
  while (i < _tweens.length) {
    _tweens[i].update(time, preserve)
    i++
  }

  return true
}

/**
 * The state of ticker running
 * @return {Boolean} Status of running updates on all tweens
 * @memberof TWEEN
 * @example TWEEN.isRunning()
 */
const isRunning = (): boolean => isStarted

/**
 * The plugins store object
 * @namespace TWEEN.Plugins
 * @memberof TWEEN
 * @example
 * let num = Plugins.num = function (node, start, end) {
 * return t => start + (end - start) * t
 * }
 *
 * @static
 */
const Plugins: Object = {}

// Normalise time when visiblity is changed (if available) ...
if (root.document && root.document.addEventListener) {
  const doc = root.document
  let timeDiff = 0
  let timePause = 0
  doc.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      timePause = now()
      _stopTicker(_tick)
      isStarted = false
    } else {
      timeDiff = now() - timePause

      for (let i = 0, length = _tweens.length; i < length; i++) {
        _tweens[i]._startTime += timeDiff
      }
      _tick = _ticker(update)
      isStarted = true
    }

    return true
  })
}

export { Plugins, get, has, getAll, removeAll, remove, add, now, update, autoPlay, isRunning }
