import { server } from "./server/Server";

server.listen(process.env.PORT || 3333, () => console.log(`Servidor inicializado em http://localhost:${process.env.PORT || 3333}`))