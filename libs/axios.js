import Axios from 'axios'

const RoothPath = "http://localhost/starter-nextjs/api/"

const GET = (path) => {
    const promise = new Promise((resolve,reject)=>{
        Axios.get(RoothPath+path).then(res=>{
            resolve(res.data)
        },err=>{
            reject(err)
        })
    })
    return promise
}

const GET_ID = (path,id) => {
    const promise = new Promise((resolve,reject)=>{
        Axios.get(RoothPath+path+id).then(res=>{
            resolve(res.data)
        },err=>{
            reject(err)
        })
    })
    return promise
}


const LOGIN = (path,data) => {
    const promise = new Promise((resolve,reject)=>{
        Axios.post(RoothPath+path,data).then(res=>{
            resolve(res.data)
        },err=>{
            reject(err)
        })
    })
    return promise
}

const POSTUSER = (path,data) =>{
   const promise = new Promise((resolve,reject)=>{
        Axios.post(RoothPath+path,data).then(res=>{
            resolve(res.data)
        },err=>{
            reject(err)
        })
   })
   return promise
}

const POSTPESAN = (path,data) =>{
    const promise = new Promise((resolve,reject)=>{
         Axios.post(RoothPath+path,data).then(res=>{
             resolve(res.data)
         },err=>{
             reject(err)
         })
    })
    return promise
 }

 const PUTPRODUK = (path,data) =>{
    const promise = new Promise((resolve,reject)=>{
         Axios.put(RoothPath+path,data).then(res=>{
             resolve(res.data)
         },err=>{
             reject(err)
         })
    })
    return promise
 }

 const Delete = (path,id) => {
    const promise = new Promise((resolve,reject) => {
        Axios.delete(RoothPath+path+id).then(res =>{
            resolve(res.data)
        },(err)=>{
            reject(err)
        })
    })
    return promise
}


 const GETPESAN = (path,data) =>{
    const promise = new Promise((resolve,reject)=>{
         Axios.get(RoothPath+path+data).then(res=>{
             resolve(res.data)
         },err=>{
             reject(err)
         })
    })
    return promise
 }

 const POSTIMAGE = (path,data,name) => {
     const promise = new Promise((resolve,reject)=>{
         const formdata = new FormData()
         formdata.append('foto',data,name)
         Axios.post(RoothPath+path,formdata).then(res=>{
            resolve(res.data.status)
        },(err)=>{
            reject(err)
        })
     })
     return promise
 }

const PostLogin = (data) => LOGIN('LoginController',data)


const API = {
    PostLogin,
    
}

export default API