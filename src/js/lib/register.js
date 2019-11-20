let baseUrl = "http://localhost/erjieduan/changhong";



define(['jquery'],function($){
    return{
        regis:function(selector){
            $(selector).on('click',function(){
                $.ajax({
                    url:`${baseUrl}/lib/register.php`,
                    type:'post',
                    data:{
                        phone: $('.phone').val(),
                        password:$('.password').val(),
                        right: $('.right').val()
                    }
                });
            });
        },
        verify:function(){
            //1.手机号码
            $('.phone').on('blur',function(){
                console.log(2);
                let reg=/^1[3578]\d{9}$/;
                if($(this).val()!==''){
                    if(reg.test($(this).val())){
                        $(this).next().show();
                        $(this).next().next().hide();
                    }else{
                        $(this).next().next().show();
                        $(this).next().next().html('不是正确的手机号');
                    }
                }else{
                    $(this).next().next().show().html('请输入手机号');
                }
            });
            //2.密码
            $('.password').on('blur',function(){
                let reg=/^[a-z0-9_-]{6,18}$/;
                if($(this).val()!==''){
                    if(reg.test($(this).val())){
                        $(this).next().show();
                        $(this).next().next().next().hide();
                    }else{
                        $(this).next().hide();
                        $(this).next().next().hide();
                        $(this).next().hide();
                        $(this).next().next().next().show().html('长度在8~16之间，必须包含字母和数字');
                    }
                }else{
                    $(this).next().next().hide();
                    $(this).next().next().next().show().html('请输入密码');
                }
            });

            //3.密码是否一样
            $('.right').on('blur',function(){
                if($(this).val()!==''){
                    if($(this).val()==$('.password').val()){
                        $(this).next().show();
                        $(this).next().next().hide();
                    }else{
                        $(this).next().hide();
                        $(this).next().next().show().html('两次密码不一致');
                    }
                }else{
                    $(this).next().next().show().html('请确认密码');
                }
            });

            //4.验证码
            $('.code').on('blur',function(){
                var reg=/^[a-z0-9]{4}$/;
                if($(this).val()!==''){
                    if(reg.test($(this).val())){
                        $(this).next().next().next().show();
                        $(this).next().next().next().next().hide();
                    }else{
                        $(this).next().next().next().next().show().html('验证码不正确');
                        $(this).next().next().next().hide();
                    }
                }else{
                    $(this).next().next().next().next().show().html('验证码不能为空');
                }
            });
        }
    }
});