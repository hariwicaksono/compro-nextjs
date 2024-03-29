import Axios from 'axios'

const RootPath = process.env.NEXT_PUBLIC_API_URL+"/api/";

// Authorization
// key = 7YC5R9X7
// Gunakan https://www.base64decode.org untuk melakukan encode key diatas menjadi format base64
var key = new Buffer.from('N1lDNVI5WDc=', 'base64')
const ApiKey = key.toString();
const config = { headers: { 'X-API-KEY': `${ApiKey}` } };

const GET = (path) => {
    const promise = new Promise((resolve,reject) => {
        Axios.get(RootPath+path, config).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const GET_ID = (path,id) => {
    const promise = new Promise((resolve,reject) => {
        Axios.get(RootPath+path+id, config).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const GET_BY_ID = (path,data) =>{
    const promise = new Promise((resolve,reject)=>{
         Axios.get(RootPath+path+data, config).then(res=>{
             resolve(res.data)
         },err=>{
            console.log(err.response); 
            return err.response;
         })
    })
    return promise
 }

const POST = (path,data) => {
    const promise = new Promise((resolve,reject) => {
        Axios.post(RootPath+path,data, config).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const PUT = (path,data) => {
    const promise = new Promise((resolve,reject) => {
        Axios.put(RootPath+path,data, config).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const DELETE = (path,data) => {
    const promise = new Promise((resolve,reject) => {
        Axios.delete(RootPath+path+data, config).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const SEARCH = (path,data) => {
    const promise = new Promise((resolve,reject) => {
        Axios.get(RootPath+path+data, config).then(res => {
            resolve(res.data)
        }).catch(er => {
            reject(er)
        })
    })
    return promise
}

const POST_FOTO = (path,data,name) => {
    const promise = new Promise((resolve,reject)=>{
        const formdata = new FormData()
        formdata.append('foto',data,name)
        Axios.post(RootPath+path, formdata, config).then(res=>{
           resolve(res.data)
       },(err)=>{
           reject(err)
       })
    })
    return promise
}

const PostLogin = (data) => POST('LoginController',data);
const GetBlog = () => GET('BlogController');
const GetBlogId = (data) => GET_ID('BlogController?id=',data)
const PostBlog = (data) => POST('BlogController',data);
const PutBlog = (data) => PUT('BlogController',data);
const PutBlogCategory = (data) => PUT('BlogCategoryController',data);
const DeleteBlog = (id) => DELETE('BlogController/index_delete?id=',id);
const PutBlogImage = (data) => PUT('BlogImageController',data);
const GetSetting = () => GET('SettingController');
const PutSetting = (data) => PUT('SettingController',data);
const GetUser = () => GET('UserController');
const GetUserId = (data) => GET_ID('UserController?id=',data)
const PostUser = (data) => POST('UserController',data);
const PutUser = (data) => PUT('UserController',data);
const PutUserPass = (data) => PUT('UserPassController',data);
const DeleteUser = (id) => DELETE('UserController/index_delete?id=',id);
const GetSlideshow = () => GET('SlideshowController');
const GetSlideshowId = (data) => GET_ID('SlideshowController?id=',data)
const PostSlideshow = (data) => POST('SlideshowController',data);
const PutSlideshow = (data) => PUT('SlideshowController',data);
const DeleteSlideshow = (id) => DELETE('SlideshowController/index_delete?id=',id);
const PutSlideshowImage = (data) => PUT('SlideshowImageController',data);
const GetCategory = () => GET('CategoryController');
const GetCategoryId = (data) => GET_ID('CategoryController?id=',data)
const PostCategory = (data) => POST('CategoryController',data);
const PutCategory = (data) => PUT('CategoryController',data);
const DeleteCategory = (id) => DELETE('CategoryController/index_delete?id=',id);
const PostFoto = (data,name) => POST_FOTO('ImageUpload',data,name);
const CountBlog = () => GET('CountBlogController');
const CountCategory = () => GET('CountCategoryController');
const SearchBlog = (data) => SEARCH('SearchController?id=',data);
const GetComment = () => GET('CommentController');
const GetCommentId = (data) => GET_ID('CommentController?id=',data)
const PostComment = (data) => POST('CommentController',data);
const PutComment = (data) => PUT('CommentController',data);
const CountComment = () => GET('CountCommentController');
const GetTag = (data) => GET_ID('TagController?category=',data)
const GetService = () => GET('ServiceController');
const GetServiceId = (data) => GET_ID('ServiceController?id=',data)
const PostService = (data) => POST('ServiceController',data);
const PutService = (data) => PUT('ServiceController',data);
const DeleteService = (id) => DELETE('ServiceController/index_delete?id=',id);
const PutServiceImage = (data) => PUT('ServiceImageController',data);
const CountService = () => GET('CountServiceController');

const API = {
    PostLogin,
    GetBlog,
    GetBlogId,
    PostBlog,
    PutBlog,
    PutBlogCategory,
    DeleteBlog,
    PutBlogImage,
    GetSetting,
    PutSetting,
    GetUser,
    GetUserId,
    PostUser,
    PutUser,
    PutUserPass,
    DeleteUser,
    GetSlideshow,
    GetSlideshowId,
    PostSlideshow,
    PutSlideshow,
    DeleteSlideshow,
    PutSlideshowImage,
    GetCategory,
    GetCategoryId,
    PostCategory,
    PutCategory,
    DeleteCategory,
    PostFoto,
    CountBlog,
    CountCategory,
    SearchBlog,
    GetComment,
    GetCommentId,
    PostComment,
    PutComment,
    CountComment,
    GetTag,
    GetService,
    GetServiceId,
    PostService,
    PutService,
    DeleteService,
    PutServiceImage,
    CountService,
}

export default API