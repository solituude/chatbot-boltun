import {FC} from "react";
import '../../App.css';
import {Dialog} from "../dialog/dialog";

export const Chat: FC = () => {
    return(
        <div className={"chat__container"}>
            <Dialog/>
        </div>
    )
}