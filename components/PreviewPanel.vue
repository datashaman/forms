<template>
    <div
        class="flex flex-col flex-grow p-4 bg-base-100 overflow-y-auto border-r border-base-200"
    >
        <h3 class="text-lg font-semibold mb-4">Card Preview</h3>
        <!-- Card Preview -->
        <div
            id="cardPreview"
            class="card w-full bg-base-200 shadow-xl mt-4 p-4"
        >
            <figure>
                <img
                    id="previewImage"
                    src="https://via.placeholder.com/300"
                    alt="Card Image"
                    class="w-full h-32 object-cover"
                />
            </figure>
            <div class="card-body">
                <h2 id="previewTitle" class="card-title">Sample Title</h2>
                <p id="previewDescription">Sample description goes here...</p>
            </div>
        </div>
    </div>
</template>
