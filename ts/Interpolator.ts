import { decompose, recompose, decomposeString, STRING_PROP } from './constants'

const Interpolator = (a: any, b: any): Function => {
	let isArray: boolean = Array.isArray(a);
	let origin: any = typeof a === 'string' ? a : isArray ? a.slice() : Object.assign({}, a);
	if (isArray) {
		for (let i = 0, len = a.length; i < len; i++) {
			decompose(i, origin, a, b)
		}
	} else if (typeof a === 'object') {
		for (let i in a) {
			decompose(i, origin, a, b)
		}
	} else if (typeof a === 'string') {
		a = decomposeString(a)
		b = decomposeString(b)

		let i = 1;
	while (i < a.length) {
		if (a[i] === b[i] && typeof a[i - 1] === 'string') {
			a.splice(i - 1, 2, a[i - 1] + a[i])
			b.splice(i - 1, 2, b[i - 1] + b[i])
		} else {
			i++
		}
	}

		a.unshift(STRING_PROP)
		b.unshift(STRING_PROP)
	}
	return function (t: number) {
		if (isArray) {
			for (let i = 0, len = a.length; i < len; i++) {
				recompose(i, origin, a, b, t)
			}
		} else if (typeof origin === 'object') {
			for (let i in a) {
				recompose(i, origin, a, b, t)
			}
		} else if (typeof origin === 'string') {
			origin = recompose(0, 0, a, b, t, t, true)
		}
		return origin;
	}
}

export default Interpolator