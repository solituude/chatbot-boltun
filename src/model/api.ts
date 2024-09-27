export const postNewMessage = async (text: string) => {
    const date = new Date();
    const response = await fetch('/dialog', {
        method: "POST",
        body: JSON.stringify({sender: "user", text, time: date})
    });
    const data = await response.json();
    console.log(data);
}

export const getDialog = async () => {
    const response = await fetch('/dialog', {
        method: "GET",
    });
    return await response.json();
}

export const getChatAnswers = async () => {
    const response = await fetch('/chat_answers', {
        method: "GET",
    });
    return response.json();
}

export const createQuestion = async (obj: { [key: string]: string[] }) => {
    const response = await fetch('/chat_answers', {
        method: "POST",
        body: JSON.stringify(obj)
    });
    response.json().then(res => {
        console.log(res)
    })
    // console.log(response.json());
}


export const newChatMessage = async (text: string) => {
    const date = new Date();
    const response = await fetch('/dialog', {
        method: "POST",
        body: JSON.stringify({sender: "chat", text, time: date})
    })
    const data = await response.json();
    console.log(data);
}