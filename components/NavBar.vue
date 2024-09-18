<template>
    <nav class="navbar bg-base-200 shadow z-10">
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl">Chat App</a>
        </div>
        <div class="flex-none">
            <!-- Dropdown Menu for Sample Components -->
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-sm m-1">Components</label>
                <ul
                    tabindex="0"
                    class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li><a href="#">Create New Component</a></li>
                    <li><a href="#">Button</a></li>
                    <li><a href="#">Card</a></li>
                    <li><a href="#">Modal</a></li>
                    <li><a href="#">Navbar</a></li>
                    <li><a href="#">Form Input</a></li>
                </ul>
            </div>
            <button class="btn btn-sm btn-ghost">Home</button>
            <button class="btn btn-sm btn-ghost">Profile</button>
            <button class="btn btn-sm btn-ghost">Settings</button>
        </div>
    </nav>
</template>
