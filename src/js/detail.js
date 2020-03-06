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
    location.href = "../pages/car.html";
  });
});
