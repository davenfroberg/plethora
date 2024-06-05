import { Pool } from 'pg';

const pool: Pool = new Pool({
    user: 'root',
    host: 'database',
    database: 'plethora',
    password: 'root',
    port: 5432,
});

export default pool;