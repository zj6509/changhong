require.config({
    paths:{
        jquery:"./jquery.min",
        register:"./lib/register",
        md5:"./jquery.md5"
    },
    shim:{
        md5:['jquery']
    }
});

require(['jquery','register'],function($,register){
    register.verify();
});