import { Console } from "console";
import { app } from "./app";
import { ENV } from './config/env'; // variaveis de ambiente

app.listen(ENV.PORT, () => {
    console.log(`HTTP server rodando em http://localhost:${ENV.PORT}`);
    }
);
