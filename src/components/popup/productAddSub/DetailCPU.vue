<template>
    <div class="wrap">
        <h1>Detail CPU</h1>
        <div class="data_area">
            <table>
                <tbody>
                    <tr>
                        <td>코드네임</td>
                        <td><input type="text" v-model="detailData.detail_cpu_codename"/></td>
                        <td>소켓</td>
                        <td><input type="text" v-model="detailData.detail_cpu_socket"/></td>
                        <td>코어</td>
                        <td><input type="number" min="1" max="256" v-model="detailData.detail_cpu_core"/></td>
                        <td>스레드</td>
                        <td><input type="number" min="1" max="256" v-model="detailData.detail_cpu_thread"/></td>
                    </tr>
                    <tr>
                        <td>메모리 타입</td>
                        <td><input type="text" v-model="detailData.detail_cpu_ram_type"/></td>
                        <td>메모리 클럭</td>
                        <td><input type="number" min="0" max="99999" v-model="detailData.detail_cpu_ram_clock"/></td>
                        <td>베이스 클럭</td>
                        <td><input type="number" min="0" max="9999" v-model="detailData.detail_cpu_base_clock"/></td>
                        <td>부스트 클럭</td>
                        <td><input type="number" min="0" max="9999" v-model="detailData.detail_cpu_boost_clock"/></td>
                    </tr>
                    <tr>
                        <td>L1 캐시</td>
                        <td><input type="number" min="0" max="999999" v-model="detailData.detail_cpu_l1_cache"/></td>
                        <td>L2 캐시</td>
                        <td><input type="number" min="0" max="999999" v-model="detailData.detail_cpu_l2_cache"/></td>
                        <td>L3 캐시</td>
                        <td><input type="number" min="0" max="999999" v-model="detailData.detail_cpu_l3_cache"/></td>
                        <td>설계전력</td>
                        <td><input type="number" min="0" max="999" v-model="detailData.detail_cpu_tdp"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name:"DetailCPU",
        data(){
            return {
                detailData:{
                    detail_cpu_codename:"",
                    detail_cpu_socket:"",
                    detail_cpu_core:"",
                    detail_cpu_thread:"",
                    detail_cpu_l1_cache:"",
                    detail_cpu_l2_cache:"",
                    detail_cpu_l3_cache:"",
                    detail_cpu_ram_type:"",
                    detail_cpu_ram_clock:"",
                    detail_cpu_base_clock:"",
                    detail_cpu_boost_clock:"",
                    detail_cpu_tdp:""
                }
            }
        },
        unmounted() {
            this.detailData.detail_cpu_codename = "";
            this.detailData.detail_cpu_socket = "";
            this.detailData.detail_cpu_core = "";
            this.detailData.detail_cpu_thread = "";
            this.detailData.detail_cpu_l1_cache = "";
            this.detailData.detail_cpu_l2_cache = "";
            this.detailData.detail_cpu_l3_cache = "";
            this.detailData.detail_cpu_ram_type = "";
            this.detailData.detail_cpu_ram_clock = "";
            this.detailData.detail_cpu_base_clock = "";
            this.detailData.detail_cpu_boost_clock = "";
            this.detailData.detail_cpu_tdp = "";
        }
    }
</script>