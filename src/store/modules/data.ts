import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

export const useDataStore = defineStore('data', {
    state: () => {
        const division = Array.from({ length: 10 }, (v, i) => ({ name: i === 0 ? '단창' : (i+1)+'분할', value: i+1 }));
        division.splice(1, 0, { name: '공사건 계산기', value: "A" });

        return {
            emer: [
                { name: '긴급', value: 'Y' },
                { name: '일반', value: 'N' }
            ],
            area: [
                { name: '서울', value: 'SE' },
                { name: '부산', value: 'BS' },
                { name: '대구', value: 'DG' },
                { name: '대전', value: 'DJ' },
                { name: '광주', value: 'GJ' },
                { name: '인천', value: 'IC' },
                { name: '세종', value: 'SJ' },
                { name: '울산', value: 'US' },
                { name: '경기', value: 'KG' },
                { name: '강원', value: 'GW' },
                { name: '충북', value: 'CN' },
                { name: '충남', value: 'CS' },
                { name: '전북', value: 'JN' },
                { name: '전남', value: 'JS' },
                { name: '경북', value: 'KN' },
                { name: '경남', value: 'KS' },
                { name: '제주', value: 'JJ' }
            ],
            einGb: [
                { name: '법인', value: 'P' }, 
                { name: '개인', value: 'L' }
            ],
            clientStat : [
                { value : '',    name : '전체'}, /** 견적대기 */
                { value : '001', name : '대기'}, /** 견적대기 */
                { value : '002', name : '견적'}, /** 견적진행 */
                { value : '003', name : '발주'}, /** 계약완료 */
                { value : '006', name : '시공'}, /** 발주완료 */
                { value : '011', name : '결제'}, /** 시공완료 */
                { value : 'N',   name : '취소'}  /** 견적취소 */
            ],
            useYn : [
                { name : '사용', value : true },
                { name : '미사용', value : false }
            ],
            instCd : [
                { name : '업종_전체', value : '' },
                { name : '블라인드', value : 'IC001' },
                { name : '커튼', value : 'IC002' },
            ],
            proc  : [ 
                { name : '나비주름', value : '001' },
                { name : '평주름', value : '002' }
            ],
            bproc   : [ 
                { name : '기본', value : '001' },
                { name : '리드밴드', value : '002' }
            ],
            usage : Array.from({ length: 21 }, (v, i) => ({ name: (1.0 + i * 0.1).toFixed(1)+'배', value: Number((1.0 + i * 0.1).toFixed(1)) })),
            addColor    : [ 
                { value : 'O', name : '원톤' }, 
                { value : 'T', name : '투톤' }
            ],
            split : [ 
                { name : '양개', value : '001' },
                { name : '편개', value : '002' }
            ],
            shape : [ 
                { name : '있음', value : 'Y' },
                { name : '없음', value : 'N' }
            ],
            addPrice : Array.from({ length: 10 }, (v, i) => ({ value: i, name : i+'%' })),
            hours   : Array.from({ length: 20 }, (v, i) => ({ value: i, name : i+'시간' })),
            minute  : Array.from({ length: 60 }, (v, i) => ({ value: i, name : i+'분' })),
            vat : [
                { name : '발행', value : 'Y' },
                { name : '미발행', value : 'N' }
            ],
            delivery : [
                { name : '화물', value : '001'},
                { name : '택배', value : '002'},
                { name : '직배', value : '003'},
                { name : '방문', value : '005'}
            ],
            unit : [
                { name: '회배', value : '001'},
                { name: '야드', value : '002'},
                { name: '폭', value : '003'},
                { name: 'EA', value : '004'}
            ],
            division : division,
            handle : [
                { name: '좌', value : 'L'},
                { name: '우', value : 'R'}
            ],
            discount : [ 
                { value : 'P', label : '%' }, 
                { value : 'F', label : '원' }
            ],
            payGb : [ 
                { value : '001', label : '계좌' }, 
                { value : '002', label : '현금' },
                { value : '003', label : '카드' }
            ],
            stCd : [
                { value : 'Y' ,   label : '견적' },
                { value : 'N' ,   label : '견적취소' },
                { value : '013' , label : '시공대기' },
                { value : '011' , label : '시공완료' }
            ],
            fxGb : [
                { value : '001' ,   label : '인건비' },
                { value : '002' ,   label : '차량관련' },
                { value : '003' ,   label : '임대료' },
                { value : '004' ,   label : '매장 운영비' },
                { value : '005' ,   label : '기타' },
            ],
            coupon : [],
            rank   : [
                { value : 'M', label : '매니저' },
                { value : 'B', label : '기본' },
                { value : 'L', label : '최소' }
            ],
            parking : [
                { value : 'Y', label : '무료' },
                { value : 'N', label : '불가능' },
                { value : 'C', label : '유료' },
                { value : 1, label : '1시간' },
                { value : 2, label : '2시간' },
                { value : 3, label : '3시간' },
                { value : 4, label : '4시간' }
            ],
            msg : [
                { mhCd : 2, emoji : '😷', color : '#eef0f2', title : '매장 방역관리 알리기', contents : '매장이 수시로 안전하게 방역중임을 알리세요.' },

                { mhCd : 3, emoji : '🕰', color : '#eef0f2', title : '견적 리마인드 문자', contents : '고객이 며칠째 답이 없을때 자연스럽게 문자해보아요.' },
                { mhCd : 3, emoji : '💬', color : '#eef0f2', title : '결정을 도와드리는 배려형 문자', contents : '고객이 고민 중이라고 말했을 때, 배려 있는 제안' },
                { mhCd : 3, emoji : '🎁', color : '#eef0f2', title : '혜택으로 부드럽게 유도하기', contents : '이번 주만 가능한 작은 혜택으로 제안해보아요.' },

                { mhCd : 4, emoji : '👱‍♀', color : '#eef0f2', title : '젊은 고객 환영하기', contents : '처음 방문하는 젊은고객을 환영해요.' },
                { mhCd : 4, emoji : '👨‍🦳', color : '#eef0f2', title : '중년 고객 환영하기', contents : '처음 방문하는 중년고객을 환영해요.' },
                { mhCd : 4, emoji : '🌈', color : '#eef0f2', title : '할인과 함께 재구매 유도하기', contents : '할인쿠폰으로 고객의 방문을 환영해요.' },

                { mhCd : 5, emoji : '👿', color : '#eef0f2', title : '불만 해결로 고객 달래기', contents : '간접적으로 불만을 표현하는 고객을 달래보세요.' },
                { mhCd : 5, emoji : '🛠', color : '#eef0f2', title : '재 시공으로 불만고객 붙잡기', contents : '강한 불만을 표현하는 고객에게 사과해보아요.' }
            ],
            repSet : [
                { value : 'B', name : '기본양식' },
                // { value : 'E', name : '엑셀양식' }
            ],
            terms : `1. 본사는 맞춤전문 업체로서 계약해지 또는 변경은 계약후 7일내에 한하며 이후 해지는 불가능 합니다. 또한 계약 제품이 생산을 진행하였어도 계약해지 또는 변경이 불가능합니다.

2. 계약 철회시 제작이 진행하지 않았어도 계약금은 반환되지 않습니다.

3. 기존제품 철거 및 재시공은 하지 않습니다. 만약 고객님이 원할 경우 추가비용이 발생합니다.

4. 주문 제작 특성상 설치 후 교환/반품은 불가합니다. (제품 불량건 교환가능)

5. 시공시간 지정은 불가능 합니다.

6. 무상AS 기간은 1년이며, 고객 실수로 인한 제품하자는 AS비용이 별도로 발생합니다. (제품하자일 경우 제외)

7. 계약서의 내용을 충분히 이해하였음을 확인합니다.`
        };
    },
    actions : {
        /** 쿠폰 데이터 가져오기 */
        async getCoupon()
        {
            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://data.planorder.kr/api/commonData/getCoupon`);

                console.log(res);

                const list = [{ label : '선택취소', value : '', unit : 'P', val : '' }];

                res.data['list'].map(item => {
                    list.push({
                        label   : item['label'],
                        value   : item['value'],
                        unit    : item['unit'],
                        val     : item['val']
                    });
                });

                this.coupon = list;
            }
            catch (e)
            {
                console.error(e);
            }
        }
    }
});
