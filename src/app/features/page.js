"use client";
import {
  Container,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-emerald-200 via-teal-100 to-orange-100 flex items-center justify-center p-6">
      <Container maxWidth="md">
        <Box className="bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-10">
          <Typography
            variant="h4"
            className="text-center font-extrabold mb-8 text-emerald-700 tracking-wide"
          >
            🌟 All Features of Shortfy
          </Typography>

          <Divider className="mb-6" />

          <List className="space-y-6">
            {features.map((feature, index) => (
              <Box
                key={index}
                className="bg-white/40 p-5 rounded-xl shadow-md"
              >
                <ListItem disableGutters>
                  <ListItemIcon>
                    <CheckCircleIcon className="text-emerald-600" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        className="font-bold text-emerald-800"
                      >
                        {feature.title}
                      </Typography>
                    }
                  />
                </ListItem>
                <Typography className="text-gray-800 mt-2 whitespace-pre-line">
                  {feature.description}
                </Typography>
                <Typography className="mt-4 font-semibold text-emerald-700">
                  ✅ Benefit:
                </Typography>
                <Typography className="text-gray-800 whitespace-pre-line">
                  {feature.benefit}
                </Typography>
              </Box>
            ))}
          </List>
        </Box>
      </Container>
    </div>
  );
}

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
