const ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = ENV === 'production';

module.exports = {
    ENV,
    IS_PRODUCTION
}
