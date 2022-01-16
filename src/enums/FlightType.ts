export enum FlightType {
    OneWay = 'One Way',
    RoundTrip = 'Round Trip'
}

export enum FlightTypeJsonLabel {
    'One Way' = 'ONE_WAY',
    'Round Trip' = 'ROUND_TRIP',
}

export const flightTypeAsJsonLabel = (flightTypeValue: FlightType): FlightTypeJsonLabel => {
    return FlightTypeJsonLabel[flightTypeValue];
};
