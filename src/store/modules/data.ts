import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', {
    state: () => {
        return {
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
            bsCd  : [
                { name : '블라인드', value : 'BS01' },
                { name : '커튼', value : 'BS02' },
            ],
            division : [
                { value : 1, name : '단창'},
                { value : 2, name : '2분할'},
                { value : 3, name : '3분할'},
                { value : 4, name : '4분할'},
                { value : 5, name : '5분할'},
                { value : 6, name : '6분할'},
                { value : 7, name : '7분할'},
                { value : 8, name : '8분할'},
                { value : 9, name : '9분할'},
                { value : 10, name : '10분할'}
            ],
            proc  : [ 
                { name : '나비주름', value : '001' },
                { name : '평주름', value : '002' }
            ],
            usage : Array.from({ length: 21 }, (v, i) => ({ name: (1.0 + i * 0.1).toFixed(1)+'배', value: Number((1.0 + i * 0.1).toFixed(1)) })),
            addColor    : [ 
                { value : 'O', name : '원톤' }, 
                { value : 'T', name : '투톤' }
            ],
            shape       : [ 
                { value : 'Y', name : '있음' }, 
                { value : 'N', name : '없음' } 
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
        };
    },
});
