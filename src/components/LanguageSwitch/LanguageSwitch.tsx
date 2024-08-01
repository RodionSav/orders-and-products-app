"use client"; // Ensure this is a client component

import { Box, Button } from "@chakra-ui/react";

export default function LanguageSwitch() {
  // Function to change language by setting a cookie
  const changeLanguage = (newLocale: string) => {
//     Cookies.set("locale", newLocale); // Set the cookie on the client side
  };

  return (
    <Box ml={4}>
      <Button onClick={() => changeLanguage("en")}>English</Button>
      <Button onClick={() => changeLanguage("ru")} ml={2}>
        Русский
      </Button>
    </Box>
  );
}
