<template>
    <div class="p-5 !pb-20">
        <div class="form-gap-box">
            <IftaLabel>
                <InputText id="outFaNm" v-model="factory['out']['info']['faNm']" class="w-full"/>
                <label>공장 이름</label>
                <small class="text-red-500">{{ factory['out']['msg']['outFaNm'] }}</small>
            </IftaLabel>

                <IftaLabel class="w-full">
                    <label>전화번호</label>
                    <InputText id="tel" v-model="factory['out']['info']['tel']" class="w-full"/>    
                    <small class="text-red-500">{{ factory['out']['msg']['tel'] }}</small>
                </IftaLabel>

                <IftaLabel>
                <IconField>
                    <InputText id="addr" v-model="factory['out']['info']['addr']" class="w-full" readonly @click="getAddr"/>
                    <InputIcon class="pi pi-search" />
                </IconField>
                <small class="text-red-500">{{ factory['out']['msg']['addr'] }}</small>
                <label>주소</label>
            </IftaLabel>

            <IftaLabel class="w-full">
                <label>상세 주소</label>
                <InputText id="addrDetail" v-model="factory['out']['info']['addrDetail']" class="w-full"/>    
            </IftaLabel>

            <IftaLabel class="w-full">
                <label>입금 계좌 정보</label>
                <InputText v-model="factory['out']['info']['accInfo']" class="w-full"/>    
            </IftaLabel>

            <IftaLabel class="w-full">
                <label>카카오톡 연동 전화번호</label>
                <InputText v-model="factory['out']['info']['kakaoTel']" class="w-full"/>    
            </IftaLabel>

            <IftaLabel class="w-full">
                <label>메모</label>
                <Textarea v-model="factory['out']['info']['memo']" rows="3" cols="30" style="resize: none" class="w-full" />
            </IftaLabel>
        </div>
        <div class="bottom-modal-absol-box">
            <Button type="button" size="large" label="저장" @click="getOutFactorySave" class="w-full" ></Button>
        </div>
    </div>
    <div id="layer" style="display:none;position:fixed;overflow:hidden;z-index:9999;-webkit-overflow-scrolling:touch;">
        <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" @click="getCloseDaumPost()" alt="닫기 버튼">
    </div>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Textarea from 'primevue/textarea';
import { useConfirm } from "primevue/useconfirm";
import { useFactoryStore } from '@/store';
import { usePopup } from '@/assets/js/popup';
import { outFactoryMsg } from '@/assets/js/msg';
import { getAxiosData, getDaumPopupPosition } from '@/assets/js/function';

const factory   = useFactoryStore();
const confirm   = useConfirm();

const { getPopupClose } = usePopup();

const getPopClose = (gb: boolean, popNm: string) => {
    getPopupClose(popNm, gb);
}

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

            factory.out.info['zip']  = data.zonecode;
            factory.out.info['addr'] = addr;
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

const getOutFactorySave = () => {
    const checkParams = {
        outFaNm : factory['out']['info']['faNm'],
        tel     : factory['out']['info']['tel'],
        addr    : factory['out']['info']['addr']
    };

    const result = outFactoryMsg(checkParams);

    if(!result['state'])
    {
        factory.getOutMsgSet(result['msg'], result['id']);
        getFocus(result['id']);
        return false;
    }

    confirm.require({
        message     : '입력하신 외주공장 정보를 저장하시겠습니까?',
        header      : '외주공장',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '저장'
        },
        accept : async () => {
            const params = {
                'type'          : factory['out']['type'],
                'fcGb'          : 'O',
                'faNm'          : factory['out']['info']['faNm'],
                'appGb'         : 'Y',
                'tel'           : factory['out']['info']['tel'],
                'zip'           : factory['out']['info']['zip'],
                'addr'          : factory['out']['info']['addr'],
                'addrDetail'    : factory['out']['info']['addrDetail'],
                'accInfo'       : factory['out']['info']['accInfo'],
                'kakaoTel'      : factory['out']['info']['kakaoTel'],
                'memo'          : factory['out']['info']['memo']
            }

            if(factory['out']['type'] === 'U')
            {
                params['fcCd'] = factory['out']['fcCd'];
            }

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/factoryV1/getOutFactorySave`, params);
                await factory.getList();
                await factory.getOutFactoryDetail();
                getPopClose(true, 'outFactorySet');
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
                    if(e.response.data['code'] === 4000)
                    {
                        factory.getOutMsgSet('이미 등록된 공장 이름입니다.', 'outFaNm');
                        getFocus('outFaNm');
                    }
                }
            }
        }
    });
}

const getFocus = (id: string) => {
    const inputElement = document.getElementById(id);
    if (inputElement) 
    {
        inputElement.focus();
    }
}

</script>

<style lang="scss">

</style>