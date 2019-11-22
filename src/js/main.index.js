require.config({
    paths:{
        jquery:"./jquery.min",
        index:"./lib/index",
        jqlazyload:"https://cdnjs.cloudflare.com/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min"
    },
    shim:{}
});

require(['jquery','index'],function ($,index) {
    index.renderer();
    index.watch();
    index.banner();
    index.louti();
});