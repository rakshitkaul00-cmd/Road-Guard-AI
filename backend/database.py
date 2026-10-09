import sqlite3
from typing import Generator
from backend.config import DB_PATH

def get_db_connection() -> sqlite3.Connection:
    """Returns a SQLite connection with dict-like row factories."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def get_db() -> Generator[sqlite3.Connection, None, None]:
    """FastAPI dependency for database session management."""
    conn = get_db_connection()
    try:
        yield conn
    finally:
        conn.close()
