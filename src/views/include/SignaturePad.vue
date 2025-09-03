<template>
    <div class="relative w-full h-[184px] md:h-[200px] bg-[#FFFBE2] border border-l-lv4 rounded-sm overflow-hidden">
        <Vue3Signature  ref="signature" :sigOption="state.option" :w="'100%'" :h="'100%'"
        :disabled="state.disabled" class="example"></Vue3Signature>
        <div class="flex absolute top-0 right-0 gap-0.5 p-1 z-1 btn-group-signature">
            <Button size="small" icon="pi pi-eraser" label="이전" variant="text" class="[&>span:first-child]:text-t-lv1" @click="undo" />
            <Button size="small" icon="pi pi-refresh" label="다시 그리기" variant="text" class="[&>span:first-child]:text-red-500" @click="clear" />
            <Button size="small" icon="pi pi-download" label="저장" variant="text" class="[&>span:first-child]:text-blue-500" @click="saveAsImage" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Vue3Signature from "vue3-signature"

const state = reactive({
  count: 0,
  option: {
    penColor: "rgb(0, 0, 0)",
    backgroundColor: "transparent"
  },
  disabled: false
})

const signature = ref<any>(null)

// 이미지로 저장하는 함수
const saveAsImage = () => {
  if (!signature.value) return
  
  // PNG 형태로 서명 이미지 데이터 가져오기
  const imageData = signature.value.save('image/png')
  
  // 다운로드 링크 생성
  const link = document.createElement('a')
  link.href = imageData
  link.download = `signature_${new Date().getTime()}.png`
  
  // 자동 다운로드 실행
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Base64 데이터만 가져오는 함수 (서버 전송용)
const getSignatureData = (): string | null => {
  if (!signature.value) return null
  return signature.value.save('image/png')
}

// 서명이 비어있는지 확인하는 함수
const isEmpty = (): boolean => {
  if (!signature.value) return true
  return signature.value.isEmpty()
}

const clear = () => {
  if (!signature.value) return
  signature.value.clear()
}

const undo = () => {
  if (!signature.value) return
  signature.value.undo()
}

// 부모 컴포넌트에서 사용할 수 있도록 expose
defineExpose({
  saveAsImage,
  getSignatureData,
  isEmpty,
  clear,
  undo
})
</script>

<style lang="scss">
.btn-group-signature {
    .p-button {
        padding: 0.3125rem 0.375rem !important;
        border-radius: 0.25rem !important;
        border: 1px solid var(--l-lv4) !important;
        background: var(--white);
        gap: 0.25rem;
        box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.06);
        &:hover, &:focus {
            background: var(--white) !important;
        }
        .p-button-icon {
            //color: var(--t-lv3);
            font-size: 0.75rem;
        }
        .p-button-label {
            color: var(--t-lv3);
            font-size: 0.625rem;
            font-weight: 700;
        }
    }
}
</style>