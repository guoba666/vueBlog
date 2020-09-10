import axios from './http';
const user = {
    login(user){
        return axios.post('/api/user/login',{
            username:user.name,
            pwd:user.pwd,
        })
    },
}
export default user;