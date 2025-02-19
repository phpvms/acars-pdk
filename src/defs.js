'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.FeatureType =
  exports.AircraftFeature =
  exports.AircraftConfigSimType =
  exports.PirepState =
  exports.FlightPlanType =
  exports.FareType =
  exports.SimType =
  exports.EngineType =
  exports.AircraftType =
  exports.Surface =
  exports.GateType =
    void 0
/** The different gate types */
var GateType
;(function (GateType) {
  GateType[(GateType['None'] = 0)] = 'None'
  GateType[(GateType['Ramp_GA'] = 1)] = 'Ramp_GA'
  GateType[(GateType['Ramp_GA_Small'] = 2)] = 'Ramp_GA_Small'
  GateType[(GateType['Ramp_GA_Medium'] = 3)] = 'Ramp_GA_Medium'
  GateType[(GateType['Ramp_GA_Large'] = 4)] = 'Ramp_GA_Large'
  GateType[(GateType['Ramp_Cargo'] = 5)] = 'Ramp_Cargo'
  GateType[(GateType['Ramp_Military_Cargo'] = 6)] = 'Ramp_Military_Cargo'
  GateType[(GateType['Ramp_Military_Combat'] = 7)] = 'Ramp_Military_Combat'
  GateType[(GateType['Gate_Small'] = 8)] = 'Gate_Small'
  GateType[(GateType['Gate_Medium'] = 9)] = 'Gate_Medium'
  GateType[(GateType['Gate_Heavy'] = 10)] = 'Gate_Heavy'
  GateType[(GateType['Dock_GA'] = 11)] = 'Dock_GA'
  GateType[(GateType['Fuel'] = 12)] = 'Fuel'
  GateType[(GateType['Vehicles'] = 13)] = 'Vehicles'
  /** Added for MSFS */
  GateType[(GateType['Ramp_GA_Extra'] = 14)] = 'Ramp_GA_Extra'
  /** Added for MSFS */
  GateType[(GateType['Gate_Extra'] = 15)] = 'Gate_Extra'
  /** Added for MSFS */
  GateType[(GateType['Jetway'] = 16)] = 'Jetway'
})(GateType || (exports.GateType = GateType = {}))
/** The runway/taxiway surface */
var Surface
;(function (Surface) {
  Surface[(Surface['Concrete'] = 0)] = 'Concrete'
  Surface[(Surface['Grass'] = 1)] = 'Grass'
  Surface[(Surface['Water'] = 2)] = 'Water'
  Surface[(Surface['Unknown3'] = 3)] = 'Unknown3'
  Surface[(Surface['Asphalt'] = 4)] = 'Asphalt'
  Surface[(Surface['Unknown5'] = 5)] = 'Unknown5'
  Surface[(Surface['Unknown6'] = 6)] = 'Unknown6'
  Surface[(Surface['Clay'] = 7)] = 'Clay'
  Surface[(Surface['Snow'] = 8)] = 'Snow'
  Surface[(Surface['Ice'] = 9)] = 'Ice'
  Surface[(Surface['Unknown10'] = 10)] = 'Unknown10'
  Surface[(Surface['Unknown11'] = 11)] = 'Unknown11'
  Surface[(Surface['Dirt'] = 12)] = 'Dirt'
  Surface[(Surface['Coral'] = 13)] = 'Coral'
  Surface[(Surface['Gravel'] = 14)] = 'Gravel'
  Surface[(Surface['Oil_treated'] = 15)] = 'Oil_treated'
  Surface[(Surface['Mats'] = 16)] = 'Mats'
  Surface[(Surface['Bituminous'] = 17)] = 'Bituminous'
  Surface[(Surface['Brick'] = 18)] = 'Brick'
  Surface[(Surface['Macadam'] = 19)] = 'Macadam'
  Surface[(Surface['Planks'] = 20)] = 'Planks'
  Surface[(Surface['Sand'] = 21)] = 'Sand'
  Surface[(Surface['Shale'] = 22)] = 'Shale'
  Surface[(Surface['Tarmac'] = 23)] = 'Tarmac'
  Surface[(Surface['Unknown'] = 99999)] = 'Unknown'
})(Surface || (exports.Surface = Surface = {}))
var AircraftType
;(function (AircraftType) {
  AircraftType[(AircraftType['Airliner'] = 0)] = 'Airliner'
  AircraftType[(AircraftType['Cargo'] = 1)] = 'Cargo'
  AircraftType[(AircraftType['GeneralAviation'] = 2)] = 'GeneralAviation'
  AircraftType[(AircraftType['Helicopter'] = 3)] = 'Helicopter'
})(AircraftType || (exports.AircraftType = AircraftType = {}))
/** The type of engine */
var EngineType
;(function (EngineType) {
  EngineType[(EngineType['Piston'] = 0)] = 'Piston'
  EngineType[(EngineType['Jet'] = 1)] = 'Jet'
  EngineType[(EngineType['None'] = 2)] = 'None'
  EngineType[(EngineType['Helo'] = 3)] = 'Helo'
  EngineType[(EngineType['Rocket'] = 4)] = 'Rocket'
  EngineType[(EngineType['Turboprop'] = 5)] = 'Turboprop'
})(EngineType || (exports.EngineType = EngineType = {}))
var SimType
;(function (SimType) {
  SimType[(SimType['None'] = 0)] = 'None'
  SimType[(SimType['Prepar3D'] = 1)] = 'Prepar3D'
  SimType[(SimType['Xplane'] = 2)] = 'Xplane'
  /** You can use this for ALL FlightSimulator (2020, 2024, and beyond) */
  SimType[(SimType['FlightSimulator'] = 3)] = 'FlightSimulator'
  SimType[(SimType['Fsx'] = 4)] = 'Fsx'
  SimType[(SimType['Fs9'] = 5)] = 'Fs9'
  /** Specifically only for MSFS 2020 */
  SimType[(SimType['FlightSimulator2020'] = 6)] = 'FlightSimulator2020'
  /** Specifically only for MSFS 2024 */
  SimType[(SimType['FlightSimulator2024'] = 7)] = 'FlightSimulator2024'
})(SimType || (exports.SimType = SimType = {}))
var FareType
;(function (FareType) {
  /** Primarily a passenger flight */
  FareType[(FareType['Passenger'] = 0)] = 'Passenger'
  /** Primarily a cargo flight */
  FareType[(FareType['Cargo'] = 1)] = 'Cargo'
})(FareType || (exports.FareType = FareType = {}))
/** The different types of flight plans that can be parsed */
var FlightPlanType
;(function (FlightPlanType) {
  /** Was entered using ACARS */
  FlightPlanType[(FlightPlanType['VmsAcars'] = 0)] = 'VmsAcars'
  /** Flight plan was created in Prepar3d/FSX/FS9 */
  FlightPlanType[(FlightPlanType['Prepar3d'] = 1)] = 'Prepar3d'
  /** Flight plan was created using X-Plane */
  FlightPlanType[(FlightPlanType['Xplane'] = 2)] = 'Xplane'
  /** Flightplan was created using SimBrief */
  FlightPlanType[(FlightPlanType['SimBrief'] = 3)] = 'SimBrief'
  /** Flightplan was create using Flight Simulator */
  FlightPlanType[(FlightPlanType['MsFs'] = 4)] = 'MsFs'
})(FlightPlanType || (exports.FlightPlanType = FlightPlanType = {}))
/** The PIREP states - these match the phase */
var PirepState
;(function (PirepState) {
  /** Internal only. Rules are not parsed in this state */
  PirepState[(PirepState['NotRunning'] = 0)] = 'NotRunning'
  /** Internal only. Rules are not parsed in this state */
  PirepState[(PirepState['Initialized'] = 1)] = 'Initialized'
  /** Internal only. Rules are not parsed in this state */
  PirepState[(PirepState['Boarding'] = 2)] = 'Boarding'
  /** When parking brake is released. Pushback may get skipped over and go directly into taxi out */
  PirepState[(PirepState['Pushback'] = 3)] = 'Pushback'
  PirepState[(PirepState['TaxiOut'] = 4)] = 'TaxiOut'
  PirepState[(PirepState['Takeoff'] = 5)] = 'Takeoff'
  PirepState[(PirepState['Enroute'] = 6)] = 'Enroute'
  PirepState[(PirepState['Approach'] = 7)] = 'Approach'
  PirepState[(PirepState['Final'] = 8)] = 'Final'
  PirepState[(PirepState['Landed'] = 9)] = 'Landed'
  PirepState[(PirepState['TaxiIn'] = 10)] = 'TaxiIn'
  PirepState[(PirepState['Arrived'] = 11)] = 'Arrived'
  /** Internal only. Rules are not parsed in this state */
  PirepState[(PirepState['Cancelled'] = 12)] = 'Cancelled'
  /** Internal only. Rules are not parsed in this state */
  PirepState[(PirepState['Filed'] = 13)] = 'Filed'
  /** Internal only. Rules are not parsed in this state */
  PirepState[(PirepState['Paused'] = 14)] = 'Paused'
  PirepState[(PirepState['OnBlock'] = 15)] = 'OnBlock'
})(PirepState || (exports.PirepState = PirepState = {}))
/** The simtype for the rule file */
var AircraftConfigSimType
;(function (AircraftConfigSimType) {
  AircraftConfigSimType[(AircraftConfigSimType['MsFs'] = 0)] = 'MsFs'
  AircraftConfigSimType[(AircraftConfigSimType['XPlane'] = 1)] = 'XPlane'
  AircraftConfigSimType[(AircraftConfigSimType['Fsuipc'] = 2)] = 'Fsuipc'
})(
  AircraftConfigSimType ||
    (exports.AircraftConfigSimType = AircraftConfigSimType = {}),
)
/** Features of an aircraft. They are binary on or off */
var AircraftFeature
;(function (AircraftFeature) {
  AircraftFeature[(AircraftFeature['BeaconLights'] = 0)] = 'BeaconLights'
  AircraftFeature[(AircraftFeature['LandingLights'] = 1)] = 'LandingLights'
  AircraftFeature[(AircraftFeature['LogoLights'] = 2)] = 'LogoLights'
  AircraftFeature[(AircraftFeature['NavigationLights'] = 3)] =
    'NavigationLights'
  AircraftFeature[(AircraftFeature['StrobeLights'] = 4)] = 'StrobeLights'
  AircraftFeature[(AircraftFeature['TaxiLights'] = 5)] = 'TaxiLights'
  AircraftFeature[(AircraftFeature['WingLights'] = 6)] = 'WingLights'
  AircraftFeature[(AircraftFeature['Flaps'] = 7)] = 'Flaps'
  AircraftFeature[(AircraftFeature['APU'] = 8)] = 'APU'
  AircraftFeature[(AircraftFeature['Doors'] = 9)] = 'Doors'
  AircraftFeature[(AircraftFeature['Seatbelts'] = 10)] = 'Seatbelts'
  AircraftFeature[(AircraftFeature['EmergencyLights'] = 11)] = 'EmergencyLights'
  AircraftFeature[(AircraftFeature['AntiIce'] = 12)] = 'AntiIce'
  AircraftFeature[(AircraftFeature['Battery'] = 13)] = 'Battery'
  AircraftFeature[(AircraftFeature['Packs'] = 14)] = 'Packs'
  AircraftFeature[(AircraftFeature['ParkingBrakes'] = 15)] = 'ParkingBrakes'
  AircraftFeature[(AircraftFeature['Engines'] = 16)] = 'Engines'
  AircraftFeature[(AircraftFeature['Transponder'] = 17)] = 'Transponder'
  AircraftFeature[(AircraftFeature['LandingGear'] = 18)] = 'LandingGear'
  AircraftFeature[(AircraftFeature['Autopilot'] = 19)] = 'Autopilot'
  AircraftFeature[(AircraftFeature['ExternalPower'] = 20)] = 'ExternalPower'
})(AircraftFeature || (exports.AircraftFeature = AircraftFeature = {}))
/** The type of the dataref */
var FeatureType
;(function (FeatureType) {
  FeatureType[(FeatureType['Bool'] = 0)] = 'Bool'
  FeatureType[(FeatureType['Int'] = 1)] = 'Int'
  /** A single number (double, float) value */
  FeatureType[(FeatureType['Number'] = 2)] = 'Number'
  /** An array of integers */
  FeatureType[(FeatureType['IntArray'] = 3)] = 'IntArray'
  /** An array of numbers */
  FeatureType[(FeatureType['NumberArray'] = 4)] = 'NumberArray'
})(FeatureType || (exports.FeatureType = FeatureType = {}))
