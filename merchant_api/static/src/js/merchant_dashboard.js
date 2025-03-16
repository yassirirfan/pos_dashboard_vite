/** @odoo-module **/

import { Component, useRef, onWillStart, useState, useEffect } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { rpc } from "@web/core/network/rpc";
import { registry } from "@web/core/registry";


export class MerchantDashboard extends Component {
     static template = "merchant_api.Dashboard";
     setup() {
//        this.state = useState({
//            merchant_transactions : []
//        })
//       useEffect(async () => {
//               this.state.merchant_transactions = await rpc(`/api/merchant/transactions?merchant_id=MNT00004`, {});
//                console.log('FETCH DATA', this.state.merchant_transactions )
//            },
//            () => []
//       );}
}

registry.category("actions").add("merchant_api.Dashboard", MerchantDashboard);
