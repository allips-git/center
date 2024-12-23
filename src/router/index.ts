import { createWebHistory, createRouter, } from "vue-router";
import { usePopupStore, useLoginStore } from '@/store';

// RouteMeta 인터페이스 정의
interface RouteMeta {
    showTopHeader?: boolean; // showTopHeader 메타 필드 정의
    showAppFooter?: boolean
  }

import Index from "@/views/index.vue";
import Login from "@/views/login/LoginPage.vue";
import Agree from "@/views/login/JoinAgree.vue";
import JoinFirst from "@/views/login/JoinFirst.vue";
import JoinSecond from "@/views/login/JoinSecond.vue";
import CustomerList from "@/views/customer/CustomerList.vue";
// import CustomerRegister from "@/views/customer/CustomerRegister.vue";
import CustomerDetail from "@/views/customer/CustomerDetail.vue";
// import CustomerEstiIng from "@/views/customer/ProductRegister.vue";
import CustomerEstiList from "@/views/customer/SpecsList.vue";
import EstimateModal from "@/views/customer/EstimateModal.vue";
import EstiDoc from "@/views/customer/EstiDoc.vue";
import ConmateModal from "@/views/customer/ConmateModal.vue";
import ConDoc from "@/views/customer/ConDoc.vue";
import CustomerOrderList from "@/views/customer/OrderList.vue";
import OutOrderDoc from "@/views/customer/OutOrderDoc.vue";
import FactoryList from "@/views/factory/FactoryList.vue";
// import OutInput from "@/views/factory/OutInput.vue";
import OutDetail from "@/views/factory/OutDetail.vue";
import OutProduct from "@/views/factory/OutProduct.vue";
// import OutMng from "@/views/factory/OutMng.vue";
import FactoryDetail from "@/views/factory/FactoryDetail.vue";
import SysProduct from "@/views/factory/ProductInfo.vue";
import PlantalkMain from "@/views/plantalk/PlantalkMain.vue";
// import PlantalkRes from "@/views/plantalk/PlantalkAlert.vue"
// import PlantalkSend from "@/views/plantalk/PlantalkMessage.vue"
// import PlantalkDetail from "@/views/plantalk/ScheduleAlert.vue";
import MessageView from "@/views/message/MessageView.vue";
import SettingView from "@/views/setting/SettingView.vue";
import TimeSetting from "@/views/setting/TimeSetting.vue";
import StaticPayView from "@/views/setting/StaticPay.vue";
import StaticPayIng from "@/views/setting/StaticPayUpdate.vue";
import AccView from "@/views/acc/AccView.vue";
// import AccMonth from "@/views/acc/AccMonth.vue";
// import AccWeek from "@/views/acc/AccWeek.vue";
// import AccDay from "@/views/acc/AccDay.vue";
import CalendarView from "@/views/calendar/CalendarView.vue";
import CalendarDayView from "@/views/calendar/CalendarDayView.vue";

import AverageView from "@/views/average/AverageView.vue";
import GroupMessageView from "@/views/groupMessage/GroupMessageView.vue";
import MessageSend from "@/views/groupMessage/MessageSend.vue";
import settingStore from "@/views/setting/SettingStore.vue";
import memberMng from "@/views/setting/MemberMng.vue";
import MemberAuthSetting from "@/views/setting/MemberAuthSetting.vue";

import MemberDetail from "@/views/setting/MemberDetail.vue";
import MemberEdit from "@/views/setting/MemberEdit.vue";
import CouponMenu from "@/views/setting/CouponMenu.vue";
import CouponDetail from "@/views/setting/CouponDetail.vue";
import SettingAuth from "@/views/setting/SettingAuth.vue";









import { getAxiosData } from '@/assets/js/function';

const routes = [
    {
        path: "/login",
        name: "LoginPage",
        component: Login,
        meta : { gubun: 'Y' }
    },
    {
        path: "/join/agree",
        name: "AgreePage",
        component: Agree,
        meta : { gubun: 'Y' }
    },
    {
        path: "/join/joinFirst",
        name: "JoinFirstPage",
        component: JoinFirst,
        meta : { gubun: 'Y' }
    },
    {
        path: "/join/joinSecond",
        name: "JoinSecondPage",
        component: JoinSecond,
        meta : { gubun: 'Y' }
    },
    {
        path: "/",
        name: "MainPage",
        component: Index,
        meta : { showTopHeader: true, showAppFooter: true }
    },
    {
        path: "/customer/list",
        name: "CustomerList",
        component: CustomerList,
        meta: { title: '고객' }
    },
    // {
    //     path: "/customer/register",
    //     name: "CustomerRegister",
    //     component: CustomerRegister,
    //     meta: { title: '고객 등록' }
    // },
    {
        path: "/customer/detail",
        name: "CustomerDetail",
        component: CustomerDetail,
        meta: { title: '고객 상세' }
    },
    // {
    //     path: "/customer/estiIng",
    //     name: "CustomerEstiIng",
    //     component: CustomerEstiIng,
    //     meta: { title: '견적 등록' }
    // },
    {
        path: "/customer/estiList",
        name: "CustomerEstiList",
        component: CustomerEstiList,
        meta: { title: '명세표' }
    },
    {
        path: "/customer/estiMate",
        name: "EstimateModal",
        component: EstimateModal,
        meta: { title: '견적서' }
    },
    {
        path: "/customer/estiDoc",
        name: "EstiDoc",
        component: EstiDoc,
        meta: { title: '견적서 공유 화면', gubun: 'Y' }
    },
    {
        path: "/customer/conMate",
        name: "ConmateModal",
        component: ConmateModal,
        meta: { title: '계약서' }
    },
    {
        path: "/customer/conDoc",
        name: "ConDoc",
        component: ConDoc,
        meta: { title: '계약서 공유 화면', gubun: 'Y' }
    },
    {
        path: "/customer/orderList",
        name: "CustomerOrderList",
        component: CustomerOrderList,
        meta: { title: '발주서' }
    },
    {
        path: "/outOrderDoc",
        name: "outOrderDoc",
        component: OutOrderDoc,
        meta: { title: '외주 발주서', gubun: 'Y' }
    },
    {
        path: "/factory/list",
        name: "FactoryList",
        component: FactoryList,
        meta: { title: '공장' }
    },
    // {
    //     path: "/factory/outInput",
    //     name: "OutInput",
    //     component: OutInput,
    //     meta: { title: '외주공장 저장' }
    // },
    {
        path: "/factory/outDetail",
        name: "OutDetail",
        component: OutDetail,
        meta: { title: '외주공장 상세' }
    },
    {
        path: "/factory/outProduct",
        name: "OutProduct",
        component: OutProduct,
        meta: { title: '외주공장 제품 리스트' }
    },
    // {
    //     path: "/factory/outMng",
    //     name: "OutMng",
    //     component: OutMng,
    //     meta: { title: '외주공장 제품 정보 확인 및 저장' }
    // },
    {
        path: "/factory/detail",
        name: "FactoryDetail",
        component: FactoryDetail,
        meta: { title: '공장 상세' }
    },
    {
        path: "/factory/sysProduct",
        name: "SysProduct",
        component: SysProduct,
        meta: { title: '시스템 공장 제품 리스트' }
    },
    // {
    //     path: "/factory/sysMng",
    //     name: "SysMng",
    //     component: SysMng,
    //     meta: { title: '시스템 공장 제품 정보' }
    // },
    {
        path: "/plantalk",
        name: "PlantalkMain",
        component: PlantalkMain,
        meta: { title: '플랜톡' }
    },
    // {
    //     path: "/plantalk/res",
    //     name: "PlantalkRes",
    //     component: PlantalkRes,
    //     meta: { title: '플랜톡 예약된 알림' }
    // },
    // {
    //     path: "/plantalk/send",
    //     name: "PlantalkSend",
    //     component: PlantalkSend,
    //     meta: { title: '플랜톡 발송 내역' }
    // },
    // {
    //     path: "/plantalk/detail",
    //     name: "PlantalkDetail",
    //     component: PlantalkDetail,
    //     meta: { title: '플랜톡 상세' }
    // },
    {
        path: "/acc",
        name: "AccView",
        component: AccView,
        meta : { showTopHeader: false, showAppFooter: true }
    },
    // {
    //     path: "/acc/month",
    //     name: "AccMonth",
    //     component: AccMonth,
    //     meta: { title: "회계 월간 분석" }
    // },
    // {
    //     path: "/acc/week",
    //     name: "AccWeek",
    //     component: AccWeek,
    //     meta: { title: "회계 주간 분석" }
    // },
    // {
    //     path: "/acc/day",
    //     name: "AccDay",
    //     component: AccDay,
    //     meta: { title: "회계 일별 분석" }
    // },
    {
        path: "/msg",
        name: "msg",
        component: MessageView,
        meta: { title: "메세지" }
    },
    {
        path: "/setting",
        name: "SettingView",
        component: SettingView,
        meta: { title: "설정" }
    },
    {
        path: "/setting/staticPay",
        name: "StaticPayView",
        component: StaticPayView,
        meta: { title: "고정비용 관리" }
    },
    {
        path: "/setting/time_setting",
        name: "TimeSetting",
        component: TimeSetting,
        meta: { title: "시공시간 설정" }
    },
    {
        path: "/setting/staticPayIng",
        name: "StaticPayIng",
        component: StaticPayIng,
        meta: { title: "고정비용 저장" }
    },
    {
        path: "/calendar",
        name: "CalendarView",
        component: CalendarView,
        meta : { showTopHeader: false, showAppFooter: true }
    },

    {
        path: "/calendar/day",
        name: "CalendarDayView",
        component: CalendarDayView,
        meta : { showTopHeader: false, showAppFooter: true }
    },
    {
        path: "/average",
        name: "AverageView",
        component: AverageView,
        meta : { showTopHeader: false, showAppFooter: true }
    },
    {
        path: "/groupmsg",
        name: "GroupMessageView",
        component: GroupMessageView,
        meta: { title: "단체 메시지" }
    },
    {
        path: "/groupmsg_send",
        name: "MessageSend",
        component: MessageSend,
        meta: { title: "단체 메시지" }
    },

    {
        path: "/setting/setting_store",
        name: "settingStore",
        component: settingStore,
        meta: { title: "매장 설정" }    
    },
    {
        path: "/setting/member_list",
        name: "memberMng",
        component: memberMng,
        meta: { title: "맴버 목록" }    
    },

    {
        path: "/setting/member_detail",
        name: "MemberDetail",
        component: MemberDetail,
        meta: { title: "맴버 상세" }    
    },

    {
        path: "/setting/member_auth",
        name: "MemberAuthSetting",
        component: MemberAuthSetting,    
        meta: { title: "맴버 권한 설정" }    
    },

    {
        path: "/setting/member_edit",
        name: "MemberEdit",
        component: MemberEdit,
        meta: { title: "맴버 설정" }    
    },

    {
        path: "/setting/coupon_menu",
        name: "CouponMenu",
        component: CouponMenu,
        meta: { title: "할인 설정 쿠폰 목록" }    
    },

    {
        path: "/setting/coupon_detail",
        name: "CouponDetail",
        component: CouponDetail,
        meta: { title: "할인 설정 쿠폰 설정" }    
    },

    {
        path: "/setting/setting_auth",
        name: "SettingAuth",
        component: SettingAuth,
        meta: { title: "사업자 인증" }    
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach( async (to, from, next) => {
    const login = useLoginStore();
    const popup = usePopupStore();

    if(to.meta.gubun === 'Y')
    {
        next();
    }
    else
    {
        if(login['token'] === null)
        {
            next({ name : 'LoginPage' });
        }
        else
        {
            const tokenCheckResult = await getTokenCheck();

            if(tokenCheckResult)
            {
                if(popup.list.length === 0)
                {
                    next();
                }
                else
                {
                    const lastPopNm = popup.list[popup.list.length - 1];
                    await popup.getClose(lastPopNm);
                    next(false);
                }
            }
            else
            {
                alert('세션이 만료되었습니다. 로그인 화면으로 이동합니다.');
                login.getLogout();
                router.push({ path : '/login' });
            }
        }
    }
});

const getTokenCheck = async () => {
    const login = useLoginStore();
    
    try
    {
        const instance  = await getAxiosData();
        const res       = await instance.post(`https://data.planorder.kr/api/token/getTokenCheck`);

        if(res.data['code'] === 2000)
        {
            login.getToken(res.data['token']);
        }

        return true;
    }
    catch(e)
    {
        console.log(e);
        return false;
    }
}

export default router