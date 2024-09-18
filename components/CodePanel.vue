<template>
    <div
        class="flex flex-col flex-grow overflow-y-auto border-r border-base-200"
    >
        <code v-highlight class="typescript">
            <slot></slot>
        </code>
    </div>
</template>
