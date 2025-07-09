<template>
    <Dialog v-model:visible="visible"
        pt:root:class="!border-0 !bg-transparent w-full md:w-[400px] min-h-[600px] md:h-auto h-full !max-h-screen" 
        pt:mask:class="bg-white backdrop-blur-sm">
            <template #container>
                <BackHeader title="매장 회원가입 2/2"/>
                <div class="overflow-y-auto mb-20 modal-page-padding">
                    <div class="p-4 mb-8 bg-gray-50 rounded-lg">
                        <p class="text-sm">
                            플랜오더에 등록하실 운영 중인 매장시설 정보와 플랜 및 문자메시지 등 플랜오더 이용을 위한 결제수단을 입력해주세요.<br>
                            <b>* 안심하세요! 결제수단을 등록해도, 2주 무료체험 기간 동안 절대 결제가 일어나지 않고 언제든 해지 가능해요.</b>
                        </p>
                        <span class="block mt-4 text-gray-400 text-10">무료체험 기간 동안 이용을 해지하지 않으시면 무료체험 종료일 오전 10시에 자동으로 결제되며, 매월 25일 정기결제가 이루어집니다.</span>
                    </div>
                    <div class="form-gap-box">
                        <IftaLabel class="w-full">
                            <label>매장이름</label>
                            <InputText id="ceNm" v-model="join['center']['ceNm']" placeholder="매장이름을 입력해주세요." class="w-full"/>    
                            <small v-if="join['msg']['ceNm'] !== ''" class="text-xs text-red-500">{{ join['msg']['ceNm'] }}</small>
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label>지역</label>
                            <Select v-model="join['center']['area']" :options="data['area']" optionLabel="name" optionValue="value" placeholder="지역을 선택해주세요." class="w-full"/>
                        </IftaLabel>

                        <div class="flex flex-col gap-2">
                            <label class="text-base">사업자 구분</label>
                            <SelectButton v-model="join['center']['gb']" :options="data['einGb']" optionLabel="name" optionValue="value" size="small" />
                        </div>

                        <IftaLabel class="w-full">
                            <label>사업자 등록 번호</label>
                            <InputText id="einNum" v-model="join['center']['einNum']" placeholder="- 없이 입력해주세요." class="w-full"/>
                            <small v-if="join['msg']['einNum'] !== ''" class="text-xs text-red-500">{{ join['msg']['einNum'] }}</small>
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label>사업자등록증상 대표자 이름</label>
                            <InputText id="ceoNm" v-model="join['center']['ceoNm']" placeholder="대표자 이름을 입력해주세요." class="w-full"/>   
                            <small v-if="join['msg']['ceoNm'] !== ''" class="text-xs text-red-500">{{ join['msg']['ceoNm'] }}</small>
                        </IftaLabel>

                        <IftaLabel>
                            <IconField>
                                <InputText v-model="join['center']['addr']" placeholder="주소를 검색해주세요." class="w-full" readonly @click="getAddr"/>
                                <InputIcon class="pi pi-search" />
                            </IconField>
                            <label>주소</label>
                            <small v-if="join['msg']['addr'] !== ''" class="text-xs text-red-500">{{ join['msg']['addr'] }}</small>
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label>상세주소</label>
                            <InputText id="addrDetail" v-model="join['center']['addrDetail']" placeholder="상세 주소를 입력해주세요." class="w-full"/>
                        </IftaLabel>

                        <IftaLabel class="w-full">
                            <label>매장 대표 연락처</label>
                            <InputText id="ceoTel" v-model="join['center']['ceoTel']" placeholder="- 없이 입력해주세요." class="w-full"/>  
                            <small v-if="join['msg']['ceoTel'] !== ''" class="text-xs text-red-500">{{ join['msg']['ceoTel'] }}</small>  
                        </IftaLabel>
                        
                    </div>
                    <div class="mobile-fiex-bottom">
                        <Button label="매장시설 정보 제출하기" class="w-full" @click="getResultCheck"/>
                    </div>
                </div>
                <div id="layer" style="display:none;position:fixed;overflow:hidden;z-index:9999;-webkit-overflow-scrolling:touch;">
                    <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" @click="getCloseDaumPost()" alt="닫기 버튼">
                </div>
            </template>
        </Dialog>
    </template>
    
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import SelectButton from 'primevue/selectbutton';
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import BackHeader from '@/components/layouts/BackHeader.vue'
import { useConfirm } from "primevue/useconfirm";
import { useDataStore, useJoinStore } from '@/store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getDaumPopupPosition } from '@/assets/js/function';
import { joinSecondMsg } from '@/assets/js/msg';
import axios from 'axios';

const confirm   = useConfirm();
const data      = useDataStore();
const join      = useJoinStore();
const router    = useRouter();
const visible   = ref(true);

const getAddr = () => {
    const layer = document.getElementById('layer');

    new window.daum.Postcode({
        oncomplete          : function(data) {
            let addr = '';

            if (data.userSelectedType === 'R') 
            { 
                // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } 
            else 
            { 
                // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            join.center['zip']  = data.zonecode;
            join.center['addr'] = addr;
            document.getElementById("addrDetail").focus();

            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
            layer.style.display = 'none';
        },
        width               : '100%',
        height              : '100%',
        submitMode          : false, // 뒤로가기 히스토리 남기지 않도록 설정
        maxSuggestItems     : 5
    }).embed(layer);

    getDaumPopupPosition(layer);
}

const getCloseDaumPost = () => {
    document.getElementById('layer').style.display = 'none';
}

const getResultCheck = () => {
    const checkParams = {
        ceNm    : join['center']['ceNm'],
        einNum  : join['center']['einNum'],
        ceoNm   : join['center']['ceoNm'],
        addr    : join['center']['addr'],
        ceoTel  : join['center']['ceoTel']
    };

    const result = joinSecondMsg(checkParams);

    console.log(result);

    if(!result['state'])
    {
        join['msg'][result['id']] = result['msg'];
        const inputElement = document.getElementById(result['id']);
        if (inputElement) 
        {
            inputElement.focus();
        }

        return false;
    }

    confirm.require({
        message     : '센터시설 정보 제출을 완료하시겠습니까?',
        header      : '회원가입',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label       : '확인',
        },
        accept : () => {
            getResult();
        }
    });
}

const getResult = async () => {
    const formData = new FormData();
    const params   = {
        id          : join['login']['id'],
        pw          : join['login']['pw'],
        tel         : join['auth']['tel'],
        name        : join['auth']['name'],
        ceNm        : join['center']['ceNm'],
        area        : join['center']['area'],
        einGb       : join['center']['gb'],
        einNum      : join['center']['einNum'],
        ceoNm       : join['center']['ceoNm'],
        zip         : join['center']['zip'],
        addr        : join['center']['addr'],
        addrDetail  : join['center']['addrDetail'],
        ceoTel      : join['center']['ceoTel'],
        agree1      : join['agree']['use']['yn'] ? 'Y' : 'N',
        agree2      : join['agree']['info']['yn'] ? 'Y' : 'N',
        agree3      : join['agree']['choice']['yn'] ? 'Y' : 'N'
    }

    console.log(JSON.stringify(params, null, 2))

    formData.append('request', new Blob([JSON.stringify(params)], {
        type: 'application/json'
    }));

    formData.append('fileData', join['login']['einFile']['file']);

    try
    {
        await axios.put('https://po-data.plansys.kr/v1/center/join/dataProc', formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        });

        join.getReset();
        router.push({path : `/login`});
    }
    catch(e)
    {
        console.log(e);
        if(e.response.data === 'duplicate')
        {
            join.getMsgSet('이미 사용 중인 계정입니다.', 'id');
            const inputElement = document.getElementById('id');
            if (inputElement) 
            {
                inputElement.focus();
            }
            router.push({ path : '/join/joinFirst' });
        }
        else
        {
            alert('회원가입 도중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
        }
    }
}

// onMounted(()=>{
//     if(!join.certified)
//     {
//         router.go(-1);
//     }
// })
</script>

<style lang="scss" scoped>

</style>