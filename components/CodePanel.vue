<script setup>
const code = ref("cost a = 1");
</script>
<template>
    <div class="overflow-y-auto hljs">
        <ClientOnly fallbackTag="pre">
            <highlightjs autodetect :code="code" />
            <template #fallback>
                <pre><code>{{ code }}</code></pre>
            </template>
        </ClientOnly>
    </div>
</template>
