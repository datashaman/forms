<script setup lang="ts"></script>

<template>
    <main class="flex flex-col h-screen bg-base-100">
        <NavBar />
        <div class="flex flex-grow h-0">
            <slot />
        </div>
    </main>
</template>

<style scoped></style>
