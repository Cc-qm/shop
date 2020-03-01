$(() => {
  $("form").validate({
    rules: {
      username: "required",
      password: "required"
    },
    messages: {
      username: "请输入您的账号",
      password: "请输入您的密码"
    },
    submitHandler: function(form) {
      $.post(
        "url",
        $(form).serialize(),
        function(data, textStatus, jqXHR) {
          console.log(data, textStatus);
        },
        "json"
      );
    }
  });
  console.log(111);
});
