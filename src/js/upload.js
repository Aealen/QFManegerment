import axios from 'axios';
let newAxios = axios.create({
    headers: {'Content-Type': 'multipart/form-data;charset=utf-8'}
});
newAxios.defaults.transformRequest = [function (data, config) {
    switch (config['Content-Type'].toLowerCase()) {
        case 'multipart/form-data;charset=utf-8':{
            return data;
        }
    }
}]

function upload(url, formdata) {
    let promise;
    return new Promise((resolve, reject) => {
        promise = newAxios.post(url, formdata);
        promise.then((response) => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        })
    })
}

var globalUrl = "http://10.80.0.26:8096/"; 

export const uploadFile = (formdata) => upload(globalUrl + 'ff14/upload/', formdata);