import { createPool, Pool } from 'mysql'

export async function connect(): Promise<Pool> {
    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password : 'root',
        database: 'smarttrader',
        connectionLimit: 10
    });
    return connection;
}