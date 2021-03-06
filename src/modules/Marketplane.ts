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
        const [rows, fields] = await conn.query("SELECT * FROM ads_items WHERE start_date < NOW() AND end_date > NOW() AND status='On' AND ads_type='marketplance' ORDER BY price ASC LIMIT "+limit)  as any;
        
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

const getInfoSync = async ( id:number=0) => {
    
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM marketplance WHERE id='"+id+"' ORDER BY price ASC LIMIT 1")  as any;
        
        return rows[0];
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}

const setSync = async (id:number=0) => {
    try {
        
        
        const conn = await connect();
        await conn.query("UPDATE marketplance SET sync='1' WHERE item_id='"+id+"'");
        
        return {status : "ok"};
    }
    catch (e) {
        console.log(e)
    }

}
const setUpdate = async ( req: Request, res: Response, next: NextFunction) => {
    var id = Number(req.query.id);
    
    try {
        
        
        const conn = await connect();
        await conn.query("UPDATE marketplance SET name='"+req.body.name+"', item_id='"+req.body.item_id+"', qty='"+req.body.qty+"', price='"+req.body.price+"', banner='"+req.body.banner+"', night='"+req.body.night+"', bed='"+req.body.bed+"', star='"+req.body.star+"', chuky='"+req.body.chuky+"', exitmoiky='"+req.body.exitmoiky+"', prikeys='"+req.body.prikey+"', description='"+req.body.description+"', sync=0 WHERE id='"+id+"'");
        
        return res.status(200).json({status : "ok"});
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}

const setAds = async ( id:number=0) => {
    
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM marketplance WHERE id='"+id+"' ORDER BY price ASC LIMIT 1")  as any;
        const data = rows[0];
        var sql = `INSERT INTO ads_items SET item_id='${data.item_id}', banner='${data.banner}', name='${data.name}', price='${data.price}', star='${data.star}', night='${data.night}', bed='${data.bed}', ads_type='marketplance', status='ON', start_date='', end_date=''`;
        await conn.query(sql);
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}

export default {getAds,getRows,getInfo, getInfoSync, setUpdate, setSync, setAds};
