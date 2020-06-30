export const res = {
  send: jest.fn(),
  status: jest.fn(() => res),
  json: jest.fn(() => res),
};
