$(() => {
  $("#header").load("../pages/header.html");

  //   let flag = true;
  //   var search = "手机";
  //   function getList(query = "手机", currPage = 1) {
  //     $.ajax({
  //       type: "get",
  //       url: "/xm",
  //       data: {
  //         query: query,
  //         page_index: currPage,
  //         page_size: 20,
  //         filter_tag: 0,
  //         main_sort: 0,
  //         province_id: 20,
  //         city_id: 233,
  //         classIndex: 0
  //       },
  //       dataType: "jsonp",
  //       success: function(response) {
  //         console.log(response);

  //         if (response.data.pc_list) {
  //           bindHtml(response.data.pc_list);
  //           flag && bindPagi(Math.ceil(response.data.total / 20));
  //         } else {
  //           $(".goodsList").html(`抱歉！没有找到与“${query}”相关的物品`);
  //         }
  //       }
  //     });
  //   }

  //   function bindHtml(item) {
  //     let html = $.map(item, function(value) {
  //       let price = "";
  //       if (
  //         value.commodity_list[0].price == value.commodity_list[0].market_price
  //       ) {
  //         price = `${value.commodity_list[0].price}元`;
  //       } else {
  //         price = `${value.commodity_list[0].price}元
  //             <del>${value.commodity_list[0].market_price}</del>`;
  //       }
  //       return `<li>
  //                 <img
  //                     src=${value.commodity_list[0].image}
  //                     alt=""
  //                 />
  //                 <h2>${value.commodity_list[0].name}</h2>
  //                 <p>${price}
  //                  </p>
  //             </li>`;
  //     }).join("");

  //     $(".goodsList>ul").html(html);
  //   }
  //   function bindPagi(totalPage) {
  //     flag = false;
  //     $(".M-box3").pagination({
  //       pageCount: totalPage,
  //       jump: true,
  //       coping: true,
  //       homePage: "首页",
  //       endPage: "末页",
  //       prevContent: "<",
  //       nextContent: ">",
  //       callback: function(api) {
  //         console.log(1111111);
  //         console.log(search);

  //         getList(search, api.getCurrent());
  //       }
  //     });
  //   }

  //   var search = decodeURI(location.search.substr(1).split("=")[1]);
  //   search == "" ? getList() : getList(search);
});
