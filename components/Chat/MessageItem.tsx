"use client";

import { Message, Character } from "@/lib/types";
import { format } from "date-fns";

interface MessageItemProps {
    message: Message;
    character?: Character; // If undefined, it's a user message
    targetName?: string;
}

export default function MessageItem({ message, character, targetName }: MessageItemProps) {
    const isUser = !character;

    return (
        <div className={`flex gap-4 mb-6 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
            {/* Avatar */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-lg font-bold overflow-hidden">
                {character ? (
                    character.avatar ? <img src={character.avatar} alt={character.name} className="w-full h-full object-cover" /> : character.name[0]
                ) : (
                    "U"
                )}
            </div>

            <div className={`flex flex-col max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">
                        {character ? character.name : "You"}
                    </span>
                    {targetName && (
                        <span className="text-xs text-zinc-400">
                            to {targetName}
                        </span>
                    )}
                    <span className="text-xs text-zinc-500">
                        {format(message.timestamp, "HH:mm")}
                    </span>
                </div>

                {/* Content Box */}
                <div className={`
          p-4 rounded-xl shadow-sm text-sm border
          ${isUser
                        ? "bg-blue-600 text-white border-blue-600 rounded-tr-none"
                        : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-tl-none"
                    }
        `}>
                    {message.content.state && (
                        <div className={`mb-2 italic text-xs ${isUser ? "text-blue-200" : "text-zinc-500"}`}>
                            * {message.content.state} *
                        </div>
                    )}

                    {message.content.monologue && (
                        <div className={`
              mb-2 p-2 rounded text-xs border-l-2
              ${isUser
                                ? "bg-blue-700 border-blue-400 text-blue-100"
                                : "bg-zinc-100 dark:bg-zinc-900 border-zinc-400 text-zinc-600 dark:text-zinc-400"
                            }
            `}>
                            💭 {message.content.monologue}
                        </div>
                    )}

                    <div className="whitespace-pre-wrap leading-relaxed">
                        {message.content.dialogue}
                    </div>
                </div>
            </div>
        </div>
    );
}
