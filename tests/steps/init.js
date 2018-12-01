let initialized = false;

const init = async () => {
    if (initialized) {
        return
    }

    process.env.restaurants_api   = "https://1tz6miu631.execute-api.eu-west-1.amazonaws.com/dev/restaurants";
    process.env.restaurants_table = "restaurants-dev-tomjo";
    process.env.restaurants_notification_topic = "restaurants-dev-tomjo";
    process.env.AWS_REGION        = "eu-west-1";

    initialized = true
};

module.exports = {
    init
};