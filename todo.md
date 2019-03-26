**Back End**

1.) better error handling
2.) error handling for failed session creation/deletion after calendly hook
3.) email myself on mailer/sheets errors
4.) migrate everything to async/await

**Front End**

1.) \***\* need to figure out a way to handle auto rescheduling after a reoccurring meeting has a one-time reschedule \*\***
2.) the create session button should probably be using a new route to use the backend's sheetUtils.createSession as oppose to using sheetsUtils.update
3.) change confirm to modal
4.) migrate everything to async/await
5.) remove any remaining inline styling from components
6.) add indication that tables are sortable

**Future Features?**

1.) table input validation - disable some fields?
2.) Pagination on all sessions table
3.) column toggle tabs
4.) bring in react router and make active session its own page with its own state?
5.) tab between cells to edit if possible
6.) Should the checkboxes on the SessionEnd modal actually do something?? Like, disable the end button until they're checked?
7.) Find a way to mark a session as completed and hide it from today's sessions?

**BUGS**

1.) find more bugs
