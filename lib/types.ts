export interface StructuredContent {
    state: string;
    monologue: string;
    dialogue: string;
}

export interface Message {
    id: string;
    senderId: string; // 'user' or characterId
    targetId?: string; // ID of the character/user the message is directed to
    content: StructuredContent;
    timestamp: number;
}

export interface Character {
    id: string;
    name: string;
    avatar: string; // URL or placeholder color/initials
    systemPrompt: string;
    description: string;
}

export interface Room {
    id: string;
    name: string;
    background: string;
    characters: Character[];
    messages: Message[];
    createdAt: number;
}

export interface AppSettings {
    openAiBaseUrl: string;
    openAiApiKey: string;
    userName?: string;
    modelName?: string;
}
