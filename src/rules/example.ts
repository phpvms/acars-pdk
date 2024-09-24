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
    repeatable: false,
    cooldown: 60,
    max_count: 3,
    points: -1,
    delay_time: 5000,
  }

  violated(pirep: Pirep, data: Telemetry, previousData?: Telemetry): RuleValue {
    return Acars.ViolatedAfterDelay(
      this.meta.name,
      this.meta.delay_time,
      (): RuleValue => {
        if (data.onGround) {
          return
        }

        return ['The example was violated!', this.meta.points]
      },
    )
  }
}
