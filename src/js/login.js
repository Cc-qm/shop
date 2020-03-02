$(() => {
  $(".go-register").click(function(e) {
    e = e || window.event;
    e.preventDefault();
    $(".load-panel")
      .hide()
      .next()
      .show();
  });
  $(".go-load").click(function(e) {
    e = e || window.event;
    e.preventDefault();
    $(".register-panel")
      .hide()
      .prev()
      .show();
  });
  $(".login").validate({
    rules: {
      username: "required",
      password: "required"
    },
    messages: {
      username: "请输入您的账号",
      password: "请输入您的密码"
    },
    submitHandler: function(form) {
      $.ajax({
        type: "post",
        url: "/login",
        data: $(form).serialize(),
        dataType: "json",
        success: function(response) {
          console.log(response);
          if (response.status=="success") {
            alert("登录成功！");
            // location.href = "./index.html";
          } else {
            alert("账号或密码错误，请重新填写或者去注册！");
          }
        }
      });
    }
  });

  jQuery.validator.addMethod(
    "isMobile",
    function(value, element) {
      var length = value.length;
      var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
      return this.optional(element) || (length == 11 && mobile.test(value));
    },
    "请正确填写手机号码"
  );

  $(".register").validate({
    rules: {
      ID: "required",
      name: "required",
      password: {
        required: true,
        rangelength: [8, 16]
        // checkPassStrength:true
      },
      password2: {
        equalTo: "#password"
      },
      phone: "isMobile",
      email: "email"
    },
    messages: {
      ID: "该项为必填项！",
      name: "该项为必填项！",
      password: {
        required: "该项为必填项！"
      },
      password2: "两次输入的密码不一致！"
    },
    submitHandler: function(form) {
      $.ajax({
        type: "post",
        url: "/register",
        data: $(form).serialize(),
        dataType: "json",
        success: function(response) {
          if (response.status) {
            alert("注册成功，请登录！");
            $(".register-panel")
              .hide()
              .prev()
              .show();
          } else {
            alert("该ID已存在，请更改ID，重新注册！");
          }
        }
      });
    }
  });
});
