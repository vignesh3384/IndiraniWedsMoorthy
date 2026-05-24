// ===================================
// WEDDING CONFIGURATION FILE
// Edit this file to customize your wedding website
// ===================================

export const weddingConfig = {
  // Couple Information
  couple: {
    groom: {
      name: "A.Narayana Moorthy",
      nameTamil: "ஆ.நாராயண மூர்த்தி",
      fullName: "A.Narayana Moorthy",
      fullNameTamil: "ஆ.நாராயண மூர்த்தி",
      parents: "Mr. & Mrs. N.Arumugam & A.Selvi",
      parentsTamil: "திரு. & திருமதி. நா.ஆறுமுகம் & ஆ.செல்வி",
    },
    bride: {
      nname: "G.Indirani",
      nameTamil: "கோ.இந்திராணி",
      fullName: "G.Indirani",
      fullNameTamil: "கோ.இந்திராணி",
      parents: "Mr. & Mrs. GopalaKrishnan & Nagamuthu",
      parentsTamil: "திரு. & திருமதி. S.கோபாலகிருஷ்ணன் & G.நாகமுத்து",
    },
  },

  // Wedding Date (YYYY, MM-1, DD, HH, MM) - Month is 0-indexed
  weddingDate: new Date(2026, 5, 17, 9, 0), // June 17, 2026 at 9:00 AM

  // Tagline
  tagline: "Together with their families",
  taglineTamil: "குடும்பத்தினருடன் சேர்ந்து",

  // Events
  events: [
    {
      id: "wedding",
      title: "Wedding Ceremony",
      titleTamil: "திருமண நிகழ்ச்சி",
      date: "June 17",
      dateTamil: "ஜூன் 17",
      time: "9:00 AM - 10:00 AM",
      timeTamil: "காலை 9:00 - காலை 10:00",
      venue: "Bajanai Mandabam",
      venueTamil: "பஜனை மண்டபம்",
      address: "East Car St, Tiruchendur, Tamil Nadu 628215",
      addressTamil: "கிழக்கு ரத வீதி, திருச்செந்தூர், தமிழ்நாடு 628215",
      description: "The auspicious wedding ceremony with traditional Tamil rituals",
      descriptionTamil: "பாரம்பரிய தமிழ் சடங்குகளுடன் மங்கலகரமான திருமண விழா",
      mapUrl: "https://maps.app.goo.gl/YzvgMTYvyKedsDLx8",
    },
    {
      id: "reception",
      title: "Reception",
      titleTamil: "வரவேற்பு",
      date: "June 21",
      dateTamil: "ஜூன் 21",
      time: "6:00 PM onwards",
      timeTamil: "மாலை 6:00 மணி முதல்",
      venue: "Sri Padma Ram Ganesh Mahal (Sri Ganapathy Hall)",
      venueTamil: "ஸ்ரீ பத்மா ராம் கணேஷ் மஹால் (ஸ்ரீ கணபதி ஹால்)",
      address: "Dr Rajendra Prasad Rd, Nehru Nagar, Chromepet, Chennai, Tamil Nadu 600044",
      addressTamil: "டாக்டர் ராஜேந்திர பிரசாத் சாலை, நேரு நகர், குரோம்பேட்டை, சென்னை, தமிழ்நாடு 600044",
      description: "Join us for an evening of celebration, music, and dance",
      descriptionTamil: "கொண்டாட்டம், இசை மற்றும் நடனத்தின் ஒரு மாலை எங்களுடன் இணையுங்கள்",
      mapUrl: "https://maps.app.goo.gl/3jQVparTj1QNqbR47",
    },
  ],

  // Our Story Timeline
  story: [
    {
      year: "2020",
      title: "First Meeting",
      titleTamil: "முதல் சந்திப்பு",
      description: "We first met at a mutual friend's wedding in Chennai. Little did we know that this chance encounter would change our lives forever.",
      descriptionTamil: "நாங்கள் முதலில் சென்னையில் ஒரு பொதுவான நண்பரின் திருமணத்தில் சந்தித்தோம்.",
    },
    {
      year: "2021",
      title: "First Date",
      titleTamil: "முதல் டேட்",
      description: "After months of phone calls and messages, we finally went on our first official date at Marina Beach.",
      descriptionTamil: "பல மாதங்கள் தொலைபேசி அழைப்புகள் மற்றும் செய்திகளுக்குப் பிறகு, நாங்கள் மெரினா கடற்கரையில் எங்கள் முதல் அதிகாரப்பூர்வ டேட்டிற்குச் சென்றோம்.",
    },
    {
      year: "2023",
      title: "The Proposal",
      titleTamil: "திருமண முன்மொழிவு",
      description: "On a beautiful evening at the Kapaleeshwarar Temple, surrounded by the divine atmosphere, Arjun proposed to Priya.",
      descriptionTamil: "கபாலீஸ்வரர் கோவிலில் ஒரு அழகான மாலையில், தெய்வீக சூழலால் சூழப்பட்டு, அர்ஜுன் பிரியாவிடம் திருமண முன்மொழிவு செய்தார்.",
    },
    {
      year: "2026",
      title: "Forever Begins",
      titleTamil: "எப்போதும் தொடங்குகிறது",
      description: "We are excited to begin our journey together and can't wait to celebrate with all our loved ones.",
      descriptionTamil: "நாங்கள் ஒன்றாக எங்கள் பயணத்தைத் தொடங்க உற்சாகமாக இருக்கிறோம்.",
    },
  ],

  // Gallery Images
  gallery: [],

  // Venue Details
  venues: [
    {
      id: "wedding",
      name: "Bajanai Mandabam",
      nameTamil: "பஜனை மண்டபம்",
      address: "East Car St, Tiruchendur, Tamil Nadu 628215",
      addressTamil: "கிழக்கு ரத வீதி, திருச்செந்தூர், தமிழ்நாடு 628215",
      mapEmbedUrl: "https://maps.google.com/maps?q=Bajanai%20Mandabam,%20East%20Car%20St,%20Tiruchendur,%20Tamil%20Nadu%20628215&t=&z=15&ie=UTF8&iwloc=&output=embed",
      mapUrl: "https://maps.app.goo.gl/YzvgMTYvyKedsDLx8",
    },
    {
      id: "reception",
      name: "Sri Padma Ram Ganesh Mahal (Sri Ganapathy Hall)",
      nameTamil: "ஸ்ரீ பத்மா ராம் கணேஷ் மஹால் (ஸ்ரீ கணபதி ஹால்)",
      address: "Dr Rajendra Prasad Rd, Nehru Nagar, Chromepet, Chennai, Tamil Nadu 600044",
      addressTamil: "டாக்டர் ராஜேந்திர பிரசாத் சாலை, நேரு நகர், குரோம்பேட்டை, சென்னை, தமிழ்நாடு 600044",
      mapEmbedUrl: "https://maps.google.com/maps?q=Sri%20Padma%20Ram%20Ganesh%20Mahal,%20Nehru%20Nagar,%20Chromepet,%20Chennai,%20Tamil%20Nadu%20600044&t=&z=15&ie=UTF8&iwloc=&output=embed",
      mapUrl: "https://maps.app.goo.gl/3jQVparTj1QNqbR47",
    },
  ],

  // Contact Information
  contacts: [
    {
      name: "Narayana Moorthy (Groom)",
      nameTamil: "ஆ.நாராயண மூர்த்தி (மணமகன்)",
      phone: "+91 9551611562",
      whatsapp: "+919551611562",
    },
  ],

  // Social Media (optional)
  social: {
    instagram: "https://www.instagram.com/narayanamoorthy29/",
    //facebook: "",
    hashtag: "#NarayanaMoorthyWedsIndirani",
  },

  // Background Music (optional)
  music: {
    enabled: true,
    src: "/music/anbilavan.mp3",
    title: "Anbil-Avan OST",
  },

  // Theme Colors (for reference, actual colors are in globals.css)
  theme: {
    primary: "maroon",
    secondary: "gold",
    background: "cream",
  },
};

export type WeddingConfig = typeof weddingConfig;
