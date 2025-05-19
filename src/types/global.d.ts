import { RuleValue } from './rule'
import { AircraftFeature } from '../defs'

declare global {
  namespace Acars {
    /**
     * Whether or not the given feature is enabled for the aircraft, depending on the
     *             aircraft config that was read and parsed
     */
    function IsFeatureEnabled(feature: AircraftFeature): boolean {}
    /** Get something from storage */
    function Get(key: string): any {}
    /** Save something to storage */
    function Set(key: string, value: any): void {}
    /**
     * Sets a property on the PIREP using the specified key and value.
     *
     * @param key The property key .
     * @param value The value
     * @returns A task representing the asynchronous operation of updating the PIREP property.
     */
    function SetPirepField(key: string, value: string): void {}
    /** Add a message to the PIREP log */
    function AddPirepLog(message: string): void {}
    /**
     * Adds a PIREP log but only once, identified by a key
     *
     * @param key
     * @param message
     */
    function AddPirepLogOnce(key: string, message: string): void {}
    /**
     * @param name
     */
    function StartTimer(name: string): void {}
    /**
     * The elapsed time, in milliseconds
     *
     * @param name
     */
    function TimeElapsed(name: string): number {}
    /**
     * If the given amount of time has elapsed or not
     *
     * @param name The name of the timer
     * @param delay In milliseconds
     */
    function IsTimeElapsed(name: string, delay: number): boolean {}
    /**
     * Stops and resets the given timer
     *
     * @param name
     */
    function StopTimer(name: string): void {}
    /**
     * Determine if the rule has been violated, but only after a delay. Pass in a callback method,
     *             where the rule evaluation takes place. This method is evaluated often (many times a second),
     *             and if at any point before the timeout is hit, it will stop and reset.
     *
     * @param id The ID of the rule to be tracked. You can add additional info
     * @param timeout Amount of time, in milliseconds
     * @param callback Needs to return an array matching the RuleValue type
     */
    function ViolatedAfterDelay(
      id: string,
      timeout: number,
      callback: () => RuleValue,
    ): RuleValue {}
    /**
     * Run a callback after a delay.
     *
     * @param name
     * @param timeout In milliseconds
     * @param callback
     * @returns Non-zero with the points to deduct
     */
    function RunAfterDelay(
      name: string,
      timeout: number,
      callback: (arg: any, arg1: any[]) => any,
    ): void {}
    /**
     * Plays an audio file using the provided filename.
     *
     * @param filename The name of the audio file to be played. Relative to the sounds directory
     */
    function PlayAudio(filename: string): void {}
    /**
     * Determine if a number is within a percentage of a level
     *
     * @param value
     * @param level
     * @param percent
     */
    function NumberWithinPercent(
      value: number,
      level: number,
      percent: number,
    ): boolean {}
    /**
     * Whether a number is a certain percent over the level
     *
     * @param value
     * @param level
     * @param percent
     */
    function NumberOverPercent(
      value: number,
      level: number,
      percent: number,
    ): boolean {}
  }
}

declare global {
  namespace console {
    /**
     * Log this item out only once
     *
     * @param args
     */
    function once(...args: any[]): void {}
    /**
     * @param args
     */
    function log(...args: any[]): void {}
    /** A debug message */
    function debug(...args: any[]): void {}
    /** A debug message */
    function error(...args: any[]): void {}
    /** A debug message */
    function trace(...args: any[]): void {}
  }
}
