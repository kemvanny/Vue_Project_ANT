<template>
    <div class="skeleton-grid">
        <div v-for="i in count" :key="i" class="skeleton-card">
            <div class="skeleton-line title"></div>
            <div class="skeleton-line sub"></div>
            <div class="skeleton-footer">
                <div class="skeleton-pill"></div>
                <div class="skeleton-pill"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    count: {
        type: Number,
        default: 4 
    }
});
</script>

<style scoped>
.skeleton-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-bottom: 20px;
}

.skeleton-card {
    background: #fff;
    border: 1px solid #f1f5f9;
    border-radius: 22px;
    padding: 20px;
    position: relative;
    overflow: hidden;
}

.skeleton-line {
    background: #f1f5f9;
    border-radius: 4px;
    margin-bottom: 12px;
    position: relative;
    overflow: hidden;
}

.skeleton-line.title {
    width: 70%;
    height: 20px;
}

.skeleton-line.sub {
    width: 40%;
    height: 14px;
}

.skeleton-footer {
    display: flex;
    gap: 10px;
    margin-top: 24px;
}

.skeleton-pill {
    width: 70px;
    height: 28px;
    background: #f1f5f9;
    border-radius: 999px;
    position: relative;
    overflow: hidden;
}

.skeleton-line::after,
.skeleton-pill::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(19, 112, 127, 0.08) 50%,
            rgba(255, 255, 255, 0) 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}

@media (max-width: 1100px) {
    .skeleton-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 680px) {
    .skeleton-grid {
        grid-template-columns: 1fr;
    }
}
</style>