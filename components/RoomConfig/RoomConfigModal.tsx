"use client";

import { Character } from "@/lib/types";
import { useState, useEffect } from "react";
import { X, Plus, Trash } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

interface RoomConfigModalProps {
    isOpen: boolean;
    initialBackground: string;
    initialCharacters: Character[];
    onClose: () => void;
    onSave: (background: string, characters: Character[]) => void;
}

export default function RoomConfigModal({
    isOpen,
    initialBackground,
    initialCharacters,
    onClose,
    onSave
}: RoomConfigModalProps) {
    const [background, setBackground] = useState(initialBackground);
    const [characters, setCharacters] = useState<Character[]>(initialCharacters);
    const [editingChar, setEditingChar] = useState<Partial<Character> | null>(null);

    useEffect(() => {
        if (isOpen) {
            setBackground(initialBackground);
            setCharacters(initialCharacters);
        }
    }, [isOpen, initialBackground, initialCharacters]);

    const handleSaveChar = () => {
        if (!editingChar?.name) return;

        // Create new or update existing
        const newChar: Character = {
            id: editingChar.id || uuidv4(),
            name: editingChar.name,
            avatar: editingChar.avatar || "",
            systemPrompt: editingChar.systemPrompt || "",
            description: editingChar.description || "",
        };

        if (editingChar.id) {
            setCharacters(characters.map(c => c.id === newChar.id ? newChar : c));
        } else {
            setCharacters([...characters, newChar]);
        }
        setEditingChar(null);
    };

    const handleDeleteChar = (id: string) => {
        setCharacters(characters.filter(c => c.id !== id));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm md:p-4">
            <div className="w-full h-full md:h-auto md:max-h-[90vh] max-w-2xl bg-white dark:bg-zinc-900 md:rounded-lg shadow-xl flex flex-col animate-in slide-in-from-bottom md:slide-in-from-bottom-10 fade-in duration-200">
                {/* Header */}
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center shrink-0">
                    <h2 className="text-xl font-bold">Room Configuration</h2>
                    <button onClick={onClose} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                    {/* Room Background */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Room Context / Background</label>
                        <textarea
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                            placeholder="Describe the environment, situation, or common context..."
                            className="w-full h-24 p-3 border rounded text-sm dark:bg-zinc-800 dark:border-zinc-700 active:ring-2 ring-blue-500/20"
                        />
                    </div>

                    <hr className="dark:border-zinc-800" />

                    {/* Characters List */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-medium">Characters ({characters.length})</label>
                            <button
                                onClick={() => setEditingChar({})}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full font-medium"
                            >
                                <Plus size={16} /> Add Character
                            </button>
                        </div>

                        {/* Character Editor */}
                        {editingChar && (
                            <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <h3 className="font-bold text-sm mb-3 text-blue-800 dark:text-blue-200">{editingChar.id ? "Edit Character" : "New Character"}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                    <input
                                        placeholder="Name"
                                        value={editingChar.name || ""}
                                        onChange={e => setEditingChar({ ...editingChar, name: e.target.value })}
                                        className="p-2 text-sm border rounded dark:bg-zinc-900"
                                    />
                                    <input
                                        placeholder="Avatar URL (Coming Soon)"
                                        value={editingChar.avatar || ""}
                                        disabled
                                        className="p-2 text-sm border rounded dark:bg-zinc-900 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed opacity-60"
                                    />
                                </div>
                                <textarea
                                    placeholder="One-line Description (e.g., A grumpy old wizard)"
                                    value={editingChar.description || ""}
                                    onChange={e => setEditingChar({ ...editingChar, description: e.target.value })}
                                    className="w-full p-2 text-sm border rounded mb-3 h-16 dark:bg-zinc-900"
                                />
                                <textarea
                                    placeholder="System Prompt (Full personality instructions)"
                                    value={editingChar.systemPrompt || ""}
                                    onChange={e => setEditingChar({ ...editingChar, systemPrompt: e.target.value })}
                                    className="w-full p-2 text-sm border rounded mb-3 h-24 dark:bg-zinc-900"
                                />
                                <div className="flex gap-2 justify-end">
                                    <button onClick={() => setEditingChar(null)} className="text-xs px-3 py-2 bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded font-medium">Cancel</button>
                                    <button onClick={handleSaveChar} className="text-xs px-3 py-2 bg-blue-600 text-white rounded font-medium shadow-sm">Save Character</button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            {characters.map(char => (
                                <div key={char.id} className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded border dark:border-zinc-700 shadow-sm">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                                            {char.avatar ? <img src={char.avatar} alt={char.name} className="w-full h-full object-cover rounded-full" /> : char.name[0]}
                                        </div>
                                        <div className="truncate">
                                            <div className="font-bold text-sm truncate">{char.name}</div>
                                            <div className="text-xs text-zinc-500 truncate max-w-[200px]">{char.description}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 flex-shrink-0">
                                        <button onClick={() => setEditingChar(char)} className="text-xs text-blue-500 hover:text-blue-600 px-2 py-1 bg-blue-50 dark:bg-blue-900/10 rounded">Edit</button>
                                        <button onClick={() => handleDeleteChar(char.id)} className="text-xs text-red-500 hover:text-red-600 px-2 py-1 bg-red-50 dark:bg-red-900/10 rounded">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2 shrink-0 bg-white dark:bg-zinc-900 md:rounded-b-lg">
                    <button onClick={onClose} className="px-4 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium text-sm">Cancel</button>
                    <button
                        onClick={() => { onSave(background, characters); onClose(); }}
                        className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded font-medium hover:opacity-90 text-sm shadow-md"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
