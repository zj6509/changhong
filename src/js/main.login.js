require.config({
    paths:{
        jquery:"./jquery.min",
        login:"./lib/login"
    },
    shim:{}
});

require(['jquery','login'],function($,login){
    login.code('#account-login');
    login.verify();
})