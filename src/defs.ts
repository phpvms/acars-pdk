/** The different gate types */
export enum GateType {
  None = 0,
  Ramp_GA = 1,
  Ramp_GA_Small = 2,
  Ramp_GA_Medium = 3,
  Ramp_GA_Large = 4,
  Ramp_Cargo = 5,
  Ramp_Military_Cargo = 6,
  Ramp_Military_Combat = 7,
  Gate_Small = 8,
  Gate_Medium = 9,
  Gate_Heavy = 10,
  Dock_GA = 11,
  Fuel = 12,
  Vehicles = 13,
  /** Added for MSFS */
  Ramp_GA_Extra = 14,
  /** Added for MSFS */
  Gate_Extra = 15,
  /** Added for MSFS */
  Jetway = 16
}
/** The runway/taxiway surface */
export enum Surface {
  Concrete = 0,
  Grass = 1,
  Water = 2,
  Unknown3 = 3,
  Asphalt = 4,
  Unknown5 = 5,
  Unknown6 = 6,
  Clay = 7,
  Snow = 8,
  Ice = 9,
  Unknown10 = 10,
  Unknown11 = 11,
  Dirt = 12,
  Coral = 13,
  Gravel = 14,
  Oil_treated = 15,
  Mats = 16,
  Bituminous = 17,
  Brick = 18,
  Macadam = 19,
  Planks = 20,
  Sand = 21,
  Shale = 22,
  Tarmac = 23,
  Unknown = 99999
}
export enum AircraftType {
  Airliner = 0,
  Cargo = 1,
  GeneralAviation = 2,
  Helicopter = 3
}
/** The type of engine */
export enum EngineType {
  Piston = 0,
  Jet = 1,
  None = 2,
  Helo = 3,
  Rocket = 4,
  Turboprop = 5
}
export enum SimType {
  None = 0,
  Prepar3D = 1,
  Xplane = 2,
  /** You can use this for ALL FlightSimulator (2020, 2024, and beyond) */
  FlightSimulator = 3,
  Fsx = 4,
  Fs9 = 5,
  /** Specifically only for MSFS 2020 */
  FlightSimulator2020 = 6,
  /** Specifically only for MSFS 2024 */
  FlightSimulator2024 = 7
}
export enum FareType {
  /** Primarily a passenger flight */
  Passenger = 0,
  /** Primarily a cargo flight */
  Cargo = 1
}
/** The different types of flight plans that can be parsed */
export enum FlightPlanType {
  /** Was entered using ACARS */
  VmsAcars = 0,
  /** Flight plan was created in Prepar3d/FSX/FS9 */
  Prepar3d = 1,
  /** Flight plan was created using X-Plane */
  Xplane = 2,
  /** Flightplan was created using SimBrief */
  SimBrief = 3,
  /** Flightplan was create using Flight Simulator */
  MsFs = 4
}
/** The PIREP states - these match the phase */
export enum PirepState {
  /** Internal only. Rules are not parsed in this state */
  NotRunning = 0,
  /** Internal only. Rules are not parsed in this state */
  Initialized = 1,
  /** Internal only. Rules are not parsed in this state */
  Boarding = 2,
  /** When parking brake is released. Pushback may get skipped over and go directly into taxi out */
  Pushback = 3,
  /** The aircraft is taxiing out to the runway */
  TaxiOut = 4,
  /** The aircraft is taking off */
  Takeoff = 5,
  /** The aircraft is enroute to its destination */
  Enroute = 6,
  /** The aircraft is on approach to the destination airport */
  Approach = 7,
  /** The aircraft is on final approach to the runway */
  Final = 8,
  /** The aircraft has landed */
  Landed = 9,
  /** The aircraft is taxiing in to the gate */
  TaxiIn = 10,
  /** The aircraft is on block at the gate */
  Arrived = 11,
  /** Internal only. Rules are not parsed in this state */
  Cancelled = 12,
  /** Internal only. Rules are not parsed in this state */
  Filed = 13,
  /** Internal only. Rules are not parsed in this state */
  Paused = 14,
  /** The aircraft is on block at the gate */
  OnBlock = 15,
  /** The aircraft is climbing to its cruise altitude */
  InitialClimb = 16
}
/** The simtype for the rule file */
export enum AircraftConfigSimType {
  /** This configuration can be for either MSFS 2020 or 2024 */
  MsFs = 0,
  XPlane = 1,
  Fsuipc = 2,
  /** Configuration for MSFS 2020 *only* */
  MsFs20 = 3,
  /** Configuration for MSFS 2024 *only* */
  MsFs24 = 4
}
/** Features of an aircraft. They are binary on or off */
export enum AircraftFeature {
  BeaconLights = 0,
  LandingLights = 1,
  LogoLights = 2,
  NavigationLights = 3,
  StrobeLights = 4,
  TaxiLights = 5,
  WingLights = 6,
  Flaps = 7,
  APU = 8,
  Doors = 9,
  Seatbelts = 10,
  EmergencyLights = 11,
  AntiIce = 12,
  Battery = 13,
  Packs = 14,
  ParkingBrakes = 15,
  Engines = 16,
  Transponder = 17,
  LandingGear = 18,
  Autopilot = 19,
  ExternalPower = 20
}
/** The type of the dataref */
export enum FeatureType {
  Bool = 0,
  Int = 1,
  /** A single number (double, float) value */
  Number = 2,
  /** An array of integers */
  IntArray = 3,
  /** An array of numbers */
  NumberArray = 4
}
