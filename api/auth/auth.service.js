const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(fullName, password) {
    logger.debug(`auth.service - login with fullName: ${fullName}`)
    if (!fullName || !password) throw new Error('fullName and password are required!')

    const user = await userService.getByFullName(fullName)
    console.log('user-loginService', user);
    if (!user) return Promise.reject('Invalid fullName or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid fullName or password')

    delete user.password;
    return user;
}

async function signup(email, password, fullName, tel, skills, favs, events) {
    logger.debug(`auth.service - signup with email: ${email}, fullName: ${fullName}`)
    if (!email || !password || !fullName) return Promise.reject('email, fullName and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ email, password: hash, fullName, tel, skills, favs, events })
}

module.exports = {
    signup,
    login,
}