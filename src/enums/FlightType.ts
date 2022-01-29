export enum FlightType {
    OneWay = 'One Way',
    RoundTrip = 'Round Trip',
    MultiCity = 'Multi-City'
}

export enum FlightTypeJsonLabel {
    'One Way' = 'ONE_WAY',
    'Multi-City' = 'ONE_WAY', // Multi-city will be handled as a series of one way flights.
    'Round Trip' = 'ROUND_TRIP',
}

export const flightTypeAsJsonLabel = (flightTypeValue: FlightType): FlightTypeJsonLabel => {
    return FlightTypeJsonLabel[flightTypeValue];
};
