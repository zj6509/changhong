# changhong
//目录
        //一.前端：src目录
        //css script...
        //index.html 商品目录
        //details.html 商品目录的详情页面
        //cart.html 显示购物车页面
        //1.首页渲染商品列表(后端数据接口)

        //2.点击商品列表里面的商品，进入详情页。所有的商品进入同一个商品详情页。
        //思路：
        //点击商品--将当前的商品的id传给details页面(a标签实现)
        //将商品的id传给后端
        //获取后端当前id对应的数据接口
        //渲染详情页的数据

        //3.点击加入购物车按钮。
        //点击加入购物车按钮将商品数量和商品的id添加到cookie中。
        //第一次添加将当前商品的id和数量添加到cookie中。
        //从第二次开始，后面的每次添加都通过商品的id找到商品的数量+当前再次添加的数量添加到cookie中。
        
        //4.新建购物车列表页面，渲染商品列表
        //获取对应的cookie(商品的id和数量)
        //4.1获取cookie的id和数量，拼接整个的列表。
        //4.2获取cookie的id和数量，克隆列表。



        //二.后端：php目录
        //1.商品数据库js1909--商品的信息表
        //2.给前端输出接口。
        //3.新建页面--接收详情页的id，根据id返回对应的数据接口。