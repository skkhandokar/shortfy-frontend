"use client";

import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function FeaturesPage() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFeatures = features.filter(
    (feature) =>
      feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.benefit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    /* 🔒 pt-24 prevents navbar overlap */
    <div className="min-h-screen pt-24 md:pt-28 bg-gradient-to-tr from-white via-gray-100 to-slate-100">
      <Container maxWidth="md">
        <Box className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 md:p-10">
          {/* Title */}
          <Typography
            variant="h4"
            className="text-center font-extrabold mb-6 text-[#0A1A2F]"
          >
            🌟 All Features of Shortfy
          </Typography>

          {/* Search */}
          <TextField
            fullWidth
            placeholder="Search features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6"
          />

          <Divider className="mb-6" />

          {/* Features */}
          <Box className="space-y-3">
            {filteredFeatures.length > 0 ? (
              filteredFeatures.map((feature, index) => (
                <Accordion
                  key={index}
                  expanded={expandedIndex === index}
                  onChange={() => handleChange(index)}
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#171717",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <CheckCircleIcon className="mr-3 text-[#0A1A2F]" />
                    <Typography className="font-semibold">
                      {feature.title}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography className="mb-2">
                      {feature.description}
                    </Typography>

                    <Typography className="font-semibold mt-2">
                      ✅ Benefit:
                    </Typography>
                    <Typography>{feature.benefit}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <Typography className="text-center text-gray-500 mt-6">
                No features found.
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

/* =========================
   FEATURES DATA
   ========================= */

const features = [
 {
    title: "🔐 Signup / Signin System",
    description: `Users can create an account to manage their shortened links.
Logged-in users get access to personal dashboards.
Allows saving, editing, and tracking all URLs in one place.`,
    benefit: `Builds user trust and long-term engagement.
Enables personalized analytics and dashboard experience.`
  },
  {
    title: "🔗  Custom Short Links",
    description: `Users can create branded, memorable short URLs by setting their own shortcode.
Perfect for sharing on social media, business cards, or marketing campaigns.`,
    benefit: `Increases trust and click-through rates.
Enhances user control and branding potential.`
  },
  
  {
    title: "📦 Bulk URL Shortener",
    description: `Shorten multiple URLs at once by pasting a list or uploading a CSV file.`,
    benefit: `Saves time for marketers and agencies.`
  },

  {
    title: "📊 Advanced Link Analytics",
    description: `Get real-time insights for every link, including:
• Total Clicks
• Visitor Countries
• Device Type (mobile, tablet, desktop)
• Browser Details`,
    benefit: `Lets users understand their audience better.
Great for marketing analysis and strategy optimization.`
  },
  {
    title: "📱 QR Code Generation",
    description: `Each shortened URL comes with a downloadable QR code.
Ideal for posters, flyers, menus, and offline campaigns.`,
    benefit: `Easily share links offline.
Convenient for businesses and event organizers.`
  },
  {
    title: "🛡️ Short URL Safety Checker",
    description: `Users can check any Shortfy URL to see where it redirects before visiting.
Helps prevent phishing, spam, or harmful redirections.`,
    benefit: `Builds trust with users.
Encourages safer link sharing and clicking.`
  },
  {
    title: "🚀 Fast & Free",
    description: `Shortfy is completely free to use.
No hidden charges, no premium walls — just fast and simple link shortening.`,
    benefit: `Attracts users with powerful free features.
Encourages growth and sharing.`
  },
  {
    title: "🎯 Authenticated Dashboard",
    description: `Users who sign in can view all their created URLs.
Filter, search, and analyze your links anytime from your dashboard.`,
    benefit: `Centralized link management.
Saves time and improves productivity.`
  },
  {
    title: "💡 Smart Custom Code Validation",
    description: `Our system prevents users from choosing restricted shortcodes (like 6 or 7 characters).
Ensures each custom shortcode is safe and usable.`,
    benefit: `Reduces errors and frustration.
Improves user experience during link creation.`
  }
];
