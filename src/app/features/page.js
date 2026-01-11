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
    description:
      "Users can create an account to manage and track all their shortened URLs in one dashboard.",
    benefit: "Personalized experience and saved link history.",
  },
  {
    title: "🔗 Custom Short Links",
    description:
      "Create branded and memorable short URLs like shortfy.xyz/yourname.",
    benefit: "Better branding and higher click-through rate.",
  },
  {
    title: "📦 Bulk URL Shortener",
    description:
      "Shorten multiple URLs at once by pasting a list or uploading a CSV file.",
    benefit: "Saves time for marketers and agencies.",
  },
  {
    title: "📊 Advanced Link Analytics",
    description:
      "Track total clicks, countries, devices, and browser details in real time.",
    benefit: "Helps optimize marketing strategies.",
  },
  {
    title: "📱 QR Code Generation",
    description:
      "Every short URL comes with a downloadable QR code for offline sharing.",
    benefit: "Perfect for posters, flyers, and print media.",
  },
  {
    title: "🛡️ Short URL Safety Checker",
    description:
      "Preview where a short link redirects before opening it.",
    benefit: "Protects users from phishing and malicious links.",
  },
  {
    title: "🚀 Fast & Free",
    description:
      "Shortfy is completely free with no hidden charges or limitations.",
    benefit: "Encourages adoption and sharing.",
  },
  {
    title: "🎯 Authenticated Dashboard",
    description:
      "Logged-in users can view, search, and manage all their links.",
    benefit: "Centralized and efficient link management.",
  },
  {
    title: "💡 Smart Custom Code Validation",
    description:
      "Prevents restricted or unsafe shortcodes during link creation.",
    benefit: "Reduces errors and improves user experience.",
  },
];
