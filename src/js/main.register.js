require.config({
    paths:{
        jquery:"./jquery.min",
        register:"./lib/register"
    },
    shim:{}
});

require(['jquery','register'],function($,register){
    register.regis('.submit');
    register.verify();
});