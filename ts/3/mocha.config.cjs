module.exports = {
  require: ['ts-node/register'],
  extension: ['ts'],
  spec: ['test/**/*.ts'],
  loader: 'ts-node/esm',
};
