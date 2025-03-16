from odoo import _, api, fields, models


class ResPartner(models.Model):
    _name = 'pos.merchant'

    merchant_name = fields.Char(string='Name', required=True)
    partner_id = fields.Many2one('res.partner')
    merchant_id = fields.Char('Merchant ID', readonly=True)
    business_type = fields.Selection([
        ('b2b', 'B2B'),
        ('b2c', 'B2C'),
    ], string="Business Type")
    location = fields.Char(string='City', required=True)
    email = fields.Char(string='Email', required=True)
    phone = fields.Char(string='Phone', required=True)
    payment_preference = fields.Selection([
        ('bank', 'Bank'),
        ('cash', 'Cash'),
        ('mobile', 'Mobile'),
        ('card', 'Card'),
    ], string="Payment Reference")

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            vals['merchant_id'] = self.env['ir.sequence'].next_by_code(
                'pos.merchant') or _('New')
        return super().create(vals_list)

