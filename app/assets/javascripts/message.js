$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="contents__chat__messages__message" data-id="${message.id}">
                  <div class="contents__chat__messages__message__upper">
                    <p class="contents__chat__messages__message__upper-user">
                      ${message.user_name}
                    </p>
                    <p class="contents__chat__messages__message__upper-date">
                      ${message.date}
                    </p>
                  </div>
                  <p class="contents__chat__messages__message-text">
                    ${content}
                    ${img}
                  </p>
                </div>`
  return html;
  }
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