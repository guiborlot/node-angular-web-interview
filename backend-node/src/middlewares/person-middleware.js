const validateBody = (request, response, next) => {
	const {body} = request;

	// Name validation
	if (body.name === undefined) {
		return response.status(400).json({message: 'Field "name" is required'});
	}

	if (body.name === '') {
		return response.status(400).json({message: 'Field "name" cannot be empty'});
	}

	// Email validation
	if (body.email === undefined) {
		return response.status(400).json({message: 'Field "email" is required'});
	}

	if (!isValidEmail(body.email)) {
		return response.status(400).json({message: 'Invalid email format'});
	}

	// Phone number validation (basic check)
	if (body.phone === undefined) {
		return response.status(400).json({message: 'Field "phone" is required'});
	}

	const phoneRegex = /\+\d{2}\s\(\d{2}\)\s\d{4,5}-?\d{4}/g;
	if (!phoneRegex.test(body.phone)) {
		return response.status(400).json({message: 'Invalid phone number format'});
	}

	next();
};

function isValidEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

module.exports = {
	validateBody,
};
