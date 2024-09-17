<script setup lang="ts">
const { loggedIn } = useUserSession();
</script>

<template>
    <UCard>
        <template #header>
            <UButton
                v-if="!loggedIn"
                to="/auth/github"
                icon="i-simple-icons-github"
                label="Login with GitHub"
                color="black"
                external
            />
            <UButton
                v-else
                to="/forms"
                icon="i-heroicons-list-bullet"
                label="Go to Forms"
                color="black"
            />
        </template>
        <p class="font-medium">Welcome to Datashaman Forms.</p>
        <hr class="dark:border-gray-700" />
        <p class="text-sm text-gray-700 dark:text-gray-300 italic">
            No personal information from your GitHub account is stored in our
            database.<br />
            We store only the GitHub ID to identify ownership of forms.
        </p>
    </UCard>
</template>
