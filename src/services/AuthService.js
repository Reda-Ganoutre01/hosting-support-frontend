import axios from "axios";

class AuthService{
  constructor (){
    this.http=axios.create({baseURL: "/api/auth"});
    
  }
  async authenticate(credentials){
    return await  axios.http.post("/login",credentials);

  }

}


export default new AuthService();