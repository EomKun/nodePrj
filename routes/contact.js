const express=require('express');
const con = require("./mysql_con");
const router=express.Router();

router.post('/',(req,res,next)=>{    
    const name = req.body.name;
    const email = req.body.email;
    const comments = req.body.comments;

    // query
    const sql = `INSERT INTO members (name, email, comments) VALUES ('${name}', '${email}', '${comments}')`;
    con.query(sql, (err, result) => {
        if (err) {
            console.log("insert fail");
            res.json({ message: "회원가입 실패"});
            console.log(err.message);
        } else {
            console.log("insert success");
            res.json({ message: "회원가입 성공"});
            location.reload();f
        }
    });
});


module.exports=router;