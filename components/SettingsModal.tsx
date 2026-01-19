"use client";

import { useState, useEffect } from "react";
import { StorageService } from "@/lib/storage";
import { AppSettings } from "@/lib/types";

// We'll fix the import above, AppSettings is in types, StorageService exports it? 
// Actually Storage imports it from types. So we import from types or storage if re-exported.
// Let's fix import in the actual code: import { AppSettings } from "@/lib/types"; import { StorageService } from "@/lib/storage";

import { X } from "lucide-react";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

export default function SettingsModal({ isOpen, onClose, onSave }: SettingsModalProps) {
    const [apiKey, setApiKey] = useState("");
    const [baseUrl, setBaseUrl] = useState("");
    const [userName, setUserName] = useState("");
    const [modelName, setModelName] = useState("");

    useEffect(() => {
        if (isOpen) {
            const settings = StorageService.getSettings();
            setApiKey(settings.openAiApiKey);
            setBaseUrl(settings.openAiBaseUrl);
            setUserName(settings.userName || "");
            setModelName(settings.modelName || "xai.grok-4");
        }
    }, [isOpen]);

    const handleSave = () => {
        StorageService.saveSettings({
            openAiApiKey: apiKey,
            openAiBaseUrl: baseUrl,
            userName: userName.trim(),
            modelName: modelName.trim() || "xai.grok-4"
        });
        onSave();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Settings</h2>
                    <button onClick={onClose} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">OpenAI Base URL (Optional)</label>
                        <input
                            type="text"
                            value={baseUrl}
                            onChange={(e) => setBaseUrl(e.target.value)}
                            placeholder="https://api.openai.com/v1"
                            className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">User Name (Your Name in Chat)</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="e.g. Creator, Commander"
                            className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Model Name</label>
                        <input
                            type="text"
                            value={modelName}
                            onChange={(e) => setModelName(e.target.value)}
                            placeholder="e.g. gpt-4, claude-3-opus, xai.grok-4"
                            className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">OpenAI API Key</label>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="sk-..."
                            className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                </div>
            </div>
        </div>
    );
}
