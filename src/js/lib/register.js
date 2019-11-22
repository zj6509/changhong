let baseUrl = "http://localhost/erjieduan/changhong";



define(['jquery','md5'],function($){
    return{
        regis:function(){
                $.ajax({
                    url:`${baseUrl}/lib/register.php`,
                    type:'post',
                    data:{
                        phone: $('.phone').val(),
                        password:$.md5($('.password').val()),
                        right: $.md5($('.right').val())
                    },
                    success:function (res){
                        let script=$('<script></script>');
                        script.html(res);
                        $('body').append(script);
                    }
                })
        },
        verify:function(){

            let phoneflag=true;
            let passflag=true;
            let rightflag=true;
            let picflag=true;
            let _this=this;


            //1.手机号码
            $('.phone').on('blur',function(){
                let reg=/^1[3578]\d{9}$/;
                if($(this).val()!==''){
                    if(reg.test($(this).val())){
                        $(this).next().show();
                        $(this).next().next().hide();
                        phoneflag=true;
                    }else{
                        $(this).next().next().show();
                        $(this).next().next().html('不是正确的手机号');
                        phoneflag=false;
                    }
                }else{
                    $(this).next().next().show().html('请输入手机号');
                    phoneflag=false;
                }
            });
            //2.密码
            $('.password').on('blur',function(){
                let reg=/^[a-z0-9_-]{6,18}$/;
                if($(this).val()!==''){
                    if(reg.test($(this).val())){
                        $(this).next().show();
                        $(this).next().next().next().hide();
                        passflag=true;
                    }else{
                        $(this).next().hide();
                        $(this).next().next().hide();
                        $(this).next().hide();
                        $(this).next().next().next().show().html('长度在8~16之间，必须包含字母和数字');
                        passflag=false;
                    }
                }else{
                    $(this).next().next().hide();
                    $(this).next().next().next().show().html('请输入密码');
                    passflag=false;
                }
            });

            //3.密码是否一样
            $('.right').on('blur',function(){
                if($(this).val()!==''){
                    if($(this).val()==$('.password').val()){
                        $(this).next().show();
                        $(this).next().next().hide();
                        rightflag=true;
                    }else{
                        $(this).next().hide();
                        $(this).next().next().show().html('两次密码不一致');
                        rightflag=false;
                    }
                }else{
                    $(this).next().next().show().html('请确认密码');
                    rightflag=false;
                }
            });

            //4.图形验证码
            $('.code').on('blur',function(){
                var reg=/^[a-z0-9]{4}$/;
                if($(this).val()!==''){
                    if(reg.test($(this).val())){
                        $(this).next().next().next().show();
                        $(this).next().next().next().next().hide();
                        picflag=true;
                    }else{
                        $(this).next().next().next().next().show().html('验证码不正确');
                        $(this).next().next().next().hide();
                        picflag=false;
                    }
                }else{
                    $(this).next().next().next().next().show().html('验证码不能为空');
                    picflag=false;
                }
            });

            //5.提交
            $('.submit').on('click',function(){
                if($('.phone').val()==''){
                    $('.phone').next().next().show().html('请输入手机号');
                    phoneflag=false;
                }
                if($('.password').val()==''){
                    $('.password').next().next().hide();
                    $('.password').next().next().next().show().html('请输入密码');
                    passflag=false;
                }
                if($('.right').val()==''){
                    $('.right').next().next().show().html('请确认密码');
                    passflag=false;
                }
                if($('.code').val()==''){
                    $('.code').next().next().next().next().show().html('验证码不能为空');
                    picflag=false;
                }
                if(phoneflag&&passflag&&rightflag&&picflag){
                    _this.regis();
                }else{
                    
                    return false;
                }
            });
            
        }
    }
});
