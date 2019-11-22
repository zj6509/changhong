let baseUrl = "http://localhost/erjieduan/changhong";

define(['jquery','cookie'], function ($,cookie) {
    return {
        render: function (callback) {
            let id = location.search.split('=')[1];

            $.ajax({
                url: `${baseUrl}/lib/detail.php`,
                type: 'get',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function (res) {
                    let pic = JSON.parse(res.photo);
                    //1.放大镜部分
                    let tempstr = `
                    <div class="main-picture" style="cursor: move;">
                    <img src="${baseUrl}/src/${pic[1].first}"
                        alt="">
                    <div class="sf"></div>
                    </div>
                    <div class="big">
                        <img class="bpic" src="${baseUrl}/src/${pic[1].first}"
                            alt="">
                    </div>
                    `;
                    let htmlstr = `
                        <h2>
                            ${res.detail}
                            <p>${res.sldetail}</p>
                        </h2>
                        <a href="javascript:;">加入对比</a>`;
                    let prihtml=`<strong><span>￥${res.price}</span></strong>`;
                    $('.main-photo').append(tempstr);
                    $('.description-name').append(htmlstr);
                    $('.description-price').append(prihtml);

                    //2.下面列表部分
                    $.each(pic[1],function(index,value){
                        let liststr=`
                                    <li class="pro-cur">
                                    <a href="javascript:;" class="item-s">
                                        <img class="pro-curimg" src="${baseUrl}/src/${value}"
                                            alt="" width="82" height="82"></a>
                                    </li>
                        `;
                        $('#main-nav').append(liststr);
                    });
                    callback&&callback(res.id,res.price);
                }
            }).done(function(){
                
                //1.实现小放和大放的显示和隐藏
                $('.main-picture').on('mouseover', function () {
                    $('.sf').css({
                        display: 'block'
                    });
                    $('.big').css({
                        display: 'block'
                    });
                    //4.鼠标移动的时候小放跟随
                    $(this).on('mousemove', function (ev) {
                        var ev = ev || window.event;
                        fllow(ev);

                    });
                });


                $('.main-picture').on('mouseout', function () {
                    $('.sf').css({
                        display: 'none'
                    });
                    $('.big').css({
                        display: 'none'
                    });
                });

                //2.计算小放尺寸
                $('.sf').css('width', $('.main-photo').width() * $('.big').width() / $('.bpic').width());
                $('.sf').css('height', $('.main-photo').height() * $('.big').height() / $('.bpic').height());
                

                //3.计算比例（大于1）
                const bili = $('.bpic').width() / $('.main-photo img').width();

                function fllow(ev) {
                    let l = ev.clientX - $('.main-photo').offset().left - $('.sf').width() / 2+window.scrollX;
                    let t = ev.clientY - $('.main-photo').offset().top - $('.sf').height() / 2+window.scrollY;
                    if (l < 0) {
                        l = 0;
                    } else if (l >= $('.main-photo').width() - $('.sf').width()) {
                        l = $('.main-photo').width() - $('.sf').width() - 2;//边框的尺寸
                    }

                    if (t < 0) {
                        t = 0;
                    } else if (t >= $('.main-photo').height() - $('.sf').height()) {
                        t = $('.main-photo').height() - $('.sf').height() - 2;
                    }


                    $('.sf').css({
                        left: l,
                        top: t
                    });


                    $('.bpic').css({
                        left: -bili * l,
                        top: -bili * t
                    });
                }

                //4.划进每张对应的图片切换
                $('#main-nav>li>a>img').on('mouseover',function(){
                    if($('.pro-curimg').parent().parent()[0].tagName==='LI'){
                        $('.main-picture').children('img')[0].src = $(this)[0].src; //小图下面的图片
                        $('.bpic')[0].src = $(this)[0].src; //大图
                        $(this).css({border:'1px solid #f12020',width:82,height:82});
                    }
                });
                $('#main-nav>li>a>img').on('mouseout',function(){
                    
                        $(this).css({border:'none',width:84,height:84});
                });

                //5.点击左右箭头实现列表图的移动
                let showlinum=5;
                let liwidth=$('#main-nav>li').width()+10;
                $('.main-lt').on('click',function(){
                    if(showlinum>5){
                        showlinum--;
                        $('#main-nav').css({left:'-'+(showlinum-5)*liwidth+'px'});
                    }
                });
                $('.main-rt').on('click',function(){
                    if(showlinum<$('#main-nav>li').length){
                        showlinum++;
                        $('#main-nav').css({left:'-'+(showlinum-5)*liwidth+'px'});
                    }
                });
            });
        },
        addItem:function(id,price,num){
            let goods=cookie.get('goods');//获取cookie数据，并判断是否存在

            let depro = {
                id:id,
                price:price,
                num:num
            };

            //1.如果cookie存在，修改cookie
            if(goods){
                goods = JSON.parse(goods);
                if(goods.some(elm=>elm.id==id)){
                    goods.forEach(elm=>{
                        elm.id==id?elm.num = num:null;
                    });
                }else{
                    goods.push(depro);
                }
            }else{//2.cookie不存在则添加
                goods=[];//新建购物车
                goods.push(depro);//放入商品
            }

            cookie.set('goods',JSON.stringify(goods),2);
        },
        numadd:function(){
            $num=0;
            $('#nextCount').on('click',function(){
                $num=$('#count_value').val()
                $num++;
                $('#count_value').val($num);
            });
            $('#preCount').on('click',function(){
                $num=$('#count_value').val()
                $num--;
                $('#count_value').val($num);
                if($num<=1){
                    $('#count_value').val(1)
                }
            });
        },
        watch: function () {
            //--------------头部-----------
            $('.hehover').on('mousemove', function () {
                $('.hehover>a').eq($(this).index('.hehover')).addClass('cur').siblings('.hehover>a').removeClass('cur');
            });
            $('.hehover').on('mouseout', function () {
                $('.hehover>a').removeClass('cur');
            });
            $('.sort-container').on('mousemove', function () {
                $(this).css({
                    background: '#555555'
                }).siblings('.sort-container').css({
                    background: '#333333'
                });
            });
            $('.sort-container').on('mouseout', function () {
                $('.sort-container').css({
                    background: '#333333'
                });
            });



            //----------长虹首页------------
            this.navli = $('.logo-nav>ul>.hover');
            this.navsub = $('.logo-nav-sub');
            this.navli.on('mousemove', function () {
                $(this).addClass('cur').siblings('.logo-nav>ul>.hover').removeClass('cur');
                $('.logo-nav-sub').eq($(this).index('.logo-nav>ul>.hover')).show().siblings('.logo-nav-sub').hide();
            });
            this.navli.on('mouseout', function () {
                $('.logo-nav>ul>.hover').removeClass('cur');
                $('.logo-nav-sub').hide();
            });


            //启客系列
            $('.logo-nav-inner>ul>li').on('mousemove', function () {
                $(this).css({
                    background: '#f12020'
                }).siblings('.logo-nav-inner>ul>li').css({
                    background: 'none'
                });
                $('.home-inner-secd').eq($(this).index()).show().siblings('.home-inner-secd').hide();
            });
            $('.logo-nav-inner>ul>li').on('mouseout', function () {
                $('.logo-nav-inner>ul>li').css({
                    background: 'none'
                });
                $('.home-inner-secd').hide();
            });

            const $top = $('.main-item').offset().top;
            let $tabtop = $(window).scrollTop();
            if ($tabtop > $top) {
                $('.sustop').show();
            } else {
                $('.sustop').hide();
            }
            $('.sustop').on('click', function () {
                $('html,body').animate({
                    scrollTop: 0
                });
            });
        }
    }
});



