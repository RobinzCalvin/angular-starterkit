module.exports = process.env.CYPRESS_ENV
	? {}
	: {
			presets: [
				['@babel/preset-env', { targets: { node: 'current' } }],
				'@babel/preset-typescript',
			],
			plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
	  };
