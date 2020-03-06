$(() => {
  //判断是否已登录
  $.ajax({
    type: "post",
    url: "/ifloaded",
    dataType: "json",
    success: function(response) {
      if (response.loaded) {
        $(".load>li:eq(0)").html(
          `<a >你好，${decodeURI(Cookie.get("name"))}</a>`
        );
        $(".load>li:eq(1)").html(`<a href="./login.html">注销</a>`);
        //给注销按钮绑定事件
        $(".load>li:eq(1)>a").click(function() {
          $.ajax({
            type: "post",
            url: "/cancel",
            dataType: "json",
            success: function(response) {
              console.log(response);
            }
          });
          alert("已注销该账户，请重新登录！");
        });
      }
    }
  });
});
