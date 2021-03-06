import { connect } from '../database'
const dbName = "posts";
const searchField = "name";
const prikeyField = "id";
const getItem = async(id:number=0) =>{
	try {
        const conn = await connect();
        
        var sql = `SELECT * FROM ${dbName} WHERE ${prikeyField}=${id}`;
        const [rows, fields] = await conn.query(sql)  as any;
        return rows[0];
    }
    catch (e) {
        return {};
    }
    return true;
}

const getItemByUrl = async(id:any="") =>{
    try {
        const conn = await connect();
        
        var sql = `SELECT * FROM ${dbName} WHERE url=${id}`;
        const [rows, fields] = await conn.query(sql)  as any;
        return rows[0];
    }
    catch (e) {
        return {};
    }
    return true;
}



const listItems = async(limit:number=8,page:number=1, type:any="Post", search:any="") =>{
	var sql = "";
    try {
    const conn = await connect();
    if(search == ""){
        sql = `SELECT * FROM ${dbName} WHERE type='${type}' ORDER BY id DESC LIMIT ${limit}`;
    }else{
        sql = `SELECT * FROM ${dbName} WHERE type='${type}' AND ${searchField} LIKE '%"+search+"%'  ORDER BY id DESC LIMIT ${limit}`;
    }
    const [rows, fields] = await conn.query(sql)  as any;
    
    return rows;
    }
    catch (e) {
        return [];
    }
}

const createItem = async(obj = "") =>{
	try {
        const conn = await connect();
        var sql = `INSERT INTO ${dbName} SET ${obj}`;
        await conn.query(sql);
        return true;
    }
    catch (e) {
        return false;
    }
    return true;
}

const updateItem = async(id:number=0, obj="") =>{
	try {
        const conn = await connect();
        var sql = `UPDATE ${dbName} SET ${obj} WHERE ${prikeyField}=${id}`;
        await conn.query(sql);
        return true;
    }
    catch (e) {
        return false;
    }
    return true;
}

const deleteItem = async(id:number=0) =>{
	try {
    const conn = await connect();
    var sql = `DELETE FROM ${dbName} WHERE ${prikeyField}=${id}`;
    await conn.query(sql);
    return true;
    }
    catch (e) {
        return true;
    }
    return true;
}

export default {getItem,getItemByUrl, listItems, createItem, updateItem, deleteItem};