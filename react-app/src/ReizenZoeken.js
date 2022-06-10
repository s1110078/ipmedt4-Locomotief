import React from "react";
import "./ReizenZoeken.css";

import axios from "axios";
import { connect } from "react-redux";
import { changeSearchTermVanStation, changeSearchTermNaarStation } from "./actions";
import ReisZoekResultaten from "./ReisZoekResultaten";
import ReactAutocomplete from "react-autocomplete";

// Lijst van stations in het formaat voor autocomplete
const alleStations = [{'id': 'AC', 'label': 'Abcoude'}, {'id': 'ADH', 'label': 'Leeuwarden Achter de Hoven'}, {'id': 'AH', 'label': 'Arnhem'}, {'id': 'AHP', 'label': 'Arnhem Velperpoort'}, {'id': 'AHPR', 'label': 'Arnhem Presikhaaf'}, {'id': 'AHZ', 'label': 'Arnhem Zuid'}, {'id': 'AKL', 'label': 'Arkel'}, {'id': 'AKM', 'label': 'Akkrum'}, {'id': 'ALM', 'label': 'Almere Centrum'}, {'id': 'ALMB', 'label': 'Almere Buiten'}, {'id': 'ALMM', 'label': 'Almere Muziekwijk'}, {'id': 'ALMO', 'label': 'Almere Oostvaarders'}, {'id': 'ALMP', 'label': 'Almere Parkwijk'}, {'id': 'AMF', 'label': 'Amersfoort'}, {'id': 'AMFS', 'label': 'Amersfoort Schothorst'}, {'id': 'AML', 'label': 'Almelo'}, {'id': 'AMPO', 'label': 'Almere Poort'}, {'id': 'AMR', 'label': 'Alkmaar'}, {'id': 'AMRI', 'label': 'Almelo De Riet'}, {'id': 'AMRN', 'label': 'Alkmaar Noord'}, {'id': 'ANA', 'label': 'Anna Paulowna'}, {'id': 'APD', 'label': 'Apeldoorn'}, {'id': 'APDM', 'label': 'Apeldoorn De Maten'}, {'id': 'APDO', 'label': 'Apeldoorn Osseveld'}, {'id': 'APG', 'label': 'Appingedam'}, {'id': 'APN', 'label': 'Alphen aan den Rijn'}, {'id': 'ARN', 'label': 'Arnemuiden'}, {'id': 'ASA', 'label': 'Amsterdam Amstel'}, {'id': 'ASB', 'label': 'Amsterdam Bijlmer ArenA'}, {'id': 'ASD', 'label': 'Amsterdam Centraal'}, {'id': 'ASDL', 'label': 'Amsterdam Lelylaan'}, {'id': 'ASDM', 'label': 'Amsterdam Muiderpoort'}, {'id': 'ASDZ', 'label': 'Amsterdam Zuid'}, {'id': 'ASHD', 'label': 'Amsterdam Holendrecht'}, {'id': 'ASN', 'label': 'Assen'}, {'id': 'ASS', 'label': 'Amsterdam Sloterdijk'}, {'id': 'ASSP', 'label': 'Amsterdam Science Park'}, {'id': 'ATN', 'label': 'Aalten'}, {'id': 'AVAT', 'label': 'Amersfoort Vathorst'}, {'id': 'BD', 'label': 'Breda'}, {'id': 'BDE', 'label': 'Bunde'}, {'id': 'BDG', 'label': 'Bodegraven'}, {'id': 'BDM', 'label': 'Bedum'}, {'id': 'BDPB', 'label': 'Breda-Prinsenbeek'}, {'id': 'BET', 'label': 'Best'}, {'id': 'BF', 'label': 'Baflo'}, {'id': 'BGN', 'label': 'Bergen op Zoom'}, {'id': 'BHDV', 'label': 'Boven Hardinxveld'}, {'id': 'BHV', 'label': 'Bilthoven'}, {'id': 'BK', 'label': 'Beek-Elsloo'}, {'id': 'BKF', 'label': 'Bovenkarspel Flora'}, {'id': 'BKG', 'label': 'Bovenkarspel-Grootebroek'}, {'id': 'BKL', 'label': 'Breukelen'}, {'id': 'BL', 'label': 'Beilen'}, {'id': 'BLL', 'label': 'Bloemendaal'}, {'id': 'BMN', 'label': 'Brummen'}, {'id': 'BMR', 'label': 'Boxmeer'}, {'id': 'BN', 'label': 'Borne'}, {'id': 'BNC', 'label': 'Barneveld Centrum'}, {'id': 'BNK', 'label': 'Bunnik'}, {'id': 'BNN', 'label': 'Barneveld Noord'}, {'id': 'BNZ; 2015', 'label': 'Barneveld Zuid'}, {'id': 'BP', 'label': 'Buitenpost'}, {'id': 'BR', 'label': 'Blerick'}, {'id': 'BRD', 'label': 'Barendrecht'}, {'id': 'BRN', 'label': 'Baarn'}, {'id': 'BSD', 'label': 'Beesd'}, {'id': 'BSK', 'label': 'Boskoop'}, {'id': 'BSMZ', 'label': 'Bussum Zuid'}, {'id': 'BTL', 'label': 'Boxtel'}, {'id': 'BV', 'label': 'Beverwijk'}, {'id': 'BZL', 'label': 'Kapelle-Biezelinge'}, {'id': 'BZM', 'label': 'Hardinxveld Blauwe Zoom'}, {'id': 'CAS', 'label': 'Castricum'}, {'id': 'CK', 'label': 'Cuijk'}, {'id': 'CL', 'label': 'Culemborg'}, {'id': 'CO', 'label': 'Coevorden'}, {'id': 'CPS', 'label': 'Capelle Schollevaar'}, {'id': 'CVM', 'label': 'Chevremont'}, {'id': 'DA', 'label': 'Daarlerveen'}, {'id': 'DB', 'label': 'Driebergen-Zeist'}, {'id': 'DDN', 'label': 'Delden'}, {'id': 'DDR', 'label': 'Dordrecht'}, {'id': 'DDRS', 'label': 'Dordrecht Stadspolders'}, {'id': 'DDZD', 'label': 'Dordrecht Zuid'}, {'id': 'DEI', 'label': 'Deinum'}, {'id': 'DID', 'label': 'Didam'}, {'id': 'DL', 'label': 'Dalfsen'}, {'id': 'DLD', 'label': 'Den Dolder'}, {'id': 'DLN', 'label': 'Dalen'}, {'id': 'DMN', 'label': 'Diemen'}, {'id': 'DMNZ', 'label': 'Diemen Zuid'}, {'id': 'DN', 'label': 'Deurne'}, {'id': 'DR', 'label': 'Dieren'}, {'id': 'DRH', 'label': 'Driehuis'}, {'id': 'DRON', 'label': 'Dronten'}, {'id': 'DRP', 'label': 'Dronrijp'}, {'id': 'DT', 'label': 'Delft'}, {'id': 'DTC', 'label': 'Doetinchem'}, {'id': 'DTCH', 'label': 'Doetinchem De Huet'}, {'id': 'DTZ', 'label': 'Delft Zuid'}, {'id': 'DV', 'label': 'Deventer'}, {'id': 'DVC', 'label': 'Deventer Colmschate'}, {'id': 'DVD', 'label': 'Duivendrecht'}, {'id': 'DVN', 'label': 'Duiven'}, {'id': 'DVNK', 'label': 'De Vink'}, {'id': 'DZ', 'label': 'Delfzijl'}, {'id': 'DZW', 'label': 'Delfzijl West'}, {'id': 'EC', 'label': 'Echt'}, {'id': 'ED', 'label': 'Ede-Wageningen'}, {'id': 'EDC', 'label': 'Ede Centrum'}, {'id': 'EDN', 'label': 'Eijsden'}, {'id': 'EGH', 'label': 'Eygelshoven'}, {'id': 'EGHM', 'label': 'Eygelshoven Markt'}, {'id': 'EHB', 'label': 'Eindhoven Beukenlaan'}, {'id': 'EHV', 'label': 'Eindhoven'}, {'id': 'EKZ', 'label': 'Enkhuizen'}, {'id': 'EML', 'label': 'Ermelo'}, {'id': 'EMN', 'label': 'Emmen'}, {'id': 'EMNZ', 'label': 'Emmen Zuid'}, {'id': 'ES', 'label': 'Enschede'}, {'id': 'ESD', 'label': 'Enschede Drienerlo'}, {'id': 'ESE', 'label': 'Enschede De Eschmarke'}, {'id': 'EST', 'label': 'Elst'}, {'id': 'ETN', 'label': 'Etten-Leur'}, {'id': 'FN', 'label': 'Franeker'}, {'id': 'GBG', 'label': 'Gramsbergen'}, {'id': 'GBR', 'label': 'Glanerbrug'}, {'id': 'GD', 'label': 'Gouda'}, {'id': 'GDG', 'label': 'Gouda Goverwelle'}, {'id': 'GDK', 'label': 'Geerdijk'}, {'id': 'GDM', 'label': 'Geldermalsen'}, {'id': 'GDR', 'label': 'Gaanderen'}, {'id': 'GERP', 'label': 'Groningen Europapark'}, {'id': 'GK', 'label': 'Grijpskerk'}, {'id': 'GLN', 'label': 'Geleen Oost'}, {'id': 'GN', 'label': 'Groningen'}, {'id': 'GND', 'label': 'Hardinxveld-Giessendam'}, {'id': 'GNN', 'label': 'Groningen Noord'}, {'id': 'GO', 'label': 'Goor'}, {'id': 'GP', 'label': 'Geldrop'}, {'id': 'GR', 'label': 'Gorinchem'}, {'id': 'GS', 'label': 'Goes'}, {'id': 'GV', 'label': 'Den Haag HS'}, {'id': 'GVC', 'label': 'Den Haag Centraal'}, {'id': 'GVM', 'label': 'Den Haag Mariahoeve'}, {'id': 'GVMW', 'label': 'Den Haag Moerwijk'}, {'id': 'GW', 'label': 'Grou-Jirnsum'}, {'id': 'GZ', 'label': 'Gilze-Rijen'}, {'id': 'HAD', 'label': 'Heemstede-Aerdenhout'}, {'id': 'HB', 'label': 'Hoensbroek'}, {'id': 'HD', 'label': 'Harderwijk'}, {'id': 'HDB', 'label': 'Hardenberg'}, {'id': 'HDE', 'label': "'t Harde"}, {'id': 'HDG', 'label': 'Hurdegaryp'}, {'id': 'HDR', 'label': 'Den Helder'}, {'id': 'HDRZ', 'label': 'Den Helder Zuid'}, {'id': 'HFD', 'label': 'Hoofddorp'}, {'id': 'HGL', 'label': 'Hengelo'}, {'id': 'HGLG', 'label': 'Hengelo Gezondheidspark'}, {'id': 'HGLO', 'label': 'Hengelo Oost'}, {'id': 'HGV', 'label': 'Hoogeveen'}, {'id': 'HGZ', 'label': 'Hoogezand-Sappemeer'}, {'id': 'HIL', 'label': 'Hillegom'}, {'id': 'HK', 'label': 'Heemskerk'}, {'id': 'HKS', 'label': 'Hoogkarspel'}, {'id': 'HLD', 'label': 'Hoek van Holland Haven'}, {'id': 'HLDS', 'label': 'Hoek van Holland Strand'}, {'id': 'HLG', 'label': 'Harlingen'}, {'id': 'HLGH', 'label': 'Harlingen Haven'}, {'id': 'HLM', 'label': 'Haarlem'}, {'id': 'HLMS', 'label': 'Haarlem Spaarnwoude'}, {'id': 'HLO', 'label': 'Heiloo'}, {'id': 'HM', 'label': 'Helmond'}, {'id': 'HMBH', 'label': 'Helmond Brouwhuis'}, {'id': 'HMBV', 'label': 'Helmond Brandevoort'}, {'id': 'HMH', 'label': "Helmond 't Hout"}, {'id': 'HMN', 'label': 'Hemmen-Dodewaard'}, {'id': 'HN', 'label': 'Hoorn'}, {'id': 'HNK', 'label': 'Hoorn Kersenboogerd'}, {'id': 'HNO', 'label': 'Heino'}, {'id': 'HNP', 'label': 'Hindeloopen'}, {'id': 'HON', 'label': 'Holten'}, {'id': 'HOR', 'label': 'Hollandsche Rading'}, {'id': 'HR', 'label': 'Heerenveen'}, {'id': 'HRL', 'label': 'Heerlen'}, {'id': 'HRLK', 'label': 'Heerlen De Kissel'}, {'id': 'HRLW', 'label': 'Heerlen Woonboulevard'}, {'id': 'HRN', 'label': 'Haren'}, {'id': 'HRT', 'label': 'Horst-Sevenum'}, {'id': 'HT', 'label': "'s-Hertogenbosch"}, {'id': 'HTN', 'label': 'Houten'}, {'id': 'HTNC', 'label': 'Houten Castellum'}, {'id': 'HTO', 'label': "'s-Hertogenbosch Oost"}, {'id': 'HVL', 'label': 'Hoevelaken'}, {'id': 'HVS', 'label': 'Hilversum'}, {'id': 'HVSM', 'label': 'Hilversum Media Park'}, {'id': 'HVSP', 'label': 'Hilversum Sportpark'}, {'id': 'HWD', 'label': 'Heerhugowaard'}, {'id': 'HWZB', 'label': 'Halfweg-Zwanenburg'}, {'id': 'HZE', 'label': 'Heeze'}, {'id': 'IJT', 'label': 'IJlst'}, {'id': 'KBD', 'label': 'Krabbendijke'}, {'id': 'KBK', 'label': 'Klarenbeek'}, {'id': 'KBW', 'label': 'Koog Bloemwijk'}, {'id': 'KLP', 'label': 'Veenendaal-De Klomp'}, {'id': 'KMA', 'label': 'Krommenie-Assendelft'}, {'id': 'KMR', 'label': 'Klimmen-Ransdaal'}, {'id': 'KMW', 'label': 'Koudum-Molkwerum'}, {'id': 'KPN', 'label': 'Kampen'}, {'id': 'KPNZ', 'label': 'Kampen Zuid'}, {'id': 'KRD', 'label': 'Kerkrade Centrum'}, {'id': 'KRG', 'label': 'Kruiningen-Yerseke'}, {'id': 'KTR', 'label': 'Kesteren'}, {'id': 'KW', 'label': 'Kropswolde'}, {'id': 'KZD', 'label': 'Koog-Zaandijk'}, {'id': 'LAA', 'label': 'Den Haag Laan v NOI'}, {'id': 'LC', 'label': 'Lochem'}, {'id': 'LDL', 'label': 'Leiden Lammenschans'}, {'id': 'LDM', 'label': 'Leerdam'}, {'id': 'LEDN', 'label': 'Leiden Centraal'}, {'id': 'LG', 'label': 'Landgraaf'}, {'id': 'LLS', 'label': 'Lelystad Centrum'}, {'id': 'LP', 'label': 'Loppersum'}, {'id': 'LTN', 'label': 'Lunteren'}, {'id': 'LTV', 'label': 'Lichtenvoorde-Groenlo'}, {'id': 'LUT', 'label': 'Geleen-Lutterade'}, {'id': 'LW', 'label': 'Leeuwarden'}, {'id': 'LWC', 'label': 'Leeuwarden Camminghaburen'}, {'id': 'MAS', 'label': 'Maarssen'}, {'id': 'MDB', 'label': 'Middelburg'}, {'id': 'MES', 'label': 'Meerssen'}, {'id': 'MG', 'label': 'Mantgum'}, {'id': 'MMLH', 'label': 'Mook Molenhoek'}, {'id': 'MP', 'label': 'Meppel'}, {'id': 'MRB', 'label': 'Mariënberg'}, {'id': 'MRN', 'label': 'Maarn'}, {'id': 'MSS', 'label': 'Maassluis'}, {'id': 'MSW', 'label': 'Maassluis West'}, {'id': 'MT', 'label': 'Maastricht'}, {'id': 'MTH', 'label': 'Martenshoek'}, {'id': 'MTN', 'label': 'Maastricht Noord'}, {'id': 'MTR', 'label': 'Maastricht Randwyck'}, {'id': 'MZ', 'label': 'Maarheeze'}, {'id': 'NA', 'label': 'Nieuw Amsterdam'}, {'id': 'NDB', 'label': 'Naarden-Bussum'}, {'id': 'NH', 'label': 'Nuth'}, {'id': 'NKK', 'label': 'Nijkerk'}, {'id': 'NM', 'label': 'Nijmegen'}, {'id': 'NMD', 'label': 'Nijmegen Dukenburg'}, {'id': 'NMH', 'label': 'Nijmegen Heyendaal'}, {'id': 'NML', 'label': 'Nijmegen Lent'}, {'id': 'NS', 'label': 'Nunspeet'}, {'id': 'NSCH', 'label': 'Bad Nieuweschans'}, {'id': 'NVD', 'label': 'Nijverdal'}, {'id': 'NVP', 'label': 'Nieuw Vennep'}, {'id': 'NWK', 'label': 'Nieuwerkerk a/d IJssel'}, {'id': 'NWL', 'label': 'Schiedam Nieuwland'}, {'id': 'O', 'label': 'Oss'}, {'id': 'OBD', 'label': 'Obdam'}, {'id': 'ODB', 'label': 'Oudenbosch'}, {'id': 'ODZ', 'label': 'Oldenzaal'}, {'id': 'OMN', 'label': 'Ommen'}, {'id': 'OP', 'label': 'Opheusden'}, {'id': 'OST', 'label': 'Olst'}, {'id': 'OT', 'label': 'Oisterwijk'}, {'id': 'OTB', 'label': 'Oosterbeek'}, {'id': 'OVN', 'label': 'Overveen'}, {'id': 'OW', 'label': 'Oss West'}, {'id': 'PMO', 'label': 'Purmerend Overwhere'}, {'id': 'PMR', 'label': 'Purmerend'}, {'id': 'PMW', 'label': 'Purmerend Weidevenne'}, {'id': 'PT', 'label': 'Putten'}, {'id': 'RAI', 'label': 'Amsterdam RAI'}, {'id': 'RAT', 'label': 'Raalte'}, {'id': 'RB', 'label': 'Rilland-Bath'}, {'id': 'RD', 'label': 'Roodeschool'}, {'id': 'RH', 'label': 'Rheden'}, {'id': 'RHN', 'label': 'Rhenen'}, {'id': 'RL', 'label': 'Ruurlo'}, {'id': 'RLB', 'label': 'Rotterdam Lombardijen'}, {'id': 'RM', 'label': 'Roermond'}, {'id': 'RS', 'label': 'Rosmalen'}, {'id': 'RSD', 'label': 'Roosendaal'}, {'id': 'RSN', 'label': 'Rijssen'}, {'id': 'RSW', 'label': 'Rijswijk'}, {'id': 'RTA', 'label': 'Rotterdam Alexander'}, {'id': 'RTB', 'label': 'Rotterdam Blaak'}, {'id': 'RTD', 'label': 'Rotterdam Centraal'}, {'id': 'RTN', 'label': 'Rotterdam Noord'}, {'id': 'RTZ', 'label': 'Rotterdam Zuid'}, {'id': 'RV', 'label': 'Reuver'}, {'id': 'RVS', 'label': 'Ravenstein'}, {'id': 'SBK', 'label': 'Spaubeek'}, {'id': 'SD', 'label': 'Soestdijk'}, {'id': 'SDA', 'label': 'Scheemda'}, {'id': 'SDM', 'label': 'Schiedam Centrum'}, {'id': 'SDT', 'label': 'Sliedrecht'}, {'id': 'SDTB', 'label': 'Sliedrecht Baanhoek'}, {'id': 'SGL', 'label': 'Houthem-Sint Gerlach'}, {'id': 'SGN', 'label': 'Schagen'}, {'id': 'SHL', 'label': 'Schiphol'}, {'id': 'SK', 'label': 'Sneek'}, {'id': 'SKND', 'label': 'Sneek Noord'}, {'id': 'SM', 'label': 'Swalmen'}, {'id': 'SN', 'label': 'Schinnen'}, {'id': 'SOG', 'label': 'Schin op Geul'}, {'id': 'SPM', 'label': 'Sappemeer Oost'}, {'id': 'SPTN', 'label': 'Santpoort Noord'}, {'id': 'SPTZ', 'label': 'Santpoort Zuid'}, {'id': 'SRN', 'label': 'Susteren'}, {'id': 'SSH', 'label': 'Sassenheim'}, {'id': 'ST', 'label': 'Soest'}, {'id': 'STD', 'label': 'Sittard'}, {'id': 'STM', 'label': 'Stedum'}, {'id': 'STV', 'label': 'Stavoren'}, {'id': 'STZ', 'label': 'Soest Zuid'}, {'id': 'SWD', 'label': 'Sauwerd'}, {'id': 'SWK', 'label': 'Steenwijk'}, {'id': 'TB', 'label': 'Tilburg'}, {'id': 'TBG', 'label': 'Terborg'}, {'id': 'TBR', 'label': 'Tilburg Reeshof'}, {'id': 'TBU', 'label': 'Tilburg Universiteit'}, {'id': 'TG', 'label': 'Tegelen'}, {'id': 'TL', 'label': 'Tiel'}, {'id': 'TPSW', 'label': 'Tiel Passewaaij'}, {'id': 'TWL', 'label': 'Twello'}, {'id': 'UHM', 'label': 'Uithuizermeeden'}, {'id': 'UHZ', 'label': 'Uithuizen'}, {'id': 'UST', 'label': 'Usquert'}, {'id': 'UT', 'label': 'Utrecht Centraal'}, {'id': 'UTG', 'label': 'Uitgeest'}, {'id': 'UTL', 'label': 'Utrecht Lunetten'}, {'id': 'UTLR', 'label': 'Utrecht Leidsche Rijn'}, {'id': 'UTM', 'label': 'Utrecht Maliebaan'}, {'id': 'UTO', 'label': 'Utrecht Overvecht'}, {'id': 'UTT', 'label': 'Utrecht Terwijde'}, {'id': 'UTZL', 'label': 'Utrecht Zuilen'}, {'id': 'VB', 'label': 'Voorburg'}, {'id': 'VD', 'label': 'Vorden'}, {'id': 'VDG', 'label': 'Vlaardingen Centrum'}, {'id': 'VDL', 'label': 'Voerendaal'}, {'id': 'VDM', 'label': 'Veendam'}, {'id': 'VDO', 'label': 'Vlaardingen Oost'}, {'id': 'VDW', 'label': 'Vlaardingen West'}, {'id': 'VEM', 'label': 'Voorst-Empe'}, {'id': 'VG', 'label': 'Vught'}, {'id': 'VH', 'label': 'Voorhout'}, {'id': 'VHP', 'label': 'Vroomshoop'}, {'id': 'VK', 'label': 'Valkenburg'}, {'id': 'VL', 'label': 'Venlo'}, {'id': 'VLB', 'label': 'Vierlingsbeek'}, {'id': 'VNDC', 'label': 'Veenendaal Centrum'}, {'id': 'VNDW', 'label': 'Veenendaal West'}, {'id': 'VP', 'label': 'Velp'}, {'id': 'VRY', 'label': 'Venray'}, {'id': 'VS', 'label': 'Vlissingen'}, {'id': 'VSS', 'label': 'Vlissingen Souburg'}, {'id': 'VST', 'label': 'Voorschoten'}, {'id': 'VSV', 'label': 'Varsseveld'}, {'id': 'VTN', 'label': 'Vleuten'}, {'id': 'VWD', 'label': 'Veenwouden'}, {'id': 'VZ', 'label': 'Vriezenveen'}, {'id': 'WAD', 'label': 'Waddinxveen'}, {'id': 'WADN', 'label': 'Waddinxveen Noord'}, {'id': 'WC', 'label': 'Wijchen'}, {'id': 'WD', 'label': 'Woerden'}, {'id': 'WDN', 'label': 'Wierden'}, {'id': 'WF', 'label': 'Wolfheze'}, {'id': 'WFM', 'label': 'Warffum'}, {'id': 'WH', 'label': 'Wijhe'}, {'id': 'WK', 'label': 'Workum'}, {'id': 'WL', 'label': 'Wehl'}, {'id': 'WM', 'label': 'Wormerveer'}, {'id': 'WP', 'label': 'Weesp'}, {'id': 'WS', 'label': 'Winschoten'}, {'id': 'WSM', 'label': 'Winsum'}, {'id': 'WT', 'label': 'Weert'}, {'id': 'WTV', 'label': 'Westervoort'}, {'id': 'WV', 'label': 'Wolvega'}, {'id': 'WW', 'label': 'Winterswijk'}, {'id': 'WWW', 'label': 'Winterswijk West'}, {'id': 'WZ', 'label': 'Wezep'}, {'id': 'YPB', 'label': 'Den Haag Ypenburg'}, {'id': 'ZA', 'label': 'Zetten-Andelst'}, {'id': 'ZB', 'label': 'Zuidbroek'}, {'id': 'ZBM', 'label': 'Zaltbommel'}, {'id': 'ZD', 'label': 'Zaandam'}, {'id': 'ZDK', 'label': 'Zaandam Kogerveld'}, {'id': 'ZH', 'label': 'Zuidhorn'}, {'id': 'ZL', 'label': 'Zwolle'}, {'id': 'ZLW', 'label': 'Lage Zwaluwe'}, {'id': 'ZP', 'label': 'Zutphen'}, {'id': 'ZTM', 'label': 'Zoetermeer'}, {'id': 'ZTMO', 'label': 'Zoetermeer Oost'}, {'id': 'ZV', 'label': 'Zevenaar'}, {'id': 'ZVB', 'label': 'Zevenbergen'}, {'id': 'ZVT', 'label': 'Zandvoort aan Zee'}, {'id': 'ZWD', 'label': 'Zwijndrecht'}, {'id': 'ZWW', 'label': 'Zwaagwesteinde'}];


class ReizenZoeken extends React.Component {

  //Hele gore manier om 6 resultaten te laten zien
  //Dit moet overduidelijk nog veranderen
  constructor(props) {
    super(props);
    this.state = {
      resultaat1: {reistijd: "tijd", vertrektijd: "tijd", aankomsttijd: "tijd", treinsoort: "trein", treindrukte: "treindrukte"},
      resultaat2: {reistijd: "tijd", vertrektijd: "tijd", aankomsttijd: "tijd", treinsoort: "trein", treindrukte: "treindrukte"},
      resultaat3: {reistijd: "tijd", vertrektijd: "tijd", aankomsttijd: "tijd", treinsoort: "trein", treindrukte: "treindrukte"},
      resultaat4: {reistijd: "tijd", vertrektijd: "tijd", aankomsttijd: "tijd", treinsoort: "trein", treindrukte: "treindrukte"},
      resultaat5: {reistijd: "tijd", vertrektijd: "tijd", aankomsttijd: "tijd", treinsoort: "trein", treindrukte: "treindrukte"},
      resultaat6: {reistijd: "tijd", vertrektijd: "tijd", aankomsttijd: "tijd", treinsoort: "trein", treindrukte: "treindrukte"},
      tijd: "",
      datum: "",
      gezocht: true,
    }
  }

  onSearchVanStation = event => {
    this.props.changeSearchTermVanStation(event.target.value);
  };

  onSearchNaarStation = event => {
    this.props.changeSearchTermNaarStation(event.target.value);
  };

  onChangeTime = e => {
    this.setState({tijd: e.target.value});
    console.log(e.target.value);
  }

  onChangeDate = e => {
    this.setState({datum: e.target.value});
    console.log(e.target.value);
  }

  // de tijd moet alleen geset worden op het moment dat de component ingeladen wordt
  componentDidMount() {
    this.setDefaultDate();
  }

  onSubmit = event => {
    event.preventDefault();

    // laat de loader animatie zien.
    document.querySelector(".loaderAnimation").style.display = "block";

    // Verander de tijd en datum naar dateTime format
    const dateTimeValue = this.state.datum + "T" + this.state.tijd + ":00+02:00";
    const config = {
      headers: {"Ocp-Apim-Subscription-Key": "c45427a6d6e2402ba0aa0be0e95a1e4b"},
      params: {
        "dateTime": dateTimeValue,
        "fromStation": this.props.searchTermVanStation,
        "toStation": this.props.searchTermNaarStation,
      }
    };
    this.makeApiCall(config);
  };

  /* --- berekent tijdsverschil in minuten -> is niet nodig want dan heb je alleen de eerste trein

  tijdsverschil = (vertrektijd, aankomsttijd) => {
    console.log(vertrektijd, String(vertrektijd).slice(2,4), String(vertrektijd).slice(3,5));
    console.log(vertrektijd, String(vertrektijd).slice(2,4), String(vertrektijd).slice(3,5));
    console.log(vertrektijd, String(vertrektijd).slice(2,D), String(vertrektijd).slice(3,5));
    let vertrekMinuten = 60 * parseInt(String(vertrektijd).slice(0,2)) + parseInt(String(vertrektijd).slice(3,5));
    let aankomstMinuten = 60 * parseInt(String(aankomsttijd).slice(0,2)) + parseInt(String(aankomsttijd).slice(3,5));
    let verschil = aankomstMinuten - vertrekMinuten;
    console.log(vertrekMinuten, verschil);
    return(verschil);
  };
  */

  // functie om de aankomsttijd te berekenen
  aankomsttijd = (vertrektijd, tijdsduur) => {
    // reken de tijd om in minuten vanuit het format "hh:mm"
    let vertrekMinuten = 60 * parseInt(String(vertrektijd).slice(0,2)) + parseInt(String(vertrektijd).slice(3,5));
    let aankomstMinuten = vertrekMinuten + tijdsduur;

    // bereken de uren en minuten in losse variabelen
    let uren = Math.floor(aankomstMinuten/60);
    let minuten = aankomstMinuten%60;

    // haal er 24 uur af als de aankomsttijd hierboven is
    uren = uren%24;

    // maak de tijd goed zodat het inputfield en de api hiermee kunnen werken
    let formattedUren = ("0" + uren).slice(-2);
    let formattedMinuten = ("0" + minuten).slice(-2);

    // return het gewenste formaat
    return(formattedUren + ":" + formattedMinuten);
  }

  // functie om de reistijd overzichtelijk te weergeven op het scherm
  duidelijkeReistijd = (minuten) => {
    // bereken de uren en minuten in losse variabelen
    let uren = Math.floor(minuten/60);
    let overigeMinuten = minuten%60;

    // return het gewenste formaat (als er geen uren is moet er ook geen tekst over uren staan)
    if(uren == 0) {
      return(overigeMinuten);
    } else {
      return(uren + " uur en " + overigeMinuten);
    }
  }

  makeApiCall = config => {
    const BASE_URL = "https://gateway.apiportal.ns.nl/public-reisinformatie/api/v3/trips?";
    axios.get(BASE_URL, config).then(res => {
      console.log(res.data.trips); // laat alle gegevens zien van de NS api die zijn opgehaald

      // een loop die alle resultaten bijwerkt met de gegevens uit de NS api
      for (let i = 0; i<res.data.trips.length; i++) {
        this.setState({ ["resultaat"+ (i+1)]: {reistijd: this.duidelijkeReistijd(res.data.trips[i].actualDurationInMinutes),
        vertrektijd: res.data.trips[i].legs[0].origin.plannedDateTime.slice(11, 16),
        treinsoort: res.data.trips[i].legs[0].product.displayName,
        aankomsttijd: this.aankomsttijd(res.data.trips[i].legs[0].origin.plannedDateTime.slice(11, 16), res.data.trips[i].actualDurationInMinutes),
        treindrukte: res.data.trips[i].crowdForecast,
        }})
      }

      // de resultaten worden gepresenteerd en de loader verdwijnt
      document.querySelector(".loaderAnimation").style.display = "none";
      document.querySelector(".reizenResultaten_container").style.display = "block";
    })
    .catch((errors) => {
      console.log("error " + errors);
    });
  };

  // deze functie wordt aangeroepen als de component net is ingeladen
  setDefaultDate = () => {
    // haal de input field op om hier de datum en tijd in te weergeven
    var inputTime = this.refs.time;
    var inputDate = this.refs.date;

    // haal de tijd op van het nu
    var d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes()

    // formatteer de data zodat deze op de goede manier in de state kan
    let formattedMonth = ("0" + month).slice(-2);
    let formattedDay = ("0" + day).slice(-2);
    let formattedHours = ("0" + hours).slice(-2);
    let formattedMinutes = ("0" + minutes).slice(-2);

    // voeg de juiste tijdsdingen samen
    let date = (year + "-" + formattedMonth + "-" + formattedDay);
    let time = (formattedHours + ":" + formattedMinutes);

    //verander de value van het inputfield zodat de gebruiker de tijd kan zien
    inputDate.value = date;
    inputTime.value = time;

    // verander de state zodat de gebruiker ook daadwerkelijk kan zoeken
    this.setState({datum: date, tijd: time});
  }


  render() {
    return (
      <div>
        <div className="nsAchtergrond">
          <div className="ReizenZoeken_container">
            <div className="reisZoekInfo">Zoek hier naar uw reis.</div>
            <form onSubmit={this.onSubmit}>
	      <div className="inputFields">
              <ReactAutocomplete
              inputProps={{ required: true, placeholder: "Van station"}}
              menuStyle={{
                borderRadius: '3px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '2px 0',
                fontSize: '90%',
                position: 'fixed',
                "overflow-y": 'hidden',
                maxHeight: '35.5%',
                maxWidth: '100%'
              }}
              items={ alleStations }
              shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
              getItemValue={item => item.label}
              renderItem={(item, highlighted) =>
                <div
                  key={item.id}
                  style={{ backgroundColor: highlighted ? '#aaa' : '#fff'}}
                >
                  {item.label}
                </div>
              }
              value={this.props.searchTermVanStation}
              onChange={this.onSearchVanStation}
              onSelect={value => this.props.changeSearchTermVanStation(value)}
              />
	      </div>
	      <div className="inputFields">
              <ReactAutocomplete
              inputProps={{ required: true, placeholder: "Naar station"}}
              menuStyle={{
                borderRadius: '3px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '2px 0',
                fontSize: '90%',
                position: 'fixed',
                "overflow-y": 'hidden',
                maxHeight: '35.5%',
              }}
              items={ alleStations }
              shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
              getItemValue={item => item.label}
              renderItem={(item, highlighted) =>
                <div
                  key={item.id}
                  style={{ backgroundColor: highlighted ? '#aaa' : '#fff'}}
                >
                  {item.label}
                </div>
              }
              value={this.props.searchTermNaarStation}
              onChange={this.onSearchNaarStation}
              onSelect={value => this.props.changeSearchTermNaarStation(value)}
              />
	      </div>
              <input className="inputTimes" ref="time" type="time" required onChange={this.onChangeTime}/>
              <input className="inputTimes" ref="date" type="date" required onChange={this.onChangeDate}/>

              <div><button className="zoekButton" type="submit">Zoek reis</button></div>
            </form>
          </div>
        </div>
        <div className="loaderAnimation"></div>
        <div className="reizenResultaten_container">
          <ReisZoekResultaten
          reistijd={this.state.resultaat1.reistijd}
          vertrektijd={this.state.resultaat1.vertrektijd}
          aankomsttijd={this.state.resultaat1.aankomsttijd}
          treinsoort={this.state.resultaat1.treinsoort}
          treindrukte={this.state.resultaat1.treindrukte}
          gezocht={this.state.gezocht}
          />
          <ReisZoekResultaten
          reistijd={this.state.resultaat2.reistijd}
          vertrektijd={this.state.resultaat2.vertrektijd}
          aankomsttijd={this.state.resultaat2.aankomsttijd}
          treinsoort={this.state.resultaat2.treinsoort}
          treindrukte={this.state.resultaat2.treindrukte}
          gezocht={this.state.gezocht}
          />
          <ReisZoekResultaten
          reistijd={this.state.resultaat3.reistijd}
          vertrektijd={this.state.resultaat3.vertrektijd}
          aankomsttijd={this.state.resultaat3.aankomsttijd}
          treinsoort={this.state.resultaat3.treinsoort}
          treindrukte={this.state.resultaat3.treindrukte}
          gezocht={this.state.gezocht}
          />
          <ReisZoekResultaten
          reistijd={this.state.resultaat4.reistijd}
          vertrektijd={this.state.resultaat4.vertrektijd}
          aankomsttijd={this.state.resultaat4.aankomsttijd}
          treinsoort={this.state.resultaat4.treinsoort}
          treindrukte={this.state.resultaat4.treindrukte}
          gezocht={this.state.gezocht}
          />
          <ReisZoekResultaten
          reistijd={this.state.resultaat5.reistijd}
          vertrektijd={this.state.resultaat5.vertrektijd}
          aankomsttijd={this.state.resultaat5.aankomsttijd}
          treinsoort={this.state.resultaat5.treinsoort}
          treindrukte={this.state.resultaat5.treindrukte}
          gezocht={this.state.gezocht}
          />
          <ReisZoekResultaten
          reistijd={this.state.resultaat6.reistijd}
          vertrektijd={this.state.resultaat6.vertrektijd}
          aankomsttijd={this.state.resultaat6.aankomsttijd}
          treinsoort={this.state.resultaat6.treinsoort}
          treindrukte={this.state.resultaat6.treindrukte}
          gezocht={this.state.gezocht}
          />
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    searchTermVanStation: state.searchTermVanStation,
    searchTermNaarStation: state.searchTermNaarStation
  };
};

export default connect(mapStateToProps,
  {
    changeSearchTermVanStation: changeSearchTermVanStation,
    changeSearchTermNaarStation: changeSearchTermNaarStation
  }
)(ReizenZoeken);
