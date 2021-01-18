const CracoLessPlugin = require('craco-less');
module.exports = {
	plugins: [
	    {
	      plugin: CracoLessPlugin,
	      options: {
	        lessLoaderOptions: {
	          lessOptions: {
	            modifyVars: { '@primary-color': '#2D7FAF' },
	            javascriptEnabled: true,
	          },
	        },
	      },
	    },
	],
}