const Thought = require("../models/Thought");
const User = require("../models/User");
const { Op } = require('sequelize');
module.exports = class ThoughtController {

    static async showThoughts(req, res) {

        let search = '';


        let order = 'DESC';


        if (req.query.search) {
            search = req.query.search;
        }

        if (req.query.order) {
            order = req.query.order
        }

        const thoughtsSelect = await Thought.findAll({
            include: User,
            where: {
                title: { [Op.like]: `%${search}%` },
            },
            order: [['createdAt', order]]
        });

        const thoughts = thoughtsSelect.map((result) => result.get({ plain: true }))

        res.render("thoughts/home", { thoughts, search })
    }

    static async dashboard(req, res) {

        const userId = req.session.userId

        const user = await User.findOne({ where: { id: userId }, include: Thought, plain: true })

        //Verifica se usuário existe
        if (!user) {
            req.session.destroy();

            res.redirect('/login');
        }

        const thoughts = user.Thoughts.map((result) => result.dataValues)

        let isEmpty = false;

        if (thoughts.length === 0) {
            isEmpty = true;
        }

        res.render('thoughts/dashboard', { thoughts, isEmpty })
    }

    static createThought(req, res) {
        res.render('thoughts/create')
    }

    static async saveThought(req, res) {

        const thought = {
            title: req.body.title,
            userId: req.session.userId
        }

        console.log(thought)
        try {
            await Thought.create(thought);

            req.flash('message', 'Pensamento criado com sucesso');

            req.session.save(() => {
                res.redirect('/thoughts/dashboard');
            })
        } catch (error) {
            console.log('Aconteceu um erro: ' + error);
        }

    }

    static async removeThought(req, res) {
        const thoughtId = req.body.id;
        const userId = req.session.userId;

        try {
            await Thought.destroy({ where: { id: thoughtId, userId: userId } });

            req.flash('message', 'Pensamento removido com sucesso');

            req.session.save(() => {
                res.redirect('/thoughts/dashboard');
            })
        } catch (error) {
            console.log(error)

        }

    }

    static async editThought(req, res) {

        const thoughtId = req.params.id;
        const userId = req.session.userId;

        try {
            const thought = await Thought.findOne({ where: { id: thoughtId, userId: userId }, raw: true })

            res.render('thoughts/edit', { thought });
        } catch (error) {
            console.log(error)

        }
    }

    static async updateThought(req, res) {

        const id = req.body.id;

        const thought = {
            title: req.body.title
        }

        try {
            await Thought.update(thought, { where: { id: id } })

            req.flash('message', 'Pensamento atualizado com sucesso');

            req.session.save(() => [
                res.redirect('/thoughts/dashboard')
            ])
        } catch (error) {
            console.log(erro)
        }
    }
}