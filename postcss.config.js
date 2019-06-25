/**
 postcss.webpack.build.config.javascript
 * Created by xun on 2017/9/21.
 */
module.exports = {
  plugins: {
    'postcss-cssnext': {
      features: {
        customProperties: {
          warnings: false
        }
      }
    }
  }
};
