<template>
    <div>
        <BackHeader title="개인정보 처리방침"/>
        <div class="pdf-viewer">
            <canvas v-for="(page, index) in pages" :key="index" :ref="`canvas-${index}`"></canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
import BackHeader from '@/components/layouts/BackHeader.vue';
import { onMounted, ref } from "vue";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist";

// PDF.js의 워커 파일 설정
GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.min.js";

// PDF 파일 경로
const pdfPath = "../assets/file/privacy.pdf";

// PDF 페이지 데이터를 저장할 배열
const pages = ref([]);

// PDF를 로드하고 페이지를 캔버스에 렌더링
onMounted(async () => {
  const pdf = await pdfjsLib.getDocument(pdfPath).promise;
  const totalPages = pdf.numPages;

  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);

    // 페이지 크기와 캔버스 설정
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // PDF 페이지를 캔버스에 렌더링
    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;

    // 캔버스 데이터를 저장
    pages.value.push(canvas.toDataURL("image/png"));
  }
});
</script>

<style lang="scss">
.pdf-viewer {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.pdf-viewer canvas {
  border: 1px solid #ccc;
  margin: auto;
}
</style>