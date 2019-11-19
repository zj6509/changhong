let baseUrl = "http://localhost/erjieduan/changhong";

define(['jquery', 'cookie'], function ($, cookie) {
    return {
        render: function (callback) {
            let goods = cookie.get('goods');
            if (goods) {
                goods = JSON.parse(goods);
                let idnav = goods.map(elm => elm.id).join();
                $.ajax({
                    url: `${baseUrl}/lib/cart.php`,
                    type: 'get',
                    data: {
                        idnav: idnav
                    },
                    dataType: 'json',
                    success: function (res) {
                        let htmlstr = '';
                        let sumprice = 0.00;
                        res.forEach(elm => {
                            let pic = JSON.parse(elm.photo);
                            let arr = goods.filter((val, i) => {
                                return val.id == elm.id;
                            });
                            htmlstr += `
                            <li class="main-items-goods">
                                <div class="main-good-check">
                                    <input type="checkbox">
                                    <span class="sumPrice" style="display:none">${(arr[0].num * elm.price).toFixed(2)}</span>
                                </div>
                                <div class="main-goods-rt">
                                    <div class="main-goods-top">
                                        <div class="main-goods-blank"></div>
                                        <div class="main-blank-rt" id="${arr[0].id}">
                                            <a href="javascript:;" class="like"></a>
                                            <a href="javascript:;" class="delete"></a>
                                        </div>
                                    </div>
                                    <div class="main-goods-bottom">
                                        <a href="javascript:;">
                                            <img src="${baseUrl}/src/${pic[1].first}">
                                        </a>
                                        <div class="goods-main">
                                            <a href="javascript:;">${elm.detail}</a>
                                        </div>
                                        <div class="goods-price">
                                            <p class="goods-notes"></p>
                                            <p class="goods-cost">
                                                单价<span id="item11818401_price">
                                                    ${elm.price}</span>元
                                            </p>
                                            <p class="notes-bottom"></p>
                                        </div>
                                        <div class="goods-num">
                                            <label for="">数量</label>
                                            <div class="goods-sum">
                                                <a class="sum-reduce" href="javascript:;"></a>
                                                <input type="text" value="${arr[0].num}" min=1 max="${elm.num}">
                                                <a class="sum-add" href="javascript:;"></a>
                                            </div>
                                        </div>
                                        <p class="available">有货</p>
                                    </div>
                                </div>
                            </li>
                        `;
                            sumprice += Number((arr[0].num * elm.price).toFixed(2));
                        });
                        sumprice = sumprice.toFixed(2);
                        $('.main-items').append(htmlstr);
                        callback && callback(sumprice,goods);

                    }
                }).done(function () {
                    //数量的增减
                    $num = 0;

                    $('.sum-add').on('click', function () {
                        $num = $(this).prev().val();
                        $num++;
                        $(this).prev().val($num);
                    });
                    $('.sum-reduce').on('click', function () {
                        $num = $(this).next().val();
                        $num--;
                        $(this).next().val($num);
                        if ($num <= 1) {
                            $(this).next().val(1)
                        }
                    });
                });
            }
        },
        pitch: function (sumprice,goods) {
            $('#car_all_check').on('click', function () {
                if ($('#car_all_check').prop('checked') == true) {
                    $('.car-all-check,.main-good-check').css({ 'background': 'url(../images/success.png) no-repeat' });
                    $('.main-good-check>input').prop({ checked: true });
                    $('#total_num,.goodsNum-num>span').html($('.main-items-goods').length);
                    $('.sum-price>span').html(sumprice);
                } else if ($('#car_all_check').prop('checked') == false) {
                    $('.car-all-check,.main-good-check').css({ 'background': 'url(../images/cart01.png) no-repeat' });
                    $('.main-good-check>input').prop({ checked: false });
                    $('#total_num,.goodsNum-num>span').html(0);
                    $('.sum-price>span').html((0).toFixed(2));
                }
            });
            var arr=[];
            $('.main-good-check>input').on('click', function () {
                if ($(this).prop('checked') == true) {
                    $(this).parent().css({ 'background': 'url(../images/success.png) no-repeat' });
                    $('#total_num,.goodsNum-num>span').html($('.main-good-check>input:checked').length);
                    allprice();
                    if ($('.main-good-check>input:checked').length === $('.main-good-check>input').length) {
                        $('.car-all-check').css({ 'background': 'url(../images/success.png) no-repeat' });
                        $('#car_all_check').prop({ checked: true });
                        $('#total_num,.goodsNum-num>span').html($('.main-items-goods').length);
                        $('.sum-price>span').html(sumprice);
                    }
                } else if ($('.main-good-check>input:checked').length < $('.main-good-check>input').length) {

                    $('.car-all-check').css({ 'background': 'url(../images/cart01.png) no-repeat' });
                    $('#car_all_check').prop({ checked: false });
                    $(this).parent().css({ 'background': 'url(../images/cart01.png) no-repeat' });
                    $('#total_num,.goodsNum-num>span').html($('.main-good-check>input:checked').length);
                    if($('.main-good-check>input:checked').length==0)$('.sum-price>span').html((0).toFixed(2));
                    
                    allprice();
                }
            });
            function allprice() {
                let aprice = 0;
                $('.main-good-check>input:checked').next().each((i, v) => {
                    aprice += parseInt($(v).html());
                })
                $('.sum-price>span').html(`${aprice.toFixed(2)}`);
            }
           $('.delete').on('click',function(){
               let id=$(this).parent().attr('id');
               goods.forEach((val, i) => {
                    if(val.id=id){
                        console.log(val.id);
                        console.log(id);
                        console.log(cookie.get('goods',JSON.stringify(goods)));
                        //cookie.remove('goods','',-1);
                    }
                });
                // cookie.get('goods',JSON.stringify(goods));
                // if(goods.length==0){
                //     cookie.remove('goods','',-1);
                // }
           });
        }
    }
});

