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

const containerClasses = computed(() => {
    const classes = {
        flex: true,
        "flex-col": true,
        "h-screen": true,
    };

    if (true || loggedIn.value) {
        return {
            ...classes,
            container: true,
            "mx-auto": true,
        };
    }

    return {
        ...classes,
        "w-1/3": true,
        "mx-auto": true,
    };
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
    <div :class="containerClasses">
        <div v-if="true || loggedIn" class="navbar bg-base-100">
            <div class="flex-1">
                <nuxt-link to="/" class="btn btn-ghost text-xl"
                    >Forms</nuxt-link
                >
            </div>
            <div class="flex-none">
                <ul class="menu menu-horizontal px-1">
                    <li>
                        <button class="btn btn-ghost" @click="logout">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex-grow flex">
            <NuxtPage />
        </div>
    </div>
</template>
