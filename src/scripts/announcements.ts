import { PirepState } from '../defs'
import { CallbackHook, Meta } from '../types/callback'
import { Pirep, Telemetry } from '../types/types'

/**
 * This is an example of a script which does announcements on the different
 * flight phases. It's missing the audio files - place your files into the
 * `sounds` directory, and then package up the script.
 *
 * See the phaseChange() method for the meat of it. Note, this is also disabled
 * by default
 */
export default class Annoucements implements CallbackHook {
  meta: Meta = {
    id: 'default_announcements',
    name: 'Default phase change announcements',
    enabled: false,
  }

  setup() {}

  /**
   * This runs about once a second, sometimes more
   * @param pirep
   * @param data
   */
  run(pirep: Pirep, data: Telemetry): void {}

  /**
   * Play these sounds on the different phase changes
   *
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
    switch (newPhase) {
      case PirepState.Pushback:
        Acars.PlayAudio('pushback.mp3')
        break
      case PirepState.TaxiOut:
        Acars.PlayAudio('taxi_out.mp3')
        break
      case PirepState.Takeoff:
        Acars.PlayAudio('takeoff.mp3')
        break
      case PirepState.Enroute:
        Acars.PlayAudio('enroute.mp3')
        break
      case PirepState.Approach:
        Acars.PlayAudio('approach.mp3')
        break
      case PirepState.Final:
        Acars.PlayAudio('landing.mp3')
        break
      case PirepState.Landed:
        Acars.PlayAudio('landing.mp3')
        break
      case PirepState.TaxiIn:
        Acars.PlayAudio('taxi_in.mp3')
        break
      case PirepState.Arrived:
        Acars.PlayAudio('arrived.mp3')
        break
    }
  }
}
