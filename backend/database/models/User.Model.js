import { DB } from "../db.js";
class UserModel{
  Create(data){
   return new Promise((resolve, reject)=>{
    const {username, password} = data;
    if (username && password) {
      DB.get("SELECT * FROM admin WHERE admin.username = ? ", username, (err, data)=>{
        if (err) {
          return reject({error:"Erro ao cadastrar o admin: "+err});
        }   
        if (data) {
          return resolve({error:"Este usuário já foi cadastrado!"});
        }        
        this.insert = ("INSERT INTO admin (username, password) VALUES (?,?)");
        DB.run(this.insert, [username, password],(err)=>{
          if (err) {
            return reject({error:"Erro ao cadastrar os dados: "+err})
          }
          resolve({success:"Cadastrado com sucesso!"});
        })
      });
    }
   })
  }

  Login(data){
    return new Promise((resolve, reject)=>{
      const {username, password} = data;
      if (username && password) {
        DB.get("SELECT * FROM admin WHERE admin.username = ? ", username, (err, data)=>{
          if (err) {
            return reject({error:"Erro ao cadastrar o admin: "+err});
          }   
          if (!data) {
            return resolve({error:"Usuário ou senha incorrectos!"})
          }        
          resolve({success:data});
        });
      }
     })
  }
}
export default new UserModel;
