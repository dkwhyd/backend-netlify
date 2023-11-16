const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const users = require("./data");
const SALT = 12;

const showUser = (req, res) => {
  res.status(400);
  res.send({
    status: "success",
    message: "data user",
    data: {
      data: users,
    },
  });
};

const addUser = (req, res) => {
  const { email, password } = req.body;
  const id = nanoid(16);
  const role = "user";

  if (email !== undefined) {
    const encPassword = bcrypt.hashSync(password, SALT);
    const newUser = {
      id,
      email,
      password: encPassword,
      role,
    };

    const existingUser = users.find((user) => user.email === email);
    if (!existingUser) {
      const addingUSer = users.push(newUser);

      if (addingUSer) {
        res.status(200);
        res.send({
          status: "success",
          message: "user berhasil mendaftar",
          data: {
            id,
          },
        });
      }
    } else {
      res.status(201);
      res.send({
        status: "fail",
        message: "email telah terdaftar",
      });
    }
  }

  return res.send({
    status: "fail",
    message: "email & password not found",
  });
};

module.exports = { showUser, addUser };
