const googleCreds = {
  type: process.env.GOOGLE_SERVICE_ACCT_TYPE,
  project_id: process.env.GOOGLE_SERVICE_ACCT_PROJECT_ID,
  private_key_id: process.env.GOOGLE_SERVICE_ACCT_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_SERVICE_ACCT_PRIVATE_KEY,
  client_email: process.env.GOOGLE_SERVICE_ACCT_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_SERVICE_ACCT_CLIENT_ID,
  auth_uri: process.env.GOOGLE_SERVICE_ACCT_AUTH_URI,
  token_uri: process.env.GOOGLE_SERVICE_ACCT_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_SERVICE_ACCT_PROV_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_SERVICE_ACCT_CLIENT_CERT_URL
};

module.exports = googleCreds;
