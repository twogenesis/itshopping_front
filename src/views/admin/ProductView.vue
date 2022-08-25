<template>
    <div class="wrap">
        <h1>Products</h1>
        <div class="page_utils">
            <input type="text" v-model="keyword">
            <button @click="onClickSearch()">검색</button>
        </div>
        <table class="product_table">
            <thead>
                <tr>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in productList" :key="product.seq">
                    <td>{{product.seq}}</td>
                    <td>
                        <span class="bg_img">
                            <img :src=imgPrefix+product.thumbnail>
                        </span>
                    </td>
                    <td>{{product.name}}</td>
                    <td>{{product.price}}원</td>
                    <td>{{product.p_type}}</td>
                    <td>{{product.release_dt}}</td>
                </tr>
            </tbody>
        </table>
        <div class="pager_area">
            <button class="pager" v-for="page in pageNumbers" :key="page" @click="onClickPager(page)" :class="{current : currentPage == page}">{{page}}</button>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        name:"ProductView",
        data(){
            return {
                imgPrefix:"http://localhost:9999/images/product/",
                productList:[],
                totalPage:1,
                currentPage:1,
                totalCount:0,
                pageNumbers:[],
                keyword:"",
                type:null,
                order:0
            }
        },
        mounted() {
            this.getProductDatas();
        },
        watch: {
            productList(){
                this.productList.forEach(data => {
                    data.price = data.price.toLocaleString();
                    data.release_dt = this.makeReleaseDt(new Date(data.release_dt));
                })
                console.log(this.productList);
            },
            currentPage() {
                this.getProductDatas();
            }
        },
        methods:{
            onClickSearch() {
                this.getProductDatas();
            },
            onClickPager(page) {
                this.currentPage = page;
            },
            getProductDatas() {
                axios.post('http://localhost:9999/api/admin/product/list', {
                    page:this.currentPage,
                    keyword:this.keyword,
                    order:this.order,
                    type:this.type
                })
                .then((r) => {
                    this.productList = r.data.list;
                    this.totalPage = r.data.totalPage;
                    this.currentPage = r.data.page;
                    this.totalCount = r.data.totalCnt;
                    this.makePager(r.data.totalPage, r.data.page)
                })
            },
            makePager(total, current) {
                this.pageNumbers = new Array();
                if(total < 10) {
                    for(let i=0; i<total; i++) {
                        this.pageNumbers.push(i+1);
                    }
                    return;
                }
                let startIndex = Number(current) - 5;
                let endIndex = Number(current) + 5;

                total = Number(total);
                let diffStart = 0;
                let diffEnd = 0;

                if(startIndex <= 0){
                    diffEnd = -1 * startIndex;
                    startIndex = 0;
                }
                if(endIndex >= total){ 
                    diffStart = total - endIndex;
                    endIndex = total;
                }
                startIndex+=diffStart;
                endIndex+=diffEnd;

                for(let i=startIndex; i<endIndex; i++) {
                    this.pageNumbers.push(i+1);
                }
            },
            makeReleaseDt(date) {
                return date.getFullYear()+"."+(date.getMonth())
            }
        }
    }
</script>

<style lang="scss" scoped>
    .product_table {
        td {
            padding:10px;
        }
        .bg_img {
            display: inline-block;
            vertical-align: middle;
            width: 80px; height: 80px;
            text-align: center;
            img {
                width: 100%;
            }
        }
    }
    .pager {
        &.current {
            color: #fff;
            background-color: red;
        }
    }
</style>