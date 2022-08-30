<template>
    <div class="wrap">
        <h1>Products</h1>
        <div class="page_utils">
            <div class="category">
                <span>카테고리</span>
                <button @click="onClickCategory(null)" :class="{selected : type == null}">전체</button>
                <button v-for="(cate, index) in category_names" :key="index" @click="onClickCategory(index+1)" :class="{selected : type == index+1}">{{cate}}</button>
            </div>
            <div class="search_box">
                <span>제품명</span>
                <input type="text" v-model="keyword">
                <button @click="onClickSearch()">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </button>
            </div>
        </div>
        <table class="product_table">
            <thead>
                <tr>
                    <th>순번</th>
                    <th>제품 이미지</th>
                    <th>제품 명</th>
                    <th>가격</th>
                    <th>카테고리</th>
                    <th>
                        <button v-if="order == 0" @click="onClickReleaseDt(1)">출시일 ▼</button>
                        <button v-if="order == 1" @click="onClickReleaseDt(0)">출시일 ▲</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in productList" :key="product.seq">
                    <td>{{totalCount - index - (currentPage-1)*10}}</td>
                    <td>
                        <span class="bg_img">
                            <img :src=imgPrefix+product.thumbnail>
                        </span>
                    </td>
                    <td v-html="product.name"></td>
                    <td>{{product.price}}원</td>
                    <td>{{category_names[product.p_type-1]}}</td>
                    <td>{{product.release_dt}}</td>
                </tr>
                <tr v-if="nodata">
                    <td colspan="6">
                        <span v-if="keyword != ''">검색어 : {{keyword}} 에 대한</span>
                        데이터가 없습니다.
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="pager_area">
            <button class="pager" v-for="page in pageNumbers" :key="page" @click="onClickPager(page)" :class="{current : currentPage == page}">{{page}}</button>
        </div>
        <ProductAddPopup />
    </div>
</template>
<script>
    import ProductAddPopup from '../../components/popup/ProductAddPopup.vue';
    import axios from 'axios';
    export default {
        name:"ProductView",
        components:{ProductAddPopup},
        data(){
            return {
                category_names:['CPU', '그래픽카드', '메인보드', 'SSD', 'HDD', '파워서플라이', '케이스', '키보드', '마우스', '스피커'],
                imgPrefix:"http://localhost:9999/images/product/",
                productList:[],
                totalPage:1,
                currentPage:1,
                totalCount:0,
                pageNumbers:[],
                keyword:"",
                type:null,
                nodata:false,
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
                this.nodata = this.productList.length == 0;
            },
            order() {
                this.getProductDatas();
            },
            type(){
                this.getProductDatas();
            },
            currentPage() {
                this.getProductDatas();
            },
            keyword() {
                this.getProductDatas();
            }
        },
        methods:{
            onClickReleaseDt(i) {
                this.order = i;
            },
            onClickCategory(i) {
                this.type = i;
            },
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
                    
                    if(this.keyword != '' && this.keyword != null && this.keyword != undefined) {
                        console.log(this.keyword);
                        this.productList.forEach((data) => {
                            data.name = data.name.replaceAll(this.keyword, '<mark>'+this.keyword+'</mark>')
                            console.log(data);
                        })
                    }
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
    .category {
        .selected {
            background-color: #f00;
        }
    }
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