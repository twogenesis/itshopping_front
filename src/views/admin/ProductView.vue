<template>
    <div class="wrap">
        <h1>Products</h1>
        
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        name:"ProductView",
        data(){
            return {
                productList:[]
            }
        },
        mounted() {
            axios.post('http://localhost:9999/api/admin/product/list').then((r) => console.log(r.data.list))
        }
    }
</script>