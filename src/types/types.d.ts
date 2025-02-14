import {
  AircraftFeature,
  AircraftType,
  EngineType,
  FlightPlanType,
  GateType,
  PirepState,
  SimType,
  Surface,
} from '../defs'

/** Point-in-time telemetry from the aircraft */
export interface Telemetry {
  /** If all of the engines are running */
  allEnginesRunning: boolean
  /** If any engines are running */
  anyEnginesRunning: boolean
  /** The runway the user is approaching. This means they're within a 20ft distance */
  approachingRunway?: Runway
  /** Aircraft bank, +/- */
  bank: number
  /** Boolean for lights */
  beaconLights: boolean
  /** The date/time in the sim */
  dateTime: DateTimeOffset
  /** The date/time on the client machine */
  dateTimeSystem: DateTimeOffset
  /**
   * Empty weight of the aircraft
   *
   * @inheritdoc
   */
  emptyWeight: Mass
  /** The number of engines */
  engineCount: number
  /** Array with the fuel flow values for an engine */
  engineFuelFlow: MassFlow[]
  /** The total N1 RPM */
  engineMaxRpm: RotationalSpeed
  engineN2Average: number
  /** Array with the N2 values for an engine */
  engineN2Percent: number[]
  /** Engine RPM */
  engineRpm: RotationalSpeed
  /** The type of engine */
  engineType: EngineType
  /** A dictionary of the various aircraft features and their values */
  features: { [key in AircraftFeature]: boolean }
  /** Flap position, from 0 */
  flaps: number
  /** The current fuel quantity (weight) */
  fuelQuantity: Mass
  /** True if the gear is up */
  gearUp: boolean
  /** The current g-force */
  gForce: number
  /** The g-force at touchdown */
  gForceTouchDown: number
  /** Altitude of plane above the ground. Has units, like .Feet/.Meters */
  groundAltitude: Length
  /** Has units, like .Knots */
  groundSpeed: Speed
  /** The true heading */
  heading: number
  /** The magnetic heading */
  headingMagnetic: number
  /** Indicated airspeed. Has units, like .Knots */
  indicatedAirspeed: Speed
  /** Boolean for lights */
  landingLights: boolean
  location: Coords
  /** Boolean for lights */
  logoLight: boolean
  /** Magnetic variation */
  magVar: number
  /** The total N1 percent */
  n1Percent: number
  /** Boolean for lights */
  navigationLights: boolean
  /** If the aircraft is on the ground */
  onGround: boolean
  /** If the overspeed warning is on in the sim */
  overspeedWarning: boolean
  /** If the parking brake is on */
  parkBrake: boolean
  /** Is the sim paused? */
  paused: boolean
  /** Weight of the payload */
  payloadWeight: Mass
  /** Aircraft bank, +/- */
  pitch: number
  /** Altitude of plane above MSL. Has units, like .Feet/.Meters */
  planeAltitude: Length
  /** Are they in a replay? */
  replay: boolean
  runway?: Runway
  /** The current simulation rate */
  simRate: number
  /** If the slew is enabled */
  slewActive: boolean
  /** If the stall warning is on in the sim */
  stallWarning: boolean
  /** Boolean for lights */
  strobeLights: boolean
  /** Boolean for lights */
  taxiLights: boolean
  /** Average throttle percent */
  throttlePct: number
  /** Array with the throttle position for an engine */
  throttles: number[]
  /** Total weight of the aircraft */
  totalWeight: Mass
  /** Transponder code */
  transponderCode: number
  /** If unlimited fuel is enabled */
  unlimitedFuel: boolean
  /** Their vertical speed (+/-). Has units - FeetPerMinute */
  verticalSpeed: Speed
  /** The vertical speed at touchdown */
  verticalSpeedTouchdown: Speed
  /** Boolean for lights */
  wingLights: boolean
  /** The zero fuel weight */
  zeroFuelWeight: Mass
}
export interface Aircraft {
  /** Reported ICAO of the aircraft */
  icao: string
  id: string
  /** Aircraft ident */
  ident: string
  /** Name of the aircraft */
  name: string
  registration: string
  /** Status */
  status: string
  /** Aircraft type */
  type: string
}
export interface Airline {
  iata: string
  icao: string
  /** Show "friendlier" name for airline - the code + name */
  ident: string
  name: string
}
export interface Airport {
  altitude: Length
  /** The name of the city this airports serves */
  city?: string
  /** The country this airport is in */
  country?: string
  /** Current distance to this airport */
  distance: Length
  /** IATA of the airport */
  iata: string
  /** The ICAO code of this airport */
  icao: string
  /** The Latitude and Longitude of this airport (usually somehere near the centre). */
  location: Coords
  /** The name of this airport */
  name?: string
  /** The path to the scenery (.BGL) file that defines this airport */
  sceneryFilePath?: string
  /** The name of the scenery that defines this airport. */
  sceneryName?: string
  /** The state of the USA this airport is in. This is blank for airports outside the USA. */
  state?: string
  transitionAltitude: Length
  transitionLevel: Length
}
export interface Coords {
  /** Latitude */
  lat: number
  /** Longitude */
  lon: number
}
/** This is returned on first start when we initally connect to the sim */
export interface Features {
  aircraftIcao: string
  aircraftType: AircraftType
  configFile: string
  /** The date/time in the sim */
  dateTime: DateTimeOffset
  /** The date/time on the client machine */
  dateTimeSystem: DateTimeOffset
  engineCount: number
  engineType: EngineType
  flapsCount: number
  gearRetractable: boolean
  heading: number
  headingMagnetic: number
  location: Coords
  onGround: boolean
  parkBrake: boolean
  paused: boolean
  /** Just a reference to the sim type */
  simType: string
  title: string
  unlimitedFuel: boolean
}
export interface Field {
  name: string
  value: string
}
/** This is the loaded flight from phpVMS */
export interface Flight {
  altIcao: string
  arrivalIcao: string
  arrivalTime: string
  departureIcao: string
  departureTime: string
  distance: Length
  fields: { [key: string]: string }
  flightNumber: number
  flightTime: number
  flightType: string
  ident: string
  level: number
  loadFactor: number
  loadFactorVariance: number
  route: string
  routeCode?: string
  routeLeg?: string
}
export interface FlightPlan {
  altIcao: string
  arrivalAirport?: Airport
  cargoWeight: Mass
  cruiseAlt: Length
  currentPoint?: RoutePoint
  departureAirport?: Airport
  distance: Length
  /** The remote ID */
  flightId: string
  flightPlanFields: Field[]
  flightPlanType: FlightPlanType
  loadedFromFile: boolean
  nextPoint?: RoutePoint
  passengersCount: number
  pointCount: number
  points: RoutePoint[]
  route: string
  simbriefId: string
  toc?: Coords
  tod?: Coords
}
/** Gate information */
export interface Gate {
  id: string
  /** Coordinates of this location (x, y) */
  location: Coords
  radius: Length
  /** The type of gate */
  type: GateType
}
export interface Pirep {
  /**
   * Return false if the PIREP state is in one of the following states. Rules don't run when
   *             the PIREP/processing isn't active.
   *             NotRunning
   *             Initialized
   *             Arrived
   *             Filed
   *             Cancelled
   */
  active: boolean
  /**
   * The distance when the flightplan is measured
   *             Might not always be set or available
   */
  actualDistance: Length
  /** The aircraft the pilot is flying */
  aircraft?: Aircraft
  /**
   * The airline the flight belongs to, if a flight was loaded
   *             Otherwise, it's the airline the user selected
   */
  airline?: Airline
  /** A DateTime object, the time in the sim */
  approachTime: DateTimeOffset
  /** A DateTime object, system time */
  approachTimeSystem: DateTimeOffset
  /** The arrival airport, null if they haven't landed yet */
  arrivalAirport?: Airport
  /**
   * The arrival gate, null if they aren't at one.
   *             Might be null if it wasn't detected
   */
  arrivalGate?: Gate
  /**
   * The runway that they landed on.
   *             Might be null if it wasn't detected
   */
  arrivalRunway?: Runway
  /** DateTime object, the time in the sim */
  blocksOffTime: DateTimeOffset
  /** A DateTime object. Real time */
  blocksOffTimeSystem: DateTimeOffset
  /** A DateTime object, the time in the sim */
  blocksOnTime: DateTimeOffset
  /** A DateTime object, system time */
  blocksOnTimeSystem: DateTimeOffset
  /** Unix timestamp, the time in the sim */
  boardingTime: DateTimeOffset
  /** A DateTime object, sim time */
  boardingTimeSystem: DateTimeOffset
  /**
   * This will have a value, with the runway information,
   *             if they're currently on a runway
   *             Might be null if it wasn't detected
   */
  crossingRunway?: Runway
  /**
   * The airport they departed from
   *             Might be null if it wasn't detected
   */
  departureAirport?: Airport
  /**
   * The departure gate, null if they aren't at one.
   *             Might be null if it wasn't detected
   */
  departureGate?: Gate
  /**
   * The runway they took off from
   *             Might be null if it wasn't detected
   */
  departureRunway?: Runway
  /** Is this a direct takeoff? That means when in "boarding", the OnGround flag is immediately detected as true */
  directTakeoff: boolean
  /**
   * How far they ahve already travelled
   *             Might not always be set or available
   */
  distanceToGo: Length
  /** Get the time elapsed, subtract the current sim time from the blocks off time */
  elapsedTime: TimeSpan
  elapsedTimeHumanReadable?: string
  engineStartStates: boolean[]
  fares: any[]
  /** The startup variables/state when this PIREP started */
  features?: Features
  /**
   * The flight this PIREP originated from, if it was from
   *             a bid, or loaded on the screen
   */
  flight?: Flight
  /** The ID of the flight from phpVMS */
  flightId: string
  flightNumber: string
  flightPlan?: FlightPlan
  flightType: string
  /** The fuel */
  fuelAtApproach?: Mass
  /** The fuel */
  fuelAtLanding?: Mass
  /** The fuel */
  fuelAtTakeOff?: Mass
  /** Weight */
  fuelBlocksOff?: Mass
  /** The fuel */
  fuelBlocksOn?: Mass
  /** The fuel */
  fuelUsed?: Mass
  /** The phpVMS PIREP ID */
  id: string
  ident: string
  ignoreLightsRules: boolean
  /**
   * Is this flight in an active state? Meaning, it's not in one of these states:
   *                 - Initialized
   *                 - NotRunning
   *                 - Boarding
   *                 - Arrived
   */
  isInActiveState: boolean
  /** If this PIREP is being resumed */
  isResuming: boolean
  /** A DateTime object, the time in the sim */
  landedTime: DateTimeOffset
  /** A DateTime object, system time */
  landedTimeSystem: DateTimeOffset
  landingRate: Speed
  notes?: string
  pauseLocation: Coords
  /**
   * - INI - Initialized
   *             - BST - Boarding started
   *             - PBT - Pushback started
   *             - TXI - Taxi
   *             - TOF - Takeoff
   *             - ENR - Enroute
   *             - APR - Approach
   *             - FIN - On Final
   *             - LAN - Landing
   *             - TXI - Taxi
   *             - ONB - On-block
   *             - ARR - Arrived
   *             - CNL - Cancelled
   *             - FIL - Filed
   *             - PSD - Paused
   */
  phase?: string
  /**
   * Distance planned
   *             Might not always be set or available
   */
  plannedDistance: Length
  /** Gets or sets the planned flight time. */
  plannedFlightTime: number
  route: string
  routeCode: string
  routeLeg: string
  score: number
  /** The simulator type they're using */
  simType: SimType
  sourceName: string
  /**
   * Did they start the flight with the brakes on? Use this to determine the criterea on
   *             moving out of the Boarding phase
   */
  startedWithBrakes: boolean
  /** DateTime object, the time in the sim */
  startTime: DateTimeOffset
  state: PirepState
  /** A DateTime object, sim time */
  takeoffTime: DateTimeOffset
  /** A DateTime object, system time */
  takeoffTimeSystem: DateTimeOffset
  /** Timespan object */
  taxiInDuration: TimeSpan
  /** Timespan object */
  taxiOutDuration: TimeSpan
  /** A DateTime object, sim time */
  taxiOutTime: DateTimeOffset
  /** A DateTime object, system time */
  taxiOutTimeSystem: DateTimeOffset
  /** Distance from the threshold */
  thresholdDistance: Length
  /** Save whether we've already paused or not for the TOD */
  todPauseCompleted: boolean
  /** Or pause the given distance before */
  todPauseDistance: number
  /** Whether we should pause at TOD or not */
  todPauseOn: boolean
  /** Timespan object */
  totalPauseTime: TimeSpan
}
export interface RoutePoint {
  /** If this is the currently active point */
  active: boolean
  /** Coordinates of this location (x, y) */
  location: Coords
  /** Name of the current active nav point */
  name: string
}
/** A class holding all the information about a runway */
export interface Runway {
  approachingRunway: boolean
  approachingRunwayDistance: Length
  bearingToMagnetic: number
  bearingToTrue: number
  closedForLanding: boolean
  closedForTakeoff: boolean
  distance: Length
  endLocation: Coords
  headingMagnetic: number
  headingTrue: number
  /** The airport ICAO */
  icao: string
  length: Length
  magVar: number
  runwayCenter: Coords
  /** The number of the runway (e.g. 27L) */
  runwayId: string
  startLocation: Coords
  surface: Surface
  thresholdLocation: Coords
  thresholdOffset: Length
  width: Length
}
export interface User {
  airline: Airline
  /**
   * The name with their ID + the name, e.g:
   *             VMS001 Nabeel S
   */
  displayName: string
  globalId: string
  /** phpVMS User ID */
  id: string
  /** Their ident, e.g, VMS001 */
  ident: string
  /** The user's private name */
  name: string
}
export interface DateTime {
  Date: DateTime
  Day: number
  DayOfWeek: number
  DayOfYear: number
  Hour: number
  Kind: number
  Microsecond: number
  Millisecond: number
  Minute: number
  Month: number
  Nanosecond: number
  Now: DateTime
  Second: number
  Ticks: number
  TimeOfDay: TimeSpan
  Today: DateTime
  UtcNow: DateTime
  Year: number
}
export interface DateTimeOffset {
  Date: DateTime
  DateTime: DateTime
  Day: number
  DayOfWeek: number
  DayOfYear: number
  Hour: number
  LocalDateTime: DateTime
  Microsecond: number
  Millisecond: number
  Minute: number
  Month: number
  Nanosecond: number
  Now: DateTimeOffset
  Offset: TimeSpan
  Second: number
  Ticks: number
  TimeOfDay: TimeSpan
  TotalOffsetMinutes: number
  UtcDateTime: DateTime
  UtcNow: DateTimeOffset
  UtcTicks: number
  Year: number
}
export interface TimeSpan {
  Days: number
  Hours: number
  Microseconds: number
  Milliseconds: number
  Minutes: number
  Nanoseconds: number
  Seconds: number
  Ticks: number
  TotalDays: number
  TotalHours: number
  TotalMicroseconds: number
  TotalMilliseconds: number
  TotalMinutes: number
  TotalNanoseconds: number
  TotalSeconds: number
}
export interface Length {
  AdditiveIdentity: Length
  Angstroms: number
  AstronomicalUnits: number
  BaseDimensions: any
  BaseUnit: number
  Centimeters: number
  Chains: number
  DataMiles: number
  Decameters: number
  Decimeters: number
  DefaultConversionFunctions: any
  Dimensions: any
  DtpPicas: number
  DtpPoints: number
  Fathoms: number
  Feet: number
  FeetInches: any
  Femtometers: number
  Gigameters: number
  Hands: number
  Hectometers: number
  Inches: number
  Info: any
  Kilofeet: number
  KilolightYears: number
  Kilometers: number
  Kiloparsecs: number
  Kiloyards: number
  LightYears: number
  MegalightYears: number
  Megameters: number
  Megaparsecs: number
  Meters: number
  Microinches: number
  Micrometers: number
  Miles: number
  Millimeters: number
  Mils: number
  Nanometers: number
  NauticalMiles: number
  Parsecs: number
  Picometers: number
  PrinterPicas: number
  PrinterPoints: number
  QuantityInfo: any
  Shackles: number
  SolarRadiuses: number
  Twips: number
  Unit: number
  Units: number[]
  UsSurveyFeet: number
  Value: number
  Yards: number
  Zero: Length
}
export interface Speed {
  AdditiveIdentity: Speed
  BaseDimensions: any
  BaseUnit: number
  CentimetersPerHour: number
  CentimetersPerMinutes: number
  CentimetersPerSecond: number
  DecimetersPerMinutes: number
  DecimetersPerSecond: number
  DefaultConversionFunctions: any
  Dimensions: any
  FeetPerHour: number
  FeetPerMinute: number
  FeetPerSecond: number
  InchesPerHour: number
  InchesPerMinute: number
  InchesPerSecond: number
  Info: any
  KilometersPerHour: number
  KilometersPerMinutes: number
  KilometersPerSecond: number
  Knots: number
  Mach: number
  MetersPerHour: number
  MetersPerMinutes: number
  MetersPerSecond: number
  MicrometersPerMinutes: number
  MicrometersPerSecond: number
  MilesPerHour: number
  MillimetersPerHour: number
  MillimetersPerMinutes: number
  MillimetersPerSecond: number
  NanometersPerMinutes: number
  NanometersPerSecond: number
  QuantityInfo: any
  Unit: number
  Units: number[]
  UsSurveyFeetPerHour: number
  UsSurveyFeetPerMinute: number
  UsSurveyFeetPerSecond: number
  Value: number
  YardsPerHour: number
  YardsPerMinute: number
  YardsPerSecond: number
  Zero: Speed
}
export interface Mass {
  AdditiveIdentity: Mass
  BaseDimensions: any
  BaseUnit: number
  Centigrams: number
  Decagrams: number
  Decigrams: number
  DefaultConversionFunctions: any
  Dimensions: any
  EarthMasses: number
  Femtograms: number
  Grains: number
  Grams: number
  Hectograms: number
  Info: any
  Kilograms: number
  Kilopounds: number
  Kilotonnes: number
  LongHundredweight: number
  LongTons: number
  Megapounds: number
  Megatonnes: number
  Micrograms: number
  Milligrams: number
  Nanograms: number
  Ounces: number
  Picograms: number
  Pounds: number
  QuantityInfo: any
  ShortHundredweight: number
  ShortTons: number
  Slugs: number
  SolarMasses: number
  Stone: number
  StonePounds: any
  Tonnes: number
  Unit: number
  Units: number[]
  Value: number
  Zero: Mass
}
export interface MassFlow {
  AdditiveIdentity: MassFlow
  BaseDimensions: any
  BaseUnit: number
  CentigramsPerDay: number
  CentigramsPerSecond: number
  DecagramsPerDay: number
  DecagramsPerSecond: number
  DecigramsPerDay: number
  DecigramsPerSecond: number
  DefaultConversionFunctions: any
  Dimensions: any
  GramsPerDay: number
  GramsPerHour: number
  GramsPerSecond: number
  HectogramsPerDay: number
  HectogramsPerSecond: number
  Info: any
  KilogramsPerDay: number
  KilogramsPerHour: number
  KilogramsPerMinute: number
  KilogramsPerSecond: number
  MegagramsPerDay: number
  MegapoundsPerDay: number
  MegapoundsPerHour: number
  MegapoundsPerMinute: number
  MegapoundsPerSecond: number
  MicrogramsPerDay: number
  MicrogramsPerSecond: number
  MilligramsPerDay: number
  MilligramsPerSecond: number
  NanogramsPerDay: number
  NanogramsPerSecond: number
  PoundsPerDay: number
  PoundsPerHour: number
  PoundsPerMinute: number
  PoundsPerSecond: number
  QuantityInfo: any
  ShortTonsPerHour: number
  TonnesPerDay: number
  TonnesPerHour: number
  Unit: number
  Units: number[]
  Value: number
  Zero: MassFlow
}
export interface RotationalSpeed {
  AdditiveIdentity: RotationalSpeed
  BaseDimensions: any
  BaseUnit: number
  CentiradiansPerSecond: number
  DeciradiansPerSecond: number
  DefaultConversionFunctions: any
  DegreesPerMinute: number
  DegreesPerSecond: number
  Dimensions: any
  Info: any
  MicrodegreesPerSecond: number
  MicroradiansPerSecond: number
  MillidegreesPerSecond: number
  MilliradiansPerSecond: number
  NanodegreesPerSecond: number
  NanoradiansPerSecond: number
  QuantityInfo: any
  RadiansPerSecond: number
  RevolutionsPerMinute: number
  RevolutionsPerSecond: number
  Unit: number
  Units: number[]
  Value: number
  Zero: RotationalSpeed
}
