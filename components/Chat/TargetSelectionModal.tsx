"use client";

import { Character } from "@/lib/types";
import { User, X, Bot } from "lucide-react";

interface TargetSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectTarget: (targetId: string) => void;
    characters: Character[];
    userName: string;
    sourceCharacterName: string;
}

export default function TargetSelectionModal({
    isOpen,
    onClose,
    onSelectTarget,
    characters,
    userName,
    sourceCharacterName
}: TargetSelectionModalProps) {
    if (!isOpen) return null;

    // Filter out the source character (cannot talk to self usually, or maybe they can? For now let's allow all except self if needed, but requirements imply "interlocutor")
    const targets = [
        { id: "user", name: userName || "User", isUser: true },
        ...characters.map(c => ({ id: c.id, name: c.name, isUser: false, avatar: c.avatar }))
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl p-4 w-72 border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-sm text-zinc-600 dark:text-zinc-400">
                        {sourceCharacterName} speaks to...
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                        <X size={16} />
                    </button>
                </div>

                <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                    {targets.map((target) => (
                        <button
                            key={target.id}
                            onClick={() => onSelectTarget(target.id)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all group"
                        >
                            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-blue-500">
                                {target.isUser ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <span className="font-medium truncate">{target.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
