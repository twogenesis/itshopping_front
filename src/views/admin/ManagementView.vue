<template>
    <div class="wrap">
        <HeaderComp />
        <div class="contents">
            <h1>Management</h1>
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

<style lang="scss" scoped>
    .contents {
        padding-left: 270px;
    }
</style>