// Расширим типы тем и контекста
import {createQuestion} from "./api";

const commonAnswers = ["Понятно", "Это круто!", "Как так?", "Можешь рассказать подробнее?"];

// Главная функция обработки сообщений
export function handleUserMessage(botMessage: string, userMessage: string, responses: {[key: string]: string[], // @ts-ignore
    id: string}[]): string {

    const objNewQuestion: {[key: string]: string[]} = {}; // объект нового вопроса в бд
    const requireObj: {[key: string]: string[]} = {};// здесь будет храниться объект того как должен ответить бот
    console.log(responses)
    let nextBotMessage = ''
    for (let i = 0; i < responses.length; i++) {
        const obj = responses[i];
        for (const key of Object.keys(obj)) {
            if (key !== "id" && (userMessage.includes(key) || key.includes(userMessage))) {

                nextBotMessage = obj[key][Math.floor(obj[key].length * Math.random())];
                console.log(obj[key], nextBotMessage);
                requireObj[key] = obj[key];
                i = responses.length;// находим следующее сообщение бота
                break;
            }
        }
    }

    // если пользователь ввел вопрос, на который бот не знает ответа
    if (userMessage[userMessage.length - 1] === "?" && nextBotMessage === "" && requireObj[userMessage] && requireObj[userMessage][0] === "") {
        objNewQuestion[userMessage] = [""];
        if (requireObj.id) {
            objNewQuestion.id = requireObj.id;
        }
        createQuestion(objNewQuestion);
        return "Это интересный вопрос! Я подумаю об этом и при следующей встрече попробую ответить на этот вопрос :)";
    }
    // если бот задал вопрос, и пользователь дал ответ, то бот должен запомнить ответ, таким образом самообучаясь
    else if (botMessage[botMessage.length - 1] === "?") {
        if (!requireObj[userMessage] || requireObj[userMessage][0] === "") {
            objNewQuestion[botMessage] = [userMessage];
            if (requireObj.id) {
                objNewQuestion.id = requireObj.id;
            }
        } else {
            objNewQuestion[botMessage] = [...requireObj[userMessage], userMessage];
            if (requireObj.id) {
                objNewQuestion.id = requireObj.id;
            }
        }
        createQuestion(objNewQuestion);
    }
    if (nextBotMessage && nextBotMessage !== '') {
        return nextBotMessage;
    } else {
        if (userMessage[userMessage.length - 1] === "?")
            return "Не знаю как ответить на вопрос о_0"
        else return commonAnswers[Math.floor(commonAnswers.length * Math.random())]
    }
}