import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'express_graphql_db',
  password: 'password',
  port: 5432,
});

export default pool;