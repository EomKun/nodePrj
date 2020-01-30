const express=require('express');
const con = require("./mysql_con");
const router=express.Router();

router.post('/',(req,res,next)=>{  
    const email = req.body.email;

    // query
    const sql = `SELECT nb, name, email FROM members WHERE email='${email}'`;
    con.query(sql, (err, result, fields) => {
    if (err) {
        con.end();
        console.log("insert fail");
        res.json({ message: "Login error"});
        console.log(err.message);
    } else {
        if(result.length) 
        {
            req.session.email=result[0].email;
            req.session.name=result[0].name;
            req.session.m_no=result[0].nb;
            
            res.json({ 
                resultCode: 1,
                message: `${result[0].name}님 반갑습니다!` 
            });
        } else {
            res.json({ 
                resultCode: 0,
                message: "이메일이 올바르지 않습니다"
            });
        }
    }
    // connection을 끊을 때에는 transection(query)이 끝난 후 끊어야 됨
    
    });
});

module.exports=router;