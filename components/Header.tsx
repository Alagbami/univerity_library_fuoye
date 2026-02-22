"use server";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

async function handleLogout() {
  "use server";
  await signOut();
}

const Header = () => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/fuoye.jpg" alt="logo" width={40} height={40} />
      </Link>

      <div className="flex items-center gap-5">
        <div>
        <ul className="flex flex-row items-center gap-8">
          <li>
            <form action={handleLogout} className="">
              <Button>Logout</Button>
            </form>
          </li>
        </ul>
        </div>
        <div className="w-10 h-10 bg-gray-300">
        <Link href="/my-profile">
          <Image src="/icons/user.svg" alt="user profile" width={40} height={40} />
        </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
