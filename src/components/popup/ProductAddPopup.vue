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
                                <input type="text" v-model="prod.pi_name">
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
                                <input type="text" v-model="prod.pi_price"><span>원</span>
                            </td>
                            <td>출시일</td>
                            <td>
                                <input type="text" v-model="prod.pi_release_dt">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="product_img">
                <h2>제품 이미지</h2>
                <input type="file" @change="onChangeFile" name="img_file" ref="img_input" hidden>
                <div class="preview_area">
                    <div class="img_box" v-for="(img, index) in previewImgs" :key="index">
                        <input type="radio" name="files" v-model="thumbnail" :value="index" :id="'img_rad_'+index">
                        <label :for="'img_rad_'+index">
                            <span>썸네일</span>
                            <span class="select_box"></span>
                            <img class="preview" :src="img.preview">
                        </label>
                        <button class="delete" @click="onDeleteImg(index)">삭제</button>
                    </div>
                    <button @click="selectImg" id="sel_img">
                        <div class="icon">
                            <font-awesome-icon icon="fa-solid fa-image" />
                        </div>
                        <span>이미지 선택</span>
                    </button>
                </div>
            </div>
            <div class="product_details">
                <DetailCPU v-if="selectedCategory == 1" ref="detailCPU"/>
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
            <div class="product_desc">
                <button @click="onAddDescription">설명 추가</button>
                <div class="desc_list">
                    <div class="desc_item" v-for="(desc, index) in description_list" :key="index">
                        <select v-model="desc.pd_type">
                            <option value="text">텍스트</option>
                            <option value="image">이미지</option>
                        </select>
                        <div class="desc_text" v-if="desc.pd_type == 'text'">
                            <textarea v-model="desc.pd_content" ref="desc_content"></textarea>
                        </div>
                        <div class="desc_img" v-if="desc.pd_type == 'image'">
                            <input type="file" ref="desc_content" @change="onChangeDescImg($event, index)">
                            <img :src="desc.pd_content">
                        </div>
                        <button @click="deleteDescItem(index)">삭제</button>
                    </div>
                </div>
            </div>
            <div class="popup_buttons">
                <button @click="onClickSave">저장</button>
                <button @click="onClickCancel">취소</button>
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
                selectedCategory:1,
                category:['CPU', '그래픽카드', '메인보드', 'SSD', 'HDD', '파워서플라이', '케이스', '키보드', '마우스', '스피커'], 
                manufacturerList:[],
                manuKeyword:"",
                selectedManufacturer:{},
                manuSelected:false,
                previewImgs:[],
                thumbnail:0,
                detailData:{},
                prod:{
                    pi_manufacturer_seq:0,
                    pi_name:"",
                    pi_price:"",
                    pi_release_dt:"",
                    pi_type:0
                },
                description_list:[]
            }
        },
        methods:{
            deleteDescItem(i){
                this.description_list = this.description_list.filter((item) => item.pd_order != i+1);
                this.description_list.forEach((data, index) => {
                    data.pd_order = index + 1;
                })
            },
            onAddDescription() {
                this.description_list.push({
                    pd_order:this.description_list.length+1,
                    pd_content:"",
                    pd_type:"text"
                })
            },
            onClickSave() {
                switch(this.selectedCategory) {
                    case 1:
                        this.detailData = this.$refs.detailCPU.detailData;
                        break;
                }

                this.prod.pi_type = this.selectedCategory;
                
                let formData = new FormData();
                this.previewImgs.forEach((item) => {
                    formData.append("files", item.data);
                })
                axios.post("http://localhost:9999/images/upload/product",
                    formData,
                    {
                        headers:{
                            'Access-Control-Allow-Origin':'*',
                            'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Cookie, Accept, X-PINGOTHER',
                            'Access-Control-Allow-Methods':'GET, POST, OPTIONS',
                            'Access-Control-Allow-Credentials':true,
                            'Content-Type':'multipart/form-data'
                        }
                    }
                ).then((r) => {
                    // 제품 이미지 리스트(파일) 구성
                    let imgArr = new Array();
                    for(let i=0; i<r.data.files.length; i++) {
                        let imgData = {
                            prod_img_order:i+1,
                            prod_img_file:r.data.files[i].file,
                            prod_img_thumbnail:this.thumbnail == i?1:0
                        }
                        imgArr.push(imgData);
                    }



                    let productData = {
                        prod:this.prod,
                        data:this.detailData,
                        img_list:imgArr
                    }
                    console.log(JSON.stringify(productData));

                    axios.post("http://localhost:9999/api/admin/product/add", JSON.stringify(productData), {
                        headers:{"Content-Type":"application/json"}
                    })
                    .then((r) => {
                        console.log(r);
                    })
                })
            },
            selectImg() {
                this.$refs.img_input.click();
            },
            onDeleteImg(index) {
                this.previewImgs = this.previewImgs.filter((data) => data != this.previewImgs[index]);
            },
            onChangeDescImg(event, i) {
                console.log(event, i);
                var input = event.target;
                var reader = new FileReader();
                console.log(this.$refs.desc_file, this.desc_img_current);
                reader.onload = (e) => {
                    this.description_list[i].pd_content = e.target.result
                    this.description_list[i].pd_file = this.$refs.desc_content[i].files[0];
                }
                reader.readAsDataURL(input.files[0]);
                console.log(this.description_imgs);
            },
            onChangeFile(event) {
                // console.log();
                var input = event.target;
                var reader = new FileReader();
                reader.onload = (e) => {
                    let obj = {
                        preview:e.target.result,
                        data:this.$refs.img_input.files[0]
                    }
                    this.previewImgs.push(obj);
                    // console.log(this.previewImgs);
                    this.$refs.img_input.value="";
                }
                reader.readAsDataURL(input.files[0]);
                
            },
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
                this.prod.pi_manufacturer_seq = seq;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/fonts.scss";
    .popup_wrap {
        font-family: $font-kr;
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

    .preview_area {
        .img_box {
            width: 120px; height: 120px; position: relative;
            overflow: hidden; display: inline-block; vertical-align: middle;
            margin-right: 10px; margin-bottom: 10px;
            cursor:pointer;
            img {
                width: 100%; position: absolute;
                left: 50%; top: 50%; transform: translate(-50%, -50%);
                cursor:pointer;
            }
            input {
                display: none;
                +label span{
                    font-size: 10px;
                    padding: 5px 7px; position: absolute;
                    left: 0px; top: 0px; color: #fff;
                    z-index: 9; background-color: rgb(255, 97, 34);
                    border-radius: 0 0 8px 0;
                    display: none;
                }
                &:checked+label .select_box {
                    position: absolute;
                    display: block;
                    border: 2px solid rgb(255, 97, 34);
                    width: 120px; height: 120px;
                    box-sizing: border-box; border-radius: 0;
                    background-color: transparent;
                    cursor:pointer;
                }
                &:checked+label span {
                    display: inline-block;
                }
            }

        }
        #sel_img {
            width: 120px; height: 120px; position: relative;
            overflow: hidden; display: inline-block; vertical-align: top;
            margin-right: 10px;
            border: 0;
            color: #333; cursor: pointer;
            border-radius: 5px; box-sizing: border-box;
            border: 2px solid #ddd;
            .icon {
                font-size: 50px;
            }
        }
    }
</style>