require("dotenv").config();
const OpenAI = require("openai");

class Recycle {

    constructor({ query }) {
        this.query = query;
    }

    static async isRecyclable(data) {
        const {item} = data;
        //console.log("recycling");
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_KEY
        });
        

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `is a ${item} recyclable?` }],
            model: 'gpt-3.5-turbo',
        });
        
        const answer = chatCompletion.choices[0].message.content;
        //console.log(answer);
        return answer;
        


        
    }


    
}

module.exports = Recycle;