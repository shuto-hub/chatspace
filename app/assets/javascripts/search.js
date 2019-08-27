$(function() {

　function buildResult(user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
              return html;
}

　function buildAddUser(name, user_id){
  var html = `<div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                <p class='chat-group-user__name'>${name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
              return html;
}

  $(document).on('turbolinks:load', function(){
    $("#user-search-field").on("input", function() {
      var input = $("#user-search-field").val();
      if (input.length === 0) {
        $("#user_search_result").empty();
        preventDefault();
      }
      $.ajax({
      url: '/users/search',
      type: 'GET',
      data: { keyword: input },
      dataType: 'json'
      })
      .fail(function(){
        alert('エラーが発生したためユーザー検索に失敗しました。');
      })
      .done(function(users) {
      $("#user_search_result").empty();
      $(users).each(function(i,user){
        var html = buildResult(user);
        $('#user_search_result').append(html);
        });
      });
    });
  


    $(document).on("click", ".user-search-add", function(){
      var name = $(this).data("user-name");
      var user_id = $(this).data("user-id");
      $(this).parent().remove();
      var html = buildAddUser(name, user_id);
      $('#member_add_result').append(html);
    });
    　$(document).on("click", '.user-search-remove', function() {
      $(this).parent().remove();
    });
  });
});