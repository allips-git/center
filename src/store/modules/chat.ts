/**
 * @description 채팅 관련 모듈 pinia
 */
import { defineStore } from 'pinia'
import { getAxiosData } from '@/assets/js/function'

interface RoomUser {
  _id: string
  username: string
  avatar: string
}

interface Rooms {
  roomId: string
  roomName: string
  avatar: string
  users: RoomUser[]
  lastMessage: {
    content: string
    timestamp: string
  }
}

interface ChatFile {
  name: string
  type: string
  saved: boolean
  url: string
  preview: string
}

interface Messages {
  _id: string
  content: string
  senderId: string
  username: string
  timestamp: string
  files: ChatFile[]
}

interface State {
  crCd: string | null
  currentUserId: string
  rooms: Rooms[]
  messages: Messages[]
  messagesLoaded: boolean
}

// Types that mirror the backend response shape (only the fields we use)
interface ApiRoomUser {
  userCd: string
  username: string
}

interface ApiRoom {
  roomId: string
  roomName: string
  users: ApiRoomUser[]
  chGb: 'N' | 'Y'
  message: string
  regDt: string
}

interface ApiMsgFile {
  filePath: string
  fileNm: string
}

interface ApiMsg {
  chCd: string
  message: string
  regCd: string
  username: string
  regDt: string
  files: ApiMsgFile[]
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
    crCd: null,
    currentUserId: '',
    rooms: [],
    messages: [],
    messagesLoaded: false
  }),
  actions: {
    async getData() {
      console.log('crCd:' + this.crCd)
      try {
        const instance = await getAxiosData()
        const res = await instance.post(`https://data.planorder.kr/chatV1/getData`, {
          crCd: this.crCd
        })

        console.log(res)

        this.currentUserId = res.data.id

        this.rooms = (res.data.rooms as ApiRoom[]).map((item) => {
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

        this.messages = (res.data.msg as ApiMsg[]).map((item) => {
          let files: ChatFile[] = []

          const data: Messages = {
            _id: item.chCd,
            content: item.message,
            senderId: item.regCd,
            username: item.username,
            timestamp: item.regDt,
            files: []
          }

          if (item['files'].length > 0) {
            files = item['files'].map((file, fIndex: number) => {
              return {
                name: `file_${fIndex}`,
                type: 'image/gif, image/jpeg, image/jpg, image/png',
                saved: true,
                url: 'https://data.planorder.kr' + file.filePath + file.fileNm,
                preview: 'https://data.planorder.kr' + file.filePath + file.fileNm
              }
            })
          }

          data.files = files

          return data
        })
      } catch (e) {
        console.log(e)
      } finally {
        this.messagesLoaded = true
      }
    },
    getCrCd(crCd: string) {
      this.crCd = null
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
