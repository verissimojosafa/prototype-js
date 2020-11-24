const Todolist = require('../models/Todolist');

module.exports = {
    async index(request, response) {
        const todolists = await Todolist.getAll();
        response.json(todolists)
    },

    async create(request, response) {
        const { name, priority } = request.body;

        const lastId = await Todolist.insertData(name, priority)

        response.json({lastId});
    }
}