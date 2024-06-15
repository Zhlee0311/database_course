const Parent = require('../models/parent.model.js');

const tokenEncode = require('../public/encode.js').tokenEncode;



exports.register = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const parent = new Parent(
    {
      name: req.body.name,
      sex: req.body.sex,
      child: req.body.child,
      phone: req.body.phone,
      password: req.body.password
    }
  );

  Parent.register(parent,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while registering the Parent."
        })
      }
      else res.send(data);//这里data是回调给前端的response
    })
};


exports.login = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const parent = new Parent(
    {
      phone: req.body.phone,
      password: req.body.password
    }
  )
  parent.login((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while login the Parent."
      })
    }
    else {
      const token = tokenEncode(data);
      res.cookie('token', token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: false, domain: 'localhost:5173', sameSite: 'none' });
      res.json({ message: 'login success' });
    }
  })
};