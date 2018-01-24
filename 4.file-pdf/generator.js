const generatorHeader = () => {
    return `
    <meta charset="utf8">
    <title>通知單</title>

    <style>
        html,
        body {
            margin: 0;
            padding: 0;
            font-family: 'Sackers Gothic Std';
            font-weight: 500;
            font-size: 10px;
            background: rgb(241, 241, 241);
            -webkit-print-color-adjust: exact;
            box-sizing: border-box;
        }
        
        .page-a4 {
            position: relative;
            height: 792px;
            width: 162mm;
            display: block;
            background: #CCCCCC;
            page-break-after: auto;
            margin: 0px;
            overflow: hidden;
        }
        
        @media print {
            body {
                background: black;
            }
            .page {
                margin: 0;
                height: 100%;
                width: 100%;
            }
        }
        
        .page.first {
            border-left: 5px solid green;
        }
        
        .top-left {
            position: absolute;
            background: white;
            height: 103mm;
            width: 79mm;
            left: 1mm;
            top: 1mm;
        }
        
        .top-right {
            position: absolute;
            background: white;
            height: 103mm;
            width: 79mm;
            right: 1mm;
            top: 1mm;
        }
        
        .bottom-left {
            position: absolute;
            background: white;
            height: 103mm;
            width: 79mm;
            left: 1mm;
            bottom: 1mm;
        }
        
        .bottom-right {
            position: absolute;
            background: white;
            height: 103mm;
            width: 79mm;
            right: 1mm;
            bottom: 1mm;
        }
        
        .title {
            position: relative;
            text-align: center;
        }
        
        .paragraph {
            position: relative;
            left: 2mm;
        }
        
        .group-checkbox {
            position: relative;
            left: 2mm;
        }
        
        .group-action-checkbox {
            margin-top: 10mm;
            position: relative;
            left: 2mm;
        }

        .tips {
            position: relative;
            top: 5mm;
            left: 2mm;
        }
        
        .action-checkbox {
            margin-top: 2mm;
        }
        
        .line {
            color: black;
            font-size: 12px;
        }
        
        .underline {
            text-decoration: underline;
        }
        
        .logo {
            position: relative;
            width: 80%;
            left: 10%;
            top: 15%;
        }
    </style>
    `
}

const GenBody = (params = {}) => {
    const { username, address, datetime, type, type_others, action } = params;
    let chk_type_post_office = undefined;
    let chk_type_home_delivery = undefined;
    let chk_type_deposit = undefined;
    let chk_type_others = undefined;
    let chk_type_others_frozen = undefined;
    let chk_type_others_cold = undefined;
    let chk_type_others_fragile = undefined;
    let chk_type_others_heavy = undefined;
    if (type === 'post_office') chk_type_post_office = 'checked';
    if (type === 'home_delivery') chk_type_home_delivery = 'checked';
    if (type === 'deposit') chk_type_deposit = 'checked';
    if (type === 'others') chk_type_others = 'checked';
    if (type_others === 'frozen') chk_type_others_frozen = 'checked';
    if (type_others === 'cold') chk_type_others_cold = 'checked';
    if (type_others === 'fragile') chk_type_others_fragile = 'checked';
    if (type_others === 'heavy') chk_type_others_heavy = 'checked';
    return `<h1 class="title">郵件包裹領取通知單</h1>
    <h3 class="paragraph line">收件人：<span>${username}</span></h3>
    <h3 class="paragraph line">地址：<span>${address}</span></h3>
    <h3 class="paragraph line">日期：<span>${datetime}</span></h3>
    <h3 class="paragraph line"><span class="underline">待領郵件</span>：</h3>
    <div class="group-checkbox line">
        <input type="checkbox" ${chk_type_post_office}><label>掛號</label>
        <input type="checkbox" ${chk_type_home_delivery}><label>宅配</label>
        <input type="checkbox" ${chk_type_deposit}><label>寄放</label>
        <input type="checkbox" ${chk_type_others}><label>其他</label>
        <span> ，計 ＿ 件</span>
    </div>
    <h3 class="paragraph line"><span class="underline">特殊備註</span>：</h3>
    <div class="group-checkbox line">
        <input type="checkbox" ${chk_type_others_cold}><label>冷藏</label>
        <input type="checkbox" ${chk_type_others_frozen}><label>冷凍</label>
        <input type="checkbox" ${chk_type_others_fragile}><label>易碎物品</label>
        <input type="checkbox" ${chk_type_others_heavy}><label>重物</label>
    </div>
    <div class="group-action-checkbox line">
        <div>
            <input type="checkbox"><label>請儘速至服務櫃檯領取。</label>
        </div>
        <div class="action-checkbox">
            <input type="checkbox"><label>已逾三日未領取，請儘速至服務櫃檯領取。</label>
        </div>
        <div class="action-checkbox">
            <input type="checkbox"><label>已逾七日未領取，請儘速至服務櫃檯領取。</label>
        </div>
    </div>
    <div class="tips">
        <h5 class="line">*使用窩福App更即時地獲知郵件詳細資訊</h5>
    </div>`
}

const TopLeftBody = (params = {}) => {
    return `<div class="top-left">` + GenBody(params) + `</div>`;
}

const TopRightBody = (params = {}) => {
    return `<div class="top-right">` + GenBody(params) + `</div>`;
}

const BottomLeftBody = (params = {}) => {
    return `<div class="bottom-left">` + GenBody(params) + `</div>`;
}

const BottomRightBody = (params = {}) => {
    return `<div class="bottom-right">` + GenBody(params) + `</div>`;
}

const generatorBody = (values = []) => {
    let body = `<div class="page-a4">`;
    if (values.length > 0) {
        body = body + TopLeftBody(values[0])
    }
    if (values.length > 1) {
        body = body + TopRightBody(values[1])
    }
    if (values.length > 2) {
        body = body + BottomLeftBody(values[2])
    }
    if (values.length > 3) {
        body = body + BottomRightBody(values[3])
    }
    return body + `</div>`
}

module.exports.Body = generatorBody;
module.exports.Header = generatorHeader;