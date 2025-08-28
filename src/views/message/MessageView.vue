<template>
    <BackHeader title="메세지 저장" />
    <main class="pb-32 w-full">
        <section class="flex justify-between items-start px-4 pb-5">
            <div class="flex flex-wrap gap-1 items-center">
                <Button label="고객 선택" icon="pi pi-plus" outlined size="small" rounded @click="getPopupOpen('clientChoice')" class="!rounded-full !gap-1 !pr-2.5"></Button>
                <span class="px-2.5 py-1.5 text-xs font-bold rounded-full border text-t-lv2 border-l-lv4" v-if="msg.clientList.length > 0">
                    {{ msg.clientList.length === 1 ? msg.clientList[0]['clientNm'] : msg.clientList[0]['clientNm']+' 외 '+(msg.clientList.length - 1)+'명'  }}
                </span>
            </div>
            <div class="flex flex-none gap-1 items-center">
                <Button label="메세지 저장" size="small" @click="getSave"></Button>
                <Button v-if="msg.type === 'U'" label="삭제" size="small" severity="danger" @click="getDelete"></Button>
            </div>
        </section>
        <section class="flex flex-col gap-6 mt-5">
            <div class="px-4">
                <IftaLabel class="w-full">
                    <InputText id="title" v-model="msg.info.title" class="w-full"/>
                    <label>문자 제목</label>
                </IftaLabel>
                <small class="text-msg">{{ msg['msg'][`title`] }}</small>
            </div>
            <div class="!my-0 gray-bar"></div>
            <div class="px-4">
                <IftaLabel class="w-full">
                    <Textarea id="contents" v-model="msg.info.contents" class="w-full" autoResize rows="10" cols="30"/>
                    <label>문자 내용</label>
                </IftaLabel>
                <small class="text-msg">{{ msg['msg'][`contents`] }}</small>
                <small class="text-msg">{{ msg['msg'][`clientList`] }}</small>
            </div>
        </section>
    </main>
    <div class="z-10 flex-col bottom-fixed-btn-box">
        <!-- <div>
            <div class="flex gap-2 *:!text-xs mb-2">
                <Tag severity="info" value="업체명"></Tag>
                <Tag severity="success" value="담당자명"></Tag>
                <Tag severity="warn" value="고객명"></Tag>
            </div>
        </div> -->
        <div class="flex w-full gap-2 *:w-full">
            <Button size="large"  label="문자 메세지 보내기" @click="getNavi"/>
            <!-- <Button size="large" icon="pi pi-arrow-up-right" class="flex-none" text severity="secondary" @click="getNavi"/> -->
        </div>
    </div>
    <Dialog v-model:visible="popup['pop']['clientChoice']"
        :modal=true position="bottom" class="custom-dialog-bottom"
        @update:visible="getPopupClose('clientChoice', true)">
        <div class="modal-backheader">
            <Button @click="getPopupClose('clientChoice', true)" severity="contrast" text icon="pi pi-times" />
            <h2 class="modal-backheader-title">고객 선택</h2>
        </div>
        <CustomerChoice/>
    </Dialog>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import CustomerChoice from '@/views/include/message/CustomerChoice.vue'
import IftaLabel from 'primevue/iftalabel';
import Textarea from 'primevue/textarea';
// import Tag from 'primevue/tag';
import { ref, onMounted } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from 'vue-router';
import { usePopupStore, useMainStore, useMsgStore } from '@/store';
import { messageMsg } from '@/assets/js/msg';
import { getAxiosData } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const confirm   = useConfirm();
const popup     = usePopupStore();
const main      = useMainStore();
const msg       = useMsgStore();
const router    = useRouter();
const status    = ref(false);

const { getPopupOpen, getPopupClose } = usePopup();

const getSave = () => {
    const check = getCheck('S');

    if(check)
    {
        confirm.require({
            message     : '해당 메세지를 저장하시겠습니까?',
            header      : '메세지 저장',
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
                    type        : msg.type,
                    title       : msg.info.title,
                    contents    : msg.info.contents
                }

                if(msg.type === 'U')
                {
                    params['msCd'] = msg.msCd;
                }

                status.value = true;

                try
                {
                    const instance  = await getAxiosData();
                    await instance.post(`https://data.planorder.kr/msgV1/getResult`, params);

                    await main.getData();
                    router.go(-1);
                }
                catch(e)
                {
                    console.log(e);
                }

                status.value = false;
            }
        });
    }
}

const getDelete = () => {
    confirm.require({
        message     : '해당 메세지를 삭제하시겠습니까?',
        header      : '메세지 삭제',
        rejectProps : {
            label       : '취소',
            severity    : 'secondary',
            outlined    : true
        },
        acceptProps : {
            label: '삭제'
        },
        accept : async () => {
            const params = {
                msCd : msg.msCd
            }

            console.log(params);

            status.value = true;

            try
            {
                const instance  = await getAxiosData();
                await instance.post(`https://data.planorder.kr/msgV1/getDelete`, params);
                await main.getData();
                router.go(-1);
            }
            catch(e)
            {
                console.log(e);
            }

            status.value = false;
        }
    });
}

/**
 * @description 문자메세지 앱에서 공유 기능으로만 처리 2025-08-28 김원명 ( 사장님 요청 사항 )
 *  :: 등록된 발신번호가 공장 번호이므로
 */
// const getSend = () => {
//     const check = getCheck('M');

//     if(check)
//     {
//         confirm.require({
//             message     : '해당 메세지를 전송하시겠습니까?',
//             header      : '메세지 전송',
//             rejectProps : {
//                 label       : '취소',
//                 severity    : 'secondary',
//                 outlined    : true
//             },
//             acceptProps : {
//                 label: '전송'
//             },
//             accept : async () => {
//                 const params = {
//                     title       : msg.info.title,
//                     contents    : msg.info.contents,
//                     clientList  : msg.clientList
//                 }

//                 console.log(params);

//                 status.value = true;

//                 try
//                 {
//                     const instance  = await getAxiosData();
//                     await instance.post(`https://data.planorder.kr/msgV1/getSend`, params);
//                     alert('전송되었습니다.');
//                 }
//                 catch(e)
//                 {
//                     console.log(e);
//                 }

//                 status.value = false;
//             }
//         });
//     }
// }

const getCheck = (gb: 'S' | 'M') => {
    const checkParams = {
        gb          : gb,
        title       : msg.info.title,
        contents    : msg.info.contents,
        clientList  : msg.clientList
    }

    const result = messageMsg(checkParams);

    if(!result['state'])
    {
        msg.getMsgSet(result['msg'], result['id']);
        getFocus(result['id']);
        return false;
    }

    return true;
}

const getFocus = (id: string) => {
    const inputElement = document.getElementById(id);
    if (inputElement) 
    {
        inputElement.focus();
    }
}

const getNavi = () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'share', value: msg.info.contents }));
}

onMounted(async () => {
    if(msg.msCd !== '')
    {
        await msg.getInfo();
    }
})
</script>

<style lang="scss">

</style>