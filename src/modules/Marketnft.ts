import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { connect } from '../database'
const getAds = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const conn = await connect();
    const [rows, fields] = await conn.query("SELECT * FROM marketplance ORDER BY price ASC LIMIT 10")  as any;
    return res.status(200).json(rows);
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}

const getInfo = async ( req: Request, res: Response, next: NextFunction) => {
    var id = Number(req.query.id);
    
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM marketplance WHERE id='"+id+"' ORDER BY price ASC LIMIT 1")  as any;
        
        return res.status(200).json(rows[0]);
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}

export default {getAds, getInfo};