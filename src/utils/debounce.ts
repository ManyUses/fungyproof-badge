
import { createDecorator } from 'vue-class-component'

export type DebounceOptions = number | { time: number }

/**
 * debouncer
 *
 * @param func
 * @param waitFor
 */
export const debounce = <F extends(...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout)
      timeout = null
    }
    timeout = setTimeout(() => func(...args), waitFor)
  }

  return debounced as (...args: Parameters<F>) => ReturnType<F>
}

/**
 * Debounce decorator
 *
 * @param options
 */
export function Debounce(options: DebounceOptions) {
  return createDecorator((opts, handler) => {
    if (!opts.methods) throw new Error('This decorator must be used on a vue component method.')

    const time = typeof options === 'number' ? options : options.time

    const originalFn = opts.methods[handler]
    let timeoutId: any = 0

    const clear = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = 0
      }
    }

    opts.methods[handler] = function(...args: any[]) {
      clear()
      timeoutId = setTimeout(() => {
        timeoutId = 0
        originalFn.apply(this, args)
      }, time)
    }
  })
}
