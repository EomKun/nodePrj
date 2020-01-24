/*

const express = require('express');
const path = require('path');
const session = require('express-session'); // 세션

const app = express();

// global(DB역할을 할 변수 지정)
const user_data = { 
    id: "a", 
    pw: "b" 
};

// 경로 설정
app.use(express.static(path.join(__dirname, "public")));

// url encoding 설정
app.use(express.urlencoded({ extended : false}));

// json 사용 설정
app.use(express.json());

// express-session 연결
app.use(
    session({
        // 다시 저장하는지 물어봄
        resave: true,              
        // true -> 부여받은 session ID가 고정됨(session ID가 변환되지 않음(로그인해도))
        saveUninitialized: true,    
        secret: 'secret code',      // 암호화 키를 설정
        cookie: {
            httpOnly: true,
            secure: false,          // true -> https에서만 사용하겠다
        },
    })
);

app.post("/login", (req, res) => {
    console.log(req.headers.cookie);
    const id = req.body.id;
    const pw = req.body.pw;

    if((id == user_data.id) && (pw == user_data.pw)) {
        res.json({
            resultCode: 1, 
            message: `${id}님 환영합니다!(님 비번 ${pw}임 ㅋㅋ)`
        });
    } else {
        res.json({
            resultCode: 0, 
            message: `다시 로그인하쇼잉!`
        });
    }
    
});

app.post("/logout", (req, res) => {
    console.log(req.headers.cookie);
    const id = req.body.id;
    const pw = req.body.pw;

    if((id == user_data.id) && (pw == user_data.pw)) {
        res.json({
            resultCode: 1, 
            message: `${id}님 환영합니다!(님 비번 ${pw}임 ㅋㅋ)`
        });
    } else {
        res.json({
            resultCode: 0, 
            message: `다시 로그인하쇼잉!`
        });
    }
    
});

app.listen(3000, () => {
    console.log("Server Ready!");
});
*/

const express = require('express');
const path=require('path');
const session=require('express-session');

const app=express();

const user_data={id:"a", pw:"b"};

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:'미녀 강사 전은수',
    cookie: {
        httpOnly:true,
        secure:false
    }
}));

app.post('/login',(req,res)=>{
    console.log("login처리:"+req.headers.cookie);
    console.log(req.session);
    const id=req.body.id;
    const pw=req.body.pw;
    if( (id == user_data.id) && (pw == user_data.pw)){        
        req.session.logined_user_id=id;
        res.json({resultCode:1, message:`${id}님 로그인 되셨습니다.`});
    }else{
        res.json({resultCode:0, message:`다시 로그인하세요`});
    }    
});
app.post('/basket',(req,res)=>{
    console.log("basket처리:"+req.headers.cookie);
    console.log(req.session);
    
    if( req.session.logined_user_id){//로그인 되어있는 사용자
        if(!req.session.basket){//장바구니가 없을 때
            req.session.basket=[];
        }

        for(key in req.body) {
            req.session.basket.push(req.body[key]);
        }
        
        res.json({resultCode:1, message:`${req.session.logined_user_id}님의 장바구니에 ${req.session.basket.length}개의 제품이 담겼습니다.`});
    }else{
        res.json({resultCode:0, message:`로그인부터 하세요`});
    }    
});

app.post('/basket_view',(req,res)=>{
    console.log("basket_view 처리:"+req.headers.cookie);
    console.log(req.session);    
    
    if( req.session.logined_user_id){//로그인 되어있는 사용자
        let basket;
        if(req.session.basket){//장바구니가 있을 때
            basket=req.session.basket.join(',');
            res.json({resultCode:1, message:basket});
        }else{
            res.json({resultCode:0, message:`장바구니가 비었습니다`});
        }    
        
    }else{
        res.json({resultCode:0, message:`로그인부터 하세요`});
    }    
});

app.post('/logout',(req,res)=>{
    console.log("logout 처리:"+req.headers.cookie);
    console.log(req.session);    
    
    // 세션 메모리가 (자체가) 파괴된 게 아니라
    // 세션 메모리가 초기화가 되었다(내용이 초기화)
    // 세션이 있느냐만 따지면 코드가 망함
    // 세션이 있고, 로그인 할 때 넣어놓은 값이 있는지도 물어봐야 함(로그인 할 때 넣어 놓은 값을 따져야함(비어있으면 로그아웃 한거니까))
    req.session.destroy(()=>{   
        console.log("세션이 파기 되었습니다");
        res.json({resultCode:1, message:`로그아웃 되었습니다`});
    });
});


app.listen(3000,()=>{
    console.log("server ready...");
});
