<template>
    <div class="relative w-full h-[184px] md:h-[200px] bg-[#FFFBE2] border border-l-lv4 rounded-sm overflow-hidden">
        <Vue3Signature  ref="signature" :sigOption="state.option" :w="'100%'" :h="'100%'"
        :disabled="state.disabled" class="example"></Vue3Signature>
        <div class="flex absolute top-0 right-0 gap-0.5 p-1 z-1 btn-group-signature">
            <Button size="small" icon="pi pi-eraser" label="이전" variant="text" class="[&>span:first-child]:text-t-lv1" @click="undo" />
            <Button size="small" icon="pi pi-refresh" label="다시 그리기" variant="text" class="[&>span:first-child]:text-red-500" @click="clear" />
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

const signature = ref(null)

const save = (t) => {
  console.log(signature.value.save(t))
}

const clear = () => {
  signature.value.clear()
}

const undo = () => {
  signature.value.undo();
}
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