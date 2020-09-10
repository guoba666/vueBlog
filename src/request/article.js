import axios from './http';
const article = {
    articleList(tag,sort){
        return axios.get('/api/articleList',{
            params:{
                tag:tag,
                sort:sort,
            },
        })
            /*
            .then(function (response) {
            alert("文章返回成功");
            //console.log(response.data.data.url);
            //console.log(response.data);
        }).catch(function(err){
            alert(err);
        })

             */
    },
    articleDetail(articleId){
        return axios.get('/api/articleDetail',{
            params:{
                articleId:articleId,
            }
        })
    },
    articlePost(info){
        return axios.post('/api/articlePost',{
            username:info.username,
            head:info.head,
            content:info.content,
            tagId:info.tagId,
        })
    }
}
export default article;