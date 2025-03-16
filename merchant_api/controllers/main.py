import json
from odoo import http
from odoo.http import request

class MerchantAPI(http.Controller):

    # ------
    # ROUTES
    # ------

    @http.route("/api/merchant/create", type="json", methods=['POST'], auth="public")
    def generate_merchant(self):
        try:
            data = json.loads(request.httprequest.data)
            merchant = request.env['pos.merchant'].sudo().create(data)
            return json.dumps({'status': f'Merchant Created Merchant with ID {merchant.merchant_id} Successfully'}), 200
        except Exception as e:
            return json.dumps({'error': str(e)}), 400

    @http.route('/api/merchant/<string:merchant_id>', type="http", methods=['GET'], auth="public", cors="*")
    def fetch_merchant_data(self, merchant_id):
        merchant = request.env['pos.merchant'].sudo().search([('merchant_id', '=', merchant_id)])
        if merchant:
            return json.dumps(merchant.read(['merchant_id', 'merchant_name', 'phone', 'business_type', 'email', ])[0])
        return json.dumps({'Error': f'Sorry, could not fetch merchant with id {merchant_id}'})

    @http.route('/api/merchant/transactions', methods=['GET', 'POST'], type='http', auth='public', csrf=False, cors="*")
    def fetch_merchant_transactions(self, **args):
        merchant_id = args.get('merchant_id')
        if merchant_id:
            merchant = request.env['pos.merchant'].sudo().search(
                [('merchant_id', '=', merchant_id)])
            transactions = request.env['pos.payment'].sudo().search(
                [('pos_order_id.partner_id', '=', merchant.partner_id.id)]
            )
            if transactions:
                 # print('DATA')
                 return json.dumps(transactions.read(['id', 'session_id', 'amount', 'payment_method_id', 'pos_order_id']))
            return json.dumps({'Error': f'Sorry, No transactions found for Merchant {merchant_id}'})