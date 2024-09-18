<script setup>
import { useChat } from "@/composables/useChat";
import { ref, watch, onMounted } from "vue";
import { marked } from "marked";
import markedLinkifyIt from "marked-linkify-it";
import DOMPurify from "dompurify";

definePageMeta({
    // middleware: "auth",
});

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
    <ChatPanel />
    <CodePanel> code </CodePanel>
    <SettingsPanel />
</template>
