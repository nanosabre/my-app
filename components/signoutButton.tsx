import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export default function SignOutButton() {
  const handleLogout = async () => {
    const clientId = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID;
    const logoutUri = process.env.NEXT_PUBLIC_SIGNOUT_URL as string;
    const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_REDIRECT;
    const cognitoLogoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    // 4. Sign out locally in NextAuth, then redirect straight to Cognito
    await signOut({
      callbackUrl: cognitoLogoutUrl,
    });

    await signOut();
  };

  return (
    <button onClick={handleLogout}>
      Sign Out
    </button>
  );
}