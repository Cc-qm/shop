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
  let cartList = JSON.parse(localStorage.getItem("cartList"));
  console.log(cartList);
  if (!cartList) {
    alert("您的购物车为空！");
  } else {
    bindHtml();
    bindEvent();
  }

  function bindHtml() {
    let selestAll = cartList.every(item => {
      return item.isSelect == true;
    });

    let str = `<div class="car con">
      <div class="car-head">
        <div class="check">
          <input id="sAll"type="checkbox" name="all-select" ${
            selestAll ? "checked" : ""
          }/>全选
        </div>
        <div class="img">&nbsp;</div>
        <div class="name">商品名称</div>
        <div class="price">单价</div>
        <div class="number" id="num">数量</div>
        <div class="total">小计</div>
        <div class="action">操作</div>
      </div>
      <div class="car-body">
      `;

    cartList.forEach(item => {
      str += `<div class="item-box" >
          <div class="check"><input class="select" data-name='${
            item.name
          }'type="checkbox" name="all-select" ${
        item.isSelect ? "checked" : ""
      }/></div>
          <div class="img">
            <img
              src=${item.src}
              alt=""
            />
          </div>
          <div class="name">
            ${item.name}
          </div>
          <div class="price">${item.price}</div>
          <div class="number">
                <img class="sub" data-name='${item.name}'
                  src="https://demo.demohuo.top/jquery/20/2068/demo/images/shangpinxiangqing/X15.png"
                />
                <input class="input" value=${item.number} />
                <img class="add" data-name='${item.name}'
                  src="https://demo.demohuo.top/jquery/20/2068/demo/images/shangpinxiangqing/16.png"
                />
          </div>
          <div class="total">${item.xiaoji}</div>
          <div class="action"><button data-name='${item.name}'>×</button></div>
        </div>`;
    });

    let selectArr = cartList.filter(item => {
      return item.isSelect;
    });
    //选中的总数
    let selectNumber = 0;
    //选中的总价
    let selectPrice = 0;
    selectArr.forEach(item => {
      selectNumber += item.number;
      selectPrice += item.xiaoji * 1;
    });

    str += `
      </div>
    </div>
    <div class="car-foot con">
      <a href="../pages/index.html">继续购物</a>
      <span>共<i>${
        cartList.length
      }</i>总商品，已选择<em>${selectNumber}</em>件</span>
      <button  ${selectArr.length ? "id='buy'" : "disabled"}>去结算</button>
      <span>合计：<em>${selectPrice}</em>元</span>
    </div>`;

    $(".cart").html(str);
  }
  function bindEvent() {
    //全选
    $(".cart").on("change", "#sAll", function() {
      cartList.forEach(item => {
        item.isSelect = this.checked;
      });
      bindHtml();
      localStorage.setItem("cartList", JSON.stringify(cartList));
    });

    //单选
    $(".cart").on("change", ".select", function() {
      let name = $(this).data("name");
      cartList.forEach(item => {
        if (item.name == name) {
          item.isSelect = !item.isSelect;
        }
      });
      bindHtml();
      localStorage.setItem("cartList", JSON.stringify(cartList));
    });

    //减少数量
    $(".cart").on("click", ".sub", function() {
      let name = $(this).data("name");
      cartList.forEach(item => {
        if (item.name == name) {
          item.number > 1 ? item.number-- : "";

          item.xiaoji = item.price * item.number;
        }
      });
      bindHtml();
      localStorage.setItem("cartList", JSON.stringify(cartList));
    });

    // 增加数量
    $(".cart").on("click", ".add", function() {
      let name = $(this).data("name");
      cartList.forEach(item => {
        if (item.name == name) {
          item.number++;

          item.xiaoji = item.price * item.number;
        }
      });
      bindHtml();
      localStorage.setItem("cartList", JSON.stringify(cartList));
    });

    //删除商品
    $(".cart").on("click", ".action button", function() {
      let name = $(this).data("name");
      let i;
      cartList.forEach((item, index) => {
        if (item.name == name) {
          i = index;
        }
      });
      cartList.splice(i, 1);
      bindHtml();
      localStorage.setItem("cartList", JSON.stringify(cartList));
    });
  }
});
