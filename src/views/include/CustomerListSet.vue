<template>
    <div class="p-4 bottom-modal-contents-box">
        <IftaLabel class="label-input-box">
            <DatePicker showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd" v-model="client['info']['estiDt']" showTime hourFormat="24"/>
            <label>일자</label>
        </IftaLabel>

        <IftaLabel class="label-input-box">
            <InputText id="clientNm" v-model="client['info']['clientNm']" placeholder="고객명을 입력해주세요."/>
            <label>고객명<span class="ml-0.5 text-red-500">*</span></label>
            <small class="text-red-500">{{ client['msg']['clientNm'] }}</small>
        </IftaLabel>

        <template v-if="client.gb === 'Y'">
            <IftaLabel class="label-input-box">
                <InputText id="tel" v-model="client['info']['tel']" placeholder="010-0000-0000"/>
                <label>전화번호<span class="ml-0.5 text-red-500">*</span></label>
                <small class="text-red-500">{{ client['msg']['tel'] }}</small>
            </IftaLabel>
            
            <IftaLabel>
                <IconField>
                    <InputText v-model="client['info']['addr']" class="w-full" readonly @click="getAddr"/>
                    <InputIcon class="pi pi-search" />
                </IconField>
                <label>주소</label>
                <small class="text-red-500">{{ client['msg']['addr'] }}</small>
            </IftaLabel>

            <IftaLabel class="label-input-box">
                <InputText id="addrDetail" v-model="client['info']['addrDetail']" placeholder="상세주소를 입력해주세요."/>
                <label>상세주소</label>
            </IftaLabel>
        </template>

        <IftaLabel class="label-input-box">
            <Select v-model="client['info']['person']" :options="client['person']" optionLabel="label" optionValue="value" placeholder="선택"/> 
            <label>담당자<span class="ml-0.5 text-red-500">*</span></label>
            <small class="text-red-500">{{ client['msg']['person'] }}</small>
        </IftaLabel>

        <IftaLabel class="label-input-box">
            <Select v-model="client['info']['groupCd']" :options="client['group']" optionLabel="label" optionValue="value"/> 
            <label>그룹</label>
        </IftaLabel>

        <IftaLabel v-if="client['info']['groupCd'] === 'N'" class="label-input-box">
            <InputText id="groupNm" v-model="client['info']['groupNm']"/>
            <label>그룹명</label>
            <small class="text-red-500">{{ client['msg']['groupNm'] }}</small>
        </IftaLabel>
        <div class="bottom-modal-absol-box">
            <Button type="button" :label="client['type'] === 'I' ? '명세서 이동' : '저장'" class="w-full" size="large" @click="getSaveNext"/>
        </div>
    </div>
    <div id="layer" style="display:none;position:fixed;overflow:hidden;z-index:99999;-webkit-overflow-scrolling:touch;">
        <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" @click="getCloseDaumPost()" alt="닫기 버튼">
    </div>
</template>

<style>
#layer {
    background-color: aqua;
}
</style>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import { useConfirm } from "primevue/useconfirm";
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useClientStore } from '@/store';
import { getAxiosData, getConvertDate, getDaumPopupPosition } from '@/assets/js/function';
import { clientMsg } from '@/assets/js/msg';
import { usePopup } from '@/assets/js/popup';

const client    = useClientStore();
const confirm   = useConfirm();
const route     = useRoute();

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

            client.info['zip']  = data.zonecode;
            client.info['addr'] = addr;
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

const getSaveNext = () => {
    const checkParams = {
        gb          : client.gb,
        clientNm    : client['info']['clientNm'],
        tel         : client['info']['tel'],
        addr        : client['info']['addr'],
        person      : client['info']['person'],
        groupCd     : client['info']['groupCd'],
        groupNm     : client['info']['groupNm'],
    };

    const result = clientMsg(checkParams);

    if(!result['state'])
    {
        client.getMsgSet(result['msg'], result['id']);
        getFocus(result['id']);
        return false;
    }

    confirm.require({
        message     : client['type'] === 'I' ? '고객등록 후 명세표로 이동하시겠습니까?' : '고객 정보를 저장하시겠습니까?',
        header      : '고객저장',
        rejectProps : {
            label       : client['type'] === 'I' ? '뒤로이동' : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: client['type'] === 'I' ? '명세표 이동' : '저장하기'
        },
        accept : async () => {
            const params = {
                'type'          : client['type'],
                'estiDt'        : getConvertDate(client['info']['estiDt'], 'yyyy-mm-dd hh:ii'),
                'clientNm'      : client['info']['clientNm'],
                'tel'           : client['info']['tel'],
                'zip'           : client['info']['zip'],
                'addr'          : client['info']['addr'],
                'addrDetail'    : client['info']['addrDetail'],
                'person'        : client['info']['person'],
                'groupCd'       : client['info']['groupCd'],
                'groupNm'       : client['info']['groupNm']
            }

            if(client['type'] === 'U')
            {
                params['clientCd'] = client['clientCd'];
            }

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/clientV1/getResult`, params);

                await client.getList();
                await getPopupClose(true, 'clientChoice');
                await getPopupClose(true, 'clientSet');
                
                if(client['type'] === 'I')
                {
                    if(route.name === 'MainPage')
                    {
                        await window.history.pushState({ page: 'clientDetail' }, '', '#clientDetail')
                    }

                    await client.getDataSet(res.data['clientCd']);
                    await client.getDetail();
                    await getPopupOpen('clientDetail');
                }
                
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
                    switch(e.response.data['code'])
                    {
                        case 4000:
                            alert('고객 저장 도중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                        break;
                        case 4100:
                            client.getMsgSet('이미 등록된 그룹명 입니다.', 'groupNm');
                            getFocus('groupNm');
                        break;
                        case 4200:
                            client.getMsgSet('이미 등록된 전화번호입니다.', 'tel');
                            getFocus('tel');
                        break;
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

onMounted(async () => {
    await client.getReset();
    await client.getData();
})

</script>