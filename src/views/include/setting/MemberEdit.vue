<template>
    <div>
        <main class="pt-5 pb-28 pc-contents-h-box">

            <section class="px-5 form-gap-box">
                <IftaLabel class="w-full">
                    <InputText id="id" v-model="member['info']['id']" class="w-full" :disabled="member['type'] === 'U' ? true : false"/>
                    <label>ID (E-MAIL) <span class="ml-0.5 text-red-500">*</span></label>
                    <small class="text-red-500">{{ member['msg']['id'] }}</small>
                </IftaLabel>

                <IftaLabel v-if="member['type'] === 'I'" class="w-full">
                    <InputText :type="'password'" id="pw" v-model="member['info']['pw']" class="w-full" :disabled="member['type'] === 'U' ? true : false"/>
                    <label>비밀번호 <span class="ml-0.5 text-red-500">*</span></label>
                    <small class="text-red-500">{{ member['msg']['pw'] }}</small>
                </IftaLabel>

                <IftaLabel v-if="member['type'] === 'I'" class="w-full">
                    <InputText :type="'password'" id="pwChk" v-model="member['info']['pwChk']" class="w-full" :disabled="member['type'] === 'U' ? true : false"/>
                    <label>비밀번호 확인 <span class="ml-0.5 text-red-500">*</span></label>
                    <small class="text-red-500">{{ member['msg']['pwChk'] }}</small>
                </IftaLabel>

                <IftaLabel class="w-full">
                    <InputText id="name" v-model="member['info']['name']" class="w-full"/>
                    <label>이름 <span class="ml-0.5 text-red-500">*</span></label>
                    <small class="text-red-500">{{ member['msg']['name'] }}</small>
                </IftaLabel>

                <IftaLabel class="w-full">
                    <InputText id="tel" v-model="member['info']['tel']" class="w-full"/>
                    <label>전화번호 <span class="ml-0.5 text-red-500">*</span></label>
                    <small class="text-red-500">{{ member['msg']['tel'] }}</small>
                </IftaLabel>

                <IftaLabel>
                    <IconField>
                        <InputText id="addr" v-model="member['info']['addr']" class="w-full" readonly placeholder="주소를 입력해주세요." @click="getAddr"/>
                        <InputIcon>
                            <IconSpot/>
                        </InputIcon>
                    </IconField>
                    <label>주소 <span class="ml-0.5 text-red-500">*</span></label>
                    <small class="text-red-500">{{ member['msg']['addr'] }}</small>
                </IftaLabel>

                <IftaLabel class="label-input-box">
                    <InputText id="addrDetail" v-model="member['info']['addrDetail']"/>
                    <label>상세주소</label>
                </IftaLabel>
    
                <IftaLabel class="w-full">
                    <div class="w-full custom-select-arrow">
                        <Select v-model="member['info']['rank']" :options="data['rank']" optionLabel="label" optionValue="value" class="w-full"/>
                        <IconPlay class="absolute rotate-90 top-3 right-2 *:fill-gray-400 -z-10"/>
                    </div>
                    <label>권한 등급</label>
                </IftaLabel>

            </section>
        </main>
        <div class="bottom-fixed-btn-box md:!absolute">
            <Button label="저장" size="large" @click="getSave"/>
        </div>
    </div>
    <div id="layer" style="display:none;position:fixed;overflow:hidden;z-index:9999;-webkit-overflow-scrolling:touch;">
        <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" @click="getCloseDaumPost()" alt="닫기 버튼">
    </div>
</template>

<script setup lang="ts">
import IconSpot from '@/components/icons/IconSpot.vue';
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import IconPlay from '@/components/icons/IconPlay.vue';
import { useConfirm } from "primevue/useconfirm";
import { onMounted } from 'vue';
import { useDataStore, useMemberStore } from '@/store';
import { getAxiosData, getDaumPopupPosition, getTokenOut } from '@/assets/js/function';
import { memberMsg } from '@/assets/js/msg';
import { usePopup } from '@/assets/js/popup';

const confirm   = useConfirm();
const data      = useDataStore();
const member    = useMemberStore();

const { getPopupClose } = usePopup();

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

            member.info['zip']  = data.zonecode;
            member.info['addr'] = addr;
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

const getSave = () => {
    const checkParams = {
        type    : member['type'],
        id      : member['info']['id'],
        pw      : member['info']['pw'],
        pwChk   : member['info']['pwChk'],
        name    : member['info']['name'],
        tel     : member['info']['tel'],
        addr    : member['info']['addr']
    };

    console.log(checkParams);

    const result = memberMsg(checkParams);

    if(!result['state'])
    {
        member.getMsgSet(result['msg'], result['id']);
        getFocus(result['id']);
        return false;
    }

    confirm.require({
        message     : '멤버를 저장하시겠습니까?',
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
                type        : member['type'],
                id          : member['info']['id'],
                pw          : member['info']['pw'],
                name        : member['info']['name'],
                tel         : member['info']['tel'],
                zip         : member['info']['zip'],
                addr        : member['info']['addr'],
                addrDetail  : member['info']['addrDetail'],
                rank        : member['info']['rank']
            }

            if(member['type'] === 'U')
            {
                params['userCd'] = member['userCd'];
            }

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res = await instance.post(`https://data.planorder.kr/memberV1/getSave`, params);
                console.log(res);
                if(member['type'] === 'I')
                {
                    member.getList();
                }
                else
                {
                    member.getDetail();
                };

                getPopupClose('memberSet', true);
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
                    if(e.response.data.code === 4100)
                    {
                        member.getMsgSet('이미 사용 중인 아이디입니다.', 'id');
                        getFocus('id');
                    }
                    else
                    {
                        alert('멤버 저장 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
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

onMounted(() => {
    if(member.type === 'U')
    {
        member.getInfo();
    }
})
</script>

<style lang="scss">

</style>