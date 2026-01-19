"use client";

import { Character } from "@/lib/types";
import { Send, Bot } from "lucide-react";
import { useState } from "react";

import TargetSelectionModal from "./TargetSelectionModal";

interface ControlPanelProps {
    characters: Character[];
    onSendMessage: (text: string) => void;
    onTriggerAI: (charId: string, targetId: string) => void;
    isGenerating: boolean;
    userName: string;
}

export default function ControlPanel({ characters, onSendMessage, onTriggerAI, isGenerating, userName }: ControlPanelProps) {
    const [input, setInput] = useState("");
    const [selectedCharId, setSelectedCharId] = useState<string | null>(null);

    const handleCharClick = (charId: string) => {
        setSelectedCharId(charId);
    };

    const handleTargetSelect = (targetId: string) => {
        if (selectedCharId) {
            onTriggerAI(selectedCharId, targetId);
            setSelectedCharId(null);
        }
    };

    const handleSend = () => {
        if (!input.trim()) return;
        onSendMessage(input);
        setInput("");
    };

    return (
        <>
            <div className="shrink-0 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 safe-area-pb">
                {/* AI Turn Controls */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-thin">
                    {characters.map((char) => (
                        <button
                            key={char.id}
                            onClick={() => handleCharClick(char.id)}
                            disabled={isGenerating}
                            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full text-sm font-medium transition-colors whitespace-nowrap disabled:opacity-50"
                        >
                            <Bot size={14} className="text-blue-500" />
                            Reply as {char.name}
                        </button>
                    ))}
                </div>

                {/* User Input */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type your message..."
                        className="flex-1 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isGenerating}
                        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>

            <TargetSelectionModal
                isOpen={!!selectedCharId}
                onClose={() => setSelectedCharId(null)}
                onSelectTarget={handleTargetSelect}
                characters={characters}
                userName={userName}
                sourceCharacterName={characters.find(c => c.id === selectedCharId)?.name || "AI"}
            />
        </>
    );
}
