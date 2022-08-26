<template>
    <div class="popup_wrap">
        <div class="popup_content">
            <h1>제품 추가</h1>
            <h2>제품 기본정보</h2>
            <div class="product_basic_info">
                <table>
                    <tbody>
                        <tr>
                            <td>제품 유형</td>
                            <td>
                                <select @change="onChangeType()" v-model="selectedCategory">
                                    <option value="0">제품유형 선택</option>
                                    <option v-for="(cate, index) in category" :key="index" :value="index+1">{{cate}}</option>
                                </select>
                            </td>
                            <td>제품명</td>
                            <td colspan="5">
                                <input type="text">
                            </td>
                        </tr>
                        <tr>
                            <td>제조사</td>
                            <td>
                                <span v-if="manuSelected" @click="onClickManuText">{{selectedManufacturer.manufacturer_name}}</span>
                                <input type="text" @keyup="onManufacturerInputKeyPress" v-model="manuKeyword" v-if="!manuSelected">
                                <span class="manulist" v-if="manufacturerList.length != 0 && manuKeyword.length != 0 && !manuSelected">
                                    <button v-for="(manu, index) in manufacturerList" @click="onClickManufacturerBtn(manu.manufacturer_seq)" :key="index">{{manu.manufacturer_name}}</button>
                                </span>
                            </td>
                            <td>가격</td>
                            <td>
                                <input type="text"><span>원</span>
                            </td>
                            <td>출시일</td>
                            <td>
                                <input type="text">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="product_img">
                <h2>제품 이미지</h2>
            </div>
            <div class="product_details">
                <DetailCPU v-if="selectedCategory == 1"/>
                <DetailGPU v-if="selectedCategory == 2"/>
                <DetailMB v-if="selectedCategory == 3"/>
                <DetailSSD v-if="selectedCategory == 4"/>
                <DetailHDD v-if="selectedCategory == 5"/>
                <DetailPWR v-if="selectedCategory == 6"/>
                <DetailCASE v-if="selectedCategory == 7"/>
                <DetailKBD v-if="selectedCategory == 8"/>
                <DetailMOUSE v-if="selectedCategory == 9"/>
                <DetailSPK v-if="selectedCategory == 10"/>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import DetailCPU from './productAddSub/DetailCPU.vue';
    import DetailGPU from './productAddSub/DetailGPU.vue';
    import DetailMB from './productAddSub/DetailMB.vue';
    import DetailSSD from './productAddSub/DetailSSD.vue';
    import DetailHDD from './productAddSub/DetailHDD.vue';
    import DetailPWR from './productAddSub/DetailPWR.vue';
    import DetailCASE from './productAddSub/DetailCASE.vue';
    import DetailKBD from './productAddSub/DetailKBD.vue';
    import DetailMOUSE from './productAddSub/DetailMOUSE.vue';
    import DetailSPK from './productAddSub/DetailSPK.vue';

    export default {
        name:'ProductAddPopup',
        components:{
            DetailCPU, DetailGPU, DetailMB, DetailSSD, DetailHDD, DetailPWR,
            DetailCASE, DetailKBD, DetailMOUSE, DetailSPK
        },
        data(){
            return {
                type:0,
                selectedCategory:0,
                category:['CPU', '그래픽카드', '메인보드', 'SSD', 'HDD', '파워서플라이', '케이스', '키보드', '마우스', '스피커'],
                manufacturerList:[],
                manuKeyword:"",
                selectedManufacturer:{},
                manuSelected:false
            }
        },
        methods:{
            onClickManuText() {
                this.manuSelected = false;
                this.selectedManufacturer = {}
                axios.post('http://localhost:9999/api/admin/manufacturer/list', {
                    keyword:this.manuKeyword
                }).then((r) => {
                    this.manufacturerList = r.data.list;
                })
            },
            onChangeType(){ 
                console.log(this.selectedCategory)
            },
            onManufacturerInputKeyPress(){
                this.manuSelected = false;
                this.selectedManufacturer = {}
                axios.post('http://localhost:9999/api/admin/manufacturer/list', {
                    keyword:this.manuKeyword
                }).then((r) => {
                    this.manufacturerList = r.data.list;
                })
            },
            onClickManufacturerBtn(seq) {
                seq = Number(seq);
                this.manuSelected = true;
                this.selectedManufacturer = this.manufacturerList.find(data => data.manufacturer_seq == seq)
                this.manuKeyword = this.selectedManufacturer.manufacturer_name;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .popup_wrap {
        position: absolute;
        left: 250px; top: 0;
        z-index: 99;
        width: calc(100vw - 250px);
        height: 100vh;
        background-color: #00000055;
        .popup_content {
            background-color: #fff;
            position: absolute;
            width: 800px;
            left: 50%; top: 100px;
            margin-left: -400px;
            box-sizing: border-box;
            padding:30px;
        }
    }
</style>