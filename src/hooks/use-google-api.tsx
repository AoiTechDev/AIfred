import { currentUserOauthAccessToken } from "@/utils/google-calendar";
import { useAuth, useUser } from "@clerk/nextjs";
import { User, auth, currentUser } from "@clerk/nextjs/server";
import { useEffect, useState } from "react";

export const useGoogleApi = () => {
  const [userAuthToken, setUserAuthToken] = useState("");
  const [userID, setUserID] = useState<User | null>(null)
  useEffect(() => {
    currentUserOauthAccessToken(userID?.id).then((t) => {
      console.log("asdasd", t);
    });
  }, [userID?.id]);

  return {
    userAuthToken, setUserID, userID
  };
};
