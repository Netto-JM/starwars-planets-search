import fetchResponse from './fetchResponse';

const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(fetchResponse),
});

export default mockFetch;
