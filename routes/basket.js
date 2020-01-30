const con = require("./mysql_con");
const express = require("express");

const router = express.Router();

router.post('/',(req,res)=>{      
    con.connect((err) => {
        if (err) throw err;
        console.log("Connected!");
        const email = req.session.email

        if(email) {
            const product = req.body.product;
            const quantity = req.body.quantity;
            const m_no = req.session.m_no;

            const sql = `INSERT INTO basket(m_no, product, quantity) VALUES (${m_no}, '${product}', ${quantity});`;
            con.query(sql, (err, result, fields) => {
                if (err) {
                    res.json({ message: "장바구니 처리 실패"});
                    console.log("insert fail");
                    console.log(err.message);
                } else {
                    res.json({message: `구매는 잘 되었다 걱정말게, ${req.session.name}`});
                    console.log("1 recod inserted: basket");
                }
            });
        } else {
            res.json({message: "로그인부터 하시게"});
        }
    });
});

module.exports = router;