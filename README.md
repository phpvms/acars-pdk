# vmsACARS Plugin Development Kit (PDK)

## Overview

The plugins and scripts for vmsACARS are written in Typescript, and then transpiled to JS.
Typescript ensures that the interfaces required are following, and that the proper things
are returned so ACARS can run them. While Typescript isn't required, it's best to use it to
ensure proper values are passed - especially around enums.

This PDK includes build scripts to:

- Convert Typescript to JS, with type checking/linting
- Stamp the distribution package with versioning
- Github Actions to build and deploy
- Scripts to help with development

---

# Setup

## Required:

- nodejs/npm
- Typescript
- Gulp

Run:

```shell
npm install
```

### Customizing using the `.env` file:

Next, copy the `.env.default` to `.env`. Then edit this file to change the profile name.

The available options:

- `ACARS_PROFILE_NAME` - The default profile to use for testing
- `ACARS_CONFIG_PATH` - The default usually works, but you can change this to the path where you put ACARS, if you did a
  local install
- `ACARS_SCRIPTS_PATH` - Uses the `ACARS_PROFILE_NAME` to build the path to where the scripts should be sent after a
  build
- `ACARS_DIST_ZIP` - The distribution filename

---

### Commands

Then there are multiple commands you can use:

#### To run a build:

This creates a `dist` directory, with all of the JS files in it

```shell
npm run build
```

This doesn't copy it anywhere, just runs a compile and build

### Create a distribution file

This creates a `dist.zip` (you can rename it in the `.env` file) after running a compile.
You can modify the `gulpfile.mjs` to include other files in the `dist/` directory - this
directory is simply zipped and placed into the `dist/` directory. You can then configure
Github Actions to then upload this zip somewhere for ACARS to download.

#### Automatically build and copy to ACARS

This will setup a watch, and then automatically transpile and then copy the contents of the
`dist` folder into the `ACARS_PROFILE_PATH` directory that's defined in the `.env` file.

```shell
npm run dev
```

It's recommended to run this *after* you've started ACARS, or, in the ACARS configuration, disable the
remote-download of configs:

> TODO: Guide on how to disable remote config downloading


---

# Development Documentation

There are several core files/interfaces that are included:

### `src/global.d.ts`

This describes the globally available functions, including the logging methods available through `console` and
`Acars`.

### `src/types.d.ts`

This contains all of the base types:

- `Pirep` - data that's available about a PIREP, and it's associated interfaces (`Airport`, `Runway`, etc)
- `Telemetry` - telemetry information that's come out of the simulator
- `User` - information about the current user

It also includes other detailed type information, for example `Length`, so you can retrieve that type of information.

---

## Aircraft Configuration:

Aircraft rules are required to inherit the `AircraftConfig` abstract class. An example class would look like:

```typescript
import { AircraftConfigSimType, AircraftFeature, FeatureType } from '../defs'
// Additional mports are left out for now

export default class FenixA320 extends AircraftConfig {
    meta: Meta = {
        id: 'fenix_a320',
        name: 'Fenix A320',
        sim: AircraftConfigSimType.MsFs,
        enabled: true,
        priority: 2,
    }

    features: FeatureAddresses = {
        // Aircraft feature
        [AircraftFeature.BeaconLights]: {
            'lvar name': FeatureType.Int,
        },
    }

    flapNames: FlapNames = {
        0: 'UP',
        1: 'CONF 1',
        2: 'CONF 1+F',
        3: 'CONF 2',
        4: 'CONF 3',
        5: 'FULL',
    }

    match(title: string, icao: string, config_path: string): boolean {
        // Check the aircraft title and return true/false if this matches
    }

    beaconLights(lvar_value: number): FeatureState {
        // Check the lvar_value if the
    }
}
```

The configuration is a class which has a few different components.

1. `meta`, which gives some general information about the configuration:
    - `name` - a name for this script
    - `sim` - The simulator it's for
        - `AircraftConfigSimType.XPlane`
        - `AircraftConfigSimType.Fsuipc`
        - `AircraftConfigSimType.MsFs`
    - `enabled`
    - `priority` - from 1 (lowest) to 10 (highest). If there are multiple rules which match this, then which one takes
      priority. All the built-in rules are at a priority 1, and aircraft specifics rules are priority 2. I recommend
      using a priority of 3 or higher. More on this below
2. `features` - this is the type `FeatureAddresses` - see `defs.ts` for the definitions
    - MSFS - the lookups you enter are LVars
    - X-Plane - the looks ups are via datarefs
    - FSUIPC - the lookups are offsets
3. `flapNames` - see below
4. `match()`
    - This needs to return a boolean
    - A method (`match()`) which passes some information about the starting aircraft
        - For MSFS, it's the aircraft ICAO
        - For FSX/P3d, the value looked at is the aircraft title field, offset `0x3D00`
        - For X-Plane, the value looked at is `sim/aircraft/view/acf_descrip`
        - This method can be used to determine if this rule should match
5. Methods for the different features (see below)
    - The maps - a group of datarefs or offsets which constitute that feature being "on" or "enabled"

In the above example, for the Fenix A320, the landing lights are controlled by two datarefs, both of which the
values need to be 1 or 2 for the landing lights to be considered "on".

### Features

Features are essentially stored in a dictionary of dictionaries, of type `FeatureAddresses`:

```typescript
features: FeatureAddresses = {
    // Aircraft feature
    [AircraftFeature.BeaconLights]: {
        'lvar name': FeatureType.Int,
    },
}
```

In the above example:

- `AircraftFeature.BeaconLights` is an enum value of the feature type. It's put in `[]` because it's a variable name
- It's set to an object, where the keys are the lookup address or lvar.
- `FeatureType.Int` - is the type of value that's returned.

The different features available are:

- beaconLights
- landingLights
- logoLights
- navigationLights
- strobeLights
- taxiLights
- wingLights
- flaps

The different features contain how to look up the value, and the type. You can have multiple variables to be
read and looked at for a feature. Each feature then corresponds to a method which is called to return if
that feature is on or off. That method will have the equivalent number of arguments for each data reference

Example:

```typescript
export default class Example extends AircraftConfig {
    features: FeatureAddresses = {
        // Aircraft feature
        [AircraftFeature.BeaconLights]: {
            'sample/dataref/1': FeatureType.Bool,
            'sample/dataref/2': FeatureType.Bool,
        },
    }

    beaconLights(dataref_1: boolean, dataref_2: boolean): FeatureState {
        if (dataref_1 && dataref_2) {
            return true;
        }

        return false;
    }
}
```

### Ignoring Features

To ignore a feature in the rules (for example, if a feature doesn't work properly), set the feature to false:

```typescript
import { AircraftFeature } from './defs'

features: FeatureAddresses = {
    // Aircraft feature
    [AircraftFeature.BeaconLights]: {
        'lvar name': FeatureType.Int,
    },
    [AircraftFeature.LandingLights]: false,
}
```

### Mixed priorities

If there are two scripts which match a particular aircraft, and a feature is omitted, it will use the lower priority
one in place. For example:

```typescript
import { FeatureAddresses } from './aircraft'

export default class Example extends AircraftConfig {
    meta: Meta = {
        // ...
        priority: 1
    }

    features: FeatureAddresses = {
        [AircraftFeature.BeaconLights]: {
            'sample/dataref/1': FeatureType.Bool,
            'sample/dataref/2': FeatureType.Bool,
        },
        [AircraftFeature.LandingLights]: {
            'sample/landing/light/1': FeatureType.Bool,
            'sample/landing/light/2': FeatureType.Bool,
        },
    }
}

export default class ExampleOverride {
    meta: Meta = {
        // ...
        priority: 10
    }

    features: FeatureAddresses = {
        [AircraftFeature.LandingLights]: {
            'override/landing/light/1': FeatureType.Bool,
            'override/landing/light/2': FeatureType.Bool,
        },
    }
}
```

In this case, the lookups used for the rules will be:

- beaconLights - `sample/dataref/1|2`
- landingLights - `override/landing/light/1|2`

---

## Rules Configuration

A rule looks like this:

```typescript
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
    }

    violated(pirep: Pirep, data: Telemetry, previousData?: Telemetry): RuleValue {
    }
}
```

A rule also has several components:

- Needs to implement the `Rule` interface
- Has a `meta`, section, hich gives some general information about the configuration:
    - `id` - A unique ID for this rule
    - `name` - a name for this rule, it's used as the reference
    - `enabled`
    - `message` - a default message when the rule is violated
    - `states` - a list of `PirepState` of when this rule is to be run
    - `repeatable` - if it can be violated multiple times
    - `cooldown` - The amount of time, in seconds, between violations
    - `max_count` - if it's repeatable, how many times it can maximally be vioalted
- A `violated()` method, which returns a `RuleValue`
    - Passed the `pirep` and the `data` (`Telemetry` type)

### Returning a `RuleValue`

The return value is an tuple, with one mandatory value, and 2 optional values:

```
RuleValue = [boolean, message, points]
```

```typescript
// The true/false MUST be there, it's if the rule was violated or not
return [true]

// Return a message along with the state. If not set or null, it will
// use `this.meta.message` as the default
return [true, message]

// This returns that it was violated, uses the default message, but changes
// the points returned to -10
return [true, null, -10]
```

### Helper Methods
