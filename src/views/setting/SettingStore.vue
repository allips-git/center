<template>
    <div class="h-full overflow-y-auto">
        <BackHeader title="매장 설정"/>
        <main class="pt-3 pb-[140px] md:pb-[160px]">
            <section class="px-4 md:px-6">
                <div class="flex flex-col gap-1">
                    <p class="text-10 text-t-lv3">프로필 사진</p>
                    <div class="relative size-[95px] ">
                        <div class="relative flex items-center justify-center overflow-hidden border border-gray-200 rounded-lg size-[95px]">
                            <img v-if="setting['info']['file']" :src="setting['info']['image']" class="aspect-square size-full" alt="">
                            <i v-else class="!text-4xl pi pi-image text-gray-400" />
                        </div>
                        <div class="absolute z-10 flex items-center justify-center overflow-hidden bg-white rounded-[10px] blur-back -bottom-1 -right-1 size-[29px]">
                            <IconPlus/>
                        </div>
                        <input type="file" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" @change="getFile($event)"/>
                    </div>
                </div>
            </section>
            <!-- <div class="gray-bar"></div> -->
            <section class="px-4 md:px-6 form-gap-box mt-[30px]">
                <IftaLabel class="w-full">
                    <InputText id="ceNm" v-model="setting['info']['ceNm']" class="w-full"/>
                    <label>매장이름<span class="ml-0.5 text-red-500">*</span></label>
                    <small class="text-red-500">{{ setting['msg']['ceNm'] }}</small>
                </IftaLabel>

                <IftaLabel>
                    <IconField>
                        <InputText id="addr" v-model="setting['info']['addr']" class="w-full" readonly placeholder="주소를 입력해주세요." @click="getAddr"/>
                        <InputIcon>
                            <IconSpot/>
                        </InputIcon>
                    </IconField>
                    <label>주소<span class="ml-0.5 text-red-500">*</span></label>
                    <small class="text-red-500">{{ setting['msg']['addr'] }}</small>
                </IftaLabel>

                <IftaLabel class="label-input-box">
                    <InputText id="addrDetail" v-model="setting['info']['addrDetail']"/>
                    <label>상세주소<span class="ml-0.5 text-red-500">*</span></label>
                    <small class="text-red-500">{{ setting['msg']['addrDetail'] }}</small>
                </IftaLabel>

                <IftaLabel class="label-input-box">
                    <InputText id="tel" v-model="setting['info']['tel']"/>
                    <label>대표 전화번호<span class="ml-0.5 text-red-500">*</span></label>
                    <small class="text-red-500">{{ setting['msg']['tel'] }}</small>
                </IftaLabel>

                <IftaLabel class="label-input-box">
                    <InputText v-model="setting['info']['einShipping']"/>
                    <label>대표 화물 지점</label>
                </IftaLabel>

                <IftaLabel class="label-input-box">
                    <InputText v-model="setting['info']['homepage']"/>
                    <label>홍보 홈페이지 URL</label>
                </IftaLabel>

                <div class="relative ifta-label-box">
                    <ul class="flex justify-center gap-3 mt-2 font-bold">
                        <li v-for="(day, index) in setting['info']['days']" :key="index" @click="setting.getDayCheck(day['value'])" 
                            :class="{'bg-sky-500 text-white': day['checked'], 'bg-transparent': !day['checked']}" class="py-2.5 px-2 transition-colors duration-300 border border-gray-200 rounded-full cursor-pointer text-xs">
                            {{ day['text'] }}
                        </li>
                    </ul>
                    <label class="absolute left-1.5 ifta-label -top-1 !text-10 !text-[#999999]">매장운영일</label>
                </div>

                <div class="flex flex-col gap-5">
                    <div class="flex w-full gap-4 mt-3">
                        <IftaLabel class="label-input-box">
                            <div class="w-full custom-select-arrow">
                                <DatePicker v-model="setting['info']['dayStart']" class="w-full" showIcon fluid iconDisplay="input" timeOnly/>
                                <IconPlay class="absolute rotate-90 top-3 right-2 *:fill-gray-400 -z-10"/>
                            </div>
                            <label for="">매장 운영 시작시간</label>
                        </IftaLabel>
                        <IftaLabel class="label-input-box">
                            <div class="w-full custom-select-arrow">
                                <DatePicker v-model="setting['info']['dayEnd']" class="w-full" showIcon fluid iconDisplay="input" timeOnly/>
                                <IconPlay class="absolute rotate-90 top-3 right-2 *:fill-gray-400 -z-10"/>
                            </div>
                            <label for="">매장 운영 종료시간</label>
                        </IftaLabel>
                    </div>
                </div>

                <div class="flex flex-col gap-5">
                    <div class="flex w-full gap-4 mt-3">
                        <IftaLabel class="label-input-box">
                            <div class="w-full custom-select-arrow">
                                <DatePicker v-model="setting['info']['holidayStart']" class="w-full" showIcon fluid iconDisplay="input" timeOnly/>
                                <IconPlay class="absolute rotate-90 top-3 right-2 *:fill-gray-400 -z-10"/>
                            </div>
                            <label for="">공휴일 운영 시작시간</label>
                        </IftaLabel>
                        <IftaLabel class="label-input-box">
                            <div class="w-full custom-select-arrow">
                                <DatePicker v-model="setting['info']['holidayEnd']" class="w-full" showIcon fluid iconDisplay="input" timeOnly/>
                                <IconPlay class="absolute rotate-90 top-3 right-2 *:fill-gray-400 -z-10"/>
                            </div>
                            <label for="">공휴일 운영 종료시간</label>
                        </IftaLabel>
                    </div>
                </div>

                <div class="flex justify-between w-full">
                        <p class="text-sm text-t-lv2">모든 공휴일은 휴무에요</p>
                        <ToggleSwitch v-model="setting['info']['holiday']"/>
                </div>
    
                <IftaLabel class="w-full">
                    <label>매장 설명</label>
                    <Textarea v-model="setting['info']['memo']" autoResize rows="3" cols="30" class="w-full" />
                </IftaLabel>
            </section>
            <div class="bottom-fixed-btn-box">
                <Button label="저장" size="large" @click="getSave"/>
            </div>
        </main>
    </div>
    <div id="layer" style="display:none;position:fixed;overflow:hidden;z-index:9999;-webkit-overflow-scrolling:touch;">
        <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" @click="getCloseDaumPost()" alt="닫기 버튼">
    </div>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Textarea from 'primevue/textarea';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconSpot from '@/components/icons/IconSpot.vue';
import IconPlay from '@/components/icons/IconPlay.vue';
import DatePicker from 'primevue/datepicker';
import ToggleSwitch from 'primevue/toggleswitch';
import { onMounted } from 'vue';
import { useSettingStore } from '@/store';
import { getAxiosData, getConvertDate, getDaumPopupPosition } from '@/assets/js/function';
import { settingMsg } from '@/assets/js/msg';

const setting = useSettingStore();

const getFile = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) 
    {
        const file      = target.files[0];
        const reader    = new FileReader();

        reader.onload = (e) => {
            setting.getFile(file, e.target?.result as string);
        };
        reader.readAsDataURL(file);
    }
}

const getAddr = () => {
    const layer = document.getElementById('layer');

    new window.daum.Postcode({
        oncomplete : function(data) {
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

            setting.info['zip']  = data.zonecode;
            setting.info['addr'] = addr;
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

const getSave = async () => {
    const checkParams = {
        ceNm        : setting['info']['ceNm'],
        addr        : setting['info']['addr'],
        addrDetail  : setting['info']['addrDetail'],
        tel         : setting['info']['tel']
    };

    const result = settingMsg(checkParams);

    if(!result['state'])
    {
        setting.getMsgSet(result['msg'], result['id']);
        getFocus(result['id']);
        return false;
    }

    const formData = new FormData();
    const params   = {
        ceNm        : setting['info']['ceNm'],
        zip         : setting['info']['zip'],
        addr        : setting['info']['addr'],
        addrDetail  : setting['info']['addrDetail'],
        tel         : setting['info']['tel'],
        einShipping : setting['info']['einShipping'],
        homepage    : setting['info']['homepage'],
        days        : setting['info']['days'].map(item => item['checked'] ? { 
            value: item['value'],
            text : item['text']
        } : null).filter(item => item !== null),
        dayStart    : getConvertDate(setting['info']['dayStart'], 'hh:ii'),
        dayEnd      : getConvertDate(setting['info']['dayEnd'], 'hh:ii'),
        holidayStart: getConvertDate(setting['info']['holidayStart'], 'hh:ii'),
        holidayEnd  : getConvertDate(setting['info']['holidayEnd'], 'hh:ii'),
        holiday     : setting['info']['holiday'] ? 'Y' : 'N',
        memo        : setting['info']['memo']
    };

    formData.append('params', JSON.stringify(params));

    if(setting['info']['file'] !== null)
    {
        formData.append('file', setting['info']['file']);
    }

    try
    {
        const instance  = await getAxiosData();
        await instance.post('https://data.planorder.kr/settingV1/getSave', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        alert('저장되었습니다.');
    }
    catch(e)
    {
        console.log(e);
        alert('매장 정보 저장 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
    }
}

const getFocus = (id: string) => {
    const inputElement = document.getElementById(id);
    if (inputElement) 
    {
        inputElement.focus();
    }
}

onMounted(() => {
    setting.getInfo();
})
</script>

<style lang="scss">
.blur-back{
    backdrop-filter: blur(20px);
    background-color: rgba(169, 173, 168, 0.3) ;
}
</style>