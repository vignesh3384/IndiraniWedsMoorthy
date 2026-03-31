// ===================================
// WEDDING CONFIGURATION FILE
// Edit this file to customize your wedding website
// ===================================

export const weddingConfig = {
  // Couple Information
  couple: {
    groom: {
      name: "Dinesh",
      nameTamil: "தினேஷ்",
      fullName: "Dinesh Velu",
      fullNameTamil: "தினேஷ் வேலு",
      parents: "Mr. & Mrs. Velu",
      parentsTamil: "திரு. & திருமதி. வேலு",
    },
    bride: {
      name: "Santhiya",
      nameTamil: "சந்தியா",
      fullName: "Santhiya Balakrishanan",
      fullNameTamil: "சந்தியா பாலகிருஷ்ணன்",
      parents: "Mr. & Mrs. Balakrishanan",
      parentsTamil: "திரு. & திருமதி. பாலகிருஷ்ணன்",
    },
  },

  // Wedding Date (YYYY, MM-1, DD, HH, MM) - Month is 0-indexed
  weddingDate: new Date(2026, 3, 20, 6, 0), // June 15, 2026 at 9:00 AM

  // Tagline
  tagline: "Together with their families",
  taglineTamil: "குடும்பத்தினருடன் சேர்ந்து",

  // Events
  events: [
    {
      id: "reception",
      title: "Reception",
      titleTamil: "வரவேற்பு",
      date: "April 19, 2026",
      dateTamil: "ஏப்ரல் 19, 2026",
      time: "6:00 PM - 10:00 PM",
      timeTamil: "மாலை 6:00 - இரவு 10:00",
      venue: "R. G. Sakthi Mahal",
      venueTamil: "ஆர். ஜி. சக்தி மஹால்",
      address: "45, Govinda Swamy St, Polur, Tamil Nadu 606803",
      addressTamil: "45, கோவிந்த சுவாமி தெரு, போலூர், தமிழ்நாடு 606803",
      description: "Join us for an evening of celebration, music, and dance",
      descriptionTamil: "கொண்டாட்டம், இசை மற்றும் நடனத்தின் ஒரு மாலை எங்களுடன் இணையுங்கள்",
      mapUrl: "https://maps.app.goo.gl/FhWCET5JoYqqUcW56",
    },
    {
      id: "wedding",
      title: "Wedding Ceremony",
      titleTamil: "திருமண நிகழ்ச்சி",
      date: "April 20, 2026",
      dateTamil: "ஏப்ரல் 20, 2026",
      time: "Muhurtam: 6:00 AM - 7:30 AM",
      timeTamil: "முகூர்த்தம்: காலை 6:00 - காலை 7:30",
      venue: "R. G. Sakthi Mahal",
      venueTamil: "ஆர். ஜி. சக்தி மஹால்",
      address: "45, Govinda Swamy St, Polur, Tamil Nadu 606803",
      addressTamil: "45, கோவிந்த சுவாமி தெரு, போலூர், தமிழ்நாடு 606803",
      description: "The auspicious wedding ceremony with traditional Tamil rituals",
      descriptionTamil: "பாரம்பரிய தமிழ் சடங்குகளுடன் மங்கலகரமான திருமண விழா",
      mapUrl: "https://maps.app.goo.gl/FhWCET5JoYqqUcW56",
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
  gallery: [
    { id: 1, src: "/gallery/center_image.png", alt: "Couple central portrait" },
    { id: 2, src: "/gallery/download.png", alt: "Watercolor exact couple portrait" },
    { id: 3, src: "/gallery/sketch.png", alt: "Pencil sketch couple portrait" },
    { id: 4, src: "/gallery/anime.png", alt: "Anime style couple portrait" },
    { id: 5, src: "/gallery/popart.png", alt: "Pop art style couple portrait" },
  ],

  // Venue Details
  venue: {
    name: "R. G. Sakthi Mahal",
    nameTamil: "ஆர். ஜி. சக்தி மஹால்",
    address: "45, Govinda Swamy St, Polur, Tamil Nadu 606803",
    addressTamil: "45, கோவிந்த சுவாமி தெரு, போலூர், தமிழ்நாடு 606803",
    phone: "+91 90804 74078",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3895.031594035164!2d79.11864746350793!3d12.51406486659244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bacd947e0777e07%3A0x2db6446f5e573435!2sR.%20G.%20Sakthi%20Mahal!5e0!3m2!1sen!2sin!4v1774328261935!5m2!1sen!2sin",
    coordinates: {
      lat: 13.0827,
      lng: 80.2707,
    },
    directions: [
      "From Polur Bustand: 1 km (approximately 10 minutes walk)",
      "From Polur market: 400 m (approximately 3 minutes walk)",
      "Landmark: Backside Dinesh House",
    ],
    directionsTamil: [
      "போலூர் பேருந்து நிலையத்திலிருந்து: 1 கி.மீ (சுமார் 10 நிமிட நடைப்பயணம்)",
      "போலூர் சந்தையிலிருந்து: 400 மீ (சுமார் 3 நிமிட நடைப்பயணம்)",
      "அடையாள இடம்: தினேஷ் வீட்டின் பின்புறம்",
    ],
  },

  // Contact Information
  contacts: [
    {
      name: "Dinesh (Groom)",
      nameTamil: "தினேஷ் (மணமகன்)",
      phone: "+91 9080474078",
      whatsapp: "+919080474078",
    },
    {
      name: "Naveen (Bride's Brother)",
      nameTamil: "நவீன் (மணமகளின் சகோதரர்)",
      phone: "+91 9042334388",
      whatsapp: "+919042334388",
    },
  ],

  // Social Media (optional)
  social: {
    instagram: "https://www.instagram.com/m_a_s_s__d_i_n_e_s_h/",
    //facebook: "",
    hashtag: "#DineshWedsSanthiya",
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
