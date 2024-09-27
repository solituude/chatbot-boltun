import {FC, useState} from "react";
import '../../App.css';
import {Dialog} from "../dialog/dialog";
import {postNewMessage} from "../../model/api";

export const Chat: FC = () => {
    const [text, setText] = useState<string>('');
    return(
        <div className={"chat__container"}>
            <Dialog/>

        </div>
    )
}