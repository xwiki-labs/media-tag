function config(env) {
	console.log('Environnement: %s', env);
	switch (env) {
		case 'production-cjs':
			return require('./config/production-cjs.js');
		case 'production-umd':
			return require('./config/production-umd.js');
		case 'development-es7':
			return require('./config/development-es7.js');
		case 'development-es5':
			return require('./config/development-es5.js');
		default:
			throw new Error(`Unknown environnement : ${env}`);
	}
}

module.exports = config(process.env.NODE_ENV);
