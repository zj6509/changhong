require.config({
    paths:{
        jquery:"./jquery.min",
        detail:"./lib/detail",
        cookie:"./lib/cookie"
    },
    shim:{}
});

require(['jquery','detail'],function($,detail){
    detail.render(function(id,price){
        $('.pro-ditem-addin').on('click',function(){
            $('.pro-ditem-addin').css({
                'border-color': '#f12020',
                color: '#f12020'
            });
            detail.addItem(id,price,$('#count_value').val());
        });
    });
    detail.numadd();
});