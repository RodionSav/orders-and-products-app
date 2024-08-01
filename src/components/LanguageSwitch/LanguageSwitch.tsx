'use server';

// Ensure this is a client component
import { Box, Button } from "@chakra-ui/react";
import { cookies } from "next/headers";
import { setLanguage } from "../features/languageSlice";
import { useAppDispatch } from "@/redux/hooks";
import * as languageActions from '../features/languageSlice';
import { redirect } from "next/navigation";


export default async function LanguageSwitch(newLocale: string) {

  cookies().set("locale", newLocale);
  redirect('/');

}
