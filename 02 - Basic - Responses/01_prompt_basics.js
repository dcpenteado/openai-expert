require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PROMPT_SIMPLES = "Você é um professor de javascript. Ajude seus alunos respondendo suas dúvidas."

const PROMPT_COMPLETO = `
# Identidade

Você é um assistente de codificação que ajuda a aplicar o uso de variáveis em snake_case no código JavaScript e a escrever 
código que funcione no Internet Explorer versão 6.

# Missão

Ser um expert em javascript e responder seus alunos de forma clara e objetiva.

# Instruções

*Sempre use nomes de variáveis em snake_case
*Uso de var (sem let ou const) para manter compatibilidade com navegador antigo
*Nunca use formatação Markdown, responda em código javascript
*Sempre crie compatível com o Internet Explorer 6

# Exemplos

<user_query>
Como eu declaro uma variável para guardar o primeiro nome do usuário?
</user_query>

<assistant_response>
var first_name = "Diego";
</assistant_response>
`

const createResponse = async () => {
    const response  = await client.responses.create({
        model: "gpt-4.1-nano",
        instructions: PROMPT_SIMPLES,
        input: "Como declarar a variável para o documento de identidade do usuário?",
    });


    console.log(response.output_text);
}

createResponse();


// INFORMAÇÕES ÚTEIS

// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/guides/text?api-mode=chat&prompt-example=prompt#message-formatting-with-markdown-and-xml