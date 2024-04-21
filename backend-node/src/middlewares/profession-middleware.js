const validateName = (request, response, next) => {
	const {body} = request;

	// Name validation
	if (body.name === undefined) {
		return response.status(400).json({message: 'Field "name" is required'});
	}

	if (body.name === '') {
		return response.status(400).json({message: 'Field "name" cannot be empty'});
	}

	next();
};

module.exports = {
	validateName,
};
