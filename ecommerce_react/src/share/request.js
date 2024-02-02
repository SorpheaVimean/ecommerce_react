import axios from "axios";
import { getAccessToken, getRefreshToken, isEmptyOrNull, logout } from "./help";
import { message } from "antd";


 const base_url = "http://localhost:8081/api/";

 export const request = (url,method,param,new_token=null, data ={}) => {
    var  access_token = getAccessToken();
    
    
    // if(new_token != null){
    //     access_token = new_token
    // }
    var header = { "Content-type": "application/json" };
    if (data instanceof FormData) {
      header = { "Content-Type": "multipart/form-data" };
    }
    return axios({
        url: base_url + url,
        method: method,
        data: param,
        headers : {
            Authorization  : "Bearer "+ access_token,
            header
        }
    }).then(res=>{
        return res.data;
    }).catch(err=>{
        var status = err.response?.status
        if(status === 404){
            message.error("Route Not Found!")
            message.error(err.message)
            console.log(err.message)
        }else if (status === 401){
            // return  getRefreshToken(url,method,param)
            // logout()
            // console.log(err)
            // message.error("You don't has permission access this method!")
            logout()
            // ព្យាយាមត Token ថ្មី

        }else if (status === 500){
            var respone = err.response
            var mesage_from_server = respone.data.message;
            message.error(mesage_from_server)
        }else{
            message.error(err.message)
           
            console.log(err.message)
        }
        return false
    }).finally(()=>{});
       
}
