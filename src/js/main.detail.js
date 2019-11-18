require.config({
    paths:{
        jquery:"./jquery.min",
        detail:"./lib/detail"
    },
    shim:{}
});

require(['jquery','detail'],function($,detail){
    detail.render();
});