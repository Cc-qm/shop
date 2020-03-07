$(() => {
  $("#header").load("../pages/header.html");
  $(".Xcontent33").click(function() {
    let value = $(".input").val() * 1 + 1;
    $(".input").val(value);
  });

  $(".Xcontent32").click(function() {
    let num = $(".input").val();
    if (num > 0) {
      $(".input").val(num - 1);
    }
  });
  let item = JSON.parse(localStorage.getItem("item_info"));
  if (item) {
    if (item.detail) {
      $(".Xcontent20").html(item.detail);
    }
    $(".title").text(item.name);
    $(".Xcontent06 img")[0].src = item.src;
    $(".Xcontent14 p").html(item.name);
    $(".Xcontent19 span").html(item.price);
  } else {
    alert("商品信息为空！");
  }
  $(".my-foto").imagezoomsl({
    descarea: ".my-container",
    zoomrange: [1, 12],
    magnifiereffectanimate: "fadeIn",
    magnifierborder: "none"
  });
  $(".Xcontent34 input").click(function() {
    //判断是否已登录
    $.ajax({
      type: "post",
      url: "/ifloaded",
      dataType: "json",
      success: function(response) {
        if (response.loaded) {
          //   console.log("已登录");
          let cartList = JSON.parse(localStorage.getItem("cartList")) || [];

          let exits = cartList.some(value => {
            return value.name == item.name;
          });
          if (exits) {
            for (let i = 0, len = cartList.length; i < len; i++) {
              if (cartList[i].name == item.name) {
                cartList[i].number++;
                cartList[i].xiaoji = cartList[i].number * cartList[i].price;
              }
            }
          } else {
            item.number = 1;
            item.isSelect = false;

            item.price = item.price.split("</span>")[0].replace(/[^0-9]/gi, "");
            item.xiaoji = item.price;
            cartList.push(item);
          }

          localStorage.setItem("cartList", JSON.stringify(cartList));
          alert("已加入购物车~");
        } else {
          alert("您还没有登录，请登录在加入购物车！");
          location.href = "../pages/login.html";
        }
      }
    });
  });
});
