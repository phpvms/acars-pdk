import { PirepState } from '../defs'
import { CallbackHook, Meta } from '../types/callback'
import { Pirep, Telemetry } from '../types/types'

/**
 * This is an example script. It's not very useful, but it's a good example of
 * how to write a script and some of the functionality.
 */
export default class ExampleScript implements CallbackHook {
  meta: Meta = {
    id: 'example_script',
    name: 'Example Script',
    enabled: false,
  }

  setup() {
    Acars.Set('above_1k', false)
    Acars.Set('launched_message', false)
  }

  /**
   * This once a second.
   * @param pirep
   * @param data
   */
  run(pirep: Pirep, data: Telemetry): void {
    Acars.AddPirepLogOnce('script_loaded', 'Example script loaded')
    if (Acars.Get('launched_message') === false) {
      Acars.SetPirepField('Loaded', 'True')

      Acars.Set('launched_message', true)
    }

    if (data.groundAltitude.Feet > 1000) {
      Acars.Set('above_1k', true)
      Acars.SetPirepField('Above 1000 feet', 'True')
    }

    /*
     * Just a silly example, if they crossed above 1000 feet and then they went
     * back below it, send a message about that
     */
    if (Acars.Get('above_1k') === true && data.groundAltitude.Feet < 1000) {
      Acars.AddPirepLog("Went above 1000', now back down")
    }
  }

  /**
   * called on phase changes
   * @param pirep
   * @param data
   * @param newPhase
   * @param oldPhase
   */
  phaseChange(
    pirep: Pirep,
    data: Telemetry,
    newPhase: PirepState,
    oldPhase: PirepState,
  ) {
    Acars.AddPirepLog(`Phase changed from ${oldPhase} to ${newPhase}`)
    if (newPhase == PirepState.Pushback) {
      Acars.PlayAudio('departure.mp3')
    }
  }
}
