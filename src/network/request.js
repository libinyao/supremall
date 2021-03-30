import axios from "axios";

export function request(config){
  //创建axios实例
  const instance1 = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //拦截请求
  instance1.interceptors.request.use(request =>{
    console.log(request);
    return request
  },error => {
    console.log(error);
  })
  //拦截请求数据返回值
  instance1.interceptors.response.use(res =>{
    console.log(res);
    return res.data
  },error => {
    console.log(error);
  })

  //调用
  return   instance1(config)
}
