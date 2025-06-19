<!-- <template>
    <div class="top-header">
        <header class="h-[3.125rem] sticky top-0 flex w-full items-center p-4 md:p-6 md:shadow-none bg-white z-50 md:border-gray-100">
            <IconArrowForward class="mt-0.5 fill-l-lv0 size-6" @click="goBack"/>
            <h1 class="absolute text-sm font-bold -translate-x-1/2 -translate-y-1/2 text-t-lv1 left-1/2 top-1/2 md:relative md:-translate-y-0 md:-translate-x-0 md:top-0 md:left-2">{{ title }}</h1>
        </header>
    </div>
</template> -->

<!-- <template>
    <div class="top-header">
      <header
        class="fixed top-0 left-0 right-0 h-[3.125rem] flex items-center w-full p-4 md:p-6 bg-white z-50 md:shadow-none"
      >
        <IconArrowForward class="mt-0.5 fill-l-lv0 size-6" @click="goBack" />
        <h1
          class="absolute text-sm font-bold -translate-x-1/2 -translate-y-1/2 text-t-lv1 left-1/2 top-1/2 md:relative md:-translate-y-0 md:-translate-x-0 md:top-0 md:left-2"
        >
          {{ title }}
        </h1>
      </header>
    </div>
</template> -->

<!-- <template>
    <div class="top-header">
      <header
        :class="[
          'w-full z-50 flex items-center p-4 md:p-6 bg-white h-[3.125rem]',
          props.fixed
            ? 'fixed top-0 left-0 right-0 pt-[env(safe-area-inset-top)]'
            : 'sticky top-0 md:shadow-none md:border-gray-100'
        ]"
      >
        <IconArrowForward class="mt-1 fill-l-lv0 size-6" @click="goBack" />
        <h1
          class="absolute text-sm font-bold -translate-x-1/2 -translate-y-1/2 text-t-lv1 left-1/2 top-1/2 md:relative md:-translate-y-0 md:-translate-x-0 md:top-0 md:left-2"
        >
          {{ props.title }}
        </h1>
      </header>
    </div>
</template> -->

<template>
  <div class="top-header">
    <header
      :class="[
        'w-full z-50 flex items-center justify-between bg-white h-[3.125rem] p-4',
        props.fixed
          ? 'fixed top-0 left-0 right-0 pt-[env(safe-area-inset-top)] md:sticky md:pt-2 md:shadow-none md:border-gray-100 md:p-4 md:h-[3.125rem] cal-header'
          : 'sticky top-0 md:shadow-none md:border-gray-100'
      ]"
    >
      <!-- 좌측 아이콘 -->
      <IconArrowForward
        :class="['fill-l-lv0 size-6', props.fixed ? 'mt-4 ios-icon' : 'mt-0.5']"
        @click="goBack"
      />

      <!-- 가운데 제목: 일정 페이지 전용 -->
      <template v-if="props.centerTitle">
        <h1 class="flex-1 pt-4 text-sm font-bold text-center text-t-lv1 ios-title">
          {{ props.title }}
        </h1>
        <div class="w-6"></div> <!-- 오른쪽 공간 맞추기 -->
      </template>

      <!-- 기본 제목 (absolute 위치 조정 방식) -->
      <template v-else>
        <h1
          class="absolute text-sm font-bold -translate-x-1/2 -translate-y-1/2 text-t-lv1 left-1/2 top-1/2 md:relative md:-translate-y-0 md:-translate-x-0 md:top-0 md:left-2"
        >
          {{ props.title }}
        </h1>
        <div class="w-6"></div> <!-- 오른쪽 공간 맞추기 -->

      </template>
    </header>
  </div>
</template>

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
