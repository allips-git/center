/**
 * @description 채팅 관련 모듈 pinia
 */
import { defineStore } from 'pinia'
import { getAxiosData } from '@/assets/js/function'

interface Rooms {
  roomId: string
  roomName: string
  avatar: string
  users: [
    {
      _id: ''
      username: ''
      avatar: ''
    }
  ]
  lastMessage: {
    content: string
    timestamp: string
  }
}

interface Messages {
  _id: string
  content: string
  senderId: string
  username: string
  timestamp: string
  files: []
}

interface State {
  chCd: string
  currentUserId: string
  rooms: Rooms[]
  messages: Messages[]
  messagesLoaded: boolean
}

// const getRooms = () => {
//     return {
//         roomId      : '',
//         roomName    : '',
//         avatar      : '',
//         users       : [],
//         lastMessage : {
//             content   : '',
//             timestamp : ''
//         }
//     }
// }

export const useChatStore = defineStore('chat', {
  state: (): State => ({
    crCd: '',
    currentUserId: '',
    rooms: [],
    messages: [],
    messagesLoaded: false
  }),
  actions: {
    async getData() {
      try {
        const instance = await getAxiosData()
        const res = await instance.post(`https://data.planorder.kr/chatV1/getData`, {
          crCd: this.crCd
        })

        console.log(res)

        this.currentUserId = res.data.id

        this.rooms = res.data.rooms.map((item) => {
          return {
            roomId: item.roomId,
            roomName: item.roomName,
            avatar: '',
            users: Array.isArray(item.users)
              ? item.users.map((u) => ({
                  _id: u.userCd,
                  username: u.username,
                  avatar: ''
                }))
              : [],
            lastMessage: {
              content: item.chGb === 'N' ? item.message : '사진을 보냈습니다.',
              timestamp: item.regDt
            }
          }
        })

        console.log(this.rooms)

        this.messages = res.data.msg.map((item) => {
          let files = []

          const data = {
            _id: item.chCd,
            content: item.message,
            senderId: item.regCd,
            username: item.username,
            timestamp: item.regDt
          }

          if (item['files'].length > 0) {
            files = item['files'].map((file, fIndex) => {
              return {
                name: `file_${fIndex}`,
                type: 'image/gif, image/jpeg, image/jpg, image/png',
                saved: true,
                url: 'https://data.planorder.kr' + file.filePath + file.fileNm,
                preview: 'https://data.planorder.kr' + file.filePath + file.fileNm
              }
            })
          }

          data['files'] = files

          return data
        })
      } catch (e) {
        console.log(e)
      } finally {
        this.messagesLoaded = true
      }
    },
    getCrCd(crCd: string) {
      this.crCd = crCd
    },
    getReset() {
      this.rooms = []
      this.messages = []
      this.messagesLoaded = false
    }
  },
  persist: {
    key: 'chat',
    storage: localStorage,
    paths: ['crCd']
  }
})
