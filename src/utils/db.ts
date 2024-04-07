import { Pool } from 'pg';
import { driver, auth } from 'neo4j-driver';

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432
});

export const executePostgresQuery = async (query: string, params: any): Promise<any> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows } = await client.query(query, params);
    await client.query('END');
    return rows;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const uri = 'neo4j://localhost:7687';
const user = 'neo4j';
const password = '1234567890';

export const executeNeo4jQuery = async (
  query: string,
  params: Record<string, any> = {},
  config: Record<string, any> = {
    database: 'neo4j'
  }
): Promise<any> => {
  const nDriver = driver(uri, auth.basic(user, password));

  try {
    const { records, summary } = await nDriver.executeQuery(
      query,
      params,
      config
    );
    return { records, summary };
  } finally {
    await nDriver.close();
  }
};
