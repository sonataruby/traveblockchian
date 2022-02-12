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


export = router;