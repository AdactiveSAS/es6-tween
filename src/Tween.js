/* Shims will be deprecated in next update, please update browser */

import './shim/object_assign';

import './shim/isArray';

import { getAll, removeAll, remove, add, now, update, autoPlay, on, once, off, emit } from './dist/core';

import Easing from './dist/Easing';

import Tween from './dist/Tween';

import Interpolation from './dist/Interpolation';

import Composite from './dist/Composite';

import Timeline from './dist/Timeline';

import Plugins from './dist/Plugins';

import { TweenInit } from './dist/Decorators';

export { TweenInit, getAll, removeAll, remove, add, now, update, autoPlay, on, once, off, emit, Tween, Easing, Interpolation, Composite, Timeline, Plugins };