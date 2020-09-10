import axios from './http';
const tag = {
    tagList(){
        return axios.get('/api/tagList',{
        })
    },

}
export default tag;