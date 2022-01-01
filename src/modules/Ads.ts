import { connect } from '../database'
export async function getRows(){
    try {
    const conn = await connect();
    const [rows, fields] = await conn.query("SELECT * FROM ads WHERE start_date < NOW() AND end_date > NOW()")  as any;
    return rows;
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}