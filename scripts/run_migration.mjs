import pkg from 'pg'
const { Client } = pkg
import fs from 'fs'

async function runMigration() {
  const connectionString = 'postgresql://postgres:hH2zjEcOFJ6Waaxg@db.lbbrpqdnkgqgohgjtasr.supabase.co:5432/postgres'
  const client = new Client({ connectionString })
  
  try {
    await client.connect()
    console.log("Connected to database.")
    
    const sql = fs.readFileSync('supabase/migrations/20260812050847_init.sql', 'utf8')
    await client.query(sql)
    console.log("Migration executed successfully.")
  } catch (error) {
    console.error("Migration error:", error)
  } finally {
    await client.end()
  }
}

runMigration()
