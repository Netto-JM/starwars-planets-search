import testData from './testData';

export const mockFetchResolved = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(testData),
});

export const mockFetchRejected = () => Promise.resolve({
  status: 404,
  ok: false,
  json: () => Promise.resolve('Something wrong happened'),
});
