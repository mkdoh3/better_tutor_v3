const moment = require("moment");
const body = {
  event: "invitee.created",
  time: "2018-03-14T19:16:01Z",
  payload: {
    event_type: {
      uuid: "CCCCCCCCCCCCCCCC",
      kind: "One-on-One",
      slug: "event_type_name",
      name: "Event Type Name",
      duration: 15,
      owner: {
        type: "users",
        uuid: "DDDDDDDDDDDDDDDD"
      }
    },
    event: {
      uuid: "BBBBBBBBBBBBBBBB",
      assigned_to: ["Jane Sample Data"],
      extended_assigned_to: [
        {
          name: "Jane Sample Data",
          email: "user@example.com",
          primary: false
        }
      ],
      start_time: "2018-03-14T12:00:00Z",
      start_time_pretty: "12:00pm - Wednesday, March 14, 2018",
      invitee_start_time: "2018-03-14T12:00:00Z",
      invitee_start_time_pretty: "12:00pm - Wednesday, March 14, 2018",
      end_time: "2018-03-14T12:15:00Z",
      end_time_pretty: "12:15pm - Wednesday, March 14, 2018",
      invitee_end_time: "2018-03-14T12:15:00Z",
      invitee_end_time_pretty: "12:15pm - Wednesday, March 14, 2018",
      created_at: "2018-03-14T00:00:00Z",
      location: "The Coffee Shop",
      canceled: false,
      canceler_name: null,
      cancel_reason: null,
      canceled_at: null
    },
    invitee: {
      uuid: "AAAAAAAAAAAAAAAA",
      first_name: "Joe",
      last_name: "Sample Data",
      name: "Joe Sample Data",
      email: "not.a.real.email@example.com",
      text_reminder_number: "+14045551234",
      timezone: "UTC",
      created_at: "2018-03-14T00:00:00Z",
      is_reschedule: false,
      payments: [
        {
          id: "ch_AAAAAAAAAAAAAAAAAAAAAAAA",
          provider: "stripe",
          amount: 1234.56,
          currency: "USD",
          terms: "sample terms of payment (up to 1,024 characters)",
          successful: true
        }
      ],
      canceled: false,
      canceler_name: null,
      cancel_reason: null,
      canceled_at: null
    },
    questions_and_answers: [
      {
        question: "Skype ID",
        answer: "fake_skype_id"
      },
      {
        question: "Facebook ID",
        answer: "fake_facebook_id"
      },
      {
        question: "Twitter ID",
        answer: "fake_twitter_id"
      },
      {
        question: "Google ID",
        answer: "fake_google_id"
      }
    ],
    questions_and_responses: {
      "1_question":
        "What would you like to discuss during our meeting? Please be as detailed as possible.",
      "1_response": "stuff!"
    },
    tracking: {
      utm_campaign: null,
      utm_source: null,
      utm_medium: null,
      utm_content: null,
      utm_term: null,
      salesforce_uuid: null
    },
    old_event: null,
    old_invitee: null,
    new_event: null,
    new_invitee: null
  }
};
