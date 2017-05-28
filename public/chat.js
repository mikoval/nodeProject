var Name = "";
$(document).ready(function(){

    $("#link-share").html(window.location.href)

    $('#chat-input').keyup(function(e){
        if(e.keyCode == 13)
        {
            sendText($(this).val())
            $(this).val("")
        }
    });
    $('#name-input').keyup(function(e){
        if(e.keyCode == 13)
        {
            Name = ($(this).val())
            $("#name-input-container").hide();
            $("#chat-input").show();
        }
    });
    $(".submit-name").on("click", function(){
        Name = $(".name-box").val();
        $(".menu-item").hide();
    });
    
})
function sendText(text){
        text = Name + ": " + text;
        text =   text + "&#13;&#10;"
        socket.emit('text', text);
        newText(text);


}

function newText(text){
    $("#chat-body").html($("#chat-body").html() +  text );
    $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight);
}    