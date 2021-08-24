import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidv4();
  const password = await hash("@dmin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, updated_at, driver_license)
    VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'now()', 'XXXXXXXXXXX')
    `
  );

  await connection.close();
}

create().then(() => console.log("User Admin Created!"));
