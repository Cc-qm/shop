"use strict";$(function(){$("#header").load("../pages/header.html"),$(".Xcontent33").click(function(){var e=1*$(".input").val()+1;$(".input").val(e)}),$(".Xcontent32").click(function(){var e=$(".input").val();0<e&&$(".input").val(e-1)});var i=JSON.parse(localStorage.getItem("item_info"));i?(i.detail&&$(".Xcontent20").html(i.detail),$(".title").text(i.name),$(".Xcontent06 img")[0].src=i.src,$(".Xcontent14 p").html(i.name),$(".Xcontent19 span").html(i.price)):alert("商品信息为空！"),$(".my-foto").imagezoomsl({descarea:".my-container",zoomrange:[1,12],magnifiereffectanimate:"fadeIn",magnifierborder:"none"}),$(".Xcontent34 input").click(function(){$.ajax({type:"post",url:"/ifloaded",dataType:"json",success:function(e){if(e.loaded){var t=JSON.parse(localStorage.getItem("cartList"))||[];if(t.some(function(e){return e.name==i.name}))for(var n=0,a=t.length;n<a;n++)t[n].name==i.name&&(t[n].number++,t[n].xiaoji=t[n].number*t[n].price);else i.number=1,i.isSelect=!1,i.price=i.price.split("</span>")[0].replace(/[^0-9]/gi,""),i.xiaoji=i.price,t.push(i);localStorage.setItem("cartList",JSON.stringify(t)),alert("已加入购物车~")}else alert("您还没有登录，请登录在加入购物车！"),location.href="../pages/login.html"}})})});