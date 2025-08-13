<template>
  <div class="p-4 pt-[15px]">
    <div class="text-sm form-gap-box">
      <IftaLabel class="label-input-box">
        <Select
          v-model="setting['shippingGbInfo']['shippingGb']"
          :options="data['delivery']"
          optionLabel="name"
          optionValue="value"
        />
        <label>배송방법</label>
      </IftaLabel>
      <IftaLabel>
        <IconField>
          <InputText
            v-model="setting['shippingGbInfo']['addr']"
            class="w-full"
            readonly
            @click="getAddr"
          />
          <InputIcon class="pi pi-search" />
        </IconField>
        <label>주소</label>
        <!-- <small class="text-red-500">{{ client['msg']['addr'] }}</small> -->
      </IftaLabel>

      <IftaLabel>
        <IconField>
          <InputText
            id="shippingAddrDetail"
            v-model="setting['shippingGbInfo']['addrDetail']"
            class="w-full"
          />
          <InputIcon class="pi pi-search" />
        </IconField>
        <label>상세주소</label>
        <!-- <small class="text-red-500">{{ client['msg']['addrDetail'] }}</small> -->
      </IftaLabel>
    </div>
  </div>
  <div class="bottom-fixed-btn-box">
    <Button label="저장하기" size="large" :disabled="status" @click="getSave"></Button>
  </div>
  <div
    id="DaumLayer"
    style="
      display: none;
      position: fixed;
      overflow: hidden;
      z-index: 99999;
      -webkit-overflow-scrolling: touch;
    "
  >
    <img
      src="//t1.daumcdn.net/postcode/resource/images/close.png"
      id="btnCloseLayer"
      style="cursor: pointer; position: absolute; right: -3px; top: -3px; z-index: 1"
      @click="getCloseDaumPost()"
      alt="닫기 버튼"
    />
  </div>
</template>

<script setup lang="ts">
import IftaLabel from 'primevue/iftalabel'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import { useConfirm } from "primevue/useconfirm";
import { onMounted, ref } from 'vue'
import { useDataStore, useSettingStore } from '@/store'
import { getDaumPopupPosition, getAxiosData } from '@/assets/js/function'
import { usePopup } from '@/assets/js/popup'

const data      = useDataStore();
const confirm   = useConfirm();
const setting   = useSettingStore();
const status    = ref(false);

const { getPopupClose } = usePopup()

const getAddr = () => {
    const layer = document.getElementById('DaumLayer');

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

            setting.shippingGbInfo['zip']  = data.zonecode;
            setting.shippingGbInfo['addr'] = addr;
            document.getElementById("shippingAddrDetail").focus();

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

const getSave = () => {
    confirm.require({
        message     : '배송지를 저장하시겠습니까?',
        header      : '배송지 저장',
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
                shippingGb  : setting.shippingGbInfo.shippingGb,
                zip         : setting.shippingGbInfo.zip,
                addr        : setting.shippingGbInfo.addr,
                addrDetail  : setting.shippingGbInfo.addrDetail
            };

            console.log(params);

            status.value = true; 

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/settingV1/getShippingGbSave`, params);

                getPopupClose('shippingGbSet', true);
                await setting.getShippingGbList();
                
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
                    alert('대표 배송지 저장 도중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }

            status.value = false;
        }
    });
}

onMounted(async () => {
    await setting.getShippingReset()
})
</script>

<style lang="scss">
.custom-input-select-btn {
  display: flex;
  align-items: center;
  justify-content: end;
}
// .custom-InputGroupAddon{
//     padding: 0 !important;
//     width: 50%;
//     flex:  none;
//     // border: none !important;
// }
</style>
