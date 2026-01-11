"use client";
import { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function FeaturesPage() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const featureRefs = useRef([]);

  const handleChange = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFeatures = features.filter(
    (feature) =>
      feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.benefit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (searchTerm && filteredFeatures.length > 0) {
      const firstIndex = features.indexOf(filteredFeatures[0]);
      const ref = featureRefs.current[firstIndex];
      if (ref) {
        ref.scrollIntoView({ behavior: "smooth", block: "center" });
        setExpandedIndex(firstIndex);
      }
    }
  }, [searchTerm]);

  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span
          key={i}
          className="bg-yellow-300 dark:bg-yellow-600 rounded px-1 animate-fadeHighlight"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className="min-h-screen flex justify-center p-6 transition-colors duration-500
      bg-gradient-to-tr from-white via-gray-100 to-slate-100
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
      style={{
        colorScheme: "light dark",
        WebkitTextSizeAdjust: "100%",
      }}
    >
      <Container maxWidth="md">
        <Box className="bg-white dark:bg-gray-900 shadow-lg rounded-3xl p-8 md:p-10 transition-colors duration-500">
          <Typography
            variant="h4"
            className="text-center font-extrabold mb-6 text-navy dark:text-cyan-400 tracking-wide"
          >
            🌟 All Features of Shortfy
          </Typography>

          {/* Sticky Search */}
          <Box className="mb-6 sticky top-0 z-10 bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                input: { color: "inherit" },
                fieldset: { borderColor: "rgba(0,0,0,0.2)" },
              }}
            />
          </Box>

          <Divider className="mb-6 border-gray-300 dark:border-gray-600" />

          <Box className="space-y-4">
            {filteredFeatures.length > 0 ? (
              filteredFeatures.map((feature) => {
                const originalIndex = features.indexOf(feature);
                return (
                  <Accordion
                    key={originalIndex}
                    expanded={expandedIndex === originalIndex}
                    onChange={() => handleChange(originalIndex)}
                    ref={(el) =>
                      (featureRefs.current[originalIndex] = el)
                    }
                    sx={{
                      backgroundColor: "inherit",
                      color: "inherit",
                    }}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          className={`transition-transform duration-300 ${
                            expandedIndex === originalIndex
                              ? "text-cyan-400 rotate-180"
                              : "text-navy dark:text-cyan-400"
                          }`}
                        />
                      }
                      className="px-5 py-3"
                    >
                      <CheckCircleIcon
                        className={`mr-3 ${
                          expandedIndex === originalIndex
                            ? "text-cyan-400"
                            : "text-navy dark:text-cyan-400"
                        }`}
                      />
                      <Typography className="font-bold">
                        {highlightText(feature.title)}
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails className="px-5 pb-4">
                      <Typography className="mb-3 whitespace-pre-line">
                        {highlightText(feature.description)}
                      </Typography>
                      <Typography className="font-semibold text-navy dark:text-cyan-300">
                        ✅ Benefit:
                      </Typography>
                      <Typography className="whitespace-pre-line">
                        {highlightText(feature.benefit)}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })
            ) : (
              <Typography className="text-center text-gray-500 mt-4">
                No features found.
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

/* Features Data */
const features = [
  {
    title: "🔐 1. Signup / Signin System",
    description: `Users can create an account to manage their shortened links.
Logged-in users get access to personal dashboards.`,
    benefit: `Builds user trust and engagement.`,
  },
  {
    title: "🔗 2. Custom Short Links",
    description: `Create branded, memorable short URLs.`,
    benefit: `Improves branding and CTR.`,
  },
  {
    title: "📦 3. Bulk URL Shortener",
    description: `Shorten multiple URLs at once.`,
    benefit: `Saves time for marketers.`,
  },
  {
    title: "📊 4. Advanced Link Analytics",
    description: `Clicks, country, device, browser tracking.`,
    benefit: `Better marketing decisions.`,
  },
  {
    title: "📱 5. QR Code Generation",
    description: `QR codes for every short link.`,
    benefit: `Offline sharing made easy.`,
  },
  {
    title: "🛡️ 6. Short URL Safety Checker",
    description: `Preview destination before visit.`,
    benefit: `Prevents phishing.`,
  },
  {
    title: "🚀 7. Fast & Free",
    description: `Completely free URL shortening.`,
    benefit: `User growth.`,
  },
  {
    title: "🎯 8. Authenticated Dashboard",
    description: `Manage all URLs in one place.`,
    benefit: `Productivity boost.`,
  },
  {
    title: "💡 9. Smart Code Validation",
    description: `Restricted shortcode prevention.`,
    benefit: `Better UX.`,
  },
];
