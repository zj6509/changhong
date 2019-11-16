let baseUrl = "http://localhost/erjieduan/changhong";

define(['jquery'],function(){
    return {
        renderer:function(){
            $.ajax({
                url:`${baseUrl}/lib/goods.php`,
                type: 'get',
                dataType: 'json',
                success:function (res) {
                    let html='';
                    res.forEach(elm=>{
                        html+=`
                        <div class="home-ele-f ">
                        <div class="home-ele-img">
                            <a href="javascript:;" target="">
                                <img class="lazy" alt="" src="${baseUrl}/src/${elm.photo}">
                            </a>
                        </div>
                        <div class="home-ele-text" r3code="CH5012137">
                            <h1><a href="javascript:;" target="" title="65英寸 AI音响物联无边全面屏">${elm.title}</a>
                            </h1>
                            <p>${elm.sltitle}</p>
                            <h2>￥${elm.price}</h2>
                        </div>
                    </div>`;
                    });
                    $('.home-common').append(html);
                }
            });
        },
        watch:function(){
            //--------------头部-----------
            $('.hehover').on('mousemove',function(){
                $('.hehover>a').eq($(this).index('.hehover')).addClass('cur').siblings('.hehover>a').removeClass('cur');
            });
            $('.hehover').on('mouseout',function(){
                $('.hehover>a').removeClass('cur');
            });
            $('.sort-container').on('mousemove',function(){
                $(this).css({
                    background: '#555555'
                }).siblings('.sort-container').css({
                    background: '#333333'
                });
            });
            $('.sort-container').on('mouseout',function(){
                $('.sort-container').css({
                    background: '#333333'
                });
            });



            //----------长虹首页------------
            this.navli=$('.logo-nav>ul>.hover');
            this.navsub=$('.logo-nav-sub');
            this.navli.on('mousemove',function () {
                $(this).addClass('cur').siblings('.logo-nav>ul>.hover').removeClass('cur');
                $('.logo-nav-sub').eq($(this).index('.logo-nav>ul>.hover')).show().siblings('.logo-nav-sub').hide();
            });
            this.navli.on('mouseout',function () {
                $('.logo-nav>ul>.hover').removeClass('cur');
                $('.logo-nav-sub').hide();
            });


            //启客系列
            $('.logo-nav-inner>ul>li').on('mousemove',function(){
                $(this).css({
                    background: '#f12020'
                }).siblings('.logo-nav-inner>ul>li').css({
                    background: 'rgba(0,0,0,.4)'
                });
                $('.home-inner-secd').eq($(this).index()).show().siblings('.home-inner-secd').hide();
            });
            $('.logo-nav-inner>ul>li').on('mouseout',function(){
                $('.logo-nav-inner>ul>li').css({
                    background: 'rgba(0,0,0,.4)'
                });
                $('.home-inner-secd').hide();
            });
        },
        banner:function(){
            $banner=$('.main-banner');
            $bannerbtn=$('.main-banner-num>a');
            $photo=$('.main-banner>ul>li>img');
            $left=$('.main-banner-left');
            $right=$('.main-banner-right');
        }
    }
});

lunbo:(function(){

    $banner = $('.sh-banner');
    $btns = $('.slideWrap ul li');
    $photo = $('.sh-banner ul img');
    $left = $('.sh-prev');
    $right = $('.sh-next');
    var $num = 0;
    var $timer = null;
    $(this).each(function () {

        //1.点击每一个按钮，其对应索引的图片会显现出来
        $('.slideWrap ul li').on('mouseover', function () {
            $num = $(this).index();
            change();
        });

        //2.鼠标划进sh-banner图左右箭头显现出来
        $('.sh-banner').on('mouseover', function () {
            $('.sh-prev').show();
            $('.sh-next').show();
            clearInterval($timer);
        });
        $('.sh-banner').on('mouseout', function () {
            $('.sh-prev').hide();
            $('.sh-next').hide();
            $timer = setInterval(function () {
                $('.sh-next').click();
            }, 3000);
        });
        //3.点击左右箭头，图片变化
        $('.sh-prev').on('click', function () {
            $num--;
            if ($num < 0) {
                $num = $('.slideWrap ul li').length - 1;
            }
            change();
        });
        $('.sh-next').on('click', function () {
            $num++;
            if ($num > $('.slideWrap ul li').length - 1) {
                $num = 0;
            }
            change();
        });
        
        //4.图片自动轮播
        $timer = setInterval(function () {
            $('.sh-next').click();
        }, 3000);
        
        

        function change() {
            $('.slideWrap ul li').eq($num).addClass('current').siblings('.slideWrap ul li').removeClass('current');
            
            $('.sh-banner ul li').eq($num).stop(true, true).animate({
                opacity: 1
            }).siblings('.sh-banner ul li').stop(true, true).animate({
                opacity: 0
            });
        }
    })
})()