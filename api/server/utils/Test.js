export const res = {
  send: jest.fn(),
  status: jest.fn(() => res),
  json: jest.fn(() => res),
  setHeader: jest.fn(),
  end: jest.fn(),
  writeHead: jest.fn(),
};
