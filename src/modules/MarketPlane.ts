import { connect } from '../database'
export async function getRows(limit:number=10){
    try {
    const conn = await connect();
    const [rows, fields] = await conn.query("SELECT * FROM marketplance ORDER BY price ASC LIMIT "+limit)  as any;
    return rows;
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}