// interface IAirport {
//     airportIdentifier: string
//     airportName: string;
//     airportCity: string;
//     airportState: string;
// }


// export const airportNameMapping = new Map();
// airportNameMapping.set("ABR",     )

// const parseAndSetAirportMappings = () => {

// }

// /*
//  * Airport names/information retrieved from 'https://www.skygod.com/airport-codes/'
//  */
// const airportRawInfo = [
// `Aberdeen Regional Airport;Aberdeen;South Dakota;ABR`,
// `Abilene Regional Airport;Abilene;Texas;ABI`,
// `Abraham Lincoln Capital Airport;Springfield;Illinois;SPI`,
// `Akron-Canton Regional Airport;Akron / Canton;Ohio;CAK`,
// Albany International Airport	Albany	New York	ALB
// Albert J. Ellis Airport	Jacksonville	North Carolina	OAJ
// Albuquerque International Sunport	Albuquerque	New Mexico	ABQ
// Alexandria International Airport	Alexandria	Louisiana	AEX
// Alpena County Regional Airport	Alpena	Michigan	APN
// Aniak Airport	Aniak	Alaska	ANI
// Antonio B. Won Pat International Airport	Agana / Tamuning	Guam	GUM
// Antonio Rivera Rodríguez Airport	Vieques	Puerto Rico	VQS
// Appleton International Airport	Appleton	Wisconsin	ATW
// Arcata Airport	Arcata / Eureka	California	ACV
// Arnold Palmer Regional Airport	Latrobe	Pennsylvania	LBE
// Asheville Regional Airport	Asheville	North Carolina	AVL
// Aspen-Pitkin County Airport	Aspen	Colorado	ASE
// Atlantic City International Airport	Atlantic City	New Jersey	ACY
// Augusta Regional Airport	Augusta	Georgia	AGS
// Austin-Bergstrom International Airport	Austin	Texas	AUS
// Baltimore/Washington International Thurgood Marshall Airport	Baltimore / Glen Burnie	Maryland	BWI
// Bangor International Airport	Bangor	Maine	BGR
// Barkley Regional Airport	Paducah	Kentucky	PAH
// Barnstable Municipal Airport	Hyannis	Massachuttces	HYA
// Baton Rouge Metropolitan Airport	Baton Rouge	Louisiana	BTR
// Bellingham International Airport	Bellingham	Washington	BLI
// Bemidji Regional Airport	Bemidji	Minniesota	BJI
// Benjamín Rivera Noriega Airport	Culebra	Puerto Rico	CPX
// Bert Mooney Airport	Butte	Montana	BTM
// Bethel Airport	Bethel	Alaska	BET
// Bill and Hillary Clinton National Airport	Little Rock	Arkansas	LIT
// Billings Logan International Airport	Billings	Montana	BIL
// Birmingham–Shuttlesworth International Airport	Birmingham	Alabama	BHM
// Bishop International Airport	Flint	Michigan	FNT
// Bismarck Municipal Airport	Bismarck	North Dakota	BIS
// Block Island State Airport	Block Island / New Shoreham	Rhode Island	BID
// Blue Grass Airport	Lexington	Kentucky	LEX
// Bob Hope Airport	Burbank	California	BUR
// Boise Airport	Boise	Idaho	BOI
// Boulder City Municipal Airport	Boulder City	Nevada	BLD
// Bozeman Yellowstone International Airport	Bozeman	Montana	BZN
// Bradley International Airport	Hartford	Connecticut	BDL
// Brainerd Lakes Regional Airport	Brainerd	Minniesota	BRD
// Brownsville/South Padre Island International Airport	Brownsville	Texas	BRO
// Brunswick Golden Isles Airport	Brunswick	Georgia	BQK
// Buffalo Niagara International Airport	Buffalo	New York	BUF
// Burlington International Airport	Burlington	Vermont	BTV
// Capital Region International Airport	Lansing	Michigan	LAN
// Casper/Natrona County International Airport	Casper	Wyoming	CPR
// Cedar City Regional Airport	Cedar City	Utah	CDC
// Central Illinois Regional Airport at Bloomington-Normal	Bloomington / Normal	Illinois	BMI
// Central Nebraska Regional Airport	Grand Island	Nebraska	GRI
// Central Wisconsin Airport	Mosinee	Wisconsin	CWA
// Charles M. Schulz–Sonoma County Airport	Santa Rosa	California	STS
// Charleston International Airport / Charleston AFB	Charleston	South Carolina	CHS
// Charlotte/Douglas International Airport	Charlotte	North Carolina	CLT
// Charlottesville–Albemarle Airport	Charlottesville	Virginia	CHO
// Chattanooga Metropolitan Airport	Chattanooga	Tennessee	CHA
// Cherry Capital Airport	Traverse City	Michigan	TVC
// Cheyenne Regional Airport	Cheyenne	Wyoming	CYS
// Chicago Midway International Airport	Chicago	Illinois	MDW
// Chicago O'Hare International Airport	Chicago	Illinois	ORD
// Chicago Rockford International Airport	Rockford	Illinois	RFD
// Chico Municipal Airport	Chico	California	CIC
// Chippewa County International Airport	Sault Ste. Marie	Michigan	CIU
// Chippewa Valley Regional Airport	Eau Claire	Wisconsin	EAU
// Cincinnati Municipal Lunken Airport	Cincinnati	Ohio	LUK
// Cincinnati/Northern Kentucky International Airport	Cincinnati / Covington	Kentucky	CVG
// City of Colorado Springs Municipal Airport	Colorado Springs	Colorado	COS
// Cleveland-Hopkins International Airport	Cleveland	Ohio	CLE
// Coastal Carolina Regional Airport	New Bern	North Carolina	EWN
// Columbia Metropolitan Airport	Columbia	South Carolina	CAE
// Columbia Regional Airport	Columbia	Missouri	COU
// Columbus Metropolitan Airport	Columbus	Georgia	CSG
// Concord Regional Airport	Concord	North Carolina	USA
// Corpus Christi International Airport	Corpus Christi / Kingsville	Texas	CRP
// Dallas Love Field	Dallas	Texas	DAL
// Dallas/Fort Worth International Airport	Dallas-Fort Worth	Texas	DFW
// Dane County Regional Airport	Madison	Wisconsin	MSN
// Daniel K. Inouye International Airport	Honolulu , Oahu	Hawaii	HNL
// Daytona Beach International Airport	Daytona Beach	Florida	DAB
// Deadhorse Airport	Deadhorse / Prudhoe Bay	Alaska	SCC
// Del Norte County Airport	Crescent City	California	CEC
// Delta County Airport	Escanaba	Michigan	ESC
// Denver International Airport	Denver	Colorado	DEN
// Des Moines International Airport	Des Moines	Iowa	DSM
// Destin–Fort Walton Beach Airport / Eglin Air Force Base	Valparaiso	Florida	VPS
// Detroit Metropolitan Wayne County Airport	Detroit / Romulus	Michigan	DTW
// Dickinson Theodore Roosevelt Regional Airport	Dickinson	North Dakota	DIK
// Dillingham Airport	Dillingham	Alaska	DLG
// Dothan Regional Airport	Dothan	Alabama	DHN
// Dubuque Regional Airport	Dubuque	Iowa	DBQ
// Duluth International Airport	Duluth	Minniesota	DLH
// Durango-La Plata County Airport	Durango	Colorado	DRO
// Eagle County Regional Airport	Eagle	Colorado	EGE
// East Texas Regional Airport	Longview	Texas	GGG
// Easterwood Airport	College Station	Texas	CLL
// Edward G. Pitka Sr. Airport	Galena	Alaska	GAL
// El Paso International Airport	El Paso	Texas	ELP
// Elko Regional Airport	Elko	Nevada	EKO
// Elmira/Corning Regional Airport	Elmira / Corning	New York	ELM
// Eppley Airfield	Omaha	Nebraska	OMA
// Erie International Airport	Erie	Pennsylvania	ERI
// Eugene Airport	Eugene	Oregon	EUG
// Evansville Regional Airport	Evansville	Indiana	EVV
// Fairbanks International Airport	Fairbanks	Alaska	FAI
// Falls International Airport	International Falls	Minniesota	INL
// Fayetteville Regional Airport	Fayetteville	North Carolina	FAY
// Fernando Luis Ribas Dominicci Airport	San Juan / Miramar	Puerto Rico	SIG
// Flagstaff Pulliam Airport	Flagstaff	Arizona	FLG
// Florence Regional Airport	Florence	South Carolina	FLO
// Ford Airport	Iron Mountain / Kingsford	Michigan	IMT
// Fort Lauderdale–Hollywood International Airport	Fort Lauderdale	Florida	FLL
// Fort Smith Regional Airport	Fort Smith	Arkansas	FSM
// Fort Wayne International Airport	Fort Wayne	Indiana	FWA
// Fresno Yosemite International Airport	Fresno	California	FAT
// Friday Harbor Airport	Friday Harbor	Washington	FRD
// Friedman Memorial Airport	Hailey	Idaho	SUN
// Gainesville Regional Airport	Gainesville	Florida	GNV
// Garden City Regional Airport	Garden City	Kansas	GCK
// Gen. Edward Lawrence Logan International Airport	Boston	Massachuttces	BOS
// General Mitchell International Airport	Milwaukee	Wisconsin	MKE
// General Wayne A. Downing Peoria International Airport	Peoria	Illinois	PIA
// George Bush Intercontinental Airport	Houston	Texas	IAH
// Gerald R. Ford International Airport	Grand Rapids	Michigan	GRR
// Gillette-Campbell County Airport	Gillette	Wyoming	GCC
// Glacier Park International Airport	Kalispell	Montana	FCA
// Golden Triangle Regional Airport	Columbus / West Point / Starkville	Mississippi	GTR
// Grand Canyon National Park Airport	Grand Canyon / Tusayan	Arizona	GCN
// Grand Canyon West Airport	Peach Springs	Arizona	GCW
// Grand Forks International Airport	Grand Forks	North Dakota	GFK
// Grand Junction Regional Airport	Grand Junction	Colorado	GJT
// Great Falls International Airport	Great Falls	Montana	GTF
// Greater Binghamton Airport	Binghamton	New York	BGM
// Greater Rochester International Airport	Rochester	New York	ROC
// Green Bay–Austin Straubel International Airport	Green Bay	Wisconsin	GRB
// Greenbrier Valley Airport	Lewisburg	West Virginia	LWB
// Greenville-Spartanburg International Airport	Greenville	South Carolina	GSP
// Gulfport–Biloxi International Airport	Gulfport / Biloxi	Mississippi	GPT
// Gunnison-Crested Butte Regional Airport	Gunnison	Colorado	GUC
// Hagerstown Regional Airport	Hagerstown	Maryland	HGR
// Harrisburg International Airport	Harrisburg / Middletown	Pennsylvania	MDT
// Hartsfield–Jackson Atlanta International Airport	Atlanta	Georgia	ATL
// Hector International Airport	Fargo	North Dakota	FAR
// Helena Regional Airport	Helena	Montana	HLN
// Hilo International Airport	Hilo , Hawaii	Hawaii	ITO
// Hilton Head Airport	Hilton Head Island	South Carolina	HHH
// Homer Airport	Homer	Alaska	HOM
// Houghton County Memorial Airport	Hancock / Calumet	Michigan	CMX
// Huntsville International Airport	Huntsville	Alabama	HSV
// Idaho Falls Regional Airport	Idaho Falls	Idaho	IDA
// Indianapolis International Airport	Indianapolis	Indiana	IND
// Ithaca Tompkins Regional Airport	Ithaca	New York	ITH
// Jack Brooks Regional Airport	Beaumont / Port Arthur	Texas	BPT
// Jackson Hole Airport	Jackson	Wyoming	JAC
// Jackson–Evers International Airport	Jackson	Mississippi	JAN
// Jacksonville International Airport	Jacksonville	Florida	JAX
// James M. Cox Dayton International Airport	Dayton	Ohio	DAY
// John F. Kennedy International Airport	New York	New York	JFK
// John Glenn Columbus International Airport	Columbus	Ohio	CMH
// John Wayne Airport	Santa Ana	California	SNA
// Joplin Regional Airport	Joplin	Missouri	JLN
// José Aponte de la Torre Airport	Ceiba	Puerto Rico	NRR
// Juneau International Airport	Juneau	Alaska	JNU
// Kahului Airport	Kahului , Maui	Hawaii	OGG
// Kalamazoo/Battle Creek International Airport	Kalamazoo / Battle Creek	Michigan	AZO
// Kansas City International Airport	Kansas City	Missouri	MCI
// Kenai Municipal Airport	Kenai	Alaska	ENA
// Ketchikan International Airport	Ketchikan	Alaska	KTN
// Key West International Airport	Key West	Florida	EYW
// Killeen-Fort Hood Regional Airport / Robert Gray Army Airfield	Fort Hood / Killeen / Temple	Texas	GRK
// King County International Airport	Seattle	Washington	BFI
// King Salmon Airport	King Salmon	Alaska	AKN
// Knox County Regional Airport	Rockland	Maine	RKD
// Kodiak Airport	Kodiak	Alaska	ADQ
// Kona International Airport at Keahole	Kailua-Kona , Hawaii	Hawaii	KOA
// La Crosse Regional Airport	La Crosse	Wisconsin	LSE
// Lafayette Regional Airport	Lafayette	Louisiana	LFT
// LaGuardia Airport	New York	New York	LGA
// Lake Charles Regional Airport	Lake Charles	Louisiana	LCH
// Lake Hood Seaplane Base	Anchorage	Alaska	
// Lanai Airport	Lanai City , Lanai	Hawaii	LNY
// Laredo International Airport	Laredo	Texas	LRD
// Laughlin/Bullhead International Airport	Bullhead City	Arizona	IFP
// Lawton–Fort Sill Regional Airport	Lawton	Oklahoma	LAW
// Lea County Regional Airport	Hobbs	New Mexico	HOB
// Lebanon Municipal Airport	Lebanon	New Hampshire	LEB
// Lehigh Valley International Airport	Allentown	Pennsylvania	ABE
// Lewiston-Nez Perce County Airport	Lewiston	Idaho	LWS
// Lihue Airport	Lihue , Kauai	Hawaii	LIH
// Lincoln Airport	Lincoln	Nebraska	LNK
// Boston Logan International Airport			
// Long Beach Airport	Long Beach	California	LGB
// Long Island MacArthur Airport	Islip	New York	ISP
// Los Angeles International Airport	Los Angeles	California	LAX
// Louis Armstrong New Orleans International Airport	New Orleans	Louisiana	MSY
// Louisville International Airport	Louisville	Kentucky	SDF
// Lubbock Preston Smith International Airport	Lubbock	Texas	LBB
// Luis Muñoz Marín International Airport	San Juan / Carolina	Puerto Rico	SJU
// Lynchburg Regional Airport	Lynchburg	Virginia	LYH
// Magic Valley Regional Airport	Twin Falls	Idaho	TWF
// Mammoth Yosemite Airport	Mammoth Lakes	California	MMH
// Manchester–Boston Regional Airport	Manchester	New Hampshire	MHT
// Manhattan Regional Airport	Manhattan	Kansas	MHK
// Martha's Vineyard Airport	Vineyard Haven	Massachuttces	MVY
// MBS International Airport	Saginaw	Michigan	MBS
// McAllen Miller International Airport	McAllen	Texas	MFE
// McCarran International Airport	Las Vegas	Nevada	LAS
// McClellan–Palomar Airport	Carlsbad	California	CRQ
// McGhee Tyson Airport	Knoxville	Tennessee	TYS
// Meadows Field	Bakersfield	California	BFL
// Melbourne International Airport	Melbourne	Florida	MLB
// Memphis International Airport	Memphis	Tennessee	MEM
// Mercedita International Airport	Ponce	Puerto Rico	PSE
// Merle K. Smith Airport	Cordova	Alaska	CDV
// Merrill Field	Anchorage	Alaska	MRI
// Miami International Airport	Miami	Florida	MIA
// MidAmerica St. Louis Airport / Scott Air Force Base	Belleville	Illinois	BLV
// Midland International Airport	Midland	Texas	MAF
// Minneapolis–St. Paul International Airport	Minneapolis	Minniesota	MSP
// Minot International Airport	Minot	North Dakota	MOT
// Missoula International Airport	Missoula	Montana	MSO
// Mobile Regional Airport	Mobile	Alabama	MOB
// Molokai Airport	Kaunakakai , Molokai	Hawaii	MKK
// Monroe Regional Airport	Monroe	Louisiana	MLU
// Monterey Regional Airport	Monterey	California	MRY
// Montgomery Regional Airport	Montgomery	Alabama	MGM
// Montrose Regional Airport	Montrose	Colorado	MTJ
// Morgantown Municipal Airport	Morgantown	West Virginia	MGW
// Muskegon County Airport	Muskegon	Michigan	MKG
// Myrtle Beach International Airport	Myrtle Beach	South Carolina	MYR
// Nantucket Memorial Airport	Nantucket	Massachuttces	ACK
// Nashville International Airport	Nashville	Tennessee	BNA
// Newark Liberty International Airport	Newark	New Jersey	EWR
// Newport News/Williamsburg International Airport	Newport News	Virginia	PHF
// Niagara Falls International Airport	Niagara Falls	New York	IAG
// Nome Airport	Nome	Alaska	OME
// Norfolk International Airport	Norfolk	Virginia	ORF
// Norman Y. Mineta San José International Airport	San Jose	California	SJC
// North Central West Virginia Airport	Clarksburg	West Virginia	CKB
// North Las Vegas Airport	Las Vegas / North Las Vegas	Nevada	VGT
// Northeast Florida Regional Airport	St. Augustine	Florida	UST
// Northern Maine Regional Airport at Presque Isle	Presque Isle	Maine	PQI
// Northwest Arkansas Regional Airport	Fayetteville	Arkansas	XNA
// Northwest Florida Beaches International Airport	Panama City Beach	Florida	ECP
// Oakland International Airport	Oakland	California	OAK
// Ogden-Hinckley Airport	Ogden	Utah	OGD
// Ontario International Airport	Ontario	California	ONT
// Orlando International Airport	Orlando	Florida	MCO
// Orlando Sanford International Airport	Orlando / Sanford	Florida	SFB
// Owensboro-Daviess County Regional Airport	Owensboro	Kentucky	OWB
// Page Municipal Airport	Page	Arizona	PGA
// Palm Beach International Airport	West Palm Beach	Florida	PBI
// Palm Springs International Airport	Palm Springs	California	PSP
// Pangborn Memorial Airport	Wenatchee	Washington	EAT
// Pellston Regional Airport of Emmet County	Pellston	Michigan	PLN
// Pensacola International Airport	Pensacola	Florida	PNS
// Petersburg James A. Johnson Airport	Petersburg	Alaska	PSG
// Philadelphia International Airport	Philadelphia	Pennsylvania	PHL
// Phoenix Sky Harbor International Airport	Phoenix	Arizona	PHX
// Phoenix–Mesa Gateway Airport	Mesa	Arizona	AZA
// Piedmont Triad International Airport	Greensboro	North Carolina	GSO
// Pitt-Greenville Airport	Greenville	North Carolina	PGV
// Pittsburgh International Airport	Pittsburgh	Pennsylvania	PIT
// Plattsburgh International Airport	Plattsburgh	New York	PBG
// Pocatello Regional Airport	Pocatello / Arbon Valley	Idaho	PIH
// Portland International Airport	Portland	Oregon	PDX
// Portland International Jetport	Portland	Maine	PWM
// Portsmouth International Airport at Pease	Portsmouth	New Hampshire	PSM
// Provincetown Municipal Airport	Provincetown	Massachuttces	PVC
// Provo Municipal Airport	Provo	Utah	PVU
// Pullman/Moscow Regional Airport	Pullman / Moscow, Idaho	Washington	PUW
// Punta Gorda Airport	Punta Gorda	Florida	PGD
// Quad City International Airport	Moline	Illinois	MLI
// Quincy Regional Airport	Quincy	Illinois	UIN
// Rafael Hernández International Airport	Aguadilla	Puerto Rico	BQN
// Raleigh-Durham International Airport	Raleigh	North Carolina	RDU
// Ralph Wien Memorial Airport	Kotzebue	Alaska	OTZ
// Range Regional Airport	Hibbing	Minniesota	HIB
// Rapid City Regional Airport	Rapid City	South Dakota	RAP
// Redding Municipal Airport	Redding	California	RDD
// Redmond Municipal Airport	Redmond	Oregon	RDM
// Reno/Tahoe International Airport	Reno	Nevada	RNO
// Republic Airport	Farmingdale	New York	FRG
// Rhinelander-Oneida County Airport	Rhinelander	Wisconsin	RHI
// Richmond International Airport	Richmond	Virginia	RIC
// Rick Husband Amarillo International Airport	Amarillo	Texas	AMA
// Rickenbacker International Airport	Columbus	Ohio	LCK
// Riverton Regional Airport	Riverton	Wyoming	RIW
// Roanoke Regional Airport	Roanoke	Virginia	ROA
// Rochester International Airport	Rochester	Minniesota	RST
// Rogue Valley International-Medford Airport	Medford	Oregon	MFR
// Ronald Reagan Washington National Airport	Washington, D.C. / Arlington County	Virginia	DCA
// Roswell International Air Center	Roswell	New Mexico	ROW
// Sacramento International Airport	Sacramento	California	SMF
// Salisbury-Ocean City Wicomico Regional Airport	Salisbury	Maryland	SBY
// Salt Lake City International Airport	Salt Lake City	Utah	SLC
// San Angelo Regional Airport	San Angelo	Texas	SJT
// San Antonio International Airport	San Antonio	Texas	SAT
// San Diego International Airport	San Diego	California	SAN
// San Francisco International Airport	San Francisco	California	SFO
// San Luis Obispo County Regional Airport	San Luis Obispo	California	SBP
// Santa Barbara Municipal Airport	Santa Barbara	California	SBA
// Santa Fe Regional Airport	Santa Fe	New Mexico	SAF
// Santa Maria Public Airport	Santa Maria	California	SMX
// Sarasota–Bradenton International Airport	Sarasota / Bradenton	Florida	SRQ
// Savannah/Hilton Head International Airport	Savannah	Georgia	SAV
// Sawyer International Airport	Marquette / Gwinn	Michigan	MQT
// Seattle–Tacoma International Airport	Seattle / Tacoma ( SeaTac )	Washington	SEA
// Sheridan County Airport	Sheridan	Wyoming	SHR
// Shreveport Regional Airport	Shreveport	Louisiana	SHV
// Sidney–Richland Municipal Airport	Sidney	Montana	SDY
// Sioux Falls Regional Airport	Sioux Falls	South Dakota	FSD
// Sioux Gateway Airport	Sioux City	Iowa	SUX
// Sitka Rocky Gutierrez Airport	Sitka	Alaska	SIT
// Sloulin Field International Airport	Williston	North Dakota	ISN
// South Bend International Airport	South Bend	Indiana	SBN
// Southwest Florida International Airport	Fort Myers	Florida	RSW
// Southwest Georgia Regional Airport	Albany	Georgia	ABY
// Southwest Oregon Regional Airport	North Bend	Oregon	OTH
// Southwest Wyoming Regional Airport	Rock Springs	Wyoming	RKS
// Spokane International Airport	Spokane	Washington	GEG
// Springfield-Branson National Airport	Springfield	Missouri	SGF
// St. Cloud Regional Airport	St. Cloud	Minniesota	STC
// St. George Regional Airport	St. George	Utah	SGU
// St. Louis Lambert International Airport	St. Louis	Missouri	STL
// St. Mary's Airport	St. Mary's	Alaska	KSM
// St. Pete–Clearwater International Airport	St. Petersburg / Clearwater	Florida	PIE
// Stewart International Airport	Newburgh	New York	SWF
// Stockton Metropolitan Airport	Stockton	California	SCK
// Syracuse Hancock International Airport	Syracuse	New York	SYR
// Tallahassee International Airport	Tallahassee	Florida	TLH
// Tampa International Airport	Tampa	Florida	TPA
// Ted Stevens Anchorage International Airport	Anchorage	Alaska	ANC
// Texarkana Regional Airport	Texarkana	Arkansas	TXK
// The Eastern Iowa Airport	Cedar Rapids	Iowa	CID
// Theodore Francis Green State Airport	Providence / Warwick	Rhode Island	PVD
// Toledo Express Airport	Toledo	Ohio	TOL
// Topeka Regional Airport	Topeka	Kansas	FOE
// Trenton Mercer Airport	Trenton	New Jersey	TTN
// Tri-Cities Airport	Pasco	Washington	PSC
// Tri-Cities Regional Airport	Bristol / Johnson City / Kingsport	Tennessee	TRI
// Tri-State Airport	Huntington	West Virginia	HTS
// Tucson International Airport	Tucson	Arizona	TUS
// Tulsa International Airport	Tulsa	Oklahoma	TUL
// Tweed New Haven Regional Airport	New Haven	Connecticut	HVN
// Tyler Pounds Regional Airport	Tyler	Texas	TYR
// Unalakleet Airport	Unalakleet	Alaska	UNK
// Unalaska Airport	Unalaska	Alaska	DUT
// University of Illinois - Willard Airport	Champaign / Urbana	Illinois	CMI
// University Park Airport	State College	Pennsylvania	SCE
// Valdez Airport	Valdez	Alaska	VDZ
// Valdosta Regional Airport	Valdosta	Georgia	VLD
// Valley International Airport	Harlingen	Texas	HRL
// Waco Regional Airport	Waco	Texas	ACT
// Walla Walla Regional Airport	Walla Walla	Washington	ALW
// Washington Dulles International Airport	Washington, D.C. / Dulles / Chantilly	Virginia	IAD
// Waterloo Regional Airport	Waterloo	Iowa	ALO
// Watertown International Airport	Watertown	New York	ART
// Westchester County Airport	White Plains	New York	HPN
// Westerly State Airport	Westerly	Rhode Island	WST
// Wichita Dwight D. Eisenhower National Airport	Wichita	Kansas	ICT
// Wichita Falls Municipal Airport / Sheppard Air Force Base	Wichita Falls	Texas	SPS
// Wiley Post–Will Rogers Memorial Airport	Barrow	Alaska	BRW
// Wilkes-Barre/Scranton International Airport	Wilkes-Barre / Scranton	Pennsylvania	AVP
// Will Rogers World Airport	Oklahoma City	Oklahoma	OKC
// William P. Hobby Airport	Houston	Texas	HOU
// William R. Fairchild International Airport	Port Angeles	Washington	CLM
// Williamson County Regional Airport	Marion	Illinois	MWA
// Williamsport Regional Airport	Williamsport	Pennsylvania	IPT
// Wilmington Airport	Wilmington	Delaware	ILG
// Wilmington International Airport	Wilmington	North Carolina	ILM
// Worcester Regional Airport	Worcester	Massachuttces	ORH
// Wrangell Airport	Wrangell	Alaska	WRG
// Yakima Air Terminal	Yakima	Washington	YKM
// Yakutat Airport	Yakutat	Alaska	YAK
// Yampa Valley Airport	Hayden	Colorado	HDN
// Yeager Airport	Charleston	West Virginia	CRW
// Yellowstone Regional Airport	Cody	Wyoming	COD
// Youngstown-Warren Regional Airport	Youngstown / Warren	Ohio	YNG
// `Yuma International Airport;Yuma;Arizona;YUM`
// ];
