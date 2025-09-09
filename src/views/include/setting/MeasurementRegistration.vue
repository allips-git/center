<template>
    <!-- <BackHeader title="실측등록" /> -->
    <main class="pb-[80px]" ref="mainRef">
        <div class="p-4 bottom-modal-contents-box">
        <IftaLabel class="label-input-box">
            <VueDatePicker id="regDt" v-model="actual.info.regDt" locale="ko" format="yyyy-MM-dd HH:mm" :enable-time-picker="true" 
                :is-24="true" input-class="w-full" :clearable="false" :auto-apply="true" :close-on-auto-apply="false"/>
            <label>등록 일자</label>
        </IftaLabel>

        <IftaLabel class="label-input-box">
            <InputText :id="'amNm'" v-model="actual.info.amNm" placeholder="실측명을 입력해주세요."/>
            <label>실측명<span class="ml-0.5 text-red-500">*</span></label>
            <small class="text-red-500">{{ actual['msg']['amNm'] }}</small>
        </IftaLabel>

        <IftaLabel>
            <IconField>
                <InputText v-model="actual.info.addr" class="w-full" readonly @click="getAddr"/>
                <InputIcon class="pi pi-search" />
            </IconField>
            <label>주소</label>
        </IftaLabel>

        <IftaLabel class="label-input-box">
            <InputText v-model="actual.info.addrDetail" id="addrDetail" placeholder="상세주소를 입력해주세요." />
            <label>상세주소</label>
        </IftaLabel>

        <IftaLabel class="w-full">
            <label for="emali">메모</label>
            <Textarea v-model="actual.info.memo" autoResize rows="3" cols="30" class="w-full" placeholder="메모를 입력해주세요." />
        </IftaLabel>

        <div class="bottom-modal-absol-box">
            <Button type="button" label="저장" class="w-full" size="large" @click="getSave"/>
        </div>
    </div>
    <div id="layer" style="display:none;position:fixed;overflow:hidden;z-index:99999;-webkit-overflow-scrolling:touch;">
        <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" @click="getCloseDaumPost()" alt="닫기 버튼">
    </div>
    </main>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Textarea from 'primevue/textarea';
import { useConfirm } from "primevue/useconfirm";
import { useActualStore } from '@/store';
import { getAxiosData, getDaumPopupPosition } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const confirm   = useConfirm();
const actual    = useActualStore();

const { getPopupOpen, getPopupClose } = usePopup();

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

            actual.info['zip']  = data.zonecode;
            actual.info['addr'] = addr;
            document.getElementById("addrDetail").focus();

            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
            layer.style.display = 'none';
        },
        width               : '100%',
        height              : '100%',
        submitMode          : false, // 뒤로가기 히스토리 남기지 않도록 설정
        maxSuggestItems     : 5,
    }).embed(layer);

    getDaumPopupPosition(layer);
}

const getCloseDaumPost = () => {
    document.getElementById('layer').style.display = 'none';
}

const getFocus = (id: string) => {
    const inputElement = document.getElementById(id);
    if (inputElement) 
    {
        inputElement.focus();
    }
}

const getSave = () => {
    if(actual.info.amNm === '')
    {
        actual.getMsgSet('실측명을 입력해주세요.', 'amNm');
        getFocus('amNm');
        return false;
    }

    confirm.require({
        message     : '해당 실측을 저장하시겠습니까?',
        header      : '실측저장',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '저장하기'
        },
        accept : async () => {
            const params = {
                type        : actual.type,
                amNm        : actual.info.amNm,
                zip         : actual.info.zip,
                addr        : actual.info.addr,
                addrDetail  : actual.info.addrDetail,
                memo        : actual.info.memo,
                regDt       : actual.info.regDt
            }

            if(actual.type === 'U')
            {
                params['amCd'] = actual.amCd;
            }

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/actualV1/getSave`, params);
                await actual.getListReset();
                await actual.getList();
                await getPopupClose(true, 'measurementRegistration');

                if(actual.type === 'I')
                {
                    getPopupOpen('measurementInfo');
                }

                await actual.getReset();
            }
            catch(e)
            {
                console.log(e);
                if(e.response.status === 401)
                {
                    alert('토큰 만료');
                }
                else
                {
                    console.log('실측 저장 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        }
    });
}


</script>

<style lang="scss">
</style>