import moment = require("moment");

const baseURL = 'purpledinoapi.link';
const port = '8080';
const flightOffersAPI = '/api/flightOffers';
const flightOffersEndpointURL = `https://www.${baseURL}:${port}${flightOffersAPI}`;

export interface IFlightOfferData {
    type: string;
    id: string;
    source: string;
    instantTicketingRequired: boolean;
    nonHomogenous: boolean;
    oneWay: boolean;
    lastTicketingDate: string;
    numberOfBookeableSeats: number;
    itineraries: IItinerary[];
    price: IPrice;
    pricingOptions: IPricingOptions;
    validatingAirlineCodes: string[];
    travelerPricings: ITravelerPricing[];
}

export interface ITravelerPricing {
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: IPrice;
    fareDetailsBySegment: IFareDetailsBySegment;
}

export interface IFareDetailsBySegment {
    segmentId: string;
    cabin: string;
    fareBasis: string;
    class: string;
    includedCheckedBags: IIncludedCheckedBags;
}

export interface IIncludedCheckedBags {
    weight: number;
}

export interface IItinerary {
    duration: string;
    segments: IItinerarySegment[];
}

export interface IItinerarySegment {
    departure: IFlightDate;
    arrival: IFlightDate;
    carrierCode: string;
    number: string;
    aircraft: IAircraft;
    duration: string;
    id: string;
    numberOfStops: number;
    blacklistedInEU: boolean;
}

export interface IAircraft {
    code: string;
}

export interface IFlightDate {
    iataCode: string;
    terminal: string;
    at: string;
}

export interface IPrice {
    currency: string;
    total: string;
    base: string;
    fees: IFees[];
    grandTotal: string;
}

export interface IFees {
    amount: number;
    type: string;
}

export interface IPricingOptions {
    includedCheckedBagsOnly: boolean;
    fareType: string[];
    refundableFare: boolean;
    noRestrictionFare: false;
    noPenaltyFare: false;
}

export interface IFlightOfferArguments {
    departureAirportIataCode: string;
    returnAirportIataCode?: string;
    departureDate: moment.Moment;
    returnDate?: moment.Moment;
    numberOfAdults: number;
    numberOfChildren?: number;
    flightClass?: string;
    maxPrice?: number;
}

export enum FlightOfferSearchProperties {
    departureAirportCode = 'originLocationCode',
    arrivalAirportCode = 'destinationLocationCode',
    departureDate = 'departureDate',
    arrivalDate = 'returnDate',
    numberOfAdults = 'adults',
    numberOfChildren = 'children',
    flightClass = 'travelClass',
    maximumPrice = 'maxPrice'
}

export const getFlightOffersWithFilters = async (flightOfferArguments: IFlightOfferArguments): Promise<Array<IFlightOfferData> | Error> => {
    const finalFlightOfferURL = buildFlightAPIUrlFromArguments(flightOfferArguments);
    console.log(`Retrieving FlightOffer data from: ${finalFlightOfferURL}`);
    const options = {
        'method': 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',           
        }
    }

    try {
        const responseData: Response = await fetch(finalFlightOfferURL, options);
        const statusCode = responseData.status;
        console.log(`Recieved response from /flightOffers endpoint with status: '${statusCode}'`);
        const json = await responseData.json();
        console.log(`JSON recieved from /flightOffers endpoint: '${JSON.stringify(json)}'`);
        return json;
    } catch (error) {
        const errorMessage = `Failed to get flightOffer data from API endpoint due to reason: ${error}`
        console.error(errorMessage);
        return Error(errorMessage);
    }
};

export const buildFlightAPIUrlFromArguments = (flightOfferArguments: IFlightOfferArguments): string => {
    let url = flightOffersEndpointURL;
    let queryCount = 0;

    if (!!flightOfferArguments.returnAirportIataCode) {
        const querySymbol = queryCount === 0
            ? '?'
            : '&';
        url += `${querySymbol}${FlightOfferSearchProperties.arrivalAirportCode}=${flightOfferArguments.returnAirportIataCode}`;
        queryCount++;
    }
    if (!!flightOfferArguments.departureAirportIataCode) {
        const querySymbol = queryCount === 0
            ? '?'
            : '&';
        url += `${querySymbol}${FlightOfferSearchProperties.departureAirportCode}=${flightOfferArguments.departureAirportIataCode}`;
        queryCount++;
    }
    if (!!flightOfferArguments.departureDate) {
        const querySymbol = queryCount === 0
            ? '?'
            : '&';
        url += `${querySymbol}${FlightOfferSearchProperties.departureDate}=${formatDateForAPI(flightOfferArguments.departureDate)}`;
        queryCount++;
    }
    if (!!flightOfferArguments.returnDate) {
        const querySymbol = queryCount === 0
            ? '?'
            : '&';
        url += `${querySymbol}${FlightOfferSearchProperties.arrivalDate}=${formatDateForAPI(flightOfferArguments.returnDate)}`;
    }
    if (!!flightOfferArguments.numberOfAdults) {
        const querySymbol = queryCount === 0
            ? '?'
            : '&';
        url += `${querySymbol}${FlightOfferSearchProperties.numberOfAdults}=${flightOfferArguments.numberOfAdults}`;
        queryCount++;
    }
    if (!!flightOfferArguments.numberOfChildren) {
        const querySymbol = queryCount === 0
            ? '?'
            : '&';
        url += `${querySymbol}${FlightOfferSearchProperties.numberOfChildren}=${flightOfferArguments.numberOfChildren}`;
        queryCount++;
    }
    if (!!flightOfferArguments.flightClass) {
        const querySymbol = queryCount === 0
            ? '?'
            : '&';
        url += `${querySymbol}${FlightOfferSearchProperties.flightClass}=${flightOfferArguments.flightClass}`;
        queryCount++;
    }
    if (!!flightOfferArguments.maxPrice) {
        const querySymbol = queryCount === 0
            ? '?'
            : '&';
        url += `${querySymbol}${FlightOfferSearchProperties.maximumPrice}=${flightOfferArguments.maxPrice}`;
        queryCount++;
    }

    return url;
};

const formatDateForAPI = (date: moment.Moment) => {
    return date.format('YYYY-MM-DD');
};
