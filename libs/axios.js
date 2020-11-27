import Axios from 'axios'

const RootPath = "http://localhost/starter-nextjs/api/"

const GET = (path) => {
    const promise = new Promise((resolve,reject) => {
        Axios.get(RootPath+path).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const GET_ID = (path,id) => {
    const promise = new Promise((resolve,reject) => {
        Axios.get(RootPath+path+id).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const GET_BY_ID = (path,data) =>{
    const promise = new Promise((resolve,reject)=>{
         Axios.get(RootPath+path+data).then(res=>{
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
        Axios.post(RootPath+path,data).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const PUT = (path,data) => {
    const promise = new Promise((resolve,reject) => {
        Axios.put(RootPath+path,data).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const DELETE = (path,data) => {
    const promise = new Promise((resolve,reject) => {
        Axios.delete(RootPath+path+data).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const SEARCH = (path,data) => {
    const promise = new Promise((resolve,reject) => {
        Axios.get(RootPath+path+data).then(res => {
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
        Axios.post(RootPath+path,formdata).then(res=>{
           resolve(res.data.status)
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
const GetSetting = () => GET('SettingController');
const PutSetting = (data) => PUT('SettingController',data);
const GetUser = () => GET('UserController');
const GetUserId = (data) => GET_ID('UserController?id=',data)
const PostUser = (data) => POST('UserController',data);
const PutUser = (data) => PUT('UserController',data);
const PutUserPass = (data) => PUT('UserPassController',data);
const DeleteUser = (id) => DELETE('UserController/index_delete?id=',id);
const GetSlideshow = () => GET('SlideshowController');
const PutSlideshow = (data) => PUT('SlideshowController',data);
const GetCategory = () => GET('CategoryController');
const PostCategory = (data) => POST('CategoryController',data);
const PutCategory = (data) => PUT('CategoryController',data);
const DeleteCategory = (id) => DELETE('CategoryController/index_delete?id=',id);

const API = {
    PostLogin,
    GetBlog,
    GetBlogId,
    PostBlog,
    PutBlog,
    PutBlogCategory,
    DeleteBlog,
    GetSetting,
    PutSetting,
    GetUser,
    GetUserId,
    PostUser,
    PutUser,
    PutUserPass,
    DeleteUser,
    GetSlideshow,
    PutSlideshow,
    GetCategory,
    PostCategory,
    PutCategory,
    DeleteCategory
}

export default API