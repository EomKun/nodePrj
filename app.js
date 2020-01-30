const indexRouter=require('./routes/index');
const logoutRouter=require('./routes/logout');
const loginRouter=require('./routes/login');
const contactRouter=require('./routes/contact');
const basketRouter=require('./routes/basket');
const boardRouter=require('./routes/board');
const express=require('express');
const session=require('express-session');
const path=require('path');
const app=express();

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:"미녀 강사 전은수",
    cookie:{
        httpOnly:true,
        secure:false
    }
}));

app.use('/',indexRouter);
app.use('/logout',logoutRouter);
app.use('/login',loginRouter);
app.use('/contact',contactRouter);
app.use('/basket', basketRouter);

app.use('/board', boardRouter);

app.listen(3000, ()=>{
    console.log("server ready....");
});