import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function currentUserOauthAccessToken(currentUserId?: string) {

  if (!currentUserId) {
    return;
  }
  return await clerkClient.users.getUserOauthAccessToken(
    currentUserId,
    "oauth_google"
  );
}
