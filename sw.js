/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
const version = '7.59(beta)';
self.addEventListener('push', event => {
  const data = event.data.json();
  const get_language = () => {
      var lang = navigator.language || navigator.userLanguage || 'en';
      var language = lang.toString().toLowerCase()
      if(language.includes('-')){
      var ln = language.split('-')
          language = ln[0]
      }
      return language
  }
  const notification_data = {
    'en':{
      'e':'E5 Notification.',
      'mail':'You\'ve got new mail on e.',
      'mail-message':'You\'ve got a new mail-message on e.',
      'job-request-message':'You\'ve got a new message from a client on e.',
      'bill':'You\'ve received a new bill on e.',
      'job_application':'You\'ve received a new application for your job post on e.',
      'bag_application':'You\'ve received a new application to fulfil your bag on e.',
      'contractor_job_request':'You\'ve received a new job from a client in your contractor post on e.',
      'contractor_accept_job_request':'You\'re contractor job has been requested by your contractor on e.',
      'storefront_order':'You\'ve received a new order in your storefront on e.',
      'signature_request':'You\'ve received a new signature request to finalize your direct purchase on e.',
      'signature_response':'You\'ve received a response for your signature request from a client on e.',
      // 'read_receipts':'You\'re message on e has been opened and read.',
      'open_signature_request':'You\'ve received an open signature request on e.',
      'open_signature_response':'You\'ve received a response for your open signature request on e.',
      'call_invite':'You\'ve been invited to a call on e.',
      'ether_coin_request':'You\'ve received a request for some ether or coin on e.',
      'pre_purchase_request':'You\'ve received a pre-purchase request for some credits on e.',
      'direct_message':'You\'ve received a direct message on e.',
      'tags':'You\'ve been tagged in a comment on e.',
      'object_tags':'You\'ve been tagged in a post on e.',
      'mempool_notification':'You\'re set to receive a payment in a transaction from e in the mempool.',
      'default':'You have new notifications on e.'
    }
  }
  const notification_type = data['type']
  if(notification_type == 'typing' || notification_type == 'read_receipts') return;
  const body = notification_data[get_language()][notification_type] || notification_data[get_language()]['default']
  const options = {
      body: body,
      icon: '/app_icon.png',
  };
  self.registration.showNotification(notification_data[get_language()]['e'], options);
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const urlToOpen = '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(windowClients => {
        // Check if app is already open
        for (const client of windowClients) {
          if (client.url.includes(urlToOpen) && 'focus' in client) {
            return client.focus();
          }
        }

        // Otherwise open new tab / PWA
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});