let baseUrl = "http://localhost/erjieduan/changhong";

define(['jquery','jqlazyload'], function () {
    return {
        renderer: function () {
            $.ajax({
                url: `${baseUrl}/lib/goods.php`,
                type: 'get',
                dataType: 'json',
                success: function (res) {
                    let html = '';
                    let htmlstr='';
                    res.forEach(elm => {
                        let pic = JSON.parse(elm.photo);
                        html += `
                        <div class="home-ele-f ">
                        <div class="home-ele-img">
                            <a href="${baseUrl}/src/html/detail.html?id=${elm.id}">
                                <img class="lazy" alt="" data-original="${baseUrl}/src/${pic[0].index}" >
                            </a>
                        </div>
                        <div class="home-ele-text" r3code="CH5012137">
                            <h1><a href="${baseUrl}/src/html/detail.html?id=${elm.id}" target="" title="${elm.title}">${elm.title}</a>
                            </h1>
                            <p>${elm.sltitle}</p>
                            <h2>￥${elm.price}</h2>
                        </div>
                    </div>`;

                    htmlstr+=`
                    <div class="home-ele-f ">
                            <div class="home-ele-img">
                                <a href="javascript:;" target="">
                                    <img class="lazy" alt="" data-original="${baseUrl}/src/${pic[0].second}">
                                </a>
                            </div>
                            <div class="home-ele-text" r3code="CH5012137">
                                <h1><a href="javascript:;" target="" title="${elm.stitle}">${elm.stitle}</a>
                                </h1>
                                <p>${elm.ssltitle}</p>
                                <h2>￥${elm.sprice}</h2>
                            </div>
                        </div>`;
                    });
                    $('.home-second').append(htmlstr);
                    $('.home-common').append(html);
                    $(function () { //页面加载完成
                        $("img.lazy").lazyload({
                            effect: "fadeIn" //效果方式
                        });
                    });
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
        },
        banner: function () {
            $banner = $('.main-banner');
            $bannerbtn = $('.main-banner-num>a');
            $photo = $('.main-banner>ul>li');
            $left = $('.main-banner-left');
            $right = $('.main-banner-right');
            var $num = 0;
            var $timer = null;



            $(this).each(function () {

                //1.点击每一个按钮，其对应索引的图片会显现会显现出来
                $('.main-banner-num>a').on('click', function () {

                    $num = $(this).index();
                    change();
                });

                //2.鼠标划进banner板块箭头显现出来
                $('.main-banner').on('mousemove', function () {
                    $('.main-banner-left,.main-banner-right').show();
                    clearInterval($timer);
                });

                //移除箭头隐藏
                $('.main-banner').on('mouseout', function () {
                    $('.main-banner-left,.main-banner-right').hide();
                });

                //3.点击箭头相应变化
                $('.main-banner-left').on('click', function () {
                    $num--;
                    if ($num < 0) {
                        $num = $('.main-banner>ul>li').length - 1;
                    }
                    change();
                });

                $('.main-banner-right').on('click', function () {
                    $num++;
                    if ($num > $('.main-banner>ul>li').length - 1) {
                        $num = 0;
                    }
                    change();
                });

                //4.自动轮播
                $timer = setInterval(function () {
                    $('.main-banner-right').click();
                }, 1900);

                function change() {
                    $('.main-banner-num>a').eq($num).addClass('cur').siblings('.main-banner-num>a').removeClass('cur');

                    $('.main-banner>ul>li').eq($num).stop(true, true).animate({
                        opacity: 1
                    }).siblings('.main-banner>ul>li').stop(true, true).animate({
                        opacity: 0
                    });
                }
            });
            $(function () { //页面加载完成
                $("img.lazy").lazyload({
                    effect: "fadeIn" //效果方式
                });
            });
        },
        //楼梯效果
        louti: function () {
            this.photo = $('.advertising');
            this.tabnav = $('.kind');
            this.tabli = $('.kind ul li');
            this.makeup = $('.hoseries');
            this.backTop = $('.sustop');
            let flag = true;


            let _this = this;
            //1.当大于第四块的top值的时候，右边的列表显现出来
            const $top = _this.photo.offset().top;
            let $tabtop = $(window).scrollTop();
            if ($tabtop > $top) {
                _this.tabnav.show();
                _this.backTop.show();
            } else {
                _this.tabnav.hide();
            }
            $(window).on('scroll', function () {
                const $top = _this.photo.offset().top;
                let $tabtop = $(window).scrollTop();
                if ($tabtop > $top) {
                    _this.tabnav.show();
                } else {
                    _this.tabnav.hide();
                }

                //4.拖动滚轮的时候，楼梯与楼层对应
                //利用楼层的top值进行判断
                if (flag) {
                    _this.makeup.each(function (index, element) {
                        let $makeuptop = _this.makeup.eq(index).offset().top + $(element).height() / 2;
                        if ($makeuptop > $tabtop) {
                            _this.tabli.removeClass('active');
                            _this.tabli.eq(index).addClass('active');
                            return false;
                        }
                    });
                }

            });



            
                //2.当点击列表中每一项的时候，显示右侧对应的楼层
                _this.tabli.on('click', function () {
                    flag=false;
                    $(this).addClass('active').siblings('li').removeClass('active');
                    //获取每个楼层对应的top值
                    let $makeuptop = _this.makeup.eq($(this).index()).offset().top;
                    $('html,body').animate({
                        scrollTop: $makeuptop//滚动条距离顶部的距离设置成楼层距离顶部的距离
                    },function(){
                        flag=true;
                    });
                });


            //3.回到顶部
            _this.backTop.on('click', function () {
                $('html,body').animate({
                    scrollTop: 0
                });
            });
        }
    }
});
