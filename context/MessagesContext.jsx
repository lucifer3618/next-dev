import { createContext } from "react";

export const MessagesContext = createContext(
    {
        messages: [], // Default value
        setMessages: () => { },
    }
);