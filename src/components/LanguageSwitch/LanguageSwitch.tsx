'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function LanguageSwitch(newLocale: string) {

  cookies().set("locale", newLocale);
  redirect('/');

}
