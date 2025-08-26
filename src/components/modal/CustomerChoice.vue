<template>
  <div class="input-layout-box">
    <div class="flex flex-col gap-2 mt-2 btn-2-layout-box">
      <Button class="w-full" severity="secondary" label="간편등록" @click="getClientGb('N')" />
      <Button class="w-full" label="상세등록" @click="getClientGb('Y')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClientStore } from '@/store'
import { usePopup } from '@/assets/js/popup'

const client = useClientStore()
const { getPopupOpen } = usePopup()

const getClientGb = async (gb: 'Y' | 'N') => {
  await client.getGb(gb)
  await getPopupOpen('clientSet')
}
</script>

<style lang="scss"></style>
