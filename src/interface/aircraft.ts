import { AircraftConfigSimType, AircraftFeature, FeatureType } from '../defs'

/**
 * The flap names dictionary
 */
export type FlapNames = { [key: number]: string }

/**
 * A feature can be on/off (true/false), or null in the case of it being ignored
 */
export type FeatureState = boolean | null | undefined

/**
 * How the features are definedw
 */
export type FeatureAddresses = {
  [key in AircraftFeature]?: boolean | { [key: string]: FeatureType }
}

/**
 * The allowed list of priorities. Default rules are at a 1, and then
 * the build-in aircraft are a 2. Extras should be higher. I recommend 5 or 6.
 */
export type Priority = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

/**
 * Meta information about the aircraft config scripts
 */
export interface Meta {
  /**
   * A unique ID for the rule. Should be short, no spaces.
   * If you want it truly unique: https://shortunique.id
   */
  id: string

  /**
   * Name of the rule
   */
  name: string

  /**
   * Enabled or not
   */
  enabled: boolean

  /**
   * The priority of this mapping, with 1 being the lowest
   * and 10 being the highest
   */
  priority: Priority

  /**
   * Sim name - e.g, AircraftSimType.MSFS
   */
  sim: AircraftConfigSimType

  /**
   * Author of this config file
   */
  author?: string
}

export abstract class AircraftConfig {
  /**
   * The information about the the config rules
   */
  abstract meta: Meta

  /**
   * Aircraft features and the lookup keys. E.g:
   *
   * AircraftFeature.BeaconLights: {
   *   "some/dref/path": "type"
   * }
   */
  abstract features: FeatureAddresses

  /**
   * Store all the flap names here
   */
  flapNames: FlapNames = {}

  /**
   * See if the title, icao or config_path match with what the simulator
   * is saying. All of the values are passed in already lower-cased.
   * Return true or false
   *
   * The ICAO and config_path may not be available in some sims.
   *
   * @param {string} title The title of the aircraft
   * @param {string=} icao The ICAO of the aircraft. Might not be available
   * @param {string=} config_path Path to the aircraft config. Might not be there
   * @return {boolean}
   */
  abstract match(title: string, icao: string, config_path: string): boolean

  /**
   * Get the right text for the flaps. Default implementation
   *
   * @param {int} value
   * @returns {string}
   */
  flaps(value: number): string | number {
    return this.flapNames[value] || value
  }

  /**
   * Provide an implementation for but, by default, it's null
   * @param args
   */
  beaconLights(...args: any): FeatureState {
    return null
  }

  landingLights(...args: any): FeatureState {
    return null
  }

  logoLights(...args: any): FeatureState {
    return null
  }

  navigationLights(...args: any): FeatureState {
    return null
  }

  strobeLights(...args: any): FeatureState {
    return null
  }

  taxiLights(...args: any): FeatureState {
    return null
  }

  wingLights(...args: any): FeatureState {
    return null
  }
}
