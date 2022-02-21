import express, {Application, Request, Response, NextFunction } from 'express';
import { connect } from '../database'



const getAds = async ( req: Request, res: Response, next: NextFunction) => {
    var l = Number(req.query.l);
    var limit = 10;
    if(l > 0){
        limit = l;
    }
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM marketplance ORDER BY price ASC LIMIT "+limit)  as any;
        
        return res.status(200).json(rows);
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}

const getRows = async ( req: Request, res: Response, next: NextFunction) => {
    var l = Number(req.query.l);
    var limit = 10;
    if(l > 0){
        limit = l;
    }
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM marketplance ORDER BY price ASC LIMIT "+limit)  as any;
        
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

const setUpdate = async ( req: Request, res: Response, next: NextFunction) => {
    var id = Number(req.query.id);
    
    try {
        
        
        const conn = await connect();
        await conn.query("UPDATE marketplance SET name='"+req.body.name+"', qty='"+req.body.qty+"', price='"+req.body.price+"', banner='"+req.body.banner+"', night='"+req.body.night+"', bed='"+req.body.bed+"', star='"+req.body.star+"', exittime='"+req.body.timeexit+"', prikeys='"+req.body.prikey+"', description='"+req.body.description+"', sync=0 WHERE id='"+id+"'");
        
        return res.status(200).json({status : "ok"});
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}

export default {getAds,getRows,getInfo, setUpdate};
