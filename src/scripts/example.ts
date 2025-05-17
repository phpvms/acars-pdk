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
    Acars.Set('above_18k', false)
  }

  /**
   * This runs about once a second.
   * @param pirep
   * @param data
   */
  run(pirep: Pirep, data: Telemetry): void {
    Acars.AddPirepLogOnce('script_loaded', 'Example script loaded')
    Acars.SetPirepField('Example Script Loaded', 'True')

    this.descentAnnouncement(data)
  }

  /**
   * See if we should play the descent announcement. It should only play
   * if we were above 18k', and now are below 16k or so
   * @param data
   */
  descentAnnouncement(data: Telemetry) {
    if (data.groundAltitude.Feet > 18000) {
      Acars.Set('above_18k', false)
    }

    if (data.groundAltitude.Feet < 16000 && Acars.Get('above_18k')) {
      Acars.PlayAudio('descent_annoucement.mp3')
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
    if (newPhase == PirepState.Pushback) {
      Acars.PlayAudio('pushback.mp3')
    }
  }
}
