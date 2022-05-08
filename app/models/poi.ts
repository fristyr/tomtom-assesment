export type TPoiResult = {
  type:
    | 'POI'
    | 'Street'
    | 'Geography'
    | 'Point'
    | 'Address'
    | 'Address'
    | 'Range'
    | 'Cross'
    | 'Street';
  id: string;
  score: number;
  dist?: number;
  info: string;
  poi?: {
    name: string;
    phone: string;
    categorySet: Array<{
      id: number;
    }>;
    url: string;
    categories: Array<string>;
  };
  entityType:
    | 'Country'
    | 'CountrySubdivision'
    | 'CountrySecondarySubdivision'
    | 'CountryTertiarySubdivision'
    | 'Municipality'
    | 'MunicipalitySubdivision'
    | 'Neighbourhood'
    | 'PostalCodeArea';
  address: {
    municipality: string;
    countrySubdivision: string;
    countryCode: string;
    country: string;
    countryCodeISO3: string;
    freeformAddress: string;
  };
  position: {
    lat: number;
    lon: number;
  };
  viewport: {
    topLeftPoint: {
      lat: number;
      lon: number;
    };
    btmRightPoint: {
      lat: number;
      lon: number;
    };
  };
  boundingBox: {
    topLeftPoint: {
      lat: number;
      lon: number;
    };
    btmRightPoint: {
      lat: number;
      lon: number;
    };
  };
  dataSources: {
    geometry: {
      id: string;
    };
  };
};

export type TPoiSearch = {
  summary: {
    query: string;
    queryType: string;
    queryTime: number;
    numResults: number;
    offset: number;
    totalResults: number;
    fuzzyLevel: number;
  };
  results: Array<TPoiResult>;
};
