require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MESSAGE = "Bom dia. Meu nome é Diego e gostaria de mais detalhes sobre a consulta com o Dr. Batatinha."
const ASSISTANT_ID = "asst_9dlzymarBiadom1LEPqeiPp4" //VOCÊ DEVE INSERIR SEU ASSISTANT ID AQUI
const THREAD_ID = "thread_5ZLI0zf44ICJEpIXqVdNiAoN" //VOCÊ DEVE INSERIR SEU THREAD ID AQUI

const runAssistantMessage = async () => {
    try {
        await client.beta.threads.messages.create(THREAD_ID, { role: "user", content: MESSAGE });

        //LET POIS NÓS VAMOS FICAR VERIFICANDO SE A MENSAGEM JÁ FOI PROCESSADA
        let run = await client.beta.threads.runs.create(THREAD_ID, { assistant_id: ASSISTANT_ID });
        let attempts = 0;

        while (['queued', 'in_progress', 'cancelling'].includes(run.status) && attempts <= 10) {
            await new Promise(resolve => setTimeout(resolve, (1000 + attempts * 500)));

            run = await client.beta.threads.runs.retrieve(run.thread_id, run.id);
            attempts++;
        }

        if (run.status === 'completed') {
            const messages = await client.beta.threads.messages.list(run.thread_id, { limit: 1, order: "desc" });
            const runMessages = messages.data.filter((message) => message.run_id === run.id && message.role === "assistant");

            console.log(runMessages[0]?.content[0]?.text?.value)
            return runMessages;
        }
        else {
            console.log(`Erro ao processar a mensagem!`)
            return;
        }
    }
    catch (err) {
        console.log(err.message)
    }
}

runAssistantMessage();

// INFORMAÇÕES ÚTEIS

// Fluxo comum do Assistant:
// Passo 1: Criar o Assistant ou ter o id dele;
// Passo 2: Criar uma thread (entenda como uma sessão de conversa);
// Passo 3: Criar uma message e processar na thread (run);

// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/api-reference/runs