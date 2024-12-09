
/**
 * @description EA 계산
 * @author 김원명, @version 1.0, @last date 2023/10/10
 * @data = {
 * 		qty : '수량'
 * }
 * @return 계산된 EA
 */
export function getEa(data)
{
	/** 그냥 수량이지만 혹시 몰라서 전용 함수 만들어둠 */
	return data['qty'];
}

/**
 * @description 가로,세로 길이에 따른 회배 계산
 * @author 김원명, @version 1.0, @last date 2023/10/06
 * @data = {
 *      width  : '가로',
 *      height : '세로',
 *      size   : '규격'
 * }
 * @return 계산된 회배 값
 * */
export function getHebe(data) 
{
	let hebe = (data['width'] * 0.01) * (data['height'] * 0.01);

	if(hebe > Number(data['size']))
    {
		return Math.ceil(hebe * 10) / 10;
	}
    else
    {
		return Math.ceil(Number(data['size']) * 10) / 10;
	}
}

/**
 * @description 가로길이에 따른 야드 계산
 * @author 김원명, @version 1.0, @last date 2023/10/06
 * @data = {
 *      width   : '가로',
 *      usage   : '원단 사용량',
 *      size    : '최소 야드 단위',
 *      los     : '완제품가공 로스'
 * }
 * @return 계산된 야드 값
 * */
export function getYard(data) 
{
	if(Number(data['width']) > 0)
    {
		let yard = Math.round(((Number(data['width']) * Number(data['usage']) + Number(data['los'])) / 90) * 10) / 10;
		let size = Number(data['size']);

		if(yard > size)
        {
			return yard;
		}
        else
        {
			return size;
		}
	}
    else
    {
		return 0;
	}
}

/**
 * @description 가로길이에 따른 폭 계산
 * @author 김원명, @version 1.0, @last date 2023/10/06
 * @data = {
 *      width   : '가로',
 *      usage   : '원단사용량',
 *      size    : '최소 폭 단위',
 *      los     : '폭당 가공로스',
 *      pokSpec : '원단폭 규격'
 * }
 * @return 계산된 폭 값
 * */
export function getPok(data) 
{
	if(Number(data['width']) > 0)
    {
		let pok  = Math.round((Number(data['width']) * Number(data['usage']) + Number(data['los'])) / Number(data['pokSpec']));
		let size = Number(data['size']);

		if(pok > size)
        {
			return pok;
		}
        else
        {
			return size;
		}
	}
    else
    {
		return 0;
	}
}

/**
 * @description EA 계산
 * @author 김원명, @version 1.0, @last date 2023/10/10
 * @data = array(
 *    	'purcAmt'		=>	'매입금액',
 *    	'saleAmt'		=>	'매출금액',
 *    	'qty'			=>	'수량',
 *    	'option'		=>	'옵션',
 *    	'dcAmt'	        => 	'금액조정',
 *    	'dcUnit'	    =>  '할인단위(금액조정단위)',
 *    	'vat'			=>	'부가세'
 * )
 * @return 계산된 EA 값
 * */
export function eaCalculation(data)
{
	let result = {};
	let ea;

	//EA 계산
	ea = Math.round(Number(data['qty']) * 10) / 10;

	let itemPurcAmt = Math.round(ea * Number(data['purcAmt']));
	let itemSaleAmt = Math.round(ea * Number(data['saleAmt']));

	//옵션
	let optionPurcAmt = 0;		//총합계에 사용할 매입 금액
	let optionSaleAmt = 0;	    //총합계에 사용할 매출 금액
	let ibo_amt = [];			//옵션별 개별 합계 금액
	let iso_amt = [];			//옵션별 개별 합계 금액

	//옵션 계산
	let optionObject;

	for(let i = 0; i < data['option'].length; i++)
    {
		if(ibo_amt[i] === undefined) ibo_amt[i] = 0;
		if(iso_amt[i] === undefined) iso_amt[i] = 0;

		let optionData = data['option'][i];

		let n = ea;

		optionObject = optionCalculation(optionData , n , data['vat']);
		//옵션 매입금액
		optionPurcAmt += optionObject['purcAmt'] * n;
		//옵션 매출금액
		optionSaleAmt += optionObject['saleAmt'] * n;
		//옵션별 개별 합계 매입 금액
		ibo_amt[i] += optionObject['purcAmt'] * n;
		//옵션별 개별 합계 매출 금액
		iso_amt[i] += optionObject['saleAmt'] * n;
	}

	//매입
	let purcAmt = itemPurcAmt + optionPurcAmt;
	//매출
	let saleAmt = itemSaleAmt + optionSaleAmt;

	//매입 제품 금액
	result['itemPurcAmt'] = itemPurcAmt;
	result['itemPurcTax'] = getVatAmt(data['vat'], itemPurcAmt);
	//매출 제품 금액
	result['itemSaleAmt'] = itemSaleAmt;
	result['itemSaleTax'] = getVatAmt(data['vat'] , itemSaleAmt);

	//매입 옵션 금액(옵션별 총금액)
	result['optionPurcAmt'] = ibo_amt;
	//매출 옵션 금액(옵션별 총금액)
	result['optionSaleAmt'] = iso_amt;

	let ibo_tax = [];
	let iso_tax = [];

	for(let i = 0; i < data['option'].length; i++)
    {
		ibo_tax[i] = getVatAmt(data['vat'] , ibo_amt[i]);
		iso_tax[i] = getVatAmt(data['vat'] , iso_amt[i]);
	}

	result['optionPurcTax'] = ibo_tax;
	result['optionSaleTax'] = iso_tax;

	//금액조정 금액
	result['dcAmt'] = dcCalculation(saleAmt, data['dcUnit'], data['dcAmt']);

	//회배
	result['ea'] = ea;
	result['totalPurcAmt'] = purcAmt;
	result['totalPurcTax'] = getVatAmt(data['vat'] , result['totalPurcAmt']);
	result['totalSaleAmt'] = saleAmt + result['dcAmt'];
	result['totalSaleTax'] = getVatAmt(data['vat'] , result['totalSaleAmt']);

	return result;
}

/**
 * @description 회배 계산
 * @author 김원명, @version 1.0, @last date 2023/10/06
 * @data = array(
 *    	'purcAmt'		=>	'매입금액',
 *    	'saleAmt'		=>	'매출금액',
 *    	'hebe'			=>	['회배'],
 *    	'division'		=>  '분할',
 *    	'qty'			=>	'수량',
 *    	'option'		=>	'옵션',
 *    	'dcAmt'	        => 	'금액조정',
 *    	'dcUnit'	    =>  '할인단위(금액조정단위)',
 *    	'vat'			=>	'부가세'
 * )
 * @return 계산된 회배 값
 * */
export function hebeCalculation(data) 
{
	let result = {};

	/** 제품 금액 */
	let isItemSaleAmt = [];
	let isItemSaleTax = [];
	let isItemPurcAmt = [];
	let isItemPurcTax = [];

	let itemPurcAmt = 0;
	let itemSaleAmt = 0;

	/** 옵션 금액 */
	let optionList      = [];
	let optionPurcAmt   = 0;	//총합계에 사용할 매입 금액
	let optionSaleAmt   = 0;	//총합계에 사용할 매출 금액

	let ibo_amt = [];			//옵션별 개별 합계 금액
	let iso_amt = [];			//옵션별 개별 합계 금액

	let hebe = 0;

	//분할이 아닌 경우 토탈값만 있으면 댐
	//분할인 경우는 수량만큼 각각 개별금액을 가지고 있어야함(3분할 * 2수량 = 6개)
	if(data['division'] > 1)
    {
		for(let i=0, j=0; i<Number(data['division']) * Number(data['qty']); i++, j++)
        {
			//j 변수는 분할수랑 같아지면 0으로 초기화
			if(j === Number(data['division']))
            {
				j = 0;
			}

			//매입 금액
			isItemPurcAmt[i] = Math.round(Number(data['hebe'][j]) * Number(data['purcAmt']));
			isItemPurcTax[i] = getVatAmt(data['vat'] , isItemPurcAmt[i]);
			itemPurcAmt += isItemPurcAmt[i];

			//매출 금액
			isItemSaleAmt[i] = Math.round(Number(data['hebe'][j]) * Number(data['saleAmt']));
			isItemSaleTax[i] = getVatAmt(data['vat'] , isItemSaleAmt[i]);
			itemSaleAmt += isItemSaleAmt[i];

			//회배 계산
			hebe = Math.round((Number(hebe) + Number(data['hebe'][j])) * 10) / 10;

			//옵션 계산
			optionList[i] = [];

			for(let k = 0; k < data['option'].length; k++)
            {
				if(ibo_amt[k] === undefined) ibo_amt[k] = 0;
				if(iso_amt[k] === undefined) iso_amt[k] = 0;

				let optionData = data['option'][k];
				let n = 0;

				//면적 계산 여부
				if(optionData['unit'] === '001')
                {
					n = Number(data['hebe'][j]);
				}
                else
                {
					n = 1;
				}

				optionList[i][k] = optionCalculation(optionData, n, data['vat']);

				//옵션 매입금액
				optionPurcAmt += optionList[i][k]['purcAmt'] * n;
				//옵션 매출금액
				optionSaleAmt += optionList[i][k]['saleAmt'] * n;
				//옵션별 개별 합계 매입 금액
				ibo_amt[k] += optionList[i][k]['purcAmt'] * n;
				//옵션별 개별 합계 매출 금액
				iso_amt[k] += optionList[i][k]['saleAmt'] * n;
			}
		}
	}
    else
    {
		//매입 금액
		isItemPurcAmt[0] = Math.round(Number(data['hebe'][0]) * Number(data['qty']) * Number(data['purcAmt']));
		isItemPurcTax[0] = getVatAmt(data['vat'], isItemPurcAmt[0]);
		itemPurcAmt += isItemPurcAmt[0];

		//매출 금액
		isItemSaleAmt[0] = Math.round(Number(data['hebe'][0]) * Number(data['qty']) * Number(data['saleAmt']));
		isItemSaleTax[0] = getVatAmt(data['vat'] , isItemSaleAmt[0]);
		itemSaleAmt += isItemSaleAmt[0];

		//회배 계산(개별 회배 * 수량)
		hebe = Math.round(Number(data['hebe'][0]) * Number(data['qty']) * 10) / 10;

		//옵션 계산
		optionList[0] = [];

		for(let i = 0; i<data['option'].length; i++)
        {
			if(ibo_amt[i] === undefined) ibo_amt[i] = 0;
			if(iso_amt[i] === undefined) iso_amt[i] = 0;

			let optionData = data['option'][i];
			let n = 0;

			//면적 계산 여부
			if(optionData['unit'] === '001')
            {
				n = hebe;
			}
            else
            {
				n = Number(data['qty']);
			}

			optionList[0][i] = optionCalculation(optionData, Number(data['hebe'][0]), data['vat']);

			//매입 총금액에 더하기 위한 변수
			optionPurcAmt += optionList[0][i]['purcAmt'] * n;
			//매출 총금액에 더하기 위한 변수
			optionSaleAmt += optionList[0][i]['saleAmt'] * n;
			//ORD_DETAIL_AMT 테이블의 매입 금액용
			ibo_amt[i] = optionList[0][i]['purcAmt'] * n;
			//ORD_DETAIL_AMT 테이블의 매출 금액용
			iso_amt[i] = optionList[0][i]['saleAmt'] * n;
		}
	}

	//매입
	let purcAmt = itemPurcAmt + optionPurcAmt;
	//매출
	let saleAmt = itemSaleAmt + optionSaleAmt;

	//개별금액
	result['eachItemPurcAmt']  = isItemPurcAmt;
	result['eachItemPurcTax']  = isItemPurcTax;
	result['eachItemSaleAmt']  = isItemSaleAmt;
	result['eachItemSaleTax']  = isItemSaleTax;
    
	//개별 옵션금액
	result['eachOption'] = optionList;

	//매입 제품 금액
	result['itemPurcAmt'] = itemPurcAmt;
	result['itemPurcTax'] = getVatAmt(data['vat'] , itemPurcAmt);

	//매출 제품 금액
	result['itemSaleAmt'] = itemSaleAmt;
	result['itemSaleTax'] = getVatAmt(data['vat'] , itemSaleAmt);

	//매입 옵션 금액(옵션별 총금액)
	result['optionPurcAmt'] = ibo_amt;	//['옵션1' , '옵션2']
	//매출 옵션 금액(옵션별 총금액)
	result['optionSaleAmt'] = iso_amt;	//['옵션1' , '옵션2']

	let ibo_tax = [];
	let iso_tax = [];

	for(let i = 0; i < data['option'].length; i++)
    {
		ibo_tax[i] = getVatAmt(data['vat'] , ibo_amt[i]);
		iso_tax[i] = getVatAmt(data['vat'] , iso_amt[i]);
	}

	result['optionPurcTax'] = ibo_tax;
	result['optionSaleTax'] = iso_tax;

	//금액조정 금액
	result['dcAmt'] = dcCalculation(saleAmt, data['dcUnit'], data['dcAmt']);

	//회배
	result['hebe'] = hebe;

	result['totalPurcAmt'] = purcAmt;
	result['totalPurcTax'] = getVatAmt(data['vat'] , result['totalPurcAmt']);
	result['totalSaleAmt'] = saleAmt + result['dcAmt'];
	result['totalSaleTax'] = getVatAmt(data['vat'] , result['totalSaleAmt']);

	return result;
}

/**
 * @description 야드 계산
 * @author 김원명, @version 1.0, @last date 2023/10/06
 * @data = {
 *    	purcAmt         : '매입금액',
 *    	saleAmt         : '매출금액',
 *    	shapePurcAmt	: '형상매입금액',
 *    	shapeSaleAmt    : '형상매출금액',
 *    	shapeGb         : '형상구분',
 *    	qty             : '수량',
 *    	yard			: '야드',
 *    	option          : '옵션',
 *    	dcAmt           : '금액조정',
 *    	dcUnit          : '금액조정단위',
 *    	vat             : '부가세'
 * }
 * 
 * @return 계산된 야드 값
 * */
export function yardCalculation(data) 
{
	let result = {};
	let yard;

	//야드 계산
	yard = Math.round(Number(data['yard']) * Number(data['qty']) * 10) / 10;

	let itemPurcAmt = Math.round(yard * Number(data['purcAmt']));
	let itemSaleAmt = Math.round(yard * Number(data['saleAmt']));

	let shapePurcAmt = 0;
	let shapeSaleAmt = 0;

	if(data['shapeGb'] === 'Y')
    {
		shapePurcAmt = Math.round(yard * Number(data['shapePurcAmt']));
		shapeSaleAmt = Math.round(yard * Number(data['shapeSaleAmt']));
	}

	let optionPurcAmt = 0;		//총합계에 사용할 매입 금액
	let optionSaleAmt = 0;	    //총합계에 사용할 매출 금액
	let ibo_amt = [];			//옵션별 개별 합계 금액
	let iso_amt = [];			//옵션별 개별 합계 금액

	//옵션 계산
	let optionObject;
	for(let i = 0; i < data['option'].length; i++)
    {
		if(ibo_amt[i] === undefined) ibo_amt[i] = 0;
		if(iso_amt[i] === undefined) iso_amt[i] = 0;

		let optionData = data['option'][i];
		let n = 0;

		//면적 계산 여부
		if(optionData['unit'] === '006' || optionData['unit'] === '007')
        {
			n = yard;
		}
        else
        {
			n = Number(data['qty']);
		}

		optionObject = optionCalculation(optionData , n , data['vat']);

		//옵션 매입금액
		optionPurcAmt += optionObject['purcAmt'] * n;
		//옵션 매출금액
		optionSaleAmt += optionObject['saleAmt'] * n;
		//옵션별 개별 합계 매입 금액
		ibo_amt[i] += optionObject['purcAmt'] * n;
		//옵션별 개별 합계 매출 금액
		iso_amt[i] += optionObject['saleAmt'] * n;
	}

	//매입
	let purcAmt = itemPurcAmt + shapePurcAmt + optionPurcAmt;
	//매출
	let saleAmt = itemSaleAmt + shapeSaleAmt + optionSaleAmt;

	//매입 제품 금액
	result['itemPurcAmt'] = itemPurcAmt;
	result['itemPurcTax'] = getVatAmt(data['vat'] , itemPurcAmt);
	//매출 제품 금액
	result['itemSaleAmt'] = itemSaleAmt;
	result['itemSaleTax'] = getVatAmt(data['vat'] , itemSaleAmt);
	//매입 형상 금액
	result['shapePurcAmt'] = shapePurcAmt;
	result['shapePurcTax'] = getVatAmt(data['vat'] , shapePurcAmt);
	//매출 형상 금액
	result['shapeSaleAmt'] = shapeSaleAmt;
	result['shapeSaleTax'] = getVatAmt(data['vat'] , shapeSaleAmt);

	//매입 옵션 금액(옵션별 총금액)
	result['optionPurcAmt'] = ibo_amt;
	//매출 옵션 금액(옵션별 총금액)
	result['optionSaleAmt'] = iso_amt;

	let ibo_tax = [];
	let iso_tax = [];

	for(let i = 0; i < data['option'].length; i++)
    {
		ibo_tax[i] = getVatAmt(data['vat'], ibo_amt[i]);
		iso_tax[i] = getVatAmt(data['vat'], iso_amt[i]);
	}

	result['optionPurcTax'] = ibo_tax;
	result['optionSaleTax'] = iso_tax;

	//금액조정 금액
	result['dcAmt'] = dcCalculation(saleAmt , data['dcUnit'] , data['dcAmt']);

	//야드
	result['yard'] = yard;
	result['totalPurcAmt'] = purcAmt;
	result['totalPurcTax'] = getVatAmt(data['vat'], result['totalPurcAmt']);
	result['totalSaleAmt'] = saleAmt + result['dcAmt'];
	result['totalSaleTax'] = getVatAmt(data['vat'], result['totalSaleAmt']);

	return result;
}

/**
 * @description 폭 계산
 * @author 김원명, @version 1.0, @last date 2023/10/06
 * @data = {
 *    	purcAmt         : '매입금액',
 *    	saleAmt         : '매출금액',
 *    	shapePurcAmt	: '형상매입금액',
 *    	shapeSaleAmt    : '형상매출금액',
 *    	shapeGb 		: '형상구분',
 *    	qty			    : '수량',
 *    	pok			    : '폭',
 *    	height		    : '세로길이',
 *    	heightLen	    : '세로길이 제한',
 *    	height_unit     : '세로길이 제한단위(안씀)',
 *    	height_op1      : '세로길이 cm당( 그냥 기본값 2.5 고정처리 )(안씀)',
 *    	addPrice        : '세로길이 %',
 *    	option          : '옵션',
 *    	dcAmt           : '금액조정',
 *    	dcUnit          : '금액조정단위',
 *    	vat	            : '부가세'
 * }
 * @return 계산된 회배 값
 * */
export function pokCalculation(data) 
{
	let result = {};
	let pok;

	//폭 계산
	pok = Math.round(Number(data['pok']) * Number(data['qty']) * 10) / 10;

	let itemPurcAmt = Math.round(pok * Number(data['purcAmt']));
	let itemSaleAmt = Math.round(pok * Number(data['saleAmt']));

	//형상금액
	let shapePurcAmt = 0;
	let shapeSaleAmt = 0;

	if(data['shapeGb'] === 'Y')
    {
		shapePurcAmt = Math.round(pok * Number(data['shapePurcAmt']));
		shapeSaleAmt = Math.round(pok * Number(data['shapeSaleAmt']));
	}

	//세로길이 추가금액
	let heightPurcAmt = 0;
	let heightSaleAmt = 0;

	//차이 선언
	let heightDiff = 0;
	//퍼센트
	let percent = 0;

    //차이 계산식 => 세로길이 - 세로길이제한
    heightDiff = Number(data['height']) - Number(data['heightLen']);

    if(heightDiff > 0)
    {
        //퍼센트 계산식 => ((세로길이 - 세로길이제한) / 세로길이 cm당) * 세로길이 cm당%
        percent = Math.ceil(heightDiff / 2.5) * Number(data['addPrice']);
    }

	//퍼센트 계산식을 통해 1% 이상 일 경우
	if(percent > 0)
    {
		//세로길이 추가금액 계산식 => ((제품금액 + 형상금액) / 100) * 퍼센트
		heightPurcAmt = Math.round(((itemPurcAmt + shapePurcAmt) / 100) * percent);
		heightSaleAmt = Math.round(((itemSaleAmt + shapeSaleAmt) / 100) * percent);
	}

	//옵션
	let optionPurcAmt = 0;		//총합계에 사용할 매입 금액
	let optionSaleAmt = 0;	    //총합계에 사용할 매출 금액
	let ibo_amt = [];			//옵션별 개별 합계 금액
	let iso_amt = [];			//옵션별 개별 합계 금액

	//옵션 계산
	let optionObject;

	for(let i = 0; i < data['option'].length; i++)
    {
		if(ibo_amt[i] === undefined) ibo_amt[i] = 0;
		if(iso_amt[i] === undefined) iso_amt[i] = 0;

		let optionData = data['option'][i];

		let n = 0;
		//면적 계산 여부
		if(optionData['unit'] === '006' || optionData['unit'] === '007')
        {
			n = pok;
		}
        else
        {
			n = Number(data['qty']);
		}

		optionObject = optionCalculation(optionData , n , data['vat']);
		//옵션 매입금액
		optionPurcAmt += optionObject['purcAmt'] * n;
		//옵션 매출금액
		optionSaleAmt += optionObject['saleAmt'] * n;
		//옵션별 개별 합계 매입 금액
		ibo_amt[i] += optionObject['purcAmt'] * n;
		//옵션별 개별 합계 매출 금액
		iso_amt[i] += optionObject['saleAmt'] * n;
	}

	//매입
	let purcAmt = itemPurcAmt + shapePurcAmt + heightPurcAmt + optionPurcAmt;
	//매출
	let saleAmt = itemSaleAmt + shapeSaleAmt + heightSaleAmt + optionSaleAmt;

	//매입 제품 금액
	result['itemPurcAmt'] = itemPurcAmt;
	result['itemPurcTax'] = getVatAmt(data['vat'], itemPurcAmt);
	//매출 제품 금액
	result['itemSaleAmt'] = itemSaleAmt;
	result['itemSaleTax'] = getVatAmt(data['vat'] , itemSaleAmt);
	//매입 형상 금액
	result['shapePurcAmt'] = shapePurcAmt;
	result['shapePurcTax'] = getVatAmt(data['vat'] , shapePurcAmt);
	//매출 형상 금액
	result['shapeSaleAmt'] = shapeSaleAmt;
	result['shapeSaleTax'] = getVatAmt(data['vat'] , shapeSaleAmt);
	//매입 세로길이 추가금
	result['heightPurcAmt'] = heightPurcAmt;
	result['heightPurcTax'] = getVatAmt(data['vat'] , heightPurcAmt);
	//매출 세로길이 추가금
	result['heightSaleAmt'] = heightSaleAmt;
	result['heightSaleTax'] = getVatAmt(data['vat'] , heightSaleAmt);

	//매입 옵션 금액(옵션별 총금액)
	result['optionPurcAmt'] = ibo_amt;
	//매출 옵션 금액(옵션별 총금액)
	result['optionSaleAmt'] = iso_amt;

	let ibo_tax = [];
	let iso_tax = [];

	for(let i = 0; i < data['option'].length; i++)
    {
		ibo_tax[i] = getVatAmt(data['vat'] , ibo_amt[i]);
		iso_tax[i] = getVatAmt(data['vat'] , iso_amt[i]);
	}

	result['optionPurcTax'] = ibo_tax;
	result['optionSaleTax'] = iso_tax;

	//금액조정 금액
	result['dcAmt'] = dcCalculation(saleAmt, data['dcUnit'], data['dcAmt']);

	//회배
	result['pok'] = pok;
	result['totalPurcAmt'] = purcAmt;
	result['totalPurcTax'] = getVatAmt(data['vat'] , result['totalPurcAmt']);
	result['totalSaleAmt'] = saleAmt + result['dcAmt'];
	result['totalSaleTax'] = getVatAmt(data['vat'] , result['totalSaleAmt']);

	return result;
}

/**
 * @description 옵션 계산(미구현)
 * @author 김원명, @version 1.0, @last date 2023/10/06
 * @data = {
 *    	unit        : '옵션단위',
 *    	purcAmt     : '매입금액',
 *    	salAmt      : '매출금액',
 * }
 * @return 계산된 옵션값
 * */
export function optionCalculation(data, n, vat) 
{
	let result = {};

	result['purcAmt']  = Number(data['purcAmt']) * n;
	result['purcTax']  = getVatAmt(vat, result['purcAmt']);
	result['saleAmt']  = Number(data['saleAmt']) * n;
	result['saleTax']  = getVatAmt(vat, result['saleAmt']);

	return result;
}

/**
 * @description 금액조정
 * @author 김원명, @version 1.0, @last date 2023/10/06
 * @data = {
 *    	amt     :	'금액',
 *    	dcUnit  :	'금액조정단위',
 *    	dcAmt   :	'금액조정금액'
 * }
 * @return 계산된 금액조정값
 * */
export function dcCalculation(amt , dcUnit , dcAmt) 
{
	if(dcUnit !== "")
    {
		switch (dcUnit) 
        {
			case "P":	//+
				return Number(dcAmt);
			case "M":	//-
				return Number(dcAmt) * -1;
			case "PC":	//%
				return ((amt / 100) * Number(dcAmt)) * -1;
		}
	}
    else
    {
		return 0;
	}
}


/**
 * @description 부가세 계산식(Y:포함, N:미포함)
 * @author 김원명, @version 1.0, @last date 2023/10/06
 * @param 부가세 구분, 금액
 * @return 부가세 구분에 따른 값
 */
export function getVatAmt(vat, amt) 
{
	if(vat === 'Y')
    {	
        //세액 계산
		return Math.round(amt * 0.1);
	}
    else if(vat === 'N')
    {	
        //세액 계산안함
		return 0;
	}
}