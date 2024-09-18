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

    chatWidth.value = localStorage.getItem("chatWidth") || "33.33%";
    await fetchMessages();
    scrollToBottom();
});

const handleResize = (event) => {
    const startX = event.clientX;
    const startWidth = parseFloat(
        getComputedStyle(event.target.parentNode).width,
    );

    const onMouseMove = (e) => {
        const newWidth = startWidth + (e.clientX - startX);
        const percentageWidth = (newWidth / window.innerWidth) * 100;
        chatWidth.value = `${percentageWidth}%`;
    };

    const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
};
</script>
<template>
    <div
        id="chat-container"
        class="flex flex-col border-r border-base-200 overflow-hidden resize-x"
        style="min-width: 200px; width: 30%"
    >
        <div id="chat-messages" class="flex-grow overflow-y-auto space-y-4 p-4">
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

        <div class="bg-base-200 border-t border-base-300">
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
