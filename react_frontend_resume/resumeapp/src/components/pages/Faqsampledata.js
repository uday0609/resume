// src/data/data.js

export const sampleCategories = ['General', 'Billing', 'Technical', 'Account'];

export const sampleFaqs = {
  General: ['what_is_this', 'how_to_signup'],
  Billing: ['how_to_pay', 'is_there_trial'],
  Technical: ['why_slow', 'supported_browsers'],
  Account: ['change_email', 'delete_account']
};

export const sampleAnswers = {
  what_is_this: [
    `This platform is designed to help professionals streamline their workflow and manage projects more effectively.

It offers tools like task management, file sharing, real-time collaboration, and analytics — all in one place.

Whether you're a freelancer or part of a large team, this app adapts to your working style.`,

    `Our solution is cloud-based, secure, and scalable. Thousands of teams use it to simplify daily operations and increase productivity.

No setup is required — just sign up and start using it.`
  ],

  how_to_signup: [
    `To sign up, simply click the **Sign Up** button in the top-right corner of the homepage.

You can register using your email, or use Google or LinkedIn for instant access.

After registration, a verification link will be sent to your inbox. Click that to activate your account.`
  ],

  how_to_pay: [
    `We support multiple payment methods including:

- Credit/Debit cards (Visa, MasterCard, etc.)
- PayPal
- UPI and bank transfers (in select regions)

Payments are processed securely using Stripe. After payment, an invoice is emailed instantly.`
  ],

  is_there_trial: [
    `Yes! We offer a 14-day free trial with access to all premium features.

No credit card required. Just sign up and enjoy full functionality during the trial period.`
  ],

  why_slow: [
    `If you experience slowness, it could be due to:

- Your internet connection speed
- High load on our servers (rare but possible)
- Browser issues (try clearing cache or switching browsers)

If problems persist, please contact support.`
  ],

  supported_browsers: [
    `We recommend using the latest version of any of the following browsers:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

The app is fully responsive and works well on mobile browsers too.`
  ],

  change_email: [
    `To change your email:

1. Go to your Account Settings.
2. Click on "Edit Email".
3. Enter your new email address and save.
4. Verify your new email via the confirmation link sent to it.`
  ],

  delete_account: [
    `We're sorry to see you go! To delete your account:

1. Visit the Account Settings page.
2. Scroll down to the "Delete Account" section.
3. Confirm by entering your password.
4. Your account will be permanently deleted along with all data.`
  ]
};
