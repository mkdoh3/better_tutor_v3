# Tutor Tracker

Tutor Tracker is an open-source JavaScript app for Web that provides a simple, customizable UI for interacting with google sheets as a means of simplifying the TES Tutor workflow. The UI allows tutors to edit, sort, and add, and remove rows from the tutor tracking sheets. The tabbed interface allows user to quickly toggle between, today's sessions, tomorrow's sessions, the next 7 days, and all session in addition to viewing the roster. From the 'today' tab, tutor's can launch a simple UI for their active sessions. An active session displays a session timers, notes from the student's previous session, which topics they'd like to cover, clock out notes and more. The tutor evaluation form is also embedded and auto-filled with the appropriate information.

Login authentication is provided to protect all student's private information.

Tutor Tracker also provides an email automation solution that handles individual session reminders, weekly blasts,and graduation notices. Emails will contain all of the appropriate information; the student's name, session time in their timezone, zoom link, etc. Graduated students are automatically removed from the Roster tab and sent a congratulations. Student's that have reoccurring sessions scheduled will also have the following weeks session added to the sessions tab as the reminder e-mail is sent.

Additionally, Tutor Tracker implements POST routes that respond to Calendly web hooks, automatically adding or removing sessions from the sessions tab
after a Calendly events.

##### As a disclaimer before diving into the lengthy setup process - there is a monthly cost associated with hosting the app, \$26. Any ideas as to how to reduce that cost would be greatly appreciated!

## Installation Guide

---

This guide will assume that you have your own Tutor Tracking app deployed through Heroku and use of the Heroku CLI - a detailed deployment guide can be found [here](https://devcenter.heroku.com/articles/git).

You'll notice that this repository includes a env.text as a template for setting up your own .env file for local development. All of the environmental variable found in env.text will also have to be added to Heroku either via the dashboard or Heroku's CLI. More details on how to add and update variables on Heroku can be found [here](https://devcenter.heroku.com/articles/config-vars#managing-config-vars).

### **Google Service Account**

---

This is a 2-legged oauth method and designed to be "an account that belongs to your application instead of to an individual end user".
The service account is used for granting access from Tutor Tracker to your google sheet.
([read more](https://developers.google.com/identity/protocols/OAuth2ServiceAccount))

1. Go to the [Google Developers Console](https://console.developers.google.com/project)
2. Select your project or create a new one (and then select it)
3. Enable the Drive API for your project

- In the sidebar on the left, expand **APIs & auth** > **APIs**
- Search for "drive"
- Click on "Drive API"
- click the blue "Enable API" button

4. Create a service account for your project

- In the sidebar on the left, expand **APIs & auth** > **Credentials**
- Click blue "Add credentials" button
- Select the "Service account" option
- Select "Furnish a new private key" checkbox
- Select the "JSON" key type option
- Click blue "Create" button
- your JSON key file is generated and downloaded to your machine (**it is the only copy!**)
- note your service account's email address (also available in the JSON key file)

5. The credentials from your JSON key file can now be added to both your local .env and Heroku.
   **Note: When adding your private key to Heroku, it has to be added as a single continuous string. The new line characters (/n) have to be removed from the JSON generated from Google**

### **Setting Up Your Google Sheet**

---

See template here: [template](https://docs.google.com/spreadsheets/d/1IXOLfHJB_VJJHcV0SCqYzXaeZJ6Es-ZizHgO8ORFymY/edit?usp=sharing).

It's important that your sheet heading match the template exactly. Also note the format of dates, the exact same format must also be used ("YYYY-MM-DD"). There are some additional columns added for extra functionality inside of the app. 'student-tz' denotes a student's timezone and is used with in the e-mail reminder template.
'reoccurring' denotes whether or not a student has a fixed reoccurring session time. This field is used for automatic rebooking of sessions. 'row-id' is used internally when creating and deleting rows. Tutor Tracker will automatically generate unique ids to new rows, but it is highly recommended to manual apply a unique identifier for existing rows that may be edited or removed.

**Under share options, you'll have to share the tutor tracking sheet with your service account using the email noted from above.**

The additional 'Sessions-Sorted' tab makes viewing upcoming sessions easier. The 'Sessions' tab will have rows added out of ordered as the app responses to calendly events and also auto-books reoccurring sessions. The sorting function, `=sort(Sessions!A2:V, 6, TRUE, 10, TRUE)`, can be found in cell A2 of the 'Sessions Sorted' tab. Any direct editing should be done to the unsorted 'Sessions' tab!

**Once you sheet has been setup, your sheet ID can be added to both your .env and Heroku. The sheet ID can be found within the sheet's URL. It's the unique string between spreadsheets/d/...id/edit**

Interfacing with your spreadsheet made possible by the npm package google-spreadsheets, check out the official docs [here](https://www.npmjs.com/package/google-spreadsheets).

### **Configuring Gmail to work with nodemailer**

---

Email automation inside of Tutor Tracker is made possible by the npm package [nodemailer](https://www.npmjs.com/package/nodemailer).
In order for nodemailer to access your gmail account, the email address must be setup to allow access by 'less secure' applications. For this reason, it is high recommended that a new - Tutor Tracker gmail account, with a unique password is used.
The configuration details can be found [here](https://nodemailer.com/usage/using-gmail/).

**Your email address and password can then be added to both your .env and Heroku**

### **Setting Up Calendly and Subscribing to Webhooks**

---

Unfortunately Calendly requires a pro account (10/month) to enable subscribing to webhooks. It is completely possible for the application to work without them. While subscribed to webhooks, Tutor Tracker will automatically add and remove sessions to your sheet based on Calendly events. Topics to be covered will also be populated based on a student's response to the Calendly prompt given when the session is created.

If you wish to subscribe to calendly web hooks, upgrade to a pro account and then navigate to [integrations](https://calendly.com/integrations) to find your Calendly API key. Once you've got your key you can subscribe to calendly web hooks via the terminal.

In bash enter:
`curl --header "X-TOKEN: <your_calendly_api_key>" --data "url=https://blah.foo/api/sheets/hook" --data "events[]=invitee.created" --data "events[]=invitee.canceled" https://calendly.com/api/v1/hooks`

**Note: your url will be your hosted Heroku address and must be proceeded by /api/sheets/hook. If a Calendly post requests ever fails for some reason, you'll have to delete that hook subscription and resubscribe**

More info on Calendly web integration can be found [here](https://developer.calendly.com/).

### **Heroku add-ons**

---

1. #### wwwhisper

   wwwhisper is the Heroku addon responsible for handling login authorization. Documentation can be found [here]('https://devcenter.heroku.com/articles/wwwhisper').

   Like Calendly, and because of it - wwwhisper has to be provisioned as a 'team' account (9/month) to allow access to the api/sheets/hook POST route from an outside source. Again, this feature is not necessarily required. Though, if you use Calendly heavily for scheduling, it can be very worth while.
   The easiest way to set up wwwhisper is via the terminal. With the terminal open in the directory of your repository of the deployed application enter: `heroku addons:create wwwhisper:team --admin=your_tutoring_email`

   Provisioning wwwhisper will add the **herokuapp.com/wwwhisper/admin/** route.
   You can now navigate to the admin page, login with the email specified and configure the required access control.

   On the admin access control page, enter the path /api/sheets/hook - once added, in the 'enter an email to grant access' field add '\*'. Adding the asterisk will open that route up to the post requests from calendly

2. #### hobby dyno

Heroku will have to be configured to use their 'hobby' dyno (7/month). The upgraded dyno keeps your app spun up and running all of the time so that it can handle calendly hooks and send daily emails

### **Code updates**

---
