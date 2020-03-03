window.onload = function() {
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

  class XiaoMi {
    constructor(data) {
      this.data = data;
    }
    // 初始化
    init() {
      // 创建标签
      this.createElements();

      //给banner上面的列表添加鼠标移入事件
      this.onMouse2BannerNav();

      //给第一层导航列表的子菜单列表添加鼠标移入移出事件
      this.onMouse2NAvDetail();

      //给购物车添加鼠标移入移出事件
      this.onMouse2Shop();
    }
    // 创建标签
    createElements() {
      //创建第一层导航列表
      this.createNav();

      // 创建banner上面的列表
      this.createBannerNav();

      //创建第一层导航列表的子菜单列表
      this.createNAvDetail();
    }

    //创建第一层导航列表
    createNav() {
      $(".header-nav>ul")
        .eq(0)
        .html(
          this.data.map(ele => {
            return ` <li><a href="#">${ele.title}</a></li>`;
          })
        );
    }

    // 创建banner上面的列表
    createBannerNav() {
      // 获取第一个li
      let liArr = this.data[0].detail.map(ele => {
        let num = Math.ceil(ele.product.length / 6);

        let html1 = ele.product
          .map(ele => {
            return `<a href="#">
                        <img src=${ele.img} />
                        <span>${ele.name}</span>
                    </a>`;
          })
          .join("");

        return `<li>
                    <a href="#">${
                      ele.type
                    }<i class="iconfont icon-jiantou"></i></a>
                    <div class="detail" style="width:${num * 248}px">
                        ${html1}
                    </div>
                </li>`;
      });

      $(".header-nav>ul>li:eq(0)").append(
        $("<ul class='banner-nav'></ul>").html(liArr)
      );
    }

    //给banner上面的列表添加鼠标移入移出事件
    onMouse2BannerNav() {
      $(".banner-nav>li").hover(
        function() {
          $(this)
            .children(".detail")
            .css("display", "flex");
        },
        function() {
          $(this)
            .children(".detail")
            .css("display", "none");
        }
      );
    }

    //创建第一层导航列表的子菜单列表
    createNAvDetail() {
      this.data.shift();
      // console.log(this.data);

      let htmlArr = this.data.map(ele => {
        if (ele.product) {
          let html1 = ele.product
            .map(ele => {
              return `<li>
                        <a href="#">
                            <img src=${ele.img}>
                            <p>${ele.name}</p>
                            <p class="price">${ele.price}</p>
                        </a>
                    </li>`;
            })
            .join("");

          return `<ul class="con">
                                ${html1}
                            </ul>`;
        }
      });
      // console.log(htmlArr);
      $(".nav-detail").html(htmlArr);
    }

    //给第一层导航列表的子菜单列表添加鼠标移入移出事件
    onMouse2NAvDetail() {
      let obj = this;
      $(".header-nav>ul>li").hover(function() {
        // console.log($(this).index());
        obj.index = $(this).index() - 1;
        // console.log(obj.index + "!!!!!!!!!");
        if ($(this).index() < 8 && $(this).index() > 0) {
          $(".nav-detail ul")
            .eq($(this).index() - 1)
            .toggle();
          $(".nav-detail")
            .stop()
            .slideToggle(300);
        }
      });

      $(".nav-detail").hover(function() {
        // console.log(obj.index);
        if (obj.index < 7 && obj.index > -1) {
          $(".nav-detail ul")
            .eq(obj.index)
            .toggle();
          $(this)
            .stop()
            .slideToggle(300);
          // console.log($(".nav-detail ul").eq(obj.index));
        }
      });
    }

    //给购物车添加鼠标移入移出事件
    onMouse2Shop() {
      $(".load div").hover(function() {
        $(this)
          .children("p")
          .css("color", "#000");
        $(this)
          .children("p")
          .stop()
          .slideToggle();
      });
    }
  }
  class Search_box {
    constructor(data) {
      this.data = data;
    }
    init() {
      this.createElements();
    }
    createElements() {
      let arr = this.data.map(ele => {
        return `<li>${ele}</li>`;
      });
      $(".search-box").html(arr);
    }
  }
  $.ajax({
    type: "get",
    async: false,
    url: "../lib/data/data.json",
    dataType: "json",
    success: function(res) {
      new XiaoMi(res).init();
    }
  });
  $.ajax({
    async: false,
    type: "get",
    url: "../lib/data/data2.json",
    dataType: "json",
    success: function(res) {
      new Search_box(res).init();
    }
  });
};
