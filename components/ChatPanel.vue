<script setup>
import { useChat } from "@/composables/useChat";
import { ref, watch, onMounted } from "vue";
import { marked } from "marked";
import markedLinkifyIt from "marked-linkify-it";
import DOMPurify from "dompurify";

const { loggedIn } = useUserSession();

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
const chatWidth = ref(null);

marked
    .use({
        breaks: true,
    })
    .use(markedLinkifyIt());

const renderMarkdown = (content) => {
    const html = marked.parseInline(content);
    return DOMPurify.sanitize(html);
};

const handleSendMessage = async () => {
    const content = userMessage.value + "";
    userMessage.value = "";

    return sendMessage(content);
};

onMounted(async () => {
    watch(messages, () => {
        scrollToBottom();
    });

    await fetchMessages();
    scrollToBottom();
});
</script>
<template>
    <div class="flex flex-col overflow-hidden">
        <div
            ref="messagesContainer"
            class="flex-grow flex flex-col overflow-y-auto p-4"
        >
            <div v-for="message in messages" :key="message.id">
                <div
                    v-if="message.role === 'assistant'"
                    class="chat chat-start"
                >
                    <div class="chat-bubble chat-bubble-accent">
                        <template
                            v-if="message.content[0].text.value === '...'"
                        >
                            <span
                                class="loading loading-dots loading-xs"
                            ></span>
                        </template>
                        <div
                            v-else
                            v-html="
                                renderMarkdown(message.content[0].text.value)
                            "
                        />
                    </div>
                </div>
                <div v-else>
                    <div class="chat chat-end">
                        <div
                            class="chat-bubble chat-bubble-info"
                            v-html="
                                renderMarkdown(message.content[0].text.value)
                            "
                        ></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-base-300 border-base-300">
            <div class="flex items-center p-4">
                <input
                    v-model="userMessage"
                    type="text"
                    class="input input-bordered w-full mr-2"
                    placeholder="Type your message..."
                    @keyup.enter="handleSendMessage"
                />
                <button
                    class="btn btn-primary"
                    @click="handleSendMessage"
                    :disabled="isLoading"
                >
                    Send
                </button>
            </div>
        </div>
    </div>
</template>
