$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="contents__chat__messages__message" data-message-id="${message.id}">
                  <div class="contents__chat__messages__message__upper">
                    <p class="contents__chat__messages__message__upper-user">
                      ${message.user_name}
                    </p>
                    <p class="contents__chat__messages__message__upper-date">
                      ${message.created_at}
                    </p>
                  </div>
                  <p class="contents__chat__messages__message-text">
                    ${content}
                    ${image}
                  </p>
                </div>`
  return html;

  };

  var reloadMessages = function() {
    // 現在のURLを取得してmatch関数で一致していれば、reloadMessages関数を動かす。
    
    if(document.URL.match(/messages/)) {
      console.log("test")
    last_message_id = $('.contents__chat__messages__message:last').data("message-id");
    $.ajax({
      url: "api/messages", 
      type: 'get',
      dataType: 'json',
      data: {last_id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = buildHTML(message);
        $('.contents__chat__messages').append(insertHTML);
      })
      scrollBottom();
    })
    .fail(function() {
      alert('エラーが発生したため自動更新に失敗しました');
    });
  };
}
  setInterval(reloadMessages, 5000);

  function scrollBottom(){
    var target = $('.contents__chat__messages__message').last();
    var position = target.offset().top + $('.contents__chat__messages').scrollTop();
    $('.contents__chat__messages').animate({
      scrollTop: position
    }, 300, 'swing');
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.contents__chat__messages').append(html);
      $('#new_message')[0].reset();
      scrollBottom();
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.contents__chat__bottom__form-box-submit').prop('disabled', false);
    })
  })

});