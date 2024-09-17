<script setup>
import { useChat } from "@/composables/useChat";
import { ref, watch, onMounted } from "vue";
import { marked } from "marked";
import markedLinkifyIt from "marked-linkify-it";
import DOMPurify from "dompurify";

definePageMeta({
    middleware: "auth",
});

const { loggedIn } = useUserSession();

watch(loggedIn, (value) => {
    if (!value) {
        navigateTo({ name: "login" });
    }
});

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
    <div class="container mx-auto flex flex-row h-screen">
        <div
            class="h-full flex flex-col p-4 border-r overflow-hidden resize-x"
            :style="{ width: chatWidth }"
        >
            <h2 class="font-semibold text-lg">Messages</h2>
            <div class="flex-grow overflow-y-auto mb-4" ref="messagesContainer">
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
                                    v-html="
                                        renderMarkdown(
                                            message.content[0].text.value,
                                        )
                                    "
                                />
                            </div>
                        </div>
                        <div v-else>
                            <div class="chat chat-end">
                                <div
                                    class="chat-bubble chat-bubble-info"
                                    v-html="
                                        renderMarkdown(
                                            message.content[0].text.value,
                                        )
                                    "
                                ></div>
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
            <!-- Resizable handle -->
            <div
                class="resizer cursor-ew-resize"
                @mousedown="handleResize"
                style="
                    width: 5px;
                    background-color: rgba(0, 0, 0, 0.1);
                    cursor: ew-resize;
                "
            ></div>
        </div>
        <div class="flex-grow p-4">
            <h2 class="font-semibold text-lg">Form</h2>

            <div class="flex flex-col">
                <div class="flex-grow">FORM HERE</div>
            </div>
        </div>
        <div v-if="error" class="toast">
            <div class="alert alert-error">
                <span>{{ error }}</span>
            </div>
        </div>
    </div>
</template>
