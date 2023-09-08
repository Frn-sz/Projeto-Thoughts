const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async register_post(req, res) {

        const { name, email, password, confirm_password } = req.body;

        //Validação de senha

        if (password != confirm_password) {
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register')

            return
        }

        //Verifica se usuário já existe no sistema

        const check_if_user_exists = await User.findOne({ where: { email: email } })

        if (check_if_user_exists) {
            req.flash('message', 'Este e-mail já está em uso!')

            res.render('auth/register')

            return
        }

        //Gera a senha criptografada

        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt);

        const user = { name, email, password: passwordHash }

        try {
            const createdUser = await User.create(user);

            req.session.userId = createdUser.id;

            req.flash('message', 'Registro realizado com sucesso!');

            req.session.save(() => {
                res.redirect('/')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async login_post(req, res) {

        const { email, password } = req.body

        //Buscar usuário

        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            req.flash('message', 'Usuário não encontrado')

            res.render('auth/login')

            return
        }

        //Checagem de senha

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            req.flash('message', 'Senha inválida')

            res.render('auth/login')

            return
        }

        req.session.userId = user.id

        req.flash('message', 'Autenticação realizada com sucesso!');

        req.session.save(() => {
            res.redirect('/')
        })

    }

    static logout(req, res) {
        req.session.destroy();

        res.redirect('/login');
    }
}