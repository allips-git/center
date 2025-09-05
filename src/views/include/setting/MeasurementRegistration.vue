<template>
    <!-- <BackHeader title="실측등록" /> -->
    <main class="pb-[80px]" ref="mainRef">
        <div class="p-4 bottom-modal-contents-box">
        <IftaLabel class="label-input-box">
            <DatePicker showIcon fluid iconDisplay="input" dateFormat="yy-mm-dd" showTime hourFormat="24"/>
            <label>등록 일자</label>
        </IftaLabel>

        <IftaLabel class="label-input-box">
            <InputText placeholder="실측명을 입력해주세요."/>
            <label>실측명</label>
            <small class="text-red-500"></small>
        </IftaLabel>

        <IftaLabel>
            <IconField>
                <InputText class="w-full" readonly @click="getAddr"/>
                <InputIcon class="pi pi-search" />
            </IconField>
            <label>주소</label>
            <small class="text-red-500"></small>
        </IftaLabel>

        <IftaLabel class="label-input-box">
            <InputText id="addrDetail" placeholder="상세주소를 입력해주세요." />
            <label>상세주소</label>
        </IftaLabel>

        <IftaLabel class="w-full">
            <label for="emali">메모</label>
            <Textarea  autoResize rows="3" cols="30" class="w-full" placeholder="메모를 입력해주세요." />
        </IftaLabel>

        <div class="bottom-modal-absol-box">
            <Button type="button" label="저장" class="w-full" size="large" />
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
import DatePicker from 'primevue/datepicker';
import Textarea from 'primevue/textarea';
import { useClientStore } from '@/store';
import { getDaumPopupPosition } from '@/assets/js/function';

const client    = useClientStore();

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

</script>

<style lang="scss">
</style>