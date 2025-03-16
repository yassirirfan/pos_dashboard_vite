# -*- coding: utf-8 -*-
{
    'name': 'Merchant API',
    'version': '18.0.1.0.0',
    'summary': '.',
    'description': """
    """,
    'author': 'Yassir Irfan',
    'category': 'Tools',
    'depends': ['base', 'point_of_sale'],
    'data': [
        'security/ir.model.access.csv',
        'data/pos_merchant_data.xml',
        # 'views/merchant_api_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            # '/merchant_api/static/src/js/merchant_dashboard.js',
            '/merchant_api/static/src/css/dashboard.css',
            # '/merchant_api/static/src/xml/merchant_dashboard.xml',
        ]
    },
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
