import express, { Request, Response, NextFunction } from 'express';
import { connect } from '../database';
const router = express.Router();
router.get("api/hotel",async (req: Request, res: Response, next: NextFunction) => {
    var l = Number(req.query.l);
    var limit = 3;
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

