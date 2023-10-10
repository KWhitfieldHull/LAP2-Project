require("dotenv").config();
const OpenAI = require("openai");

class Recycle {

    constructor({ query }) {
        this.query = query;
    }

    static async isRecyclable() {
        console.log("recycleable");
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_KEY
        });
        

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: 'is a bike recyclable?' }],
            model: 'gpt-3.5-turbo',
        });
        

        console.log(chatCompletion.choices);
        


        
    }


    
}

module.exports = Recycle;