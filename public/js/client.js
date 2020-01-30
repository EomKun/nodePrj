$(document).ready(function(){
    $(document).on("click", '#login_btn', function(){
        if($('#login_btn').val()=='login'){//login처리
                const email=$('#login_email').val();
            //alert(email);
            const send_param={email};
            $.post('/login',send_param,function(returnData){
                    alert(returnData.message);
                    if(returnData.resultCode)
                        location.reload();
            });
        }else{//logout처리
            $.post('/logout',{},function(returnData){
                location.reload();
            });
        }
    });

    $('#contact_btn').click(function(){
        const name=$('#name').val();
        const email=$('#email').val();
        const comments=$('#comments').val();
        //alert(name+":"+email+":"+comments);
        const send_param={ name, email, comments};
        $.post('/contact',send_param,function(returnData){
            alert(returnData.message);
        });
    });

    $("#basket_btn").click(function (){
        const quantity = $("#quantity").val();
        const product = $("#product").val();
        const send_param = { quantity, product };

        //lert(quantity + " " + product);
        $.post("basket", send_param, function (returnData){
            alert(returnData.message);
        });
    });

    $("#board_write_text").click(function (){
        window.open(
            "/board/form", 
            "_blank", 
            "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=700,height=600"
            );
    });

    $("#board_write_btn").click(function (){
        const title = $("#board_title").val();
        const content = $("#board_content").val();
        const send_param = { title, content };

        $.post('/board/form_write', send_param, function (returnData){
            alert(returnData.message);
            location.reload();
        });
    });

    $("#board tbody tr").click(function (){
        const row = $(this);
        const b_id = row.children().eq(0).text();
        
        window.open(
            "/board/form_show?b_id=" + b_id, 
            "_blank", 
            "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=700,height=600"
            );
    });
});