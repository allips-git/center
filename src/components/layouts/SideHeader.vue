<template>
    <aside class="max-h-screen h-full bg-white md:border-r border-gray-200 w-[200px] flex-none sticky top-header" 
    :class="drawerClass ? '!flex !w-[200px] !justify-start'  : 'hidden md:!flex ' ,
    setWideSide ? 'w-[180px] overflow-y-auto flex-none' : 'w-auto justify-center'"
    >
        <ul class="flex flex-col w-full gap-4 px-3 text-base"
        >
            <li class="">
                <router-link class="flex justify-start gap-3 px-1 py-3" to="/">
                    <span class="w-6"
                    :class="setWideSide ? '' : '!w-6'"
                    ><IconAvatar class="w-6 mr-2 text-blue-300"/></span>
                    <p v-if="setWideSide || drawerClass" class="text-gray-900">{{ login['name'] }}</p>
                </router-link>
            </li>
            <li 
            class="flex items-center cursor-pointer py-0.5 hover:bg-indigo-50 px-2 rounded-md font-bold group justify-start"
            v-for="item in SideHeaderItems" :key="item.id" @click="navigateTo(item.link)" >
            <div class="flex items-center w-8 h-8 group-hover:text-indigo-600" :class="setWideSide || drawerClass ? '' : '!w-auto'">
                <span class="pi" :class="item.iconClass"></span> <!-- PrimeVue 아이콘 클래스 -->
            </div>
                <p v-if="setWideSide || drawerClass" class="duration-300 group-hover:text-indigo-600" >{{ item.label }}</p>
            </li>
        </ul>
    </aside>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useLoginStore } from '@/store';
import IconAvatar from '@/components/icons/IconAvatar.vue';


const props = defineProps({
    drawerClass: {
        type: Boolean,
    },
    setWideSide: {
        type: Boolean
    }
});

const router = useRouter();
const login  = useLoginStore();

const SideHeaderItems = ref([
  { id: 1, label: '캘린더', link: '/calendar', iconClass: 'pi-calendar' }, 
  { id: 2, label: '고객관리', link: '/customer/list', iconClass: 'pi-users' },
  { id: 3, label: '공장', link: '/factory/list', iconClass: 'pi-warehouse' },
  { id: 4, label: '회계', link: '/acc', iconClass: 'pi-money-bill' },
  { id: 5, label: '통계', link: '/average', iconClass: 'pi-chart-line' },
  { id: 6, label: '플랜톡', link: '/plantalk', iconClass: 'pi-comment' },
//   { id: 7, label: '단체 메시지', link: '/groupmsg', iconClass: 'pi-envelope' },
  { id: 8, label: '샵 설정', link: '/setting', iconClass: 'pi-cog' },
]);

// 링크로 이동
const navigateTo = (link: string) => {
  router.push(link);
};
</script>


<style scoped>

</style>