import { Request, Response, NextFunction } from 'express';
import { connect } from '../database'
interface Ads {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}
const getAds = async (req: Request, res: Response, next: NextFunction) => {
    var l = Number(req.query.l);
    var limit = 3;
    if(l > 0){
        limit = l;
    }
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM ads WHERE start_date < NOW() AND end_date > NOW() AND status='On' LIMIT "+limit)  as any;
        return res.json(rows);
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}
const getAdsFull = async (req: Request, res: Response, next: NextFunction) => {
    var l = Number(req.query.l);
    var limit = 3;
    if(l > 0){
        limit = l;
    }
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT *, DATE_FORMAT(start_date, '%d-%M-%Y %H:%i') as start_date, DATE_FORMAT(end_date, '%d-%M-%Y %H:%i') as end_date FROM ads LIMIT "+limit)  as any;
        return res.json(rows);
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}

const updateAds = async (req: Request, res: Response, next: NextFunction) => {
    var l = Number(req.query.l);
    var limit = 3;
    if(l > 0){
        limit = l;
    }
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT *, DATE_FORMAT(start_date, '%d-%M-%Y %H:%i') as start_date, DATE_FORMAT(end_date, '%d-%M-%Y %H:%i') as end_date FROM ads LIMIT "+limit)  as any;
        return res.json(rows);
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}

const deleteAds = async (req: Request, res: Response, next: NextFunction) => {
    var l = Number(req.query.l);
    var limit = 3;
    if(l > 0){
        limit = l;
    }
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT *, DATE_FORMAT(start_date, '%d-%M-%Y %H:%i') as start_date, DATE_FORMAT(end_date, '%d-%M-%Y %H:%i') as end_date FROM ads LIMIT "+limit)  as any;
        return res.json(rows);
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}

const onOffAds = async (req: Request, res: Response, next: NextFunction) => {
    var l = Number(req.query.l);
    var limit = 3;
    if(l > 0){
        limit = l;
    }
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT *, DATE_FORMAT(start_date, '%d-%M-%Y %H:%i') as start_date, DATE_FORMAT(end_date, '%d-%M-%Y %H:%i') as end_date FROM ads LIMIT "+limit)  as any;
        return res.json(rows);
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}

export default {getAds, getAdsFull,updateAds,deleteAds,onOffAds};
