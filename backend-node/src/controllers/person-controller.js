const personModel = require('../models/person-model');

const getAll = async (req, res) => {
	const persons = await personModel.getAll();
	return res.status(200).json(persons);
};

const get = async (req, res) => {
	const person = await personModel.get(req.params.id);
	return res.status(200).json(person);
}

const create = async (req, res) => {
	const person = await personModel.create(req.body);
	return res.status(201).json(person);
};

const deletePerson = async (req, res) => {
	await personModel.deletePerson(req.params.id);
	return res.status(204).json();
};

const updatePerson = async (req, res) => {
	await personModel.update(req.params.id, req.body);
	return res.status(204).json();
};

module.exports = {
	getAll,
	get,
	create,
	deletePerson,
	updatePerson,
};
