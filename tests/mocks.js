'use strict'

/**
 * Create a fake PIREP object
 * @returns {Object.<string, object>}
 */
export function createMockPirep() {
  return {
    depicao: 'KJFK',
    arricao: 'KAUS',
    phase: 'takeoff',
  }
}

/**
 * Create mocks and global replacements for methods that are provided by ACARS
 */
export function createMocks() {
  /**
   * Used to keep track of the generated timers
   *
   * @type {Object.<string, number>}
   */
  const timers = {}

  /**
   * Just some local storage
   *
   * @type {Object.<string, string>}
   */
  const storage = {}

  /**
   * Store what's already been logged out
   *
   * @type {*[]}
   */
  const once = []

  /**
   * Add a specialized method which keeps track of the keys
   *
   * @param key
   * @param args
   */
  console.once = (key, ...args) => {
    if (once.includes(key)) {
      return
    }

    once.push(key)
    console.log(...args)
  }

  /**
   *
   * @type {{}}
   */
  global.Acars = {}

  /**
   * This returns back immediately and doesn't wait
   *
   * @param {string}            name
   * @param {number}            timeout
   * @param {Function<boolean>} callback
   *
   * @returns {number}
   */
  global.Acars.ViolatedAfterDelay = (name, timeout, callback) => {
    return callback()
  }

  /**
   * Mock the timers
   *
   * @param {string} name
   */
  global.Acars.StartTimer = (name) => {
    if (name in timers) {
      timers[name] = Date.now()
    }
  }

  /**
   * Get the time elapsed
   *
   * @param {string} name
   *
   * @returns {number}
   */
  const timeElapsed = (global.Acars.TimeElapsed = (name) => {
    if (name in timers) {
      return Date.now() - timers[name]
    }
  })

  /**
   * Whether the time has elapsed or not
   *
   * @param {string} name
   * @param {number} delta
   *
   * @returns {boolean}
   */
  global.Acars.IsTimeElapsed = (name, delta) => {
    return timeElapsed(name) >= delta
  }

  /**
   * End the timer and reset it
   *
   * @param {string} name
   */
  global.Acars.EndTimer = (name) => {
    if (name in timers) {
      delete timers[name]
    }
  }

  /**
   * Determine if a value is within a percentage of a level
   *
   * @param {number} value
   * @param {number} level
   * @param {number} percent
   * @returns {boolean}
   */
  global.Acars.NumberWithinPercent = (value, level, percent) => {
    const diff = level * (percent / 100)
    const upper = level + diff
    const lower = level - diff

    return value >= lower && value <= upper
  }

  /**
   * Whether the value is a certain percent over the level
   *
   * @param {number} value
   * @param {number} level
   * @param {number} percent
   * @returns {boolean}
   */
  global.Acars.NumberOverPercent = (value, level, percent) => {
    const diff = level * (percent / 100)
    const upper = level + diff

    return value > upper
  }

  /**
   * Put something into storage
   *
   * @param {string} name
   * @param {string} value
   */
  global.Acars.Set = (name, value) => {
    storage[name] = value
  }

  /**
   * Get data from storage
   *
   * @param {string} name
   * @returns {string}
   */
  global.Acars.Get = (name) => {
    return storage[name]
  }

  /**
   * Set a field to the PIREP to be sent
   *
   * @param {string} name
   * @param {string} value
   */
  global.Acars.SetPirepField = (name, value) => {
    console.log('SetPirepField', name, value)
  }

  /**
   * Add something to the PIREP log
   *
   * @param {string}  message
   * @param {boolean} add_to_pirep If this is only shown to the local user, or sent with the PIREP
   */
  global.Acars.AddPirepLog = (message, add_to_pirep) => {
    console.log('AddPirepLog', message, add_to_pirep)
  }
}
