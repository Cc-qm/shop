/*
 * @Author: cai
 * @Date: 2020-03-03 16:38:52
 * @Last Modified by:   cai
 * @Last Modified time: 2020-03-03 16:38:52
 */
class BannerManager {
  constructor(data, width = 700, height = 350, root = document.body) {
    this.width = width;
    this.height = height;
    this.root = root;
    this.data = data;
    this.slider = null;
    this.sliderBox = null;
    this.sliderControl = null;
    this.sliderNav = null;

    this.index = 0; //当前的索引
    this.lastItem = null; //当前焦点按钮
    this.len = this.data.length; //轮播图的数量
    this.sliderWidth = null; //每一个轮播图的宽度
    this.timer = null; //轮播图定时器
  }
  init() {
    this.createHTML();
    this.autoPlayer();
    this.addClickEventHandler();
    this.addClickEventHandlerWithSliderNavItem();
    this.addMouseEvent();
  }
  createHTML() {
    let html1 = this.data
      .map((ele, index) => {
        return ` <li class="slider-box-item" style="width:${this.width}px"> <img src=${ele} ></li>`;
      })
      .join("");
    let html2 = this.data
      .map((ele, index) => {
        return `<li class="slider-nav-item">${index + 1}</li>`;
      })
      .join("");
    let html = `<div class="slider" style="width:${this.width}px;height:${
      this.height
    }px">
                        <ul class="slider-box" style="left:0;width:${this.len *
                          this.width}px">
                            ${html1}
                        </ul>
                        <div class="slider-control">
                            <span class="prev">&lt;</span> 
                            <span class="next">&gt;</span>
                        </div>
                        <ol class="slider-nav">
                            ${html2}
                        </ol>
                    </div>`;

    this.root.innerHTML = html;
    this.slider = this.root.querySelector(".slider");
    this.sliderBox = this.root.querySelector(".slider-box");
    this.sliderControl = this.root.querySelector(".slider-control");
    this.sliderNav = this.root.querySelector(".slider-nav");
    this.sliderWidth = this.width;
    this.switchNavItem();
  }
  autoPlayer() {
    this.timer = setInterval(() => {
      this.next();
    }, 2000);
  }
  addClickEventHandler() {
    this.sliderControl.onclick = e => {
      if (e.target.className == "prev") {
        this.prev();
      } else if (e.target.className == "next") {
        this.next();
      }
    };
  }
  prev() {
    this.index--;
    if (this.index < 0) {
      this.index = this.len - 1;
    }
    this.switchNavItem();
    this.sliderBox.style.left = -this.index * this.sliderWidth + "px";
  }
  next() {
    this.index++;
    if (this.index > this.len - 1) {
      this.index = 0;
    }
    this.switchNavItem();
    this.sliderBox.style.left = -this.index * this.sliderWidth + "px";
  }
  addClickEventHandlerWithSliderNavItem() {
    this.sliderNav.onclick = e => {
      if (e.target.className == "slider-nav-item") {
        // console.log(e.target.innerText);
        this.index = e.target.innerText - 1;
        this.switchNavItem();
        this.sliderBox.style.left = -this.index * this.sliderWidth + "px";
      }
    };
  }
  //改变焦点按钮样式
  switchNavItem() {
    if (this.lastItem) this.lastItem.className = "slider-nav-item";
    this.sliderNav.children[this.index].className = "slider-nav-item active";
    this.lastItem = this.sliderNav.children[this.index];
    // console.log(this.sliderNav.children);
  }
  addMouseEvent() {
    this.slider.onmouseenter = () => {
      clearInterval(this.timer);
    };
    this.slider.onmouseleave = () => {
      this.autoPlayer();
    };
  }
}
