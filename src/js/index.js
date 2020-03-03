$(() => {
  $("#header").load("../pages/header.html");

  $.ajax({
    type: "get",
    url: "../lib/data/data1.json",
    dataType: "json",
    success: function(res) {
      new BannerManager(
        res,
        1226,
        460,
        document.querySelector(".banner")
      ).init();
    }
  });

  //轮播图2
  class BannerManager2 {
    constructor(data) {
      this.data = data;
      this.index = 0;
      this.len = data.length;
    }
    init() {
      this.createElements();
      this.onEvent2Element();
    }
    createElements() {
      let html = this.data
        .map(ele => {
          return ` <li style="border-top-color:rgb(${this.randomNum()},${this.randomNum()},${this.randomNum()})">
                        <img src=${ele.img} >
                        <h3>${ele.name}</h3>
                        <p>${ele.detail}</p>
                        <p class="price2">
                            ${ele.price}
                        </p>
                    </li>`;
        })
        .join("");
      $(".banner2 ul").html(html);
    }
    randomNum() {
      return Math.round(Math.random() * 255);
    }
    onEvent2Element() {
      $(".banner2 ul").css("width", 248 * this.data.length - 14 + "px");
      this.autoPlayer();
      this.addClickEvent2Button();
      this.addMouseEvent();
    }
    autoPlayer() {
      this.timer = setInterval(() => {
        this.next();
      }, 2000);
    }
    addClickEvent2Button() {
      $(".control").click(event => {
        // console.log($(event.target).data("num"));
        if ($(event.target).data("num") == "1") {
          this.prev();
        } else if ($(event.target).data("num") == "2") {
          this.next();
        }
      });
    }
    next() {
      this.index += 4;
      // console.log(this.index);
      if (this.index > this.len - 4 && this.index < this.len) {
        this.index = this.len - 4;
      } else if (this.index == this.len) {
        this.index = 0;
      }
      $(".banner2 ul").css("left", -this.index * 248 + "px");
    }
    prev() {
      this.index -= 4;
      if (this.index < 0 && this.index > -4) {
        this.index = 0;
      } else if (this.index == -4) {
        this.index = this.len - 4;
      }
      $(".banner2 ul").css("left", -this.index * 248 + "px");
    }
    addMouseEvent() {
      $(".banner2 ul").hover(
        () => clearInterval(this.timer),
        () => this.autoPlayer()
      );

      $(".control").hover(
        () => clearInterval(this.timer),
        () => this.autoPlayer()
      );
    }
  }

  //选项卡
  class Select {
    constructor(data) {
      this.data = data;
    }
    init() {
      this.createElements();
      this.onMouseEvent2TabElement();
    }
    //创建标签
    createElements() {
      let node = $("<div class='list con'></div>");
      let tabHtml = this.data.more
        .map((ele, index) => {
          if (index == 0) {
            return `<li><a href="#" id="select">${ele}</a></li>`;
          } else {
            return `<li><a href="#">${ele}</a></li>`;
          }
        })
        .join("");
      // console.log(tabHtml);
      if (this.data.more.length == 0) {
        tabHtml = `<li id="more">查看全部</li>`;
      }
      let adHtml = this.data.ad
        .map(ele => {
          if (this.data.ad.length == 1) {
            return `<img src=${ele} style="height:614px">`;
          } else return `<img src=${ele}>`;
        })
        .join("");
      // console.log(adHtml);

      let productHtml = this.data.product
        .map((ele, index) => {
          let len = ele.length;
          let ulIndex = index;
          let ulHtml = ele
            .map((item, index1) => {
              if (index1 == len - 1 && item.name == null) {
                return ` <li id='last-li'>
                                浏览更多
                                <small>${this.data.more[ulIndex]}</small>
                            </li>`;
              } else if (index1 == 7 && len == 9) {
                return `<li id='last-li-pro'>
                        <img src=${item.img} id='small-img'>
                        <h3>${item.name}</h3>
                        <p></p>
                        <p class="price2">${item.price}</p>
                        </li>`;
              } else {
                return `<li>
                    <img src=${item.img}>
                    <h3>${item.name}</h3>
                    <p>${item.detail}</p>
                    <p class="price2">${item.price}</p>
                    </li>`;
              }
            })
            .join("");
          if (index == 0) {
            return `<ul id="active">
                        ${ulHtml}
                    </ul>`;
          } else {
            return `<ul>
                ${ulHtml}
            </ul>`;
          }
        })
        .join("");

      let html = `<div class="list-header">
                    <h2 class="title">${this.data.title}</h2>
                    <ul>
                    ${tabHtml}
                    </ul>
                </div>
                <div class="list-content">
                    <div class="content-left">
                    ${adHtml}
                    </div>
                    <div class="content-right">
                    ${productHtml}
                    </div>
                </div>`;
      node.html(html);
      $("#list").append(node);
    }
    //添加事件
    onMouseEvent2TabElement() {
      $(".list-header ul li").each((index, item) => {
        $(item).mouseenter(function() {
          $(this)
            .children()
            .attr("id", "select");
          $(this)
            .siblings()
            .children()
            .attr("id", "");
          $(".content-right ul")
            .eq(index)
            .attr("id", "active");
          $(".content-right ul")
            .eq(index)
            .siblings()
            .attr("id", "");
        });
      });
    }
  }

  //广告位
  class AD {
    constructor(data) {
      this.data = data;
    }
    init() {
      this.createElements();
    }
    createElements() {
      let imgNode = $("<div class='new con'>");
      let html = `<a href="#">
                        <img src=${this.data}></a>`;
      imgNode.html(html);
      $("#list").append(imgNode);
    }
  }

  $.ajax({
    type: "get",
    url: "../lib/data/data3.json",
    dataType: "json",
    success: function(res) {
      new BannerManager2(res).init();
    }
  });

  let ad = [
    "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/11fc2ced4d8b5a924633f9a5b59f9fd2.jpg?w=2452&h=240",
    "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/41d16e66381cfeda7b6b39ab67678d5e.jpg?w=2452&h=240",
    "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/e48a0ce5d87d3648beee6d7a8b813f24.jpg?w=2452&h=240",
    "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/4d739d7a2c017a287a689c9702ec3b20.jpg?w=2452&h=240",
    "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/89c2a209b742fce9b10d9d196149d634.jpg?w=2452&h=240",
    "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/10fb0086cb21120c53248a3d8cc56dc5.jpg?w=2452&h=240",
    "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/88e35cffc82cd98cd53172460067af17.jpg?w=2452&h=240"
  ];

  new AD(ad[0]).init();
  $.ajax({
    type: "get",
    async: false,
    url: "../lib/data/selectdata1.json",
    dataType: "json",
    success: function(res) {
      new Select(res).init();
    }
  });

  new AD(ad[1]).init();
  $.ajax({
    type: "get",
    async: false,
    url: "../lib/data/selectdata2.json",
    dataType: "json",
    success: function(res) {
      new Select(res).init();
    }
  });

  new AD(ad[2]).init();
  $.ajax({
    type: "get",
    async: false,
    url: "../lib/data/selectdata3.json",
    dataType: "json",
    success: function(res) {
      new Select(res).init();
    }
  });

  new AD(ad[3]).init();
  $.ajax({
    type: "get",
    async: false,
    url: "../lib/data/selectdata4.json",
    dataType: "json",
    success: function(res) {
      new Select(res).init();
    }
  });

  new AD(ad[4]).init();
  $.ajax({
    type: "get",
    async: false,
    url: "../lib/data/selectdata5.json",
    dataType: "json",
    success: function(res) {
      new Select(res).init();
    }
  });

  new AD(ad[5]).init();
  $.ajax({
    type: "get",
    async: false,
    url: "../lib/data/selectdata6.json",
    dataType: "json",
    success: function(res) {
      new Select(res).init();
    }
  });
  new AD(ad[6]).init();
});
