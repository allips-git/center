<template>
  <main class="overflow-y-auto w-full" ref="mainRef">
    <div class="md:p-0">
      <vue-advanced-chat
        :current-user-id="chat.currentUserId"
        :rooms="JSON.stringify(chat.rooms)"
        :messages="JSON.stringify(chat.messages)"
        :messages-loaded="chat.messagesLoaded"
        :room-id="chat.crCd"
        :rooms-loaded="chat.roomsLoaded"
        :show-audio="false"
        :show-emojis="true"
        :show-add-room="false"
        :show-search="false"
        @fetch-messages="onRoomSelected"
        @send-message="getSendMessage"
        :show-files="true"
        accepted-files="image/jpeg, image/jpg, image/png, image/gif"
        capture-files=""
        :height="chatHeight"
      />
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useChatStore } from '@/store'
import { getAxiosData, getTokenOut } from '@/assets/js/function'
const chat = useChatStore()

const skipInitialFetch = ref(true)

const onRoomSelected = async (room) => {
  if (skipInitialFetch.value) {
    skipInitialFetch.value = false
    return
  }
  const roomId = room.detail[0].room['roomId']

  await chat.getCrCd(roomId)
  await chat.getMessage()
}

async function fileMetaToFile(meta): Promise<File> {
  const response = await fetch(meta.localUrl)
  const blob = await response.blob()

  return new File([blob], meta.name + '.' + meta.extension, { type: meta.type })
}

// 이미지 최적화 함수 (File 기반)
async function optimizeImage(
  file: File,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.7
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      const img = new Image()
      img.src = reader.result as string

      img.onload = () => {
        let { width, height } = img

        // 비율 유지 리사이즈
        if (width > maxWidth) {
          height = (maxWidth / width) * height
          width = maxWidth
        }
        if (height > maxHeight) {
          width = (maxHeight / height) * width
          height = maxHeight
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: blob.type }))
            } else {
              reject(new Error('이미지 최적화 실패'))
            }
          },
          'image/jpeg',
          quality
        )
      }

      img.onerror = () => reject(new Error('이미지 로드 실패'))
    }

    reader.onerror = () => reject(new Error('파일 읽기 실패'))
  })
}

const getSendMessage = async (msg) => {
  const filesAsFileObjects = await Promise.all(
    msg.detail[0].files ? msg.detail[0].files.map((meta) => fileMetaToFile(meta)) : []
  )

  /** 이미지 최적화 */
  const processedFiles = await Promise.all(
    filesAsFileObjects.map(async (file) => {
      if (file.type.startsWith('image/')) {
        return await optimizeImage(file, 800, 800, 0.7)
      }

      return file
    })
  )

  console.log('최적화된 파일 배열:', processedFiles)

  const formData = new FormData()
  const params = {
    crCd: msg.detail[0].roomId,
    message: msg.detail[0].content
  }

  formData.append('params', JSON.stringify(params))

  if (processedFiles.length !== 0) {
    processedFiles.forEach((file) => {
      formData.append('files[]', file) // 'files[]'로 각각 추가
    })
  }

  try {
    const instance = await getAxiosData()
    const res = await instance.post(`https://data.planorder.kr/chatV1/getSendMessage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log(res)
    await chat.getData()
  } catch (e) {
    console.log(e)
    if (e.response.status === 401) {
      getTokenOut()
    } else {
      alert('메세지 전송 중 에러가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.')
    }
  }
}

// 반응형 height
const chatHeight = ref(getChatHeight())

function getChatHeight() {
  return window.innerWidth < 768
    ? 'calc(100dvh - 50px)' // 모바일 높이
    : 'calc(90vh - 50px)' // PC 높이
}

function handleResize() {
  chatHeight.value = getChatHeight()
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

onMounted(async () => {
  if (chat.crCd !== null) {
    await chat.getReset()
    await chat.getData()
  }
  window.addEventListener('resize', handleResize)
})
</script>

<style lang="scss"></style>
