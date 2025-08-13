<template>
  <main class="overflow-y-auto pb-52 w-full" ref="mainRef">
    <div class="md:p-4">
        <vue-advanced-chat
          :current-user-id="currentUserId"
          :rooms="JSON.stringify(rooms)"
          :messages="JSON.stringify(messages)"
          :rooms-loaded="true"
          :messages-loaded="true"
          :load-first-room="true"
          room-id="1"
          :show-files="true"
          accepted-files="image/gif, image/jpeg, image/jpg, image/png"
          :show-audio="false"
          show-emojis="true"
          :show-add-room="false"
          :show-search="false"
          @room-selected="1"
          height="500px"
        />
    </div>
  </main>
</template>
<script setup lang="ts">
import { getTodayTimeDate } from '@/assets/js/function';
const currentUserId = '1'

const rooms = [
  {
    roomId      : '1',
    roomName    : '테스트 채팅방',
    avatar      : 'https://avatars3.githubusercontent.com/u/1?v=4',
    users       : [
    ],
    lastMessage: {
      content: '안녕하세요!',
      timestamp: getTodayTimeDate()
    }
  }
]

const messages = [
  {
    _id: '1',
    content: '안녕하세요!',
    senderId: '2',
    username: '상대방',
    timestamp: '13:00'
  },
  {
    _id: '2',
    content: '반갑습니다!',
    senderId: '1',
    username: '나',
    timestamp: '13:01'
  }
]
</script>

<style lang="scss">
</style>
