export enum FlightType {
    OneWay = 'One Way',
    RoundTrip = 'Round Trip',
    MultiCity = 'Multi-City'
}

export enum FlightTypeJsonLabel {
    'One Way' = 'ONEWAY',
    'Multi-City' = 'ONEWAY', // Multi-city will be handled as a series of one way flights.
    'Round Trip' = 'ROUNDTRIP',
}

export const flightTypeAsJsonLabel = (flightTypeValue: FlightType): FlightTypeJsonLabel => {
    return FlightTypeJsonLabel[flightTypeValue];
};
