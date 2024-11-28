<template>
<main>
    <h1 class="text-2xl px-1 page-title">공장</h1>
    <div class="relative ">
        <Tabs value="0">
            <TabList>
                <Tab value="0">플랜오더 공장</Tab>
                <Tab value="1">외주공장</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <ul class="">
                        <li>
                            <p class="font-bold">공장이름</p>
                            <p class="text-sm text-gray-600">010-9182-1212</p>
                            <p class="text-gray-600">부산 수영구 수영로 411-1 수영로</p>
                        </li>
                    </ul>
                </TabPanel>
                <TabPanel value="1">
                    <p class="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </TabPanel>
            </TabPanels>
        </Tabs>
        <!-- 버튼 영역 -->
        <div class="absolute right-4">
            <Button label="공장코드 추가" icon="pi pi-plus"></Button>
            <Button label="외주공장 추가" icon="pi pi-plus"></Button>
        </div>
    </div>
</main>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';


</script>

<style lang="scss">

</style>