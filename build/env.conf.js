const envVariables = require('../config/env')

const formatedVariables = () => {
	let variables = envVariables[process.env.NODE_ENV];
	Object.keys(variables).map(key => variables[key] = JSON.stringify(variables[key]));
	return variables;
}

module.exports = formatedVariables();