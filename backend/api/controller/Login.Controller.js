import Jwt from "../../auth/jwt/Jwt.js";
import { DecodePassword, GeneratePassword } from "../../auth/Password.js";
import UserModel from "../../database/models/User.Model.js";

class LoginController {
  //Register
  async Register(req, res) {
    const { username, password } = req.body;
    if (username && password) {
      try {
        const hasPassword = await GeneratePassword(password);
        const data = {
          username: username,
          password: hasPassword.senha,
        };
        const result = await UserModel.Create(data);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: "Erro: " + error.error });
      }
    } else {
      res.status(400).json({ error: "Username e password são obrigatórios." });
    }
  }

  //Login 
  async Sigin(req, res) {
    const { username, password } = req.body;
    if (username && password) {
      try {
        const result = await UserModel.Login(req.body);
        const { error, success } = result;

        if (error) {
          res.status(200).json({ error: error });
          return;
        }
        const userPass = success?.password;
        const passVerify = await DecodePassword(password, userPass);
        if (!passVerify.status) {
          res.status(200).json({ error: "Usuário ou senha incorretos!" });
          return;
        }
        const token = await Jwt.Generate(success);
        res.status(200).json({
          success: "Credenciais confirmadas com sucesso!",
          token: token,
        });
      } catch (error) {
        res.status(500).json({ error: "Erro: " + error?.error });
      }
    } else {
      res.status(400).json({ error: "Username e password são obrigatórios." });
    }
  }
}

export default new LoginController();
