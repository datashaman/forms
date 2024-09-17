<script setup>
import { useChat } from "@/composables/useChat";

const {
    messagesContainer,
    messages,
    isLoading,
    error,
    sendMessage,
    onMessage,
    fetchMessages,
    scrollToBottom,
} = useChat();

const userMessage = ref("");

const handleSendMessage = async () => {
    const content = userMessage.value + "";
    userMessage.value = "";

    return sendMessage(content);
};

// Watch for changes in the messages array and scroll to the bottom
watch(messages, () => {
    scrollToBottom();
});

onMounted(async () => {
    await fetchMessages();
    scrollToBottom();
});
</script>

<template>
    <div class="container mx-auto flex flex-row h-screen">
        <div class="w-1/3 h-full flex flex-col p-4 border-r overflow-hidden">
            <div class="flex-grow overflow-y-auto mb-4" ref="messagesContainer">
                <h2 class="font-semibold text-lg">Messages</h2>
                <div class="flex flex-col">
                    <div v-for="message in messages" :key="message.id">
                        <div
                            v-if="message.role === 'assistant'"
                            class="chat chat-start"
                        >
                            <div class="chat-bubble chat-bubble-accent">
                                <template
                                    v-if="
                                        message.content[0].text.value === '...'
                                    "
                                >
                                    <span
                                        class="loading loading-dots loading-xs"
                                    ></span>
                                </template>
                                <div
                                    v-else
                                    v-html="message.content[0].text.value"
                                />
                            </div>
                        </div>
                        <div v-else>
                            <div class="chat chat-end">
                                <div class="chat-bubble chat-bubble-info">
                                    {{ message.content[0].text.value }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-none flex flex-row">
                <input
                    v-model="userMessage"
                    @keyup.enter="handleSendMessage"
                    placeholder="Type a message"
                    class="flex-grow input input-bordered"
                />
                <button
                    @click="handleSendMessage"
                    :disabled="isLoading"
                    class="ms-4 btn btn-primary"
                >
                    Send
                </button>
            </div>
        </div>
        <div class="w-2/3 p-4">
            <h2 class="font-semibold text-lg">Form</h2>

            <div class="flex flex-col">
                <div class="flex-grow">Hi</div>
            </div>
        </div>
        <div v-if="error" class="toast">
            <div class="alert alert-error">
                <span>{{ error }}</span>
            </div>
        </div>
    </div>
</template>
