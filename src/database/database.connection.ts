import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { connectionOpts } from "./database.connection.options";

const connection: Promise<Connection> = createConnection(connectionOpts);

export default connection;
