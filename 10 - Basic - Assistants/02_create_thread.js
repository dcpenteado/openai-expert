require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const createThread = async () => {
    try {
        const thread = await client.beta.threads.create();

        console.log(`Thread ID: ${thread.id}`);
    }
    catch (err) {
        console.log(err.message)
    }
}

createThread();

// INFORMAÇÕES ÚTEIS

// Fluxo comum do Assistant:
// Passo 1: Criar o Assistant ou ter o id dele;
// Passo 2: Criar uma thread (entenda como uma sessão de conversa);
// Passo 3: Criar uma message e processar na thread (run);

// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/api-reference/threads