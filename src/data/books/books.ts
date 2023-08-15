import pool from "../../config/database";
import { Book } from "./bookResponse";

async function getBooks({
  limit = 10,
  offset = 0,
  order = "ASC",
  sort = "id",
}: {
  limit?: number;
  offset?: number;
  order?: string;
  sort?: string;
}): Promise<Book[]> {
  const client = await pool.connect();
  try {
    const query = `
      SELECT * FROM books
      ORDER BY ${sort} ${order}
      LIMIT $1 OFFSET $2
    `;
    const result = await client.query(query, [limit, offset]);
    return result.rows;
  } finally {
    client.release();
  }
}

async function getBookById(id: string): Promise<Book | null> {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM books WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } finally {
    client.release();
  }
}

export default { getBooks, getBookById };
