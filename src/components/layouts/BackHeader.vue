<template>
  <!-- @TODO Header -->
  <div class="top-header" :class="[props.fixed ? 'has-fixed-top' : '']">
    <header
      :class="[
        'w-full z-50 flex items-center justify-between bg-white h-[3.125rem] p-4 md:justify-start',
        props.fixed
          ? 'fixed top-0 left-0 right-0 pt-[env(safe-area-inset-top)] md:sticky md:pt-2 md:shadow-none md:border-gray-100 md:p-4 md:h-[3.125rem] cal-header'
          : 'sticky top-0 md:shadow-none md:border-gray-100'
      ]"
    >
      <IconArrowForward
        :class="['fill-l-lv0 size-6', props.fixed ? 'mt-4 ios-icon' : '']"
        @click="goBack"
      />

      <template v-if="props.centerTitle">
        <h1 class="flex-1 pt-4 font-bold text-center text-15 md:text-left md:ml-2 text-t-lv1 ios-title">
          {{ props.title }}
        </h1>
        <div class="w-6"></div> 
      </template>

      <template v-else>
        <h1
          class="absolute top-1/2 left-1/2 font-bold -translate-x-1/2 -translate-y-1/2 text-15 text-t-lv1 md:relative md:-translate-y-0 md:-translate-x-0 md:top-0 md:left-2"
        >
          {{ props.title }}
        </h1>
        <div class="w-6"></div>
      </template>
    </header>
  </div>
</template>

<!-- <template>
  <div class="top-header">
    <header
      :class="[
        'w-full z-50 flex items-center bg-white h-[3.125rem] p-4 justify-between md:justify-start',
        props.fixed
          ? 'fixed top-0 left-0 right-0 pt-[env(safe-area-inset-top)] md:pt-2 md:shadow-none md:border-gray-100 md:p-4 md:h-[3.125rem] cal-header'
          : 'sticky top-0 md:shadow-none md:border-gray-100'
      ]"
    >
      <IconArrowForward
        :class="['fill-l-lv0 size-6', props.fixed ? 'mt-4 ios-icon' : 'mt-0.5']"
        @click="goBack"
      />

      <template v-if="props.centerTitle">
        <h1
          class="flex-1 text-sm font-bold text-center text-t-lv1 md:text-left md:ml-2 md:flex-none md:w-auto"
        >
          {{ props.title }}
        </h1>
        <div class="hidden w-6 md:block"></div>
      </template>

      <template v-else>
        <h1 class="ml-2 text-sm font-bold text-t-lv1">
          {{ props.title }}
        </h1>
        <div class="w-6"></div>
      </template>
    </header>
  </div>
</template> -->


<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router'; // useRouter 임포트
import IconArrowForward from '../icons/IconArrowForward.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  fixed: {
    type: Boolean,
    default: false,
  },
  centerTitle: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter(); // useRouter 훅 사용

// 뒤로가기 함수 정의
const goBack = () => {
    router.back(); // 또는 router.go(-1);
};
</script>

<style lang="scss">


</style>
