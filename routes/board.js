const express=require('express');
const con = require("./mysql_con");
const router=express.Router();

router.get('/form',(req,res,next)=>{  
    res.render('board_form', { title: "글쓰기 화면"});
});

router.get('/form_show',(req,res,next)=>{  
    // query
    const sql = `SELECT 
            b_no, 
            title, 
            name, 
            date_format(created_at, '%Y-%m-%d %H:%i:%s') as created_at,
            content
            FROM board WHERE b_no=${req.param("b_id")}`;
    con.query(sql, (err, result, fields) => {
        if (err) {
            con.end();
            console.log("insert fail");
            res.json({ message: "Board error"});
            console.log(err.message);
        } else {
            res.render('board_show', { title: "글보기 화면", item: result[0]});
        }
    });
});

router.post("/form_write", (req, res) => {
    const email = req.session.email;

    if(email){  
        const title = req.body.title;
        const content = req.body.content;
        const name = req.session.name;

        // query
        const sql = `INSERT INTO board(title, content, name) VALUES ('${title}', '${content}', '${name}')`;
        con.query(sql, (err, result, fields) => {
            if (err) {
                con.end();
                console.log("insert fail");
                res.json({ message: "Board error"});
                console.log(err.message);
            } else {
                res.json({message: "등록되었습니다."});
            }
        });
    } else {
        res.json({message: `글 쓰고 싶으면 로그인 하시오`});
    }
});

module.exports=router;