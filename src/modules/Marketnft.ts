import { connect } from '../database'
export async function getRows(){
    try {
    const conn = await connect();
    const [rows, fields] = await conn.query("SELECT * FROM marketplance ORDER BY price ASC LIMIT 10")  as any;
    return rows;
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}