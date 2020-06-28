import store from '../../store-conf';
 export const TransfromDateTimes =(( data = new Date() )=>{
    var now = data;
    var yy = now.getFullYear(); //年
    var mm = now.getMonth() + 1; //月
    var dd = now.getDate(); //日
    var hh = now.getHours(); //时
    var ii = now.getMinutes(); //分
    var ss = now.getSeconds(); //秒
    var time = yy + "-";
    if (mm < 10) time += "0";
    time += mm + "-";
    if (dd < 10) time += "0";
    time += dd + " ";
    if (hh < 10) time += "0";
    time += hh + ":";
    if (ii < 10) time += '0';
    time += ii + ":";
    if (ss < 10) time += '0';
    time += ss;
    return time;
});
export const setOpenId = function (openId){
    const blon = !!openId;
    if(!blon){
        const href_url = "https://" + document.domain;
         window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxce17baac45d34fc3&redirect_uri=${href_url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
    }
    return blon;
}
export const getopenId =(()=>{
    return false;
})
