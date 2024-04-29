"use server";

import { convertTimeToDate } from "@/lib/utils";
import getTodayDateAsString from "@/utils/getTodayDateAsString";

import { OauthAccessToken, auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createCalendarEvent = async () => {
  try {
    const { userId } = auth();

    const user = await clerkClient.users.getUserOauthAccessToken(
      userId!,
      "oauth_google"
    );

    const cal = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + user[0].token, // Access token for google
        },
      }
    );
    return cal.json();
  } catch (err) {
    console.error(err);
  }
};

export const insertNewCalendarEvent = async ({
  description,
  start,
  end,
}: {
  description: string;
  start: string;
  end: string;
}) => {
  try {
    console.log(description, start, end);

    const { userId } = auth();

    const user = await clerkClient.users.getUserOauthAccessToken(
      userId!,
      "oauth_google"
    );

    const cal = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/quickAdd?text=${encodeURIComponent(
        `${description} on ${start} - ${end}`
      )}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + user[0].token, // Access token for google
        },
      }
    );
    return cal.json();
  } catch (err) {
    console.error(err);
  }
};

export const updateEvent = async (
  event: {
    eventId: string;
    name: string;
    description: string;
    start: Date;
    end: Date;
  },
  priority: string | null,
  formData: FormData
) => {
  try {
    const { userId } = auth();

    const user = await clerkClient.users.getUserOauthAccessToken(
      userId!,
      "oauth_google"
    );

    const timeFrom = formData.get("fromTime");
    const hoursFrom = Number(timeFrom?.slice(0, -3));
    const minutesFrom = Number(timeFrom?.slice(-2));

    const dateFrom = new Date(event.start);
    dateFrom.setHours(hoursFrom, minutesFrom, 0, 0);

    dateFrom.setUTCHours(dateFrom.getUTCHours());
    const isoFormattedTimeFrom = dateFrom.toISOString();

    const timeTo = formData.get("toTime");
    const hoursTo = Number(timeTo?.slice(0, -3));
    const minutesTo = Number(timeTo?.slice(-2));

    const dateTo = new Date(event.start);
    dateTo.setHours(hoursTo, minutesTo, 0, 0);

    dateTo.setUTCHours(dateTo.getUTCHours());
    const isoFormattedTimeTo = dateTo.toISOString();

    const req = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${event.eventId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + user[0].token, // Access token for google
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start: {
            dateTime: isoFormattedTimeFrom,
          },
          end: {
            dateTime: isoFormattedTimeTo,
          },
          summary: formData.get("eventName"),
          description: JSON.stringify({ priority: priority }),
        }),
      }
    );

    revalidatePath("/dashboard");
    return req.json();
  } catch (err) {
    console.error(err);
  }
};

export const addEvent = async (
  date: Date | undefined,
  priority: string | null,
  formData: FormData
) => {
  try {
    const { userId } = auth();

    const user = await clerkClient.users.getUserOauthAccessToken(
      userId!,
      "oauth_google"
    );

    const eventName = formData.get("eventName");

    const fromTime = convertTimeToDate(formData.get("fromTime"), date!);
    const toTime = convertTimeToDate(formData.get("toTime"), date!);

    const day1 = new Date(fromTime);
    const newDay1 = day1.setDate(day1.getDate());
    const test1 = new Date(newDay1);
    const newHour1 = test1.setHours(test1.getHours() - 2);

    const day2 = new Date(toTime);
    const newDay2 = day2.setDate(day2.getDate());
    const test2 = new Date(newDay2);
    const newHour2 = test2.setHours(test2.getHours() - 2);

    const cal = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + user[0].token, // Access token for google
        },

        body: JSON.stringify({
          start: {
            dateTime: new Date(newHour1),
          },
          end: {
            dateTime: new Date(newHour2),
          },
          summary: eventName,
          description: JSON.stringify({ priority: priority }),
        }),
      }
    );
    revalidatePath("/dashboard");
    return;
  } catch (err) {
    console.error(err);
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    const { userId } = auth();

    const user = await clerkClient.users.getUserOauthAccessToken(
      userId!,
      "oauth_google"
    );

    await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + user[0].token, // Access token for google
        },
      }
    );

    revalidatePath("/dashboard");
    return;
  } catch (err) {
    console.error(err);
  }
};

export const listAllEvents = async () => {
  try {
    const { userId } = auth();

    const user = await clerkClient.users.getUserOauthAccessToken(
      userId!,
      "oauth_google"
    );

    await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + user[0].token, // Access token for google
        },
      }
    );

    revalidatePath("/dashboard");
    return;
  } catch (err) {
    console.error(err);
  }
};

export const searchPlace = async (formData: FormData) => {
  const location = formData.get("location");
  const requestBody = {
    textQuery: location,
  };
  const { userId } = auth();
  try {
    const user = await clerkClient.users.getUserOauthAccessToken(
      userId!,
      "oauth_google"
    );

    const res = await fetch(
      `https://places.googleapis.com/v1/places:searchText`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user[0].token,
          "X-Goog-User-Project": "850593846888",
          "X-Goog-FieldMask": "*",
        },
        body: JSON.stringify(requestBody),
      }
    );

    console.log(res);
    if (res.ok) {
      const data = await res.json();
      // Process the data as needed (e.g., extract relevant information)
      console.log("res data:", data);
    } else {
      console.error("Error fetching data:", res.statusText);
    }
  } catch (e) {
    console.error(e);
  }
};
