/*
$(document).ready(function (){
    $("#login_try").click(function (){
        $("#login_try").hide();

        let login_form_html = `<form>`;
        login_form_html += `<div class="form-group">`;
        login_form_html += `<label for="email">ID:</label>`;
        login_form_html += `<input class="form-control" placeholder="Enter id" id="id">`;
        login_form_html += `</div>`;
        login_form_html += `<div class="form-group">`;
        login_form_html += `<label for="email">PW:</label>`;
        login_form_html += `<input type="password" class="form-control" placeholder="Enter pw" id="pw">`;
        login_form_html += `</div>`;;
        login_form_html += `<input type="button" id="login_btn" class="btn btn-info" value="login">`;
        login_form_html += `</form>`;

        $("#login_div").html(login_form_html);
    });

    // login
    $(document).on("click", "#login_btn", function (){
        const id = $("#id").val();
        const pw = $("#pw").val();

        const send_chunk = { id, pw };

        $.post("login", send_chunk, function (returnData){
            let logout_form_html = `<div id="logout_btn" class="btn btn-danger">Logout!</div>`;

            if(1 == returnData.resultCode) { 
                //logout_form_htm += `<p>returnData.message</p>`;
                $("#login_div").html(logout_form_html);
            } else if(0 == returnData.resultCode){
                $("#id").val("");
                $("#pw").val("");

                alert(returnData.message);
            }
        });
    });

    // log out
    $(document).on("click", "#logout_btn", function (){
        const send_param={sign:"logout"};
        $.post('main', send_param,function(returnData){
            alert(returnData.message);
            location.reload();
        });
    });
});
*/

$(document).ready(function(){
    $('#login_try').click(function(){
        let login_form='ID<input id="id"><br>';
        login_form += 'PW<input id="pw" type="password"><br>';
        login_form += '<input id="login_btn" type="button" value="login">';
        $('#login_div').html(login_form);
    });

    $(document).on('click','#login_btn',function(){
        const id=$('#id').val();
        const pw=$('#pw').val();
        const send_param={id,pw};
        
        $.post('login',send_param,function(returnData){
            alert(returnData.message);
            if(returnData.resultCode){
                let logout_form='<div id="logout_btn" class="btn btn-danger" >logout</div>';
                logout_form += '<br><hr>쇼핑하기<br>';
                logout_form += '<table class="table table-bordered text-center"><thead><tr>'
                logout_form += '<th> </th>';
                logout_form += '<th>Product Name</th>';
                logout_form += '<th>Price</th>';
                logout_form += '</tr></thead>';
                logout_form += '<tbody>';
                // product
                logout_form += '<tr>';
                logout_form += '<td><input class="form-check-input" name="product" type="checkbox"></td>';
                logout_form += '<td>나주행운배 나주배 선물세트 5Kg 7.5kg</td>';
                logout_form += '<td>31,900원</td>';
                logout_form += '</tr>';

                logout_form += '<tr>';
                logout_form += '<td><input class="form-check-input" name="product" type="checkbox"></td>';
                logout_form += '<td>아침이슬 2019년 경북 가정용 부사 10kg</td>';
                logout_form += '<td>7,110원</td>';
                logout_form += '</tr>';

                logout_form += '<tr>';
                logout_form += '<td><input class="form-check-input" name="product" type="checkbox"></td>';
                logout_form += '<td>반건시대봉 24/30과 선물세트</td>';
                logout_form += '<td>31,900원</td>';
                logout_form += '</tr>';

                logout_form += '<tr>';
                logout_form += '<td><input class="form-check-input" name="product" type="checkbox"></td>';
                logout_form += '<td>특품굴비(냉동굴비)/10미</td>';
                logout_form += '<td>130,000원</td>';
                logout_form += '</tr>';

                logout_form += '<tr>';
                logout_form += '<td><input class="form-check-input" name="product" type="checkbox"></td>';
                logout_form += '<td>한라봉 과일선물세트 4.5Kg(15-22수)+가방포장</td>';
                logout_form += '<td>29,360원</td>';
                logout_form += '</tr>';

                logout_form += '<tr>';
                logout_form += '<td><input class="form-check-input" name="product" type="checkbox"></td>';
                logout_form += '<td>고급모듬과일혼합세트 9호/ 가락청과시장 신선함</td>';
                logout_form += '<td>94,050원</td>';
                logout_form += '</tr>';

                logout_form += '</tbody>';
                logout_form += '</table>';

                logout_form += '<input type="button"  id="basket_btn" value="장바구니 넣기"><br>';
                logout_form += '<hr><input type="button"  id="basket_view_btn" value="장바구니 보기">';
                logout_form += '<br><div id="basket_view_div"></div>';

                $('#login_div').html(logout_form);
            }else{
                $('#id').val("");
                $('#pw').val("");
            }           
        });
    });
    
    $(document).on('click','#basket_btn',function(){
        let products=$('input[name=product]:checked');
        const send_param = {};
        products.each(function (i){
            let product = products.parent().parent().eq(i);
            //alert(product.children().eq(1).text());
            send_param[i] = product.children().eq(1).text();
        });
        //alert(JSON.stringify(send_param));
        $.post('basket',send_param,function(returnData){
            alert(returnData.message);
        });
    });
    
    $(document).on('click','#basket_view_btn',function(){      
       
        const send_param={};
        $.post('basket_view',send_param,function(returnData){
           alert(returnData.message);            
        });
    });
    
    $(document).on('click','#logout_btn',function(){     
        const send_param={};
        $.post('logout',send_param,function(returnData){
           alert(returnData.message);     
           location.reload();
        });
    });
});
    
    
    
    
    
    