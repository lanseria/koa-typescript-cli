import app from "./app/app";
import * as Koa from "koa";
import databaseConnection from "./database/database.connection";

// Process.env will always be comprised of strings, so we typecast the port to a
// number.
const PORT: number = Number(process.env.PORT) || 3000;

function startServe(): Promise<Koa<any, {}>> {
  return new Promise((resolve, reject) => {
    return databaseConnection
      .then(() => {
        if (process.env.NODE_ENV !== "test") {
          app.listen(PORT, () => {
            console.log(`Server running on port http://localhost:${PORT}`);
          });
        }
        resolve(app);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export const eApp = startServe();
