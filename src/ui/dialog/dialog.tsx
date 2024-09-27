import {FC, useEffect, useRef, useState} from "react";
import '../../App.css';
import {getChatAnswers, getDialog, newChatMessage, postNewMessage} from "../../model/api";
import {handleUserMessage} from "../../model/core";


// Функция для автоматической прокрутки к последнему сообщению

type MessageType = {
    id: string,
    sender: string,
    text: string,
    time: string
}

export const Dialog: FC = () => {
    const [dialog, setDialog] = useState<MessageType[]>([]);
    const [text, setText] = useState<string>('');
    const container = useRef(null);

    function scrollToBottom() {
        const chatContainer = document.getElementById('chat-container');
        if(chatContainer) {
            chatContainer.scrollTop = 9999;
            // console.log(chatContainer.scrollTop, chatContainer.scrollHeight)
        }
    }

    const requestDialog = () => {
        getDialog().then(res => {
            setDialog(res);
            // console.log();
        });
    }

    useEffect(() => {
        requestDialog();
    }, [])

    useEffect(() => {
        scrollToBottom();
    },[dialog])
    return(
        <div className={"chat__container"}>
            <div ref={container} id='chat-container' className={"dialog__container"}>
                {
                    dialog.map((message) => (
                        <div key={message.id} className={message.sender === "user" ? "message__container_user" : "message__container_chat"}>
                            <div className={message.sender === "user" ? "message__bubble_user" : "message__bubble_chat"}>
                                {message.text}

                                <span className={"time__text"}>{message.time}</span>
                            </div>

                        </div>
                    ))
                }
            </div>


            <input value={text}
                   onChange={(e) => setText(e.target.value)}
                   placeholder={"Поболтай со мной"} className={"input__container"}/>
            <button onClick={async () => {
                await postNewMessage(text);
                const answers = await getChatAnswers();
                await console.log(answers);
                await newChatMessage(handleUserMessage(dialog[dialog.length - 1].text, text, answers));
                await requestDialog();
                setText('');
            }}>
                Отправить
            </button>
        </div>
    )
}