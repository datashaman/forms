<script setup>
const panel = ref(null);

const saveWidth = () => {
    localStorage.setItem(
        "settingsPanelWidth",
        window.getComputedStyle(panel.value).width,
    );
};

onMounted(() => {
    const width = localStorage.getItem("settingsPanelWidth");

    if (width) {
        panel.value.style.width = width;
    }
});
</script>
<template>
    <div
        ref="panel"
        class="relative flex flex-col w-1/5 p-4 bg-base-100 overflow-y-auto"
        style="min-width: 200px"
    >
        <!-- Draggable Handle -->
        <div
            class="resize-handle"
            style="
                width: 10px;
                cursor: ew-resize;
                position: absolute;
                left: -5px; /* Place the handle at the left edge of the settings panel */
                top: 0;
                bottom: 0;
            "
        ></div>
        <h2 class="text-xl font-semibold mb-4">Card Component Settings</h2>
        <!-- Form for managing card component details -->
        <form id="cardForm" class="space-y-4">
            <div>
                <label class="label" for="cardTitle">Title</label>
                <input
                    type="text"
                    id="cardTitle"
                    class="input input-bordered w-full"
                    placeholder="Enter card title"
                />
            </div>
            <div>
                <label class="label" for="cardDescription">Description</label>
                <textarea
                    id="cardDescription"
                    class="textarea textarea-bordered w-full"
                    placeholder="Enter card description"
                ></textarea>
            </div>
            <div>
                <label class="label" for="cardImageUrl">Image URL</label>
                <input
                    type="text"
                    id="cardImageUrl"
                    class="input input-bordered w-full"
                    placeholder="Enter image URL"
                />
            </div>
            <button
                type="button"
                class="btn btn-primary w-full"
                onclick="updateCardPreview()"
            >
                Update Preview
            </button>
        </form>
    </div>
</template>
