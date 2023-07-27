const { alias } = require('react-app-rewire-alias');

module.exports = function override(config, env) {
  // Add a custom alias for importing modules
  config = alias({
    '@components': 'src/components',
    '@styles': 'src/styles',
    // Add more aliases as needed
  })(config);

  config.resolve.fallback = {
    ...config.resolve.fallback, // this will spread the existing fallback configuration
    "stream": require.resolve("stream-browserify"),
  };

  return config;
};








