<template>
    <main class="p-5 !pb-32">
        <div class="form-gap-box">
            <IftaLabel class="label-input-box">
                <DatePicker v-model="order['sysInfo']['ordDt']" showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd"/>
                <label>주문일</label>
            </IftaLabel>

            <div class="label-input-box">
                <div class="flex gap-2">
                    <IftaLabel class="label-input-box">
                        <DatePicker v-model="order['outInfo']['outDt']" showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd"/>
                        <label>출고일</label>
                    </IftaLabel>
    
                    <IftaLabel class="label-input-box max-w-48">
                        <label>긴급여부</label>
                        <Select v-model="order['outInfo']['emer']" :options="data['emer']" optionLabel="name" optionValue="value"
                            @change="getShippingGb"/>
                    </IftaLabel>
                </div>
            </div>

            <div class="label-input-box">
                <div class="flex gap-2">
                    <IftaLabel class="label-input-box max-w-48">
                        <label>배송 방법</label>
                        <Select v-model="order['sysInfo']['shippingGb']" :options="data['delivery']" optionLabel="name" optionValue="value"
                            @change="getShippingGb"/>
                    </IftaLabel>
    
                    <IftaLabel class="label-input-box">
                        <label>주소</label>
                        <InputText v-model="order['sysInfo']['addr']" :disabled="order['sysInfo']['shippingGb'] === '001' || order['sysInfo']['shippingGb'] === '005' ? true : false" 
                            readonly @click="getAddr"/>
                    </IftaLabel>
                </div>
                <small class="text-red-500">{{ addrMsg }}</small>
            </div>
    
            <IftaLabel class="label-input-box">
                <label>상세 주소</label>
                <InputText id="addrDetail" v-model="order['sysInfo']['addrDetail']" placeholder="상세 주소를 입력하세요" />
                <small class="text-red-500">{{ addrDetailMsg }}</small>
            </IftaLabel>
    
            <IftaLabel class="label-input-box">
                <label>배송 요청사항</label>
                <Textarea v-model="order['sysInfo']['memo']" rows="5" placeholder="배송 요청사항을 입력하세요." />
            </IftaLabel>
            
            <div class="mt-2 btn-2-layout-box bottom-fixed-btn-box">
                <Button :severity="'primary'" label="시스템 발주" @click="getOrder"/>
            </div>
        </div>
        <div id="layer" style="display:none;position:fixed;overflow:hidden;z-index:9999;-webkit-overflow-scrolling:touch;">
            <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" @click="getCloseDaumPost()" alt="닫기 버튼">
        </div>
    </main>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import Textarea from 'primevue/textarea';
import { onMounted, ref } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useDataStore, useOrderStore, useEstiStore } from '@/store';
import { getAxiosData, getTokenOut, getDaumPopupPosition } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const confirm       = useConfirm();
const data          = useDataStore();
const order         = useOrderStore();
const esti          = useEstiStore();
const addrMsg       = ref('');
const addrDetailMsg = ref('');

const { getPopupClose } = usePopup();

const getShippingGb = () => {
    order.getSysInfoAddrSet();
}

const getAddr = () => {
    if(order['sysInfo']['shippingGb'] === '001')
    {
        return false;
    }

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

            order['sysInfo']['zip']  = data.zonecode;
            order['sysInfo']['addr'] = addr;
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

const getOrder = () => {
    if((order['sysInfo']['shippingGb'] !== '001' && order['sysInfo']['shippingGb'] !== '005') && order['sysInfo']['addr'] === '')
    {
        addrMsg.value = '주소를 검색해주세요.';
        return false;
    }

    // if(order['sysInfo']['addrDetail'] === '')
    // {
    //     addrMsg.value       = '';
    //     addrDetailMsg.value = '상세 주소를 입력해주세요.';
    //     document.getElementById("addrDetail").focus();
    //     return false;
    // }
    
    confirm.require({
        message     : '시스템 발주 처리하시겠습니까?',
        header      : '시스템 발주',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '확인'
        },
        accept : async () => {
            const params = {
                edCd        : order['edCd'],
                ordDt       : order['sysInfo']['ordDt'],
                outDt       : order['sysInfo']['outDt'],
                emer        : order['sysInfo']['emer'],
                shippingGb  : order['sysInfo']['shippingGb'],
                zip         : order['sysInfo']['zip'] ? order['sysInfo']['zip'] : '',
                addr        : order['sysInfo']['addr'],
                addrDetail  : order['sysInfo']['addrDetail'],
                memo        : order['sysInfo']['memo']
            }

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/orderV1/getSysOrderResult`, params);
                await order.getList({ emCd : esti['emCd'] });
                getPopupClose('sysOrderSet', true);
            }
            catch(e)
            {
                console.log(e);
                if(e.response.status === 401)
                {
                    getTokenOut();
                }
                else
                {
                    alert('시스템 발주서 처리 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        }
    });
}

onMounted(async () => {
    await order.getData();

    console.log(order.sysInfo);
})
</script>