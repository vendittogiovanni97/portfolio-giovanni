export const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-giovanni-ebon.vercel.app",
  email: process.env.NEXT_PUBLIC_EMAIL || "vendittogiovanni97@hotmail.it",
  contactEmail: process.env.CONTACT_EMAIL || "vendittogiovanni97@hotmail.it",
  authorName: process.env.NEXT_PUBLIC_AUTHOR_NAME || "Giovanni Venditto",
  github: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "vendittogiovanni97",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_USERNAME || "giovanni-venditto-89b607325",
  twitter: process.env.NEXT_PUBLIC_TWITTER_USERNAME || "giovannivenditto",
  calendarUrl: process.env.NEXT_PUBLIC_CALENDAR_URL || "https://calendly.com/vendittogiovanni97/30min",
} as const;
