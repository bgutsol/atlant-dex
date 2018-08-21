// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import serverErrors from './server-errors/en';
import widgetTitles from './widget-titles/en';

export default {
  copied: 'Copied',
  passwordValidation: {
    tooShort: 'Password must have at least {minLength} letters',
    notMatch: 'Passwords must be identical',
  },
  sent2FA: [
    'You were sent an email to confirm',
    'You were sent text message to confirm',
    'Please enter Google Auth code to confirm',
    'You were sent Telegram message to confirm',
  ],
  tfaConfirmTextTelegramEnable: 'Confirmation code has been sent via Telegram to enable 2FA',
  tfaConfirmTextTelegramDisable: 'Confirmation code has been sent via Telegram to disable 2FA',
  tfaConfirmTextSMSEnable: 'SMS with confirmation code has been sent to enable 2FA',
  tfaConfirmTextSMSDisable: 'SMS with confirmation code has been sent to disable 2FA',
  tfaConfirmTextGoogleEnable: 'Enter the one-time password from Google Auth to enable 2FA',
  tfaConfirmTextGoogleDisable: 'Enter the one-time password from Google Auth to disable 2FA',
  tfaSecureWarning: {
    text: 'Please, enable 2 factor authentication to protect your account',
    yesButton: 'OK, enable 2FA',
    noButton: 'No, thanks',
  },
  notifications: {
    loggedIn: 'You logged in with IP {0}',
    tfaEnabled: 'Two factor authentication on',
    tfaDisabled: 'Two factor authentication off',
    upgradeTier: 'You avalible balance is {0}. Please upgrade to the next verification tier',
    orderPlaced: 'New order #{0} placed',
    orderPartiallyFilledSell: 'Order #{0} partially filled: sold {1} {4} for {3} {2}',
    orderFilledSell: 'Order #{0} filled: sold {1} {4} for {3} {2}',
    orderPartiallyFilledBuy: 'Order #{0} partially filled: bought {1} {4} for {3} {2}',
    orderFilledBuy: 'Order #{0} filled: bought {1} {4} for {3} {2}',
  },
  crypto: {
    deposit: {
      deposit: 'Deposit',
      title: 'Your wallet address for deposit:',
      copy: 'Copy',
      description: 'Funds will be deposited automatically after 3 confirmations',
    },
    withdraw: {
      withdraw: 'WITHDRAW',
      placeholderAddress: 'wallet address',
      placeholderAmount: 'withdrawal amount (e.g. 0.5)',
      fee: 'Fee',
      text: 'Your will receive',
      button: 'Withdraw',
    },
  },
  emailSent: 'Email sent to {0}',
  serverErrors,
  widgetTitles,
  market: 'Market',
  limit: 'Limit',
  limit_price: 'Limit price',
  total_amount: 'Total amount',
  confirm_by_order: 'Confirm buy order',
  confirm_sell_order: 'Confirm sell order',
  negative_or_zero_value: 'Negative or zero value:',
  please_correct_the_value_provided: 'Please correct the value provided.',
  error: 'error',
  last_update: 'Last update',
  extended_info: 'Extended Info',
  price: 'Price',
  total: 'Total',
  side: 'Side',
  type: 'Type',
  current: 'Current',
  initial: 'Initial',
  status: 'Status',
  date: 'Date',
  show: 'Show',
  tokenised: 'Tokenised',
  volume_24h: 'Volume 24h',
  current_value: 'Current value',
  total_supply: 'Total Supply',
  contact_phone: 'Contact phone',
  change: 'Change',
  verify: 'Verify',
  save: 'Save',
  cancel: 'Cancel',
  no_results: 'No Results',
  back_to_dashboard: 'Back to dashboard',
  profile: 'Profile',
  page: 'Page',
  additional_email: 'Additional email',
  current_password: 'Current Password',
  old_password: 'Old password',
  new_password: 'New password',
  repeat_password: 'Repeat password',
  confirm: 'Confirm',
  show_passwords: 'Show passwords',
  via: 'via',
  i_would_like_to_use: 'I would like to use',
  my_phone_number: 'My phone number',
  send: 'Send',
  you_don_t_have_an_authentication_key: 'You don\'t have an authentication key.',
  create_key: 'Create key',
  please_install_one_generate_key: 'Please install one of the following apps to generate key',
  after_installing_the_app: 'After installing the app add the key by scanning the QR code or entering it manually.',
  now_scan_q_r_code_below: 'Now scan QR-code below',
  copyright: '© Atlant Inc., 2018',
  allert_list: 'ALLERT LIST',
  sort_by: 'Sort by',
  add: 'ADD',
  target: 'Target',
  price_for: 'price for',
  has: 'has',
  the_value_of: 'the value of',
  below: 'below',
  portfolio_value: 'Portfolio value',
  make_deposit: 'Make deposit',
  withdraw: 'Withdraw',
  new: 'NEW',
  current_quotes_s: 'CURRENT QUOTES’S',
  range: 'Range',
  market_cap: 'Market Cap',
  volume: 'Volume',
  the_operation_was_successfully_done: 'The operation was successfully done.',
  something_went_wrong_please_try_again: 'Something went wrong. Please try again.',
  we_couldn_t_find_any: 'We couldn’t find any',
  transaction_history: 'Transaction History',
  my_orders: 'My Orders',
  notification_history: 'Notification History',
  the_new_code_will_be_available_in: 'The new code will be available in',
  sec: 'sec',
  send_code: 'Send code',
  resend_confirmation_code: 'Resend | confirmation code',
  the_new_code_will_be_available_in: 'The new code will be available in',
  current_pair: 'Current pair',
};
// Confirmation code has been sent to enable 2FA
// Confirmation code has been sent to disable 2FA
