<template>
    <div>
        <main class="px-4 md:px-6 pc-contents-h-box">
        <div class="relative mt-2 custom-left-tab">
            <Tabs :value="coupon['info']['unit'] === 'F' ? '0' : '1'">
                <TabList>
                    <Tab value="0" @click="coupon.getUnit('F')" class="tab-header">금액</Tab>
                    <Tab value="1" @click="coupon.getUnit('P')" class="tab-header">퍼센트</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <section class="mt-3 form-gap-box !gap-8 pt-3">
                            <div class="relative flex items-center justify-between w-full text-sm">
                                <label class="w-[150px] flex-none !text-t-lv3 text-con">쿠폰이름</label>
                                <InputText :id="'cpNm'" v-model="coupon['info']['cpNm']" class="w-full font-medium text-right !border-0 !border-b max-w-[124px] !pr-0" placeholder="쿠폰이름 입력"/>
                            </div>
                            <div class="relative flex items-center justify-between w-full text-sm">
                                <label class="w-[100px] flex-none !text-t-lv3 text-con">할인 금액 입력</label>
                                <InputNumber :inputId="'val'" v-model="coupon['info']['val']" class="w-full font-bold *!text-right inputNumber-color *:!border-0 *:!border-b *:w-full max-w-[124px] *:!pr-4" />
                                <span class="absolute right-0 font-bold translate-y-1/2 bottom-1/2">원</span>
                            </div>
                        </section>
                    </TabPanel>
                    <TabPanel value="1">
                        <section class="mt-3 form-gap-box !gap-8 pt-3">
                            <div class="relative flex items-center justify-between w-full text-sm">
                                <label class="w-[150px] flex-none !text-t-lv3 text-con">쿠폰이름</label>
                                <InputText :id="'cpNm'" v-model="coupon['info']['cpNm']" class="w-full font-medium text-right !border-0 !border-b max-w-[124px] !pr-0" placeholder="쿠폰이름 입력"/>
                            </div>
                            <div class="relative flex items-center justify-between w-full text-sm">
                                <label class="w-[100px] flex-none !text-t-lv3 text-con">할인율</label>
                                <InputNumber :inputId="'val'" :max="100" v-model="coupon['info']['val']" class="w-full font-bold *!text-right inputNumber-color *:!border-0 *:!border-b *:w-full max-w-[124px] *:!pr-4" />
                                <span class="absolute right-0 font-bold translate-y-1/2 bottom-1/2">%</span>
                            </div>
                        </section>
                    </TabPanel>
                </TabPanels>
                <small class="text-red-500">{{ msg }}</small>
            </Tabs>   
        </div>
            <div class="bottom-fixed-btn-box !bottom-0">
                <route-link to="/setting/coupon_detail">
                    <Button label="저장" size="large" class="w-full" @click="getSave"/>
                </route-link>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import InputNumber from 'primevue/inputnumber';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import { useConfirm } from "primevue/useconfirm";
import { useCouponStore } from '@/store';
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';
import { ref } from 'vue';
import { couponMsg } from '@/assets/js/msg';
const { getPopupClose } = usePopup();

const confirm   = useConfirm();
const coupon    = useCouponStore();
const msg       = ref('');

const getSave = () => {
    const checkParams = {
        cpNm    : coupon['info']['cpNm'],
        val     : coupon['info']['val']
    };

    const result = couponMsg(checkParams);

    if(!result['state'])
    {
        msg.value = result['msg'];
        getFocus(result['id']);
        return false;
    }

    confirm.require({
        message     : '쿠폰을 저장하시겠습니까?',
        header      : '저장',
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
                type    : coupon['type'],
                cpNm    : coupon['info']['cpNm'],
                val     : coupon['info']['val'],
                unit    : coupon['info']['unit']
            }

            if(coupon['type'] === 'U')
            {
                params['cpCd'] = coupon['cpCd'];
            }

            console.log(JSON.stringify(params, null, 2));

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/couponV1/getSave`, params);
                await coupon.getListReset();
                coupon.getList();
                getPopupClose('couponDetail', true);
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
                    alert('쿠폰 저장 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
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


<style lang="scss" >
.custom-input-select-btn{
    height: 100% !important;
    &.p-selectbutton .p-togglebutton:first-child{
        border-radius: 0 !important;
    }
    > button{
        height: 100%;
    }
}
.custom-InputGroupAddon{
    padding: 0 !important;
    flex:  none
}
</style>