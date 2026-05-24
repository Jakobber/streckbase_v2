import * as mysql from "mysql";
import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const args = process.argv.slice(2);
const userIdArg = args.find(a => a.startsWith("--userId="));
const passwordArg = args.find(a => a.startsWith("--password="));

if (!userIdArg || !passwordArg) {
  console.error("Usage: ts-node scripts/set-password.ts --userId=XXXX --password=YYYY");
  process.exit(1);
}

const userId = userIdArg.split("=")[1];
const password = passwordArg.split("=")[1];

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT || "3306")
});

async function main() {
  const hash = await bcrypt.hash(password, 12);
  connection.connect();
  connection.query(
    "UPDATE Users SET password = ? WHERE user_id = ? AND admin = 1",
    [hash, userId],
    (err: any, result: any) => {
      if (err) {
        console.error("Error:", err.message);
        process.exit(1);
      }
      if (result.affectedRows === 0) {
        console.error("No admin user found with that ID");
        process.exit(1);
      }
      console.log(`Password set for user ${userId}`);
      connection.end();
    }
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
