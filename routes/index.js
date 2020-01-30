const con = require('./mysql_con');
const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{  
    let logined=0;
    if(req.session.email){
        logined=1;
    }

    // 게시판
    let board_arr;
    const sql = `SELECT b_no, title, name, date_format(created_at, '%Y-%m-%d %H:%i:%s') as created_at 
        FROM board ORDER BY b_no DESC`;
    con.query(sql, (err, result) => {
        if(err) {
            con.end();
            console.log("insert fail");
            res.json({ message: "Board error"});
            console.log(err.message);
        } else {
            board_arr = result;
            res.render('index',{flag:logined, name: req.session.name, board_arr : board_arr});
        }
    });
});

module.exports=router;