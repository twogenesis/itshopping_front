<template>
    <div class="wrap">
        <HeaderComp />
        <h1>Management</h1>
        <div class="contents">
            <router-view />
        </div>
    </div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue'

export default {
    name:"ManagementView",
    components:{HeaderComp}
}
</script>