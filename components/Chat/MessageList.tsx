"use client";

import { Message, Character } from "@/lib/types";
import MessageItem from "./MessageItem";
import { useEffect, useRef } from "react";

interface MessageListProps {
    messages: Message[];
    characters: Character[];
    userName: string;
}

export default function MessageList({ messages, characters, userName }: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2">
            {messages.map((msg) => {
                const char = characters.find((c) => c.id === msg.senderId);
                let targetName = undefined;
                if (msg.targetId) {
                    if (msg.targetId === "user") {
                        targetName = userName;
                    } else {
                        const targetChar = characters.find(c => c.id === msg.targetId);
                        targetName = targetChar ? targetChar.name : "Unknown";
                    }
                }
                return <MessageItem key={msg.id} message={msg} character={char} targetName={targetName} />;
            })}
            <div ref={bottomRef} className="h-4" />
        </div>
    );
}
