export interface FaqItem {
  question: string;
  answer: string;
}

export const faqSections = {
  main: [
    {
      question: "what is in process?",
      answer:
        "<strong>in process</strong> is a Web3-native platform for documenting and monetizing the <strong>creative journey</strong>—not just the final product. Artists, builders, and creatives can upload their work-in-progress (writing, music, visuals, links, embeds or video) and mint it onchain to a collective timeline.\n\n\nIt's a <strong>living archive</strong> of artistic evolution, where your community, fans and patrons can collect, comment, and support work as it unfolds.",
    },
    {
      question: "what makes in process different?",
      answer:
        "    • Focus on process, not polish\n    • Permanent, onchain documentation\n    • Monetization of in-progress work\n    • Decentralized, artist-owned timelines\n    • Support for both Web2 and Web3 users\n    • Cross-platform embedding of content (onchain + offchain)",
    },
    {
      question: "what kind of content can i post?",
      answer:
        "You can upload any part of your creative process:\n    • Journals, notes, poetry\n    • Demos, drafts, audio clips\n    • Sketches, moodboards, visuals\n    • Behind-the-scenes footage, vlogs\n    • External links + embeds (YouTube, NFTs, Instagram, Google Docs, etc.)",
    },
    {
      question: "can i date my posts?",
      answer:
        "Yes! Every post on In Process can be:\n    • <strong>Backdated</strong> (e.g., a sketch from 2021)\n    • <strong>Future-dated</strong> (e.g., a concept for a 2026 project)\n    • <strong>Time-stamped</strong> to the present\n\nThis makes your timeline <strong>a true reflection of your creative journey</strong>, no matter the order of when things are uploaded.",
    },
    {
      question: "what is the collective timeline?",
      answer:
        "The Collective Timeline is a shared feed where everyone's onchain creative process lives side-by-side. It's a decentralized, living archive of artistic culture across disciplines and styles.\n\nYour personal timeline feeds into the Collective Timeline (unless you choose to hide posts).",
    },
  ],
  additional: [
    {
      question: "how does monetization work?",
      answer:
        "    • Set a price per post (in crypto or USD)\n    • Collectors pay to own and support your process\n    • Proceeds go directly to your wallet",
    },
    {
      question: "do i need to know web3 to use this?",
      answer:
        "Nope. In Process is built with <strong>Privy onboarding</strong>, which means:\n\n    • You can log in using your email\n    • You don't need a wallet to get started\n    • You'll gain access to onchain features without friction\n\nIt's designed for <strong>both web2 and web3 creatives</strong>.",
    },
    {
      question: "who is in process for?",
      answer:
        "    • Artists (music, visual, literary, film)\n    • Builders and developers\n    • Web2 creatives transitioning into web3\n    • Fans, patrons and explorers who want to support artistic journeys and culture",
    },
    {
      question: "can i embed or link off-platform content?",
      answer:
        "Yes! In Process supports:\n    • Onchain content (NFTs, token links, DAOs)\n    • Offchain content (YouTube, Substack, Instagram, Google Docs)\n\nThis makes your timeline a hub for everything you create, no matter where it lives.",
    },
  ],
  final: [
    {
      question: "what tech powers in process?",
      answer:
        "    • <strong>base</strong> – fast, affordable l2 blockchain\n    • <strong>zora protocol</strong> – for minting and managing posts\n    • <strong>next.js & vercel</strong> – smooth mobile-first ux\n    • <strong>privy</strong> – web2 login with web3 access\n    • <strong>crypto + card payments</strong> – for collectors everywhere",
    },
    {
      question: "how do i join?",
      answer: "",
    },
  ],
  community: [
    {
      question: "looking for community?",
      answer: "connect with us on social\n     • x\n\n     • farcaster",
    },
  ],
};
