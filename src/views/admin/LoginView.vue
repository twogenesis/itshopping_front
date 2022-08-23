<template>
    <div class="login_wrap">
        <div class="login_box">
            <h1>IT Shopping</h1>
            <h2>Admin Page</h2>
            <input type="text" placeholder="아이디를 입력하세요" v-model="userid">
            <input type="password" placeholder="비밀번호를 입력하세요" v-model="password">
            <button @click="onClickLogin">로그인</button>
        </div>
    </div>
</template>

<script>
export default {
    name:"LoginView",
    data(){
        return {
            userid:"",
            password:""
        }
    },
    methods:{
        onClickLogin() {
            alert("로그인")
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>
