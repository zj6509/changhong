let baseUrl = "http://localhost/erjieduan/changhong";

define(['jquery'],function($){
    return{
        code:function(selector){
            $(selector).on('click',function(){
                $.ajax({
                    url:`${baseUrl}/lib/login.php`,
                    type:'post',
                    data:{
                        phone:$('#username').val(),
                        password:$('#password').val()
                    },
                    success:function(res){
                        let script = document.createElement('script');
                        script.innerHTML = res;
                        document.body.appendChild(script);
                    }
                });
            });
        },
        verify:function(){
            $('#loginTabDiv1').on('click',function(){
                $(this).css({
                    background: '#fff',
                    color: '#000'
                });
                $('#loginTabDiv2').css({
                    background: '#dfe4e8',
                    color: '#8e98a0'
                });
                $('#loginDiv2,#passwordDiv').show();
                $('#loginDiv1,#verifiCodeDiv').hide();
            });
            $('#loginTabDiv2').on('click',function(){
                $(this).css({
                    background: '#fff',
                    color: '#000'
                });
                $('#loginTabDiv1').css({
                    background: '#dfe4e8',
                    color: '#8e98a0'
                });
                $('#loginDiv1,#verifiCodeDiv').show();
                $('#loginDiv2,#passwordDiv').hide();
            });
        }
    }
});