module.exports= {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.resolve.fallback = {
          ...webpackConfig.resolve.fallback,
          fs: false,       // Disable `fs`
          path: false,     // Disable `path`
        };
        return webpackConfig;
      },
    },
  };
  