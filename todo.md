**Back End**
1.)parse roster for graduated students - del graduated students

<!-- 2.)parse sessions - check dates for upcoming sessions to be used for session email reminders -->
<!-- 3.)parse roster - gather email addresses to generate weekly blast emails -->
<!-- 4.) Setup cron job for reminder emails -->
<!-- 5.) Setup cron job for blast emails -->
<!-- 6.) Calendly API integration to automatically update the sessions sheet -->

7.) try/catch error handling in the utils
8.) error handling for failed session creation/deletion after calendly hook
9.) setup bcc or cc to myself for copy of email confirmations
10.) Update sheetsUtils to utilize queries where possible
11.) add routes to handle more specific calls from the front end

**Front End**
1.)generate adp notes based on session info - this could be done from the front end as the data will already be displayed there
2.)embed and autofill for tutor survey
3.) copy student class code and student eval form to clipboard
4.) move filtering logic to the backend
**Future Features?**

**BUGS**
1.) tried everything I could possibly think of to get rid of the sheetUtils filter function and instead use a structured query. google doesnt like querying by email address.. I tried to url encode it and everything!!
