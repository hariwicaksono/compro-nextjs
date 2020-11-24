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
const GetBlog = () => GET('PostController');
const GetBlogId = (data) => GET_ID('PostController?id=',data)
const PostBlog = (data) => POST('PostController',data);
const PutBlog = (data) => PUT('PostController',data);
const DeleteBlog = (id) => DELETE('PostController/index_delete?id=',id);
const GetSetting = () => GET('SettingController');
const GetUser = () => GET('UserController');
const GetUserId = (data) => GET_ID('UserController?id=',data)
const PostUser = (data) => POST('UserController',data);
const PutUser = (data) => PUT('UserController',data);
const DeleteUser = (id) => DELETE('UserController/index_delete?id=',id);

const API = {
    PostLogin,
    GetBlog,
    GetBlogId,
    PostBlog,
    PutBlog,
    DeleteBlog,
    GetSetting,
    GetUser,
    GetUserId,
    PostUser,
    PutUser,
    DeleteUser 
}

export default API