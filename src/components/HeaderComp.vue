<template>
    <div class="header">
        <router-link to="/admin/management/summary">대시보드</router-link>
        <router-link to="/admin/management/product">제품 관리</router-link>
        <router-link to="/admin/management/manufacturer">제조사 관리</router-link>
        <router-link to="/admin/management/order">주문/배송 관리</router-link>
        <router-link to="/admin/management/member">회원 관리</router-link>
        <router-link to="/admin/management/comment">댓글 관리</router-link>
        <router-link to="/admin/management/review">리뷰 관리</router-link>
        <router-link to="/admin/management/discount">할인 제품 관리</router-link>
        <router-link to="/admin/management/recommend">추천 상품 관리</router-link>
    </div>
</template>

<script>
export default {
    name:"HeaderComp"
}
</script>

<style lang="scss">
    @import "../assets/css/reset.css";
    @import "../assets/css/fonts.scss";

    .header {
        width: 250px;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        background-color: #f7f7f7;
        z-index: 999;
        a {
            font-family: $font-kr;
            display: block;
            padding:10px;
            color: #333; font-size: 14px; text-decoration: none;
            transition:0.1s;
            &:hover {
                background-color: rgba(255, 102, 0, 0.5);
                color: #fff;
            }
            &.router-link-active {
                background-color: rgb(255, 102, 0);
                color: #fff;
                font-weight: bold;
            }
        }
    }
</style>