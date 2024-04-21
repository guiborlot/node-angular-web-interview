const professionModel = require('../models/profession-model');

const get = async (req, res) => {
	const professions = await professionModel.get(req.params.id);
	return res.status(200).json(professions);
};

const create = async (req, res) => {
	const profession = await professionModel.create(req.body);
	return res.status(201).json(profession);
};

const deleteProfession = async (req, res) => {
	await professionModel.deleteProfession(req.params.id);
	return res.status(204).json();
};

const updateProfession = async (req, res) => {
	await professionModel.update(req.params.id, req.body);
	return res.status(204).json();
};

module.exports = {
	get,
	create,
	deleteProfession,
	updateProfession,
};
