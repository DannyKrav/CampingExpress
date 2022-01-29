const bcrypt = require('bcryptjs');

module.exports = {
  registerUser: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get('db');
    const result = await db.user.find_user_by_username([username]);
    const existingUser = result[0];
    if (existingUser) {
      return res.status(409).send('Username is taken.');
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const registeredUser = await db.user.create_user([username, hash, 'https://robohash.org/${username}.png']);
    const user = registeredUser[0];
    req.session.user = { username: user.username, id: user.id };
    console.log(req.session)
    return res.status(201).send(req.session.user);
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    const db = req.app.get('db');
    const result = await db.user.find_user_by_username([username]);
    const user = result[0];
    if (!user) {
      return res.status(201).send("User does not exist");
    }

    const isAuthenticated = bcrypt.compareSync(password, user.password);

    if (!isAuthenticated) {
      return res.status(403).send('Wrong Password!');
    }

    req.session.user = { username: user.username, id: user.id };
    console.log(req.session)
    return res.send(req.session.user);
  },

}
