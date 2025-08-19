/**
 * @description 반올림 단위 계산
 * @author 김원명, @version 1.0, @last date 2025/04/02
 * @data = {
 * 		roundGb : '반올림 단위 값',
 * 		value	: '계산할 값'
 * }
 * @return 반올림 갑 적용된 값
 */
export function getRoundCalc (value, roundGb='001') 
{
	let calcValue	= 0;
	let decimalPart = value - Math.trunc(value);

	switch(roundGb)
	{
		case '001':	/** 1단위 무조건 올림 처리 => 사장님 요청 사항 2025-07-31 */
			calcValue = Math.ceil(value);
		break;
		case '002':	/** 0.5단위 */
			if(decimalPart < 0.25)
			{
				/** 0.25 값 미만일 시 버림 처리 */
				calcValue = Math.floor(value);
			}
			else if(decimalPart >= 0.25 && decimalPart < 0.75)
			{
				/** 0.25 값 이상 && 0.75 값 미만일 시 0.5 값 처리 */
				calcValue = Math.floor(value) + 0.5;
			}
			else if(decimalPart >= 0.75)
			{
				/** 0.75 값 이상일 시 1 값 처리 */
				calcValue = Math.ceil(value);
			}
			else
			{
				/** 나머지 값 그대로 (혹시 몰라 처리) */
				calcValue = value;
			}
		break;
		case '003': /** 0.1단위 */
		{
			let secondDecimalPlace = Math.round((decimalPart * 100) % 10);
			if (secondDecimalPlace >= 5) 
			{
				/** 소수점 두 번째 자리가 5 이상이면 올림 */
				calcValue = Math.floor(value * 10 + 0.5) / 10;
			}
			else 
			{
				/** 그렇지 않으면 버림 처리 */
				calcValue = Math.floor(value * 10) / 10;
			}
		}
        break;
        case '004': /** 0.01단위 (소수점 셋째 자리에서 반올림) */
            calcValue = Math.round(value * 100) / 100;
        break;
        case '005':
            calcValue = value.toFixed(2);
		break;
	}

	return Number(calcValue);
}

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
 *      width  	    : '가로',
 *      height 	    : '세로',
 *      minWidth    : '최소 금액 가로',
 *      minHeight   : '최소 금액 세로',
 *      size   	    : '규격',
 * 		roundGb	    : '반올림 구분'
 * }
 * @return 계산된 회배 값
 * */
export function getHebe(data) 
{
    const widthValue    = Number(data['width']);
    const heightValue   = Number(data['height']);
    const minWidth      = Number(data['minWidth']);
    const minHeight     = Number(data['minHeight']);

    const width     = minWidth > widthValue ? minWidth : widthValue;
    const height    = minHeight > heightValue ? minHeight : heightValue;

    let hebe = 0;

	hebe = (width * 0.01) * (height * 0.01);

	if(hebe > Number(data['size']))
    {
		return getRoundCalc(hebe, data['roundGb']);
	}
    else
    {
		return Number(data['size']);
	}
}

/**
 * @description 가로길이에 따른 야드 계산
 * @author 김원명, @version 1.0, @last date 2023/10/06
 * @data = {
 *      width   : '가로',
 *      usage   : '원단 사용량',
 *      size    : '최소 야드 단위',
 *      los     : '완제품가공 로스',
 *      proc    : '가공방법 ( 나비주름 / 평주름 )' 
 * 		roundGb	: '반올림 구분'
 * }
 * @return 계산된 야드 값
 * */
export function getYard(data) 
{
	if(Number(data['width']) > 0)
    {
        /** 나비주름일 때 가공로스 x2 */
        const los = data['proc'] === '001' ? (Number(data['los']) * 2) : Number(data['los']);

		let yard = (Number(data['width']) * Number(data['usage']) + los) / 90;
		let size = Number(data['size']);

		if(yard > size)
        {
			return getRoundCalc(yard, data['roundGb']);
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
 *      los     : '폭당 가공로스'
 *      proc    : '가공방법 ( 나비주름 / 평주름 )' 
 *      pokSpec : '원단폭 규격',
 * 		roundGb	: '반올림 구분'
 * }
 * @return 계산된 폭 값
 * */
export function getPok(data) 
{
	if(Number(data['width']) > 0)
    {
        /** 나비주름일 때 가공로스 x2 */
        const los = data['proc'] === '001' ? (Number(data['los']) * 2) : Number(data['los']);

        /** (가로 x 가공로스) / 원단폭 규격 => 대폭 */
		let pok     = (Number(data['width']) * Number(data['usage']) + los) / Number(data['pokSpec']);
		let size    = Number(data['size']);

		if(pok > size)
        {
			return getRoundCalc(pok, data['roundGb']);
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
 * @description 가로길이에 따른 cm 계산
 * @author 김원명, @version 1.0, @last date 2025/08/01
 * @data = {
 *      width   : '가로',
 *      size    : '최소 cm 단위',
 * 		roundGb	: '반올림 구분'
 */
export function getCm(data)
{
	if(Number(data['width']) > 0)
    {
        /** (가로 x 가공로스) / 원단폭 규격 => 대폭 */
		let cm      = Number(data['width']);
		let size    = Number(data['size']);

		if(cm > size)
        {
			return getRoundCalc(cm, data['roundGb']);
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
 *    	'vat'			=>	'부가세',
 * 		'vmRate'		=>	'부가세율'
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
	let optionPurcAmt   = 0;		//총합계에 사용할 매입 금액
	let optionSaleAmt   = 0;	    //총합계에 사용할 매출 금액
	let optionPurcTax   = 0;		//총합계에 사용할 매입 세액
	let optionSaleTax   = 0;	    //총합계에 사용할 매출 세액

	//옵션 계산
	let optionObject;

	for(let i = 0; i < data['option'].length; i++)
    {
		let optionData = data['option'][i];
		let n = ea;

		optionObject = optionCalculation(optionData , n , data['vat']);
		//옵션 매입금액
		optionPurcAmt += optionObject['purcAmt'] * n;
		//옵션 매출금액
		optionSaleAmt += optionObject['saleAmt'] * n;
	}

	//매입
	let purcAmt = itemPurcAmt + optionPurcAmt;
	//매출
	const amt   = itemSaleAmt + optionSaleAmt;
	let saleAmt = amt;
	let saleTax = getVatAmt('Y', amt);

	let dcAmt   = dcCalculation(saleAmt, data['dcUnit'], data['dcAmt']);
	let dcTax   = data['dcUnit'] === 'PC' ? dcCalculation(saleTax, data['dcUnit'], data['dcAmt']) : 0;

	saleAmt = saleAmt + dcAmt;
	saleTax = saleTax + dcTax;

	//매입 제품 금액
	result['itemPurcAmt'] = itemPurcAmt;
	result['itemPurcTax'] = data['vat'] === 'Y' ? getVatRateAmt(data['vmRate'], itemPurcAmt) : 0;
	//매출 제품 금액
	result['itemSaleAmt'] = itemSaleAmt;
	result['itemSaleTax'] = getVatAmt('Y', itemSaleAmt);

	//매입 옵션 금액(옵션별 총금액)
	result['optionPurcAmt'] = ibo_amt;
	//매출 옵션 금액(옵션별 총금액)
	result['optionSaleAmt'] = iso_amt;

	let ibo_tax = [];
	let iso_tax = [];

	result['optionPurcTax'] = ibo_tax;
	result['optionSaleTax'] = iso_tax;

	//금액조정 금액
	result['dcAmt'] = dcAmt + dcTax;

	//회배
	result['ea'] = ea;
	result['totalPurcAmt'] = purcAmt;
	result['totalPurcTax'] = data['vat'] === 'Y' ? getVatRateAmt(data['vmRate'], result['totalPurcAmt']) : 0;
	result['totalSaleAmt'] = saleAmt;
	result['totalSaleTax'] = saleTax;

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
 *    	'vat'			=>	'부가세',
 * 		'vmRate'		=>	'부가세율'
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
	let itemPurcTax = 0;
	let itemSaleAmt = 0;
	let itemSaleTax = 0;

	let dcAmt = 0;
	let dcTax = 0;

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
			isItemPurcTax[i] = data['vat'] === 'Y' ? getVatRateAmt(data['vmRate'] , isItemPurcAmt[i]) : 0;

			itemPurcAmt += isItemPurcAmt[i];
			itemPurcTax += isItemPurcTax[i];

			//매출 금액
			const isSaleAmt = Math.round(Number(data['hebe'][j]) * Number(data['saleAmt']));
			const isSaleTax = getVatAmt('Y' , isSaleAmt);

			if(data['dcUnit'] === 'PC')
			{
				dcAmt += dcCalculation(isSaleAmt, data['dcUnit'], data['dcAmt']);
				dcTax += dcCalculation(isSaleTax, data['dcUnit'], data['dcAmt']);
			}
			
			isItemSaleAmt[i] = isSaleAmt;
			isItemSaleTax[i] = isSaleTax;

			itemSaleAmt += isItemSaleAmt[i];
			itemSaleTax += isItemSaleTax[i];

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
		isItemPurcTax[0] = data['vat'] === 'Y' ? getVatRateAmt(data['vmRate'], isItemPurcAmt[0]) : 0;

		itemPurcAmt += isItemPurcAmt[0];
		itemPurcTax += isItemPurcTax[0];

		//매출 금액
		const isSaleAmt = Math.round(Number(data['hebe'][0]) * Number(data['qty']) * Number(data['saleAmt']));
		const isSaleTax = getVatAmt('Y' , isSaleAmt);

		if(data['dcUnit'] === 'PC')
		{
			dcAmt += dcCalculation(isSaleAmt, data['dcUnit'], data['dcAmt']);
			dcTax += dcCalculation(isSaleTax, data['dcUnit'], data['dcAmt']);
		}
		
		isItemSaleAmt[0] = isSaleAmt;
		isItemSaleTax[0] = isSaleTax;

		itemSaleAmt += isItemSaleAmt[0];
		itemSaleTax += isItemSaleTax[0];

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

	if(data['dcUnit'] !== 'PC')
	{
		dcAmt = dcCalculation(0, data['dcUnit'], data['dcAmt']);
	}

	//매입
	let purcAmt = itemPurcAmt + optionPurcAmt;
	let purcTax = itemPurcTax;
	//매출
	let saleAmt = itemSaleAmt + optionSaleAmt;
	let saleTax = itemSaleTax;

	//개별금액
	result['eachItemPurcAmt']  = isItemPurcAmt;
	result['eachItemPurcTax']  = isItemPurcTax;
	result['eachItemSaleAmt']  = isItemSaleAmt;
	result['eachItemSaleTax']  = isItemSaleTax;
    
	//개별 옵션금액
	result['eachOption'] = optionList;

	//매입 제품 금액
	result['itemPurcAmt'] = itemPurcAmt;
	result['itemPurcTax'] = purcTax;

	//매출 제품 금액
	result['itemSaleAmt'] = itemSaleAmt;
	result['itemSaleTax'] = saleTax;

	//매입 옵션 금액(옵션별 총금액)
	result['optionPurcAmt'] = ibo_amt;	//['옵션1' , '옵션2']
	//매출 옵션 금액(옵션별 총금액)
	result['optionSaleAmt'] = iso_amt;	//['옵션1' , '옵션2']

	let ibo_tax = [];
	let iso_tax = [];

	for(let i = 0; i < data['option'].length; i++)
    {
		ibo_tax[i] = getVatAmt('Y' , ibo_amt[i]);
		iso_tax[i] = getVatAmt('Y' , iso_amt[i]);
	}

	result['optionPurcTax'] = ibo_tax;
	result['optionSaleTax'] = iso_tax;

	//금액조정 금액
	result['dcAmt'] = dcAmt + dcTax;

	//회배
	result['hebe'] = hebe;

	result['totalPurcAmt'] = purcAmt;
	result['totalPurcTax'] = purcTax;
	result['totalSaleAmt'] = saleAmt + dcAmt;
	result['totalSaleTax'] = saleTax + dcTax;

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
 *    	vat             : '부가세',
 * 		vmRate			: '부가세율'
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
	let itemPurcTax = data['vat'] === 'Y' ? getVatRateAmt(data['vmRate'], itemPurcAmt) : 0;
	let itemSaleAmt = Math.round(yard * Number(data['saleAmt']));
	let itemSaleTax = getVatAmt('Y' , itemSaleAmt);

	let shapePurcAmt = 0;
	let shapePurcTax = 0;
	let shapeSaleAmt = 0;
	let shapeSaleTax = 0;

	if(data['shapeGb'] === 'Y')
    {
		shapePurcAmt = Math.round(yard * Number(data['shapePurcAmt']));
		shapePurcTax = data['vat'] === 'Y' ? getVatRateAmt(data['vmRate'], shapePurcAmt) : 0;
		shapeSaleAmt = Math.round(yard * Number(data['shapeSaleAmt']));
		shapeSaleTax = getVatAmt('Y' , shapeSaleAmt);
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
	let purcTax = itemPurcTax + shapePurcTax;
	//매출
	const amt = itemSaleAmt + shapeSaleAmt + optionSaleAmt;

	let saleAmt = amt;
	let saleTax = itemSaleTax + shapeSaleTax;

	let dcAmt   = dcCalculation(saleAmt, data['dcUnit'], data['dcAmt']);
	let dcTax   = data['dcUnit'] === 'PC' ? dcCalculation(saleTax, data['dcUnit'], data['dcAmt']) : 0;

	//매입 제품 금액
	result['itemPurcAmt'] = itemPurcAmt;
	result['itemPurcTax'] = itemPurcTax;
	//매출 제품 금액
	result['itemSaleAmt'] = itemSaleAmt;
	result['itemSaleTax'] = itemSaleTax;
	//매입 형상 금액
	result['shapePurcAmt'] = shapePurcAmt;
	result['shapePurcTax'] = shapePurcTax;
	//매출 형상 금액
	result['shapeSaleAmt'] = shapeSaleAmt;
	result['shapeSaleTax'] = shapeSaleTax;

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
	result['dcAmt'] = dcAmt + dcTax;

	//야드
	result['yard'] = yard;
	result['totalPurcAmt'] = purcAmt;
	result['totalPurcTax'] = purcTax;
	result['totalSaleAmt'] = saleAmt + dcAmt;
	result['totalSaleTax'] = saleTax + dcTax;

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
 *    	vat	            : '부가세',
 * 		vmRate			: '부가세율'
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
	let itemPurcTax = data['vat'] === 'Y' ? getVatRateAmt(data['vmRate'], Math.round(pok * Number(data['purcAmt']))) : 0;
	let itemSaleAmt = Math.round(pok * Number(data['saleAmt']));
	let itemSaleTax = getVatAmt('Y' , itemSaleAmt);

	//형상금액
	let shapePurcAmt = 0;
	let shapePurcTax = 0;
	let shapeSaleAmt = 0;
	let shapeSaleTax = 0;

	if(data['shapeGb'] === 'Y')
    {
		shapePurcAmt = Math.round(pok * Number(data['shapePurcAmt']));
		shapePurcTax = data['vat'] === 'Y' ? getVatRateAmt(data['vmRate'], shapePurcAmt) : 0;
		shapeSaleAmt = Math.round(pok * Number(data['shapeSaleAmt']));
		shapeSaleTax = getVatAmt('Y' , shapeSaleAmt);
	}

	//세로길이 추가금액
	let heightPurcAmt = 0;
	let heightPurcTax = 0;
	let heightSaleAmt = 0;
	let heightSaleTax = 0;

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
		heightPurcTax = data['vat'] === 'Y' ? getVatRateAmt(data['vmRate'], Math.round(((itemPurcAmt + shapePurcAmt) / 100) * percent)) : 0;
		heightSaleAmt = Math.round(((itemSaleAmt + shapeSaleAmt) / 100) * percent);
		heightSaleTax = getVatAmt('Y' , Math.round(((itemSaleAmt + shapeSaleAmt) / 100) * percent));
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
	let purcTax = itemPurcTax + shapePurcTax + heightPurcTax;
	//매출
	const amt = itemSaleAmt + shapeSaleAmt + heightSaleAmt + optionSaleAmt;

	let saleAmt = amt;
	let saleTax =  getVatAmt('Y' , amt);

	let dcAmt   = dcCalculation(saleAmt, data['dcUnit'], data['dcAmt']);
	let dcTax   = data['dcUnit'] === 'PC' ? dcCalculation(saleTax, data['dcUnit'], data['dcAmt']) : 0;

	//매입 제품 금액
	result['itemPurcAmt'] = itemPurcAmt;
	result['itemPurcTax'] = itemPurcTax;
	//매출 제품 금액
	result['itemSaleAmt'] = itemSaleAmt;
	result['itemSaleTax'] = itemSaleTax;
	//매입 형상 금액
	result['shapePurcAmt'] = shapePurcAmt;
	result['shapePurcTax'] = shapePurcTax;
	//매출 형상 금액
	result['shapeSaleAmt'] = shapeSaleAmt;
	result['shapeSaleTax'] = shapeSaleTax;
	//매입 세로길이 추가금
	result['heightPurcAmt'] = heightPurcAmt;
	result['heightPurcTax'] = heightPurcTax;
	//매출 세로길이 추가금
	result['heightSaleAmt'] = heightSaleAmt;
	result['heightSaleTax'] = heightSaleTax;

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

	//폭
	result['pok'] = pok;
	result['totalPurcAmt'] = purcAmt;
	result['totalPurcTax'] = purcTax;
	result['totalSaleAmt'] = saleAmt + dcAmt;
	result['totalSaleTax'] = saleTax + dcTax;

	return result;
}

export function cmCalculation(data)
{
	let result = {};
	let cm;

	//폭 계산
	cm = Number(data['cm']) * Number(data['cnt']);

	let itemPurcAmt = Math.round(cm * Number(data['purcAmt']));
	let itemPurcTax = data['vat'] === 'Y' ? getVatRateAmt(data['vmRate'], Math.round(cm * Number(data['purcAmt']))) : 0;
	let itemSaleAmt = Math.round(cm * Number(data['saleAmt']));
	let itemSaleTax = getVatAmt('Y' , itemSaleAmt);

	let shapeSaleAmt = 0;
	let shapeSaleTax = 0;
	let shapePurcAmt = 0;
	let shapePurcTax = 0;

    let procSaleAmt = 0;
    let procSaleTax = 0;
    let procPurcAmt = 0;
    let procPurcTax = 0;
    
    let bprocSaleAmt = 0;
    let bprocSaleTax = 0;
    let bprocPurcAmt = 0;
    let bprocPurcTax = 0;

	//옵션
	let optionPurcAmt   = 0;		//총합계에 사용할 매입 금액
	let optionSaleAmt   = 0;	    //총합계에 사용할 매출 금액
	let optionPurcTax   = 0;		//총합계에 사용할 매입 세액
	let optionSaleTax   = 0;	    //총합계에 사용할 매출 세액

	let ibo_amt         = [];       //옵션별 개별 합계 금액
	let iso_amt         = [];       //옵션별 개별 합계 금액

    const optionList    = [];       /** 옵션 데이터 */

	//옵션 계산
	let optionObject;

	for(let i = 0; i < data['option'].length; i++)
    {
		if(ibo_amt[i] === undefined) ibo_amt[i] = 0;
		if(iso_amt[i] === undefined) iso_amt[i] = 0;

		let optionData = data['option'][i];

		let n       = 0;
        const cnt   = data['cnt'];

        switch(data['option'][i]['selSpec'])
        {
            case 'U':
                n = data['cm'] * cnt;
            break;
            case 'C':
                n = cnt;
            break;
        }

		optionObject = optionCalculation(optionData, n, cnt, data['vat'], data['vmRate']);
		//옵션 매입금액
		optionPurcAmt += optionObject['delYn'] === 'Y' || optionObject['gb'] !== 'N' ? 0 : optionObject['purcAmt'];
		//옵션 매출금액
		optionSaleAmt += optionObject['delYn'] === 'Y' || optionObject['gb'] !== 'N' ? 0 : optionObject['saleAmt'];
		//옵션 매입세액
		optionPurcTax += optionObject['delYn'] === 'Y' || optionObject['gb'] !== 'N' ? 0 : optionObject['purcTax'];
		//옵션 매출세액
		optionSaleTax += optionObject['delYn'] === 'Y' || optionObject['gb'] !== 'N' ? 0 : optionObject['saleTax'];
		//옵션별 개별 합계 매입 금액
		ibo_amt[i] += optionObject['delYn'] === 'Y' || optionObject['gb'] !== 'N' ? 0 : optionObject['purcAmt'];
		//옵션별 개별 합계 매출 금액
		iso_amt[i] += optionObject['delYn'] === 'Y' || optionObject['gb'] !== 'N' ? 0 : optionObject['saleAmt'];

        optionList.push(optionObject);
	}

    shapeSaleAmt = optionList.reduce((amt, item) => amt + ( item.gb === 'S' && item.delYn === 'N' ?  Number(item.saleAmt) : 0), 0);
    shapeSaleTax = optionList.reduce((amt, item) => amt + ( item.gb === 'S' && item.delYn === 'N' ?  Number(item.saleTax) : 0), 0);
    shapePurcAmt = optionList.reduce((amt, item) => amt + ( item.gb === 'S' && item.delYn === 'N' ?  Number(item.purcAmt) : 0), 0);
    shapePurcTax = optionList.reduce((amt, item) => amt + ( item.gb === 'S' && item.delYn === 'N' ?  Number(item.purcTax) : 0), 0);

    procSaleAmt = optionList.reduce((amt, item) => amt + ( item.gb === 'P' && item.delYn === 'N' ?  Number(item.saleAmt) : 0), 0);
    procSaleTax = optionList.reduce((amt, item) => amt + ( item.gb === 'P' && item.delYn === 'N' ?  Number(item.saleTax) : 0), 0);
    procPurcAmt = optionList.reduce((amt, item) => amt + ( item.gb === 'P' && item.delYn === 'N' ?  Number(item.purcAmt) : 0), 0);
    procPurcTax = optionList.reduce((amt, item) => amt + ( item.gb === 'P' && item.delYn === 'N' ?  Number(item.purcTax) : 0), 0);

    bprocSaleAmt = optionList.reduce((amt, item) => amt + ( item.gb === 'B' && item.delYn === 'N' ?  Number(item.saleAmt) : 0), 0);
    bprocSaleTax = optionList.reduce((amt, item) => amt + ( item.gb === 'B' && item.delYn === 'N' ?  Number(item.saleTax) : 0), 0);
    bprocPurcAmt = optionList.reduce((amt, item) => amt + ( item.gb === 'B' && item.delYn === 'N' ?  Number(item.purcAmt) : 0), 0);
    bprocPurcTax = optionList.reduce((amt, item) => amt + ( item.gb === 'B' && item.delYn === 'N' ?  Number(item.purcTax) : 0), 0);

	//매입
	let saleAmt = itemSaleAmt + shapeSaleAmt + procSaleAmt + bprocSaleAmt + optionSaleAmt;
	let saleTax = itemSaleTax + shapeSaleTax + procSaleTax + bprocSaleTax + optionSaleTax;
	let purcAmt = itemPurcAmt + shapePurcAmt + procPurcAmt + bprocPurcAmt + optionPurcAmt;
	let purcTax = itemPurcTax + shapePurcTax + procPurcTax + bprocPurcTax + optionPurcTax;

	let dcAmt   = dcCalculation(saleAmt, data['dcUnit'], data['dcAmt']);
	let dcTax   = data['dcUnit'] === 'PC' ? dcCalculation(saleTax, data['dcUnit'], data['dcAmt']) : 0;

	result['itemPurcAmt'] = itemPurcAmt;
	result['itemPurcTax'] = itemPurcTax;
	result['itemSaleAmt'] = itemSaleAmt;
	result['itemSaleTax'] = itemSaleTax;

    /** 형상 옵션 금액 처리 */
	result['shapeSaleAmt'] = shapeSaleAmt;
	result['shapeSaleTax'] = shapeSaleTax;
	result['shapePurcAmt'] = shapePurcAmt;
	result['shapePurcTax'] = shapePurcTax;

    /** 상단 가공 금액 처리 */
	result['procSaleAmt'] = procSaleAmt;
	result['procSaleTax'] = procSaleTax;
	result['procPurcAmt'] = procPurcAmt;
	result['procPurcTax'] = procPurcTax;

    /** 하단 가공 금액 처리 */
	result['bprocSaleAmt'] = bprocSaleAmt;
	result['bprocSaleTax'] = bprocSaleTax;
	result['bprocPurcAmt'] = bprocPurcAmt;
	result['bprocPurcTax'] = bprocPurcTax;

    /** 일반 옵션 금액 처리 */
    result['optionSaleTax'] = optionList.reduce((amt, item) => amt + ( item.gb === 'N' && item.delYn === 'N' ?  Number(item.saleTax) : 0), 0);
	result['optionSaleAmt'] = optionList.reduce((amt, item) => amt + ( item.gb === 'N' && item.delYn === 'N' ?  Number(item.saleAmt) : 0), 0);
	result['optionPurcAmt'] = optionList.reduce((amt, item) => amt + ( item.gb === 'N' && item.delYn === 'N' ?  Number(item.purcAmt) : 0), 0);
	result['optionPurcTax'] = optionList.reduce((amt, item) => amt + ( item.gb === 'N' && item.delYn === 'N' ?  Number(item.purcTax) : 0), 0);

	//금액조정 금액
	result['dcAmt'] = dcAmt + dcTax;

	//회배
	result['cm'] = cm;
	result['totalPurcAmt'] = purcAmt;
	result['totalPurcTax'] = purcTax;
	result['totalSaleAmt'] = saleAmt + dcAmt;
	result['totalSaleTax'] = saleTax + dcTax;
    result['optionList']   = optionList;

	return result;
}

/**
 * @description 옵션 계산(미구현)
 * @author 김원명, @version 1.0, @last date 2023/10/06
 * @data = {
 *      gb          : '옵션구분', (P:상단가공 / B:하단가공 / S:형상 / N:일반)
 *      itemCd      : '옵션코드',
 *      itemNm      : '옵션명칭',
 *      icCd        : '하위코드',
 *      icNm        : '하위명칭',
 *      selSpec     : '금액조정단위',
 *      cnt         : '수량',
 *    	unit        : '옵션단위',
 *    	purcUnit    : '매입금액',
 *    	saleUnit    : '매출금액',
 *      delYn       : '삭제여부'
 * }
 * @return 계산된 옵션값
 * */
export function optionCalculation(data, n, cnt, vat, vmRate) 
{
	let result = {};

    result['gb']        = data['gb'];
    result['itemCd']    = data['itemCd'];
    result['itemNm']    = data['itemNm'];
    result['icCd']      = data['icCd'];
    result['icNm']      = data['icNm'];
    result['selSpec']   = data['selSpec'];
    result['cnt']       = cnt;
    result['saleUnit']  = data['saleUnit'];
    result['purcUnit']  = data['purcUnit'];
	result['purcAmt']   = Number(data['purcUnit']) * n | 0;
	result['purcTax']   = vat === 'Y' ? getVatRateAmt(Number(vmRate), (Number(data['purcUnit']) * n | 0)) : 0;
	result['saleAmt']   = Number(data['saleUnit']) * n | 0;
	result['saleTax']   = vat === 'Y' ? getVatRateAmt(Number(vmRate), (Number(data['saleUnit']) * n | 0)) : 0;
    result['delYn']     = data['delYn'];

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
	if(dcUnit !== "" && dcUnit !== 'N')
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

/**
 * @description 부가세율에 따른 부가세 금액 계산
 * @param  {number} vmRate - 부가세율 (정수, 예: 10이면 10%)
 * @param  {number} amt - 원금액
 * @return {number} 계산된 부가세 금액 (반올림 처리됨)
 */
export function getVatRateAmt(vmRate, amt)
{
	return Math.round(Number(amt) * (Number(vmRate) / 100));
}