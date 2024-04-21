const connection = require('./connection');

const get = async personId => {
	const [professions] = await connection.execute('SELECT * FROM profession WHERE person_id = ? LIMIT 1', [personId]);
	const [profession] = professions;
	return profession;
};

const create = async profession => {
	const {name, personId} = profession;
	const query = 'INSERT INTO profession(name, person_id) VALUES (?, ?)';
	const [createdProfession] = await connection.execute(query, [name, personId]);
	return {insertId: createdProfession.insertId};
};

const deleteProfession = async id => {
	const query = 'DELETE FROM profession WHERE id = ?';
	const [profession] = await connection.execute(query, [id]);
	return profession;
};

const update = async (id, profession) => {
	const { name } = profession;
	const query = 'UPDATE profession SET name=? WHERE id = ?;';
	const [createdProfession] = await connection.execute(query, [name, id]);
	return createdProfession;
};

module.exports = {
	get,
	create,
	deleteProfession,
	update,
};
