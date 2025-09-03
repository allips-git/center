<template>
    <BackHeader title="메세지 저장" />
    <main class="pb-48 w-full">
        <section class="flex justify-between items-start px-4 pb-5">
            <div class="flex flex-wrap gap-1 items-center">
                <Button label="고객 선택" icon="pi pi-plus" outlined size="small" rounded @click="getPopupOpen('clientChoice')" class="!rounded-full !gap-1 !pr-2.5" v-if="msg.clientList.length === 0" />
                <div class="px-2.5 py-1.5 text-xs font-bold rounded-full border text-t-lv2 border-l-lv4" v-if="msg.clientList.length > 0" @click="getPopupOpen('clientChoice')">
                    {{ msg.clientList.length === 1 ? msg.clientList[0]['clientNm'] : msg.clientList[0]['clientNm']+' 외 '+(msg.clientList.length - 1)+'명'  }} <strong class="font-bold underline underline-offset-2 decoration-[1px] text-p-lv4">변경</strong>
                </div>
            </div>
            <div class="flex flex-none gap-1 items-center">
                <Button label="메세지 저장" size="small" @click="getSave"></Button>
                <Button v-if="msg.type === 'U' && msg.msCd !== 'N'" label="삭제" size="small" severity="danger" @click="getDelete"></Button>
            </div>
        </section>
        <section class="flex flex-col gap-6 mt-5">
            <!-- <div class="px-4">
                <IftaLabel class="w-full">
                    <InputText id="title" v-model="msg.info.title" class="w-full"/>
                    <label>문자 제목</label>
                </IftaLabel>
                <small class="text-msg">{{ msg['msg'][`title`] }}</small>
            </div>
            <div class="!my-0 gray-bar"></div> -->

            <div class="px-4">
                <!-- 기존 문자 내용 -->
                <!-- <div class="overflow-hidden relative">
                    <IftaLabel class="w-full">
                        <Textarea id="contents" v-model="msg.info.contents" class="w-full" autoResize rows="15" cols="30"/>
                    </IftaLabel>
                    <div class="flex absolute right-[1px] bottom-[1px] left-[1px] rounded-br-[0.125rem] rounded-bl-[0.125rem] py-1 px-2 gap-1 items-center bg-gray-100/50">
                        <button class="tag-shop">디자인윈도우</button>
                        <button class="tag-name">하현재</button>  
                    </div>
                </div> -->

                <div class="overflow-hidden relative">
                    <div contenteditable="true" class="msg-input-custom" ref="editorEl" @input="getContents"></div>
                    <div class="flex absolute right-[1px] bottom-[1px] left-[1px] rounded-br-[0.125rem] rounded-bl-[0.125rem] py-1 px-2 gap-1 items-center bg-gray-100/50">
                        <button class="tag-shop" @click="getButtons('ceNm')">{{ login.ceNm }}</button>
                        <button class="tag-name" @click="getButtons('name')">{{ login.name }}</button>  
                    </div>
                </div>

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

    <Dialog v-model:visible="popup['pop']['messageSave']"
        :modal=true position="bottom" class="custom-dialog-bottom"
        @update:visible="getPopupClose('messageSave', true)">
        <div class="modal-backheader">
            <Button @click="getPopupClose('messageSave', true)" severity="contrast" text icon="pi pi-times" />
            <h2 class="modal-backheader-title">정보수정</h2>
        </div>
        <MessageSavePop/>
    </Dialog>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue'
import CustomerChoice from '@/views/include/message/CustomerChoice.vue'
import MessageSavePop from '@/views/include/message/MessageSavePop.vue'
import IftaLabel from 'primevue/iftalabel';
import Textarea from 'primevue/textarea';
// import Tag from 'primevue/tag';
import { ref, onMounted } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from 'vue-router';
import { useLoginStore, usePopupStore, useMainStore, useMsgStore } from '@/store';
import { getAxiosData } from '@/assets/js/function';
import { usePopup } from '@/assets/js/popup';

const confirm   = useConfirm();
const login     = useLoginStore();
const popup     = usePopupStore();
const main      = useMainStore();
const msg       = useMsgStore();
const router    = useRouter();
const status    = ref(false);

const editorEl = ref<HTMLElement | null>(null);
const isInitialized = ref(false);

const { getPopupOpen, getPopupClose } = usePopup();

const getContents = (event: Event) => {
    const target = event.target as HTMLElement;
    msg.info.contents = target.innerHTML;
}

const getButtons = (gb: string) => {
    if (!editorEl.value) return;
    
    const variableText = gb === 'ceNm' ? '${ceNm}' : '${name}';
    const displayText = gb === 'ceNm' ? login.ceNm : login.name;
    
    // DOM에 span 요소 추가
    const span = document.createElement('span');
    span.className = gb === 'ceNm' ? 'tag-shop' : 'tag-name';
    span.textContent = displayText;
    span.setAttribute('contenteditable', false); // 편집 불가
    
    // 공백 노드 생성
    const spaceNode = document.createTextNode(' ');
    
    editorEl.value.appendChild(span);
    editorEl.value.appendChild(spaceNode);
    
    // 에디터에 포커스하고 커서를 공백 뒤로 이동
    editorEl.value.focus();
    
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStartAfter(spaceNode);
    range.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(range);
    
    // contents 업데이트
    msg.info.contents += variableText;
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

const getSave = () => {
    if(msg.info.contents === '')
    {

        msg.getMsgSet('문자 내용을 입력해주세요.', 'contents');
        getFocus('contents');
        return false;
    }

    getPopupOpen('messageSave');
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
    if(msg.msCd !== '') {
        await msg.getInfo();
        // 초기 내용 설정 (한 번만)
        if (editorEl.value && !isInitialized.value) 
        {
            editorEl.value.innerHTML = msg.info.contents;
            isInitialized.value = true;
        }
    }
})
</script>

<style lang="scss">

</style>