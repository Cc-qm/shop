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
              return `<li data-name="${ele.name}">
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
    async: true,
    url: "../lib/data/data.json",
    dataType: "json",
    success: function(res) {
      new XiaoMi(res).init();
      $(".nav-detail>ul").on("click", "li", function() {
        let data = {};
        data.name = $(this).data("name");
        data.src = $(this).find("img")[0].src;
        data.price = $(this)
          .find("p.price")
          .html();

        localStorage.setItem("item_info", JSON.stringify(data));
        location.href = "../pages/detail.html";
      });
    }
  });
  $.ajax({
    async: true,
    type: "get",
    url: "../lib/data/data2.json",
    dataType: "json",
    success: function(res) {
      new Search_box(res).init();
    }
  });

  let flag = true; //是否重新渲染分页按钮
  let q = "手机";
  let sort = 0;
  let list = [];
  let sortBy = "";
  function getList(
    query = "手机",
    currPage = 1,
    main_sort = 0,
    sortBy = "asc"
  ) {
    q = query;
    sort = main_sort;
    let queryString = {};
    if (main_sort == 2) {
      queryString = {
        query: query,
        page_index: currPage,
        page_size: 20,
        filter_tag: 0,
        main_sort: main_sort,
        sort_by: sortBy,
        province_id: 20,
        city_id: 233,
        classIndex: 0
      };
    } else {
      queryString = {
        query: query,
        page_index: currPage,
        page_size: 20,
        filter_tag: 0,
        main_sort: main_sort,
        province_id: 20,
        city_id: 233,
        classIndex: 0
      };
    }

    $.ajax({
      type: "get",
      url: "/xm",
      data: queryString,
      dataType: "jsonp",
      success: function(response) {
        console.log(response);
        if (response.data) {
          list = response.data.pc_list;
          //   console.log("response.data.pc_list", response.data.pc_list);

          if (response.data.pc_list) {
            bindHtml(response.data.pc_list);
            flag && bindPagi(Math.ceil(response.data.total / 20));
          } else {
            $(".goodsList").html(`抱歉！没有找到与“${query}”相关的物品`);
          }
        }
      }
    });
  }

  function bindHtml(item) {
    let html = $.map(item, function(value) {
      let price1 = "";
      if (
        value.commodity_list[0].price == value.commodity_list[0].market_price
      ) {
        price1 = `${value.commodity_list[0].price}元`;
      } else {
        price1 = `${value.commodity_list[0].price}元
            <del>${value.commodity_list[0].market_price}</del>`;
      }
      return `<li data-productid=${value.commodity_list[0].product_id}>
                <img
                    src=${value.commodity_list[0].image}
                    alt=""
                />
                <h2>${value.commodity_list[0].name}</h2>
                <p>${price1}
                 </p>
            </li>`;
    }).join("");

    $(".goodsList>ul").html(html);
  }
  function bindPagi(totalPage) {
    console.log("binpagi");

    flag = false;
    if ($(".M-box3").pagination) {
      $(".M-box3").pagination({
        pageCount: totalPage,
        jump: true,
        coping: true,
        homePage: "首页",
        endPage: "末页",
        prevContent: "<",
        nextContent: ">",
        callback: function(api) {
          console.log(1111111);
          // console.log(search);

          getList(q, api.getCurrent(), sort, sortBy);
        }
      });
    }
  }

  //给搜索框绑定搜索事件
  $("input[type=submit]").click(function(e) {
    flag = true;
    e.preventDefault();
    if (location.href.indexOf("list") != -1) {
      if (
        $(this)
          .prev()
          .val() == ""
      ) {
        getList();
      } else {
        getList(
          $(this)
            .prev()
            .val()
        );
      }
    } else {
      location.href =
        "../pages/list.html?search=" +
        $(this)
          .prev()
          .val();
    }
  });
  $(".search-box").on("click", "li", function() {
    if (location.href.indexOf("list") != -1) {
      getList($(this).text());
    } else {
      location.href = "../pages/list.html?search=" + $(this).text();
    }
  });

  $(".hot").on("click", "span", function() {
    if (location.href.indexOf("list") != -1) {
      getList($(this).text());
    } else {
      location.href = "../pages/list.html?search=" + $(this).text();
    }
  });
  $(".banner-nav").on("click", "a", function(e) {
    flag = true;
    e.preventDefault();
    if (location.href.indexOf("list") != -1) {
      getList(
        $(this)
          .text()
          .trim()
      );
    } else {
      location.href =
        "../pages/list.html?search=" +
        $(this)
          .text()
          .trim();
    }
  });

  $(".header-nav>ul").on("click", "a", function(e) {
    e.preventDefault();
    console.log(this);
    flag = true;
    e.preventDefault();
    if (location.href.indexOf("list") != -1) {
      getList(
        $(this)
          .text()
          .trim()
      );
    } else {
      location.href =
        "../pages/list.html?search=" +
        $(this)
          .text()
          .trim();
    }
  });
  q = decodeURI(location.search.substr(1).split("=")[1]);
  q == "" ? getList() : getList(q);

  $(".goodsList ul").on("click", "li", function() {
    for (let i = 0, len = list.length; i < len; i++) {
      if (list[i].commodity_list[0].product_id == $(this).data("productid")) {
        console.log(list[i].commodity_list[0]);
        let data = {};
        data.name = list[i].commodity_list[0].name;
        data.src = list[i].commodity_list[0].image;
        data.id = $(this).data("productid");
        if (
          list[i].commodity_list[0].price ==
          list[i].commodity_list[0].market_price
        ) {
          data.price = list[i].commodity_list[0].price;
        } else {
          data.price = ` <span>${list[i].commodity_list[0].price}</span>元<del>${list[i].commodity_list[0].market_price}</del>`;
        }

        data.detail = list[i].commodity_list[0].desc;
        localStorage.setItem("item_info", JSON.stringify(data));
        location.href = "../pages/detail.html";
        break;
      }
    }
  });

  $(".filter ul").on("click", "li", function() {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
    // if ($(this).text() == "新品") {
    //   sort = 4;
    //   getList(q, 1, sort);
    // }
    switch ($(this).text()) {
      case "新品":
        sort = 4;
        break;
      case "销量":
        sort = 1;
        break;
      case "价格↑":
        sort = 2;
        sortBy = "dsc";
        $(this).text("价格↓");
        break;
      case "价格↓":
        sort = 2;
        sortBy = "asc";
        $(this).text("价格↑");
        break;
      default:
        sort = 0;
    }
    console.log(q, 1, sort, sortBy);

    getList(q, 1, sort, sortBy);
  });
};
