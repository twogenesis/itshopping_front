<template>
    <div class="header">
        <router-link to="/admin/management/summary">대시보드</router-link>
        <router-link to="/admin/management/manufacturer">제조사 관리</router-link>
        <router-link to="/admin/management/product">제품 관리</router-link>
    </div>
</template>

<script>
export default {
    name:"HeaderComp"
}
</script>

<style lang="scss">
    @import "../assets/css/reset.css"
    
</style>