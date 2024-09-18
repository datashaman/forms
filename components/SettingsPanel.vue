<template>
    <div
        class="relative flex flex-col p-4 overflow-y-auto"
        style="min-width: 200px"
    >
        <h2 class="text-xl font-semibold mb-4">Card Component Settings</h2>
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
