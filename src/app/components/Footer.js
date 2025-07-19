"use client";

import { Container, Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 bg-gradient-to-tr from-emerald-200 via-teal-100 to-orange-100 bg-transparent text-emerald-800">
      <Container maxWidth="md">
        <Box className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-medium">
          <Typography variant="body2" className="text-center sm:text-left">
            © {new Date().getFullYear()} Shortfy.xyz — All rights reserved.
          </Typography>

          <Box className="flex flex-wrap justify-center sm:justify-end gap-6 font-semibold">
            <Link href="/about" className="hover:text-emerald-600 hover:underline transition">About</Link>
            <Link href="/contact" className="hover:text-emerald-600 hover:underline transition">Contact</Link>
            <Link href="/terms-and-condition" className="hover:text-emerald-600 hover:underline transition">Terms & Condition</Link>
             <Link href="/privacy-policy" className="hover:text-emerald-600 hover:underline transition">Privacy</Link>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}
