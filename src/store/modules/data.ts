import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';

export const useDataStore = defineStore('data', {
    state: () => {
        return {
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
            division : Array.from({ length: 10 }, (v, i) => ({ name: i === 0 ? '단창' : (i+1)+'분할', value: i+1 })),
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
            ]
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
