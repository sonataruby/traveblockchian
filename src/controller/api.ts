import express, { Request, Response, NextFunction }  from 'express';
import { connect } from '../database';
const router = express.Router();

router.get("/hotel",async (req: Request, res: Response, next: NextFunction) => {
    var l = Number(req.query.l);
    var limit = 68;
    if(l > 0){
        limit = l;
    }
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM hotels WHERE status='On' LIMIT "+limit)  as any;
        return res.json(rows);
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
});

router.get("/province",async (req: Request, res: Response, next: NextFunction) => {
    var id = Number(req.query.id);
    
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM hotels WHERE id='"+id+"' LIMIT 1")  as any;
        return res.json(rows[0]);
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
});


router.get("/booking",async (req: Request, res: Response, next: NextFunction) => {
   
    
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM booking ORDER BY id DESC LIMIT 100")  as any;
        return res.json(rows);
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
});


router.post("/booking",async (req: Request, res: Response, next: NextFunction) => {
	
    var id = Number(req.query.id);
    var token = req.query.token;
    try {
        const conn = await connect();
        await conn.query("INSERT INTO `booking` (`tokenid`, `refurn_token`, `firstname`, `lastname`, `phonenumber`, `email`, `passport`, `address`, `hotel_country`, `hotel_localtion`, `hotel_checkin`, `hotel_checkout`, `status`, `admin_validate`) VALUES ('"+id+"', '"+token+"', '"+req.body.firstname+"', '"+req.body.lastname+"', '"+req.body.phone+"', '"+req.body.email+"', '"+req.body.passport+"', '"+req.body.address+"', '"+req.body.country+"', '"+req.body.province+"', '"+req.body.checkin+"', '"+req.body.checkout+"', 'News', '0');");
        return res.json({status : "ok"});
    }
    catch (e) {
        console.log(e)
        return res.json({status : "faild"});
    }
    return res.json({status : "ok"});
});


export = router;