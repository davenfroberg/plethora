import { Pool } from 'pg';

const pool: Pool = new Pool({
    user: 'daven',
    host: 'localhost',
    database: 'plethora',
    password: 'root',
    port: 5432,
});

export default pool;