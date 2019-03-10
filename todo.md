**Back End**

<!-- 1.)parse roster for graduated students - del graduated students** -->
<!-- 1a) still need to delete that shit! -->
<!-- 1b.)create congrats email list -->

<!-- 1c.) create congrats template and send that shit wih reminder of tutoring ending, -->

<!-- 2.)parse sessions - check dates for upcoming sessions to be used for session email reminders -->
<!-- 3.)parse roster - gather email addresses to generate weekly blast emails -->
<!-- 4.) Setup cron job for reminder emails -->
<!-- 5.) Setup cron job for blast emails -->
<!-- 6.) Calendly API integration to automatically update the sessions sheet -->

<!-- 7.) try/catch error handling in the utils -->

8.) error handling for failed session creation/deletion after calendly hook

<!-- 9.) setup bcc or cc to myself for copy of email confirmations -->

<!-- 10.) Update sheetsUtils to utilize queries where possible -->
<!-- 11.) add more robust routes to handle more specific calls from the front end -->

12.) email myself on mailer/sheets errors

<!-- 13.) rewrite 'getAllRows' as "getSessionData" -->

<!-- 14.) **_Figure out how to get calendly hooks to work with the wwwhisper auth system!_** -->

<!-- 15.) set no-show and b2b as false by default? -->
<!-- 16.) **_Figure out the best way to handle reoccurring sessions!_** -->

<!-- 17.) Set the session reminder email for a later time -->

<!-- 18.) Give all sessions a unique id - not just calendly - then the same delete function used on the calendly cancel hook should be able to be used for manually deleting from the front end -->

19.) change utils to named exports - export all of them from an index file
20.) generate new uniqid on auto reschedule

**Front End**

<!-- 1.)generate adp notes based on session info - this could be done from the front end as the data will already be displayed there -->

<!-- 2.)embed and autofill for tutor survey -->

<!-- 3.) copy student class code and student eval form to clipboard -->

<!-- 4.) move filtering logic to the backend -->

<!-- 5.) Make session cell editable & update google sheet -->

<!-- 6.) manually add to roster & session tables & update google sheet -->
<!-- 7.) Seperate roster and sessions editing -->

8.) add loaders
9.) table input validation - disable some fields?

<!-- 10.) **refactor error handling - remove handling from lifecycle methods** -->
<!-- 11.) move in line function calls from render into new method -->

12.) Pagination on all sessions table

<!-- 13.) save confirmation -->

<!-- 14.)**start building active session page** -->

<!-- 15.) **_Refactor table data show - add student session time and my session time_** -->

16.) Add Countdown Timer with start button and end button - blink tab when done??
17.)Figure out how to handle session ending - auto fill time-in/time-out if possible??
18.) the create session button should probably be using a new route to use the backend's sheetUtils.createSession as oppose to using sheetsUtils.update

<!-- 19.) Add ability to delete a session -->

20.) bring in react router and make active session its own page with its own state??
21.) Tab for tomorrow's sessions

<!-- 22.) Make everything look better! -->

23.) Should adp open on copy click?? or should that be a separate button??
24.) should adp notes and survey link show up after the session is done?? - should they be editable??
25.) can adp notes and survey be combined into one array??

<!-- 26.) fix embedded for styling.. again -->

27.) fix zoom link (\_blank)

\*\*Future Features?\*\*
1.) save cell edit after clicking/tabbing instead of having to hit enter.

<!-- 2.) tab between cells to edit if possible -->

**BUGS**
1.) tried everything I could possibly think of to get rid of the sheetUtils filter function and instead use a structured query. google doesnt like querying by email address.. I tried to url encode it and everything!!

<!-- 2.) A calendly event showed up in sheets one day ahead of the actual date.. could not recreate -->

3.) is adding 7 days to the auto reschedule completely reliable?
4.) need to figure out a way to handle auto rescheduling after a reoccurring meeting has a one-time reschedule
**\*\***5.) discard changes - broken in a few ways. if you add a new row and save it - then make a change and discard it - the new row will also disappear - something to do with the newRow flag. Also - editing a cell on an existing row and then discarding the change might also not be working properly
****\*****6.) mailer is currently fucked up
**\*\*\***87.) the calendly hook handler seems to insert new sessions on the next day for some reason.. might have to do with the moment js formatting and the server's local time... should probably work on localization of my times!**\*\*\*\***\*\*\***\*\*\*\***
