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
  const featureRefs = useRef([]); // refs for auto-scroll

  const handleChange = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Filter features based on search
  const filteredFeatures = features.filter(
    (feature) =>
      feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.benefit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-scroll to first matching feature
  useEffect(() => {
    if (searchTerm && filteredFeatures.length > 0) {
      const firstIndex = features.indexOf(filteredFeatures[0]);
      const ref = featureRefs.current[firstIndex];
      if (ref) {
        ref.scrollIntoView({ behavior: "smooth", block: "center" });
        setExpandedIndex(firstIndex); // open the first match
      }
    }
  }, [searchTerm]);

  // Highlight matched text with subtle animation
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
    <div className="min-h-screen bg-gradient-to-tr from-white via-gray-100 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex justify-center p-6 transition-colors duration-500">
      <Container maxWidth="md">
        <Box className="bg-white dark:bg-gray-900 shadow-lg rounded-3xl p-8 md:p-10 transition-colors duration-500">
          <Typography
            variant="h4"
            className="text-center font-extrabold mb-6 text-navy dark:text-cyan-400 tracking-wide"
          >
            🌟 All Features of Shortfy
          </Typography>

          {/* Sticky Search Bar */}
          <Box className="mb-6 sticky top-0 z-10 bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-gray-800 rounded-lg"
              InputProps={{
                className: "text-gray-800 dark:text-gray-200",
              }}
            />
          </Box>

          <Divider className="mb-6 border-gray-300 dark:border-gray-600" />

          <Box className="space-y-4">
            {filteredFeatures.length > 0 ? (
              filteredFeatures.map((feature, index) => {
                const originalIndex = features.indexOf(feature); // original index for ref
                return (
                  <Accordion
                    key={originalIndex}
                    expanded={expandedIndex === originalIndex}
                    onChange={() => handleChange(originalIndex)}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                    ref={(el) => (featureRefs.current[originalIndex] = el)}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          className={`transition-transform duration-300 ${
                            expandedIndex === originalIndex
                              ? "text-cyan-400 dark:text-cyan-300 rotate-180"
                              : "text-navy dark:text-cyan-400"
                          }`}
                        />
                      }
                      aria-controls={`panel${originalIndex}-content`}
                      id={`panel${originalIndex}-header`}
                      className="px-5 py-3"
                    >
                      <CheckCircleIcon
                        className={`mr-3 transition-colors duration-300 ${
                          expandedIndex === originalIndex
                            ? "text-cyan-400 dark:text-cyan-300"
                            : "text-navy dark:text-cyan-400"
                        }`}
                      />
                      <Typography
                        className={`font-bold transition-colors duration-300 ${
                          expandedIndex === originalIndex
                            ? "text-cyan-400 dark:text-cyan-300"
                            : "text-navy dark:text-cyan-300"
                        }`}
                      >
                        {highlightText(feature.title)}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="px-5 pb-4">
                      <Typography className="text-gray-800 dark:text-gray-200 whitespace-pre-line mb-3 transition-colors duration-300">
                        {highlightText(feature.description)}
                      </Typography>
                      <Typography className="font-semibold text-navy dark:text-cyan-300 transition-colors duration-300">
                        ✅ Benefit:
                      </Typography>
                      <Typography className="text-gray-800 dark:text-gray-200 whitespace-pre-line transition-colors duration-300">
                        {highlightText(feature.benefit)}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })
            ) : (
              <Typography className="text-center text-gray-500 dark:text-gray-400 mt-4">
                No features found.
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

// Tailwind animation (add in globals.css or tailwind config)
/*
.animate-fadeHighlight {
  @apply transition duration-500 ease-in-out;
  animation: fadeHighlight 1.2s ease-in-out;
}
@keyframes fadeHighlight {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
*/

// Features Data
const features = [
  {
    title: "🔐 1. Signup / Signin System",
    description: `Users can create an account to manage their shortened links.
Logged-in users get access to personal dashboards.
Allows saving, editing, and tracking all URLs in one place.`,
    benefit: `Builds user trust and long-term engagement.
Enables personalized analytics and dashboard experience.`
  },
  {
    title: "🔗 2. Custom Short Links",
    description: `Users can create branded, memorable short URLs by setting their own shortcode.
Perfect for sharing on social media, business cards, or marketing campaigns.`,
    benefit: `Increases trust and click-through rates.
Enhances user control and branding potential.`
  },
  {
    title: "📦 3. Bulk URL Shortener",
    description: `Users can shorten multiple URLs at once.
Just paste a list of long URLs or Upload CSV File and Shortfy will generate all short links instantly.
Perfect for marketers, agencies, and large campaigns.`,
    benefit: `Saves a huge amount of time.
Ideal for bulk marketing, SEO campaigns, and link management at scale.`
  },
  {
    title: "📊 4. Advanced Link Analytics",
    description: `Get real-time insights for every link, including:
• Total Clicks
• Visitor Countries
• Device Type (mobile, tablet, desktop)
• Browser Details`,
    benefit: `Lets users understand their audience better.
Great for marketing analysis and strategy optimization.`
  },
  {
    title: "📱 5. QR Code Generation",
    description: `Each shortened URL comes with a downloadable QR code.
Ideal for posters, flyers, menus, and offline campaigns.`,
    benefit: `Easily share links offline.
Convenient for businesses and event organizers.`
  },
  {
    title: "🛡️ 6. Short URL Safety Checker",
    description: `Users can check any Shortfy URL to see where it redirects before visiting.
Helps prevent phishing, spam, or harmful redirections.`,
    benefit: `Builds trust with users.
Encourages safer link sharing and clicking.`
  },
  {
    title: "🚀 7. Fast & Free for All",
    description: `Shortfy is completely free to use.
No hidden charges, no premium walls — just fast and simple link shortening.`,
    benefit: `Attracts users with powerful free features.
Encourages growth and sharing.`
  },
  {
    title: "🎯 8. Authenticated Link Dashboard",
    description: `Users who sign in can view all their created URLs.
Filter, search, and analyze your links anytime from your dashboard.`,
    benefit: `Centralized link management.
Saves time and improves productivity.`
  },
  {
    title: "💡 9. Smart Custom Code Validation",
    description: `Our system prevents users from choosing restricted shortcodes (like 6 or 7 characters).
Ensures each custom shortcode is safe and usable.`,
    benefit: `Reduces errors and frustration.
Improves user experience during link creation.`
  }
];
