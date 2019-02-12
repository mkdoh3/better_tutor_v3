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
11.) add more robust routes to handle more specific calls from the front end
11.a) move filtering logic to the backend
12.) email myself on mailer/sheets errors

**Front End**
1.)generate adp notes based on session info - this could be done from the front end as the data will already be displayed there
2.)embed and autofill for tutor survey
3.) copy student class code and student eval form to clipboard
4.) move filtering logic to the backend

<!-- 5.) Make session cell editable & update google sheet -->

6.) manually add to roster & session tables & update google sheet
7.) Seperate roster and sessions editing
8.) add loaders
9.) table input validation - disable some fields?
10.) **refactor error handling - remove handling from lifecycle methods**
11.) move in line function calls from render into new method
12.) Pagination on all sessions table
13.) save confirmation
14.)**start building active session page**

\*\*Future Features?\*\*
1.) save cell edit after clicking/tabbing instead of having to hit enter.
2.) tab between cells to edit if possible

**BUGS**
1.) tried everything I could possibly think of to get rid of the sheetUtils filter function and instead use a structured query. google doesnt like querying by email address.. I tried to url encode it and everything!!
