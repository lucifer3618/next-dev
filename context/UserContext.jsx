import { createContext } from "react";

export const UserContext = createContext({
    actionType: "",
    timeStamp: Date.now(),
});