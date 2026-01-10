




"use client";

import { Container, Box, Typography } from "@mui/material";
import Link from "next/link";
import Head from "next/head";
import { Github, Linkedin, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Schema.org Structured Data */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Shortfy",
              url: "https://shortfy.xyz",
              logo: "https://shortfy.xyz/favicon.ico",
              sameAs: [
                "https://github.com",
                "https://twitter.com",
                "https://linkedin.com",
              ],
            }),
          }}
        />
      </Head>

      <footer className="mt-auto py-10 bg-white dark:bg-[#0A1A2F] text-[#0A1A2F] dark:text-white border-t border-gray-200 dark:border-gray-700">
        <Container maxWidth="md">
          <Box className="flex flex-col gap-6">
            {/* Top Row */}
            <Box className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
              <Typography
                variant="body2"
                className="text-center sm:text-left text-[#0A1A2F] dark:text-white"
              >
                © {new Date().getFullYear()} Shortfy.xyz — All rights reserved.
              </Typography>

              {/* Social Icons */}
              <Box className="flex gap-4">
                <SocialIcon href="https://github.com" label="GitHub">
                  <Github size={18} />
                </SocialIcon>
                <SocialIcon href="https://twitter.com" label="Twitter">
                  <Twitter size={18} />
                </SocialIcon>
                <SocialIcon href="https://linkedin.com" label="LinkedIn">
                  <Linkedin size={18} />
                </SocialIcon>
              </Box>
            </Box>

            {/* Links */}
            <Box className="flex flex-wrap justify-center sm:justify-between gap-6 text-sm">
              <Box className="flex flex-wrap gap-5">
                <FooterLink href="/about" active={isActive("/about")}>
                  About
                </FooterLink>
                <FooterLink href="/contact" active={isActive("/contact")}>
                  Contact
                </FooterLink>
                <FooterLink
                  href="/terms-and-condition"
                  active={isActive("/terms-and-condition")}
                >
                  Terms
                </FooterLink>
                <FooterLink
                  href="/privacy-policy"
                  active={isActive("/privacy-policy")}
                >
                  Privacy
                </FooterLink>
                <FooterLink href="/blog" active={isActive("/blog")}>
                  Blogs
                </FooterLink>
              </Box>

              <Box className="flex gap-5">
                <FooterLink href="/" active={isActive("/")}>
                  Home
                </FooterLink>
                <FooterLink href="/features" active={isActive("/features")}>
                  Features
                </FooterLink>
                <FooterLink
                  href="/shorturlcheck"
                  active={isActive("/shorturlcheck")}
                >
                  URL Check
                </FooterLink>
              </Box>
            </Box>
          </Box>
        </Container>
      </footer>
    </>
  );
}

/* Footer Link */
function FooterLink({ href, active, children }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`transition-colors ${
        active
          ? "text-[#0A1A2F] dark:text-white font-medium underline"
          : "text-slate-600 dark:text-slate-400 hover:text-[#0A1A2F] dark:hover:text-white hover:underline"
      }`}
    >
      {children}
    </Link>
  );
}

/* Social Icon */
function SocialIcon({ href, children, label }) {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      className="text-slate-500 dark:text-slate-400 hover:text-[#0A1A2F] dark:hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}
