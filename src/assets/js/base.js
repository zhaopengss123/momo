/**
* @description: base64位图片转码文件流
* @param {type}
* @Date: 2020-09-02 09:57:22
*/
export const base64toFile = ((dataurl, filename = 'file') =>{
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let suffix = mime.split('/')[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
    })
})

/**
* @description: 上传阿里云
* @param {type}
*/
var client = new OSS({
    region: 'oss-cn-beijing',
    //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
    accessKeyId: 'LTAIOxa9mGEIkdQA',
    accessKeySecret: 'opiUbdL2wvcXOsUu1nsAfVFvGwjfGd',
    bucket: 'fanhuayiju'
});

export const put = (res=>{
    return new Promise((resolve,reject)=>{
        let names = res.lastModified + res.name;
        client.put(names, res).then(res=>{
            resolve(res);
        }).then(err=>{
            reject(err)
        })
    })
})