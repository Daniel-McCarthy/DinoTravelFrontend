export enum FlightClass {
    FirstClass = 'First Class',
    EconomyClass = 'Economy Class',
    BusinessClass = 'Business Class'
}

export enum FlightClassJsonLabel {
    'First Class' = 'FIRST_CLASS',
    'Economy Class' = 'ECONOMY',
    'Business Class' = 'BUSINESS'
    // Premium Economy found in backend not yet accounted for due to not being in the requirements.
}

export const flightClassAsJsonLabel = (classValue: FlightClass): FlightClassJsonLabel => {
    return FlightClassJsonLabel[classValue];
};
