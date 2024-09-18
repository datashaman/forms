<script setup>
const { loggedIn, clear } = useUserSession();
const colorMode = useColorMode();

watch(loggedIn, () => {
    if (!loggedIn.value) {
        navigateTo("/");
    }
});

function toggleColorMode() {
    colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
}

useHead({
    htmlAttrs: { lang: "en" },
    link: [{ rel: "icon", href: "/icon.png" }],
});

useSeoMeta({
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    title: "Datashaman Forms",
    description: "Generate forms with AI.",
});

const logout = async () => {
    await clear();
    return navigateTo("/");
};
</script>

<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
