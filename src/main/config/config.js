const config = {
    'path': process.env.VUE_APP_API_URL,
    'invoice_url': `${process.env.VUE_APP_API_URL}/api/v1/pdf`,
    'pos_invoice_css': `${process.env.VUE_APP_API_URL}/css/pos_invoice_css.css`,
    'verify_purchase_background': `${process.env.VUE_APP_API_URL}/images/verify_purchase_background.svg`,
    'login_background': `${process.env.VUE_APP_API_URL}/images/login_background.svg`,
    'category_sample_file': `${process.env.VUE_APP_API_URL}/images/sample_categories.csv`,
    'brand_sample_file': `${process.env.VUE_APP_API_URL}/images/sample_brands.csv`,
    'customer_sample_file': `${process.env.VUE_APP_API_URL}/images/sample_customers.csv`,
    'supplier_sample_file': `${process.env.VUE_APP_API_URL}/images/sample_suppliers.csv`,
    'perPage': 10,
    'product_name': "My Product",
    'product_version': "1.0.0",
    'modules': [],
    'installed_modules': [],
    'theme_mode': "light",
    'app_version': "1.0.0",
    'app_env': "local",
  };
  
  export default config;
  