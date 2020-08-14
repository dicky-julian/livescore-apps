const webPush = require('web-push');
const endpoint = 'https://fcm.googleapis.com/fcm/send/fBnrH9bt590:APA91bECrXmP9TcpLghQ1vyCtWJKHNxKWB6CojYcgESS-c9pIa_dVbJXl2Ydg54tcXdX-49CUjjWrSsPS2bxuD3V_SWqXkC4eNAP3MDhRS0mA6GH3AZOOXNoj5gLVIxxr1zvjKghrsZy';
const keys = {
   p256dh : "BHfjTZjuMyGgSfXXRRRWXu5e9fqlnBxD71TRvjs1oJnrr6iPG97W8kMVQubAqTMA5QH3W8+2NDg65P3yzSXHH9w=",
   auth : "chzW6oLdLnvgl3oulSdqFA=="
}



const vapidKeys = {
   'publicKey': 'BF3C5MMeazn35QrCvu8zGtUTlCeEviB7ulql2NkQeVHJSxGuf5pBhmk6JgQ-p_Bb7yxAJZVbCy31Rk5nN_oObdQ',
   'privateKey': 'C9q-wwFIwZVcflqTIBBSaDxt0PFsgrxikFUZwBhWYk0'
};
 
 
webPush.setVapidDetails(
   'mailto:julian18.ech@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": endpoint,
   "keys": {
       "p256dh": keys.p256dh,
       "auth": keys.auth
   }
};
const payload = 'Great welcome from Live Score! We will send newest football score just for you!';
 
const options = {
   gcmAPIKey: '730746835214',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);