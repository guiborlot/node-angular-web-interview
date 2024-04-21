const connection = require('./connection');

const getAll = async () => {
    const [persons] = await connection.execute('SELECT * FROM person');
    return persons;
};

const create = async (person) => {
    const {name, phone, email} = person;
    const query = 'INSERT INTO person(name, phone, email) VALUES (?, ?, ?)';
    const [createdPerson] = await connection.execute(query, [name, phone, email]);
    return {insertId: createdPerson.insertId};
}

const deletePerson = async (id) => {
    const query = 'DELETE FROM person WHERE id = ?';
    const person = await connection.execute(query, [id]);
    return person
}

const update = async (id, person) => {
    const {name, phone, email} = person;
    const query = 'UPDATE person SET name=?, phone=?, email=? WHERE id = ?;';
    const [createdPerson] = await connection.execute(query, [name, phone, email, id]);
    return createdPerson;
}

module.exports = {
    getAll,
    create,
    deletePerson,
    update
};
