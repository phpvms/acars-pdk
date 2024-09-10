/**
 * Determine if the beacon lights are on while the aircraft is in motio
 */
import { Meta, Rule, RuleValue } from '../types/rule'
import { Pirep, Telemetry } from '../types/types'

export default class ExampleRule implements Rule {
  meta: Meta = {
    id: 'ExampleRule',
    name: 'An Example Rule',
    enabled: true,
    message: 'A example rule!',
    states: [],
    repeatable: false, // set from remote later
    cooldown: 60, // set from remote later
    max_count: 3, // set from remote later
    points: -1, // set from remote later
    delay_time: 5000,
  }

  violated(pirep: Pirep, data: Telemetry, previousData?: Telemetry): RuleValue {
    return Acars.ViolatedAfterDelay(
      this.meta.name,
      this.meta.delay_time,
      () => {
        if (data.onGround) {
          return [false, 0]
        }

        return [true]
      },
    )
  }
}
