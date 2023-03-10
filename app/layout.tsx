import Sidebar from "../components/Sidebar";
import { SessionProvider } from "../components/SessionProvider";
import "../styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import ClientProvider from "../components/ClientProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex ">
              {/* <Sidebar />  */}
              <div className="sticky sm:static bg-[#202123] max-w-xs h-max  overflow-y-auto md:min-w-[15rem]">
                <Sidebar />
              </div>

              {/* <ClientProvider  - Notification/>  */}
              <ClientProvider />

              <div className="bg-[#343541] flex-1 overflow-y-auto">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
