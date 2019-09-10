import DomainCommon from './Common';

const DataGovService = {
  fetchMobileDataUsage: offset => {
    return new Promise((resolve, reject) => {
      let endpoint =
        'https://data.gov.sg/api/action/datastore_search?resource_id=a807b7ab-6cad-4aa6-87d0-e283a7353a0f&limit=45&offset=' +
        offset;
      // let endpoint = 'https://httpstat.us/500';
      return DomainCommon.fetch(endpoint, resolve, reject);
    });
  },
};

export default DataGovService;
