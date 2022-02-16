const airlineMappings = new Map<string, string>([
    ['AA', 'American Airlines'],
    ['2G', 'CargoItalia (alternate)'],
    ['CO', 'Continental Airlines'],
    ['DL', 'Delta Air Lines'],
    ['NW', 'Northwest Airlines (alternate site)'],
    ['AC', 'Air Canada'],
    ['UA', 'United Airlines Cargo'],
    ['CP', 'Canadian Airlines Int´l'],
    ['LH', 'Lufthansa Cargo AG'],
    ['FX', 'Fedex'],
    ['AS', 'Alaska Airlines'],
    ['US', 'USAirways'],
    ['RG', 'VARIG Brazilian Airlines'],
    ['KA', 'Dragonair'],
    ['LA', 'LAN Chile'],
    ['TP', 'TAP Air Portugal'],
    ['CY', 'Cyprus Airways'],
    ['OA', 'Olympic Airways'],
    ['EI', 'Aer Lingus Cargo'],
    ['AZ', 'Alitalia'],
    ['AF', 'Air France'],
    ['IC', 'Indian Airlines'],
    ['HM', 'Air Seychelles'],
    ['OK', 'Czech Airlines'],
    ['SV', 'Saudi Arabian Airlines'],
    ['RB', 'Syrian Arab Airlines'],
    ['ET', 'Ethiopian Airlines'],
    ['GF', 'Gulf Air'],
    ['KL', 'KLM Cargo'],
    ['IB', 'Iberia'],
    ['ME', 'Middle East Airlines'],
    ['MS', 'Egyptair'],
    ['PR', 'Philippine Airlines'],
    ['AF', 'Air France'],
    ['LO', 'LOT Polish Airlines'],
    ['QF', 'Qantas Airways'],
    ['SN', 'Brussels Airlines'],
    ['SA', 'South African Airways'],
    ['NZ', 'Air New Zealand'],
    ['IT', 'Kingfisher Airlines'],
    ['KD', 'KD Avia'],
    ['IR', 'Iran Air'],
    ['AI', 'Air India'],
    ['AY', 'Finnair'],
    ['BW', 'Caribbean Airlines'],
    ['FI', 'Icelandair'],
    ['CK', 'China Cargo Airlines'],
    ['LY', 'EL AL'],
    ['JU', 'JAT Airways'],
    ['SK', 'SAS-Scandinavian Airlines System'],
    ['DT', 'TAAG Angola Airlines'],
    ['LM', 'Air ALM'],
    ['AH', 'Air Algerie'],
    ['BA', 'British Airways'],
    ['GA', 'Garuda Indonesia'],
    ['MP', 'Martinair Cargo'],
    ['JL', 'Japan Airlines'],
    ['LR', 'LACSA Airlines of Costa Rica'],
    ['AM', 'Aeromexico Cargo'],
    ['LI', 'LIAT Airlines'],
    ['AT', 'Royal Air Maroc'],
    ['LN', 'Libyan Airlines'],
    ['QR', 'Qatar Airways'],
    ['CX', 'Cathay Pacific Airways'],
    ['3V', 'TNT Airways'],
    ['JP', 'Adria Airways'],
    ['CV', 'Cargolux Airlines'],
    ['EK', 'Emirates'],
    ['KE', 'Korean Air'],
    ['MA', 'Malev Hungarian Airlines'],
    ['RG', 'VARIG Brazilian Airlines'],
    ['JI', 'Jade Cargo International'],
    ['JM', 'Air Jamaica'],
    ['TA', 'TACA'],
    ['NH', 'ANA All Nippon Cargo'],
    ['PK', 'Pakistan Int´l Airlines'],
    ['TG', 'Thai Airways'],
    ['KU', 'Kuwait Airways'],
    ['CM', 'Copa Airlines Cargo'],
    ['NG', 'Lauda Air'],
    ['MH', 'Malaysian Airline System'],
    ['MH', ' '],
    ['MH', 'Homepage'],
    ['JD', 'Japan Air System'],
    ['TK', 'Turkish Airlines'],
    ['BD', 'British Midland Airways'],
    ['MK', 'Air Mauritius'],
    ['OS', 'Austrian Cargo'],
    ['MD', 'Air Madagascar'],
    ['EF', 'Far Eastern Air Transport'],
    ['LT', 'LTU (Leisure Cargo)'],
    ['TL', 'Trans Mediterranean Airways'],
    ['K4', 'Kalitta Air'],
    ['LD', 'Air Hong Kong'],
    ['CI', 'China Airlines'],
    ['5S', 'Global Aviation and Services'],
    ['OO', 'Sky West Airlines'],
    ['WE', 'Centurion Air Cargo'],
    ['SC', 'Shandong Airlines (Chinese)'],
    ['RF', 'Florida West International Airways'],
    ['NC', 'Northern Air Cargo'],
    ['C8', 'Cargolux Italia'],
    ['5Y', 'Atlas Air'],
    ['KX', 'Cayman Airways'],
    ['A3', 'Aegean Airlines'],
    ['PO', 'Polar Air Cargo'],
    ['JW', 'Arrow Air'],
    ['5X', 'UPS Air Cargo'],
    ['N8', 'National Air Cargo'],
    ['S7', 'Siberia Airlines'],
    ['ER', 'DHL Aviation/DHL Airways'],
    ['KC', 'Air Astana'],
    ['ZH', 'Shenzhen Airlines (Chinese)'],
    ['SU', 'Aeroflot'],
    ['RJ', 'Royal Jordanian'],
    ['WN', 'Southwest Airlines'],
    ['A2', 'Cielos Airlines'],
    ['M3', 'ABSA Aerolinhas Brasileiras'],
    ['M2', 'Mario’s Air'],
    ['XQ', 'Sun Express'],
    ['PS', 'Ukraine Int´l Airlines'],
    ['9U', 'Air Moldova'],
    ['7C', 'Coyne Airways'],
    ['RU', 'AirBridge Cargo'],
    ['9W', 'Jet Airways'],
    ['UL', 'SriLankan Cargo'],
    ['UL', 'more AWB tracking'],
    ['UY', 'Cameroon Airlines'],
    ['EY', 'ETIHAD Airways'],
    ['QY', 'DHL Aviation / European Air Transport'],
    ['SQ', 'Singapore Airlines'],
    ['FB', 'Bulgaria Air'],
    ['GL', 'Air Greenland'],
    ['IY', 'Yemenia Yemen Airways'],
    ['KM', 'Air Malta'],
    ['PX', 'Air Niugini'],
    ['BT', 'Air Baltic'],
    ['BI', 'Royal Brunei Airlines'],
    ['NX', 'Air Macau'],
    ['BR', 'Eva Airways'],
    ['5C', 'CAL Cargo Air Lines'],
    ['KQ', 'Kenya Airways'],
    ['MB', 'MNG Airlines'],
    ['LX', 'Swiss'],
    ['QT', 'Tampa Airlines'],
    ['MF', 'Xiamen Airlines'],
    ['SP', 'SATA Air Acores'],
    ['VN', 'Vietnam Airlines'],
    ['SM', 'Avient'],
    ['J2', 'Azerbaijan Airlines'],
    ['FM', 'Shanghai Airlines'],
    ['MU', 'China Eastern Airlines'],
    ['CZ', 'China Southern Airlines'],
    ['GD', 'Grandstar Cargo'],
    ['AE', 'Mandarin Airlines'],
    ['M6', 'Amerijet International'],
    ['S6', 'SAC South American Airways'],
    ['F4', 'Shanghai Airlines Cargo'],
    ['OU', 'Croatia Airlines'],
    ['N8', 'Hong Kong Airlines'],
    ['FK', 'Africa West'],
    ['EV', 'Atlantic Southeast Airlines'],
    ['MY', 'MASAir'],
    ['VV', 'Aerosvit'],
    ['Y8', 'Yangtze River Express Airlines'],
    ['6R', 'AeroUnion'],
    ['3U', 'Sichuan Airlines'],
    ['HU', 'Hainan Airlines (Chinese)'],
    ['DE', 'Condor Flugdienst'],
    ['OH', 'Comair'],
    ['B1', 'TAB Cargo'],
    ['QN', 'Air Armenia'],
    ['UZ', 'Buraq Air Transport (Arabic only)'],
    ['VS', 'Virgin Atlantic'],
    ['KZ', 'Nippon Cargo Airlines'],
    ['JJ', 'TAM Brazilian Airlines'],
    ['7I', 'Insel Air Cargo'],
    ['OV', 'Estonian Air'],
    ['QO', 'Aeromexpress Cargo'],
    ['OZ', 'Asiana Airlines'],
    ['IJ', 'Great Wall Airlines'],
    ['UX', 'Air Europa Cargo'],
    ['BG', 'Biman Bangladesh'],
    ['CA', 'Air China']
]);

/*
    getAirlineNameFromIataCode
    Accepts an airline iata code and attempts to find a mapping to a full airline name.
    If one exists, it will return it, otherwise it will return the IATA code for display purposes as a fallback.
*/
export const getAirlineNameFromIataCode = (iataCode: string): string => {
    const airlineName: string | undefined = airlineMappings.get(iataCode);
    return !!airlineName
        ? airlineName
        : iataCode;
}
