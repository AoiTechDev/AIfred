"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const assistantUpdateEvent = async (
  event: {
    id: string;
    summary: string;
    start: Date;
    end: Date;
  },
  newDescription?: string,
  newStart?: string,
  newEnd?: string
) => {
  try {
    const { userId } = auth();

    const user = await clerkClient.users.getUserOauthAccessToken(
      userId!,
      "oauth_google"
    );

    const isoFormattedTimeFrom = newStart
      ? new Date(newStart).toISOString()
      : event.start;
    const isoFormattedTimeTo = newEnd
      ? new Date(newEnd).toISOString()
      : event.end;

    const req = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${event.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + user[0].token, // Access token for google
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start: isoFormattedTimeFrom,
          end: isoFormattedTimeTo,
          summary: newDescription ? newDescription : event.summary,
        }),
      }
    );

    return req.json();
  } catch (err) {
    console.error(err);
  }
};

export const assistantInsertNewCalendarEvent = async (parameters: {
  description: string;
  start: string;
  end?: string;
}) => {
  try {
    const { userId } = auth();

    const user = await clerkClient.users.getUserOauthAccessToken(
      userId!,
      "oauth_google"
    );

    const startDate = new Date(parameters.start);
    const endDate = parameters.end
      ? new Date(parameters.end)
      : new Date(startDate.getTime() + 60 * 60 * 1000);

    const cal = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + user[0].token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start: { dateTime: startDate.toISOString() },
          end: { dateTime: endDate.toISOString() },
          summary: parameters.description,
        }),
      }
    );

    return await cal.json();
  } catch (err) {
    console.error(err);
  }
};

export const assistantDeleteEvent = async (event: {
  id: string;
  summary: string;
  start: Date;
  end: Date;
}) => {
  try {
    const { userId } = auth();

    const user = await clerkClient.users.getUserOauthAccessToken(
      userId!,
      "oauth_google"
    );

    await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${event.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + user[0].token, // Access token for google
        },
      }
    );

    return "Successfully deleted";
  } catch (err) {
    console.error(err);
  }
};
