"use client";

import Image from "next/image";

const FaqPage = () => {
  const faqData = [
    {
      question: "what is in process?",
      answer:
        "<strong>in process</strong> is a Web3-native platform for documenting and monetizing the <strong>creative journey</strong>—not just the final product. Artists, builders, and creatives can upload their work-in-progress (writing, music, visuals, links, embeds or video) and mint it onchain to a collective timeline.\n\n\nIt's a <strong>living archive</strong> of artistic evolution, where your community, fans and patrons can collect, comment, and support work as it unfolds.",
    },
    {
      question: "what makes in process different?",
      answer:
        "• Focus on process, not polish\n• Permanent, onchain documentation\n• Monetization of in-progress work\n• Decentralized, artist-owned timelines\n• Support for both Web2 and Web3 users\n• Cross-platform embedding of content (onchain + offchain)",
    },
    {
      question: "what kind of content can i post?",
      answer:
        "You can upload any part of your creative process:\n• Journals, notes, poetry\n• Demos, drafts, audio clips\n• Sketches, moodboards, visuals\n• Behind-the-scenes footage, vlogs\n• External links + embeds (YouTube, NFTs, Instagram, Google Docs, etc.)",
    },
    {
      question: "can i date my posts?",
      answer:
        "Yes! Every post on In Process can be:\n• <strong>Backdated</strong> (e.g., a sketch from 2021)\n• <strong>Future-dated</strong> (e.g., a concept for a 2026 project)\n• <strong>Time-stamped</strong> to the present\n\nThis makes your timeline <strong>a true reflection of your creative journey</strong>, no matter the order of when things are uploaded.",
    },
    {
      question: "what is the collective timeline?",
      answer:
        "The Collective Timeline is a shared feed where everyone's onchain creative process lives side-by-side. It's a decentralized, living archive of artistic culture across disciplines and styles.\n\nYour personal timeline feeds into the Collective Timeline (unless you choose to hide posts).",
    },
  ];

  const additionalFaqData = [
    {
      question: "how does monetization work?",
      answer:
        "• Set a price per post (in crypto or USD)\n• Collectors pay to own and support your process\n• Proceeds go directly to your wallet",
    },
    {
      question: "do i need to know web3 to use this?",
      answer:
        "Nope. In Process is built with <strong>Privy onboarding</strong>, which means:\n\n• You can log in using your email\n• You don't need a wallet to get started\n• You'll gain access to onchain features without friction\n\nIt's designed for <strong>both web2 and web3 creatives</strong>.",
    },
    {
      question: "who is in process for?",
      answer:
        "• Artists (music, visual, literary, film)\n• Builders and developers\n• Web2 creatives transitioning into web3\n• Fans, patrons and explorers who want to support artistic journeys and culture",
    },
    {
      question: "can i embed or link off-platform content?",
      answer:
        "Yes! In Process supports:\n• Onchain content (NFTs, token links, DAOs)\n• Offchain content (YouTube, Substack, Instagram, Google Docs)\n\nThis makes your timeline a hub for everything you create, no matter where it lives.",
    },
  ];

  const finalFaqData = [
    {
      question: "what tech powers in process?",
      answer:
        "• <strong>base</strong> – fast, affordable l2 blockchain\n• <strong>zora protocol</strong> – for minting and managing posts\n• <strong>next.js & vercel</strong> – smooth mobile-first ux\n• <strong>privy</strong> – web2 login with web3 access\n• <strong>crypto + card payments</strong> – for collectors everywhere",
    },
    {
      question: "how do i join?",
      answer: "",
    },
  ];

  const communityFaqData = [
    {
      question: "looking for community?",
      answer: "connect with us on social\n • x\n\n • farcaster",
    },
  ];

  return (
    <div className="relative pt-8 md:pt-16 flex justify-center grow w-full px-2 pb-[8%]  md:px-6">
      <div className="w-full max-w-full md:mx-20 px-4 md:px-20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 md:mb-16">
          <h1
            className="font-archivo lowercase relative z-[2] text-[24px] leading-[110%] md:text-[48px] md:leading-[100%]"
            style={{
              fontWeight: 500,
              letterSpacing: "-5%",
              color: "rgba(27, 21, 4, 1)",
            }}
          >
            in process: faq
          </h1>
          <div
            className="font-spectral italic lowercase text-left md:text-right mt-2 text-[16px] leading-[100%] md:text-[24px]"
            style={{
              fontWeight: 500,
              letterSpacing: "-5%",
              color: "rgba(78, 78, 78, 1)",
            }}
          >
            a collective seeking the creative artifact
          </div>
        </div>

        <div className="space-y-8 md:space-y-12">
          {faqData.map((faq, index) => (
            <div key={index} className="pb-6">
              <h2
                className="font-archivo-medium lowercase mb-4 text-[20px] leading-[110%] md:text-[36px] md:leading-[160%]"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-5%",
                  color: "rgba(27, 21, 4, 1)",
                }}
              >
                {faq.question}
              </h2>
              <div
                className="whitespace-pre-line lowercase max-w-4xl text-[14px] leading-[160%] md:text-[18px]"
                style={{
                  color: "rgba(27,21,4,1)",
                  lineHeight: "160%",
                  letterSpacing: "-5%",
                }}
              >
                {faq.answer.split("\n").map((line, lineIndex) => {
                  if (line.trim() === "") {
                    return <div key={lineIndex} className="mb-3"></div>;
                  }

                  return (
                    <div key={lineIndex} className="mb-1">
                      {line.startsWith("•") ? (
                        <span
                          className="font-spectral font-medium text-[14px] md:text-[18px]"
                          style={{
                            fontWeight: 400,
                            lineHeight: "160%",
                            letterSpacing: "-5%",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: line
                              .replace(
                                /<strong>/g,
                                '<strong style="font-family: Spectral; font-weight: 700; font-size: 14px; line-height: 160%; letter-spacing: -5%; text-transform: lowercase; color: rgba(27,21,4,1);" class="md:!text-[18px]">'
                              )
                              .replace(/<\/strong>/g, "</strong>"),
                          }}
                        />
                      ) : (
                        <span
                          className="font-spectral text-[14px] md:text-[18px]"
                          style={{
                            fontWeight: 400,
                            lineHeight: "160%",
                            letterSpacing: "-5%",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: line
                              .replace(
                                /<strong>/g,
                                '<strong style="font-family: Spectral; font-weight: 700; font-size: 14px; line-height: 160%; letter-spacing: -5%; text-transform: lowercase; color: rgba(27,21,4,1);" class="md:!text-[18px]">'
                              )
                              .replace(/<\/strong>/g, "</strong>"),
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 md:mt-18 px-1 md:px-2 space-y-8">
          <div className="flex flex-col 2xl:flex-row gap-4 2xl:gap-2 justify-start items-start">
            <div className="space-y-4 items-start w-full 2xl:w-1/2 2xl:max-w-none">
              <div className="flex justify-center md:justify-start">
                <Image
                  src="/faq1.png"
                  alt="Collective Timeline"
                  width={800}
                  height={500}
                  quality={100}
                  className="w-full h-auto rounded-sm -ml-2 md:-ml-5 object-contain"
                />
              </div>
              <p
                className="font-spectral text-grey-moss-500 italic lowercase text-[16px] leading-[100%] md:text-[24px] ml-2 md:ml-4 text-left"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-5%",
                }}
              >
                collective timeline
              </p>
            </div>
            <div className="space-y-4 items-start w-full 2xl:w-1/2 2xl:max-w-none">
              <div className="flex justify-center md:justify-start">
                <Image
                  src="/faq2.png"
                  alt="Personal Timeline"
                  width={800}
                  height={500}
                  quality={100}
                  className="w-full h-auto rounded-sm -ml-2 md:-ml-5 object-contain"
                />
              </div>
              <p
                className="font-spectral text-grey-moss-500 italic lowercase text-[16px] leading-[100%] md:text-[24px] ml-2 md:ml-4 text-left"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-5%",
                }}
              >
                personal timeline
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-18 space-y-8 md:space-y-12">
          {additionalFaqData.map((faq, index) => (
            <div key={index} className="pb-6">
              <h2
                className="font-archivo-medium lowercase mb-4 text-[20px] leading-[110%] md:text-[36px] md:leading-[160%]"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-5%",
                  color: "rgba(27, 21, 4, 1)",
                }}
              >
                {faq.question}
              </h2>
              <div
                className="whitespace-pre-line lowercase max-w-4xl text-[14px] leading-[160%] md:text-[18px]"
                style={{
                  color: "rgba(27,21,4,1)",
                  lineHeight: "160%",
                  letterSpacing: "-5%",
                }}
              >
                {faq.answer.split("\n").map((line, lineIndex) => {
                  if (line.trim() === "") {
                    return <div key={lineIndex} className="mb-3"></div>;
                  }

                  return (
                    <div key={lineIndex} className="mb-1">
                      {line.startsWith("•") ? (
                        <span
                          className="font-spectral font-medium text-[14px] md:text-[18px]"
                          style={{
                            fontWeight: 400,
                            lineHeight: "160%",
                            letterSpacing: "-5%",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: line
                              .replace(
                                /<strong>/g,
                                '<strong style="font-family: Spectral; font-weight: 700; font-size: 14px; line-height: 160%; letter-spacing: -5%; text-transform: lowercase; color: rgba(27,21,4,1);" class="md:!text-[18px]">'
                              )
                              .replace(/<\/strong>/g, "</strong>"),
                          }}
                        />
                      ) : (
                        <span
                          className="font-spectral text-[14px] md:text-[18px]"
                          style={{
                            fontWeight: 400,
                            lineHeight: "160%",
                            letterSpacing: "-5%",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: line
                              .replace(
                                /<strong>/g,
                                '<strong style="font-family: Spectral; font-weight: 700; font-size: 14px; line-height: 160%; letter-spacing: -5%; text-transform: lowercase; color: rgba(27,21,4,1);" class="md:!text-[18px]">'
                              )
                              .replace(/<\/strong>/g, "</strong>"),
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 md:mt-18 px-1 md:px-2 space-y-8">
          <div className="flex flex-col 2xl:flex-row gap-4 2xl:gap-2 justify-start items-start">
            <div className="space-y-4 items-start w-full 2xl:w-1/2 2xl:max-w-none">
              <div className="flex justify-center md:justify-start">
                <Image
                  src="/faq3.png"
                  alt="Collective Timeline"
                  width={800}
                  height={500}
                  quality={100}
                  className="w-full h-auto rounded-sm -ml-2 md:-ml-5 object-contain"
                />
              </div>
              <p
                className="font-spectral text-grey-moss-500 italic lowercase text-[16px] leading-[100%] md:text-[24px] ml-2 md:ml-4 text-left"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-5%",
                }}
              >
                new link
              </p>
            </div>
            <div className="space-y-4 items-start w-full 2xl:w-1/2 2xl:max-w-none">
              <div className="flex justify-center md:justify-start">
                <Image
                  src="/faq4.png"
                  alt="Personal Timeline"
                  width={800}
                  height={500}
                  quality={100}
                  className="w-full h-auto rounded-sm -ml-2 md:-ml-5 object-contain"
                />
              </div>
              <p
                className="font-spectral text-grey-moss-500 italic lowercase text-[16px] leading-[100%] md:text-[24px] ml-2 md:ml-4 text-left"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-5%",
                }}
              >
                new embedded
              </p>
            </div>
          </div>
        </div>
        <div className="mt-14 md:mt-18 space-y-8 md:space-y-12">
          {finalFaqData.map((faq, index) => (
            <div key={index} className="pb-6">
              <h2
                className="font-archivo-medium lowercase mb-4 text-[20px] leading-[110%] md:text-[36px] md:leading-[160%]"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-5%",
                  color: "rgba(27, 21, 4, 1)",
                }}
              >
                {faq.question}
              </h2>
              <div
                className="whitespace-pre-line lowercase max-w-4xl text-[14px] leading-[160%] md:text-[18px]"
                style={{
                  color: "rgba(27,21,4,1)",
                  lineHeight: "160%",
                  letterSpacing: "-5%",
                }}
              >
                {faq.answer.split("\n").map((line, lineIndex) => {
                  if (line.trim() === "") {
                    return <div key={lineIndex} className="mb-3"></div>;
                  }

                  return (
                    <div key={lineIndex} className="mb-1">
                      {line.startsWith("•") ? (
                        <span
                          className="font-spectral font-medium text-[14px] md:text-[18px]"
                          style={{
                            fontWeight: 400,
                            lineHeight: "160%",
                            letterSpacing: "-5%",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: line
                              .replace(
                                /<strong>/g,
                                '<strong style="font-family: Spectral; font-weight: 700; font-size: 14px; line-height: 160%; letter-spacing: -5%; text-transform: lowercase; color: rgba(27,21,4,1);" class="md:!text-[18px]">'
                              )
                              .replace(/<\/strong>/g, "</strong>"),
                          }}
                        />
                      ) : (
                        <span
                          className="font-spectral text-[14px] md:text-[18px]"
                          style={{
                            fontWeight: 400,
                            lineHeight: "160%",
                            letterSpacing: "-5%",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: line
                              .replace(
                                /<strong>/g,
                                '<strong style="font-family: Spectral; font-weight: 700; font-size: 14px; line-height: 160%; letter-spacing: -5%; text-transform: lowercase; color: rgba(27,21,4,1);" class="md:!text-[18px]">'
                              )
                              .replace(/<\/strong>/g, "</strong>"),
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className=" space-y-4">
          <div className="flex flex-col 2xl:flex-row gap-4 2xl:gap-2 justify-start items-start">
            <div className="space-y-4 items-start w-full 2xl:w-1/2 2xl:max-w-none">
              <div className="flex justify-center md:justify-start">
                <Image
                  src="/faq5.png"
                  alt="FAQ Image 5"
                  width={800}
                  height={500}
                  quality={100}
                  className="w-full h-auto rounded-sm -ml-2 md:-ml-5 object-contain"
                />
              </div>
              <p
                className="font-spectral lowercase text-[14px] md:text-[20px] leading-[100%] ml-6 md:ml-4 text-left"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-5%",
                  color: "rgba(27, 21, 4, 1)",
                }}
              >
                1. go to inprocess.fun
              </p>
            </div>
            <div className="space-y-4 items-start w-full 2xl:w-1/2 2xl:max-w-none">
              <div className="flex justify-center md:justify-start">
                <Image
                  src="/faq6.png"
                  alt="FAQ Image 6"
                  width={800}
                  height={500}
                  quality={100}
                  className="w-full h-auto rounded-sm -ml-2 md:-ml-5 object-contain"
                />
              </div>
              <p
                className="font-spectral lowercase text-[14px] md:text-[20px] leading-[100%] ml-6 md:ml-4 text-left"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-5%",
                  color: "rgba(27, 21, 4, 1)",
                }}
              >
                2. Sign up with your email
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 px-1 md:px-2 space-y-4">
          <div className="flex flex-col 2xl:flex-row gap-4 2xl:gap-2 justify-start items-start">
            <div className="space-y-4 items-start w-full 2xl:w-1/2 2xl:max-w-none">
              <div className="flex justify-center md:justify-start">
                <Image
                  src="/faq7.png"
                  alt="FAQ Image 7"
                  width={800}
                  height={500}
                  quality={100}
                  className="w-full h-auto rounded-sm -ml-2 md:-ml-5 object-contain"
                />
              </div>
              <p
                className="font-spectral lowercase text-[14px] md:text-[20px] leading-[100%] ml-6 md:ml-4 pr-10 text-left"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-5%",
                  color: "rgba(27, 21, 4, 1)",
                }}
              >
                3. Start your process by uploading a new moment, new thought,
                new link, or new embed
              </p>
            </div>
            <div className="space-y-4 items-start w-full 2xl:w-1/2 2xl:max-w-none">
              <div className="flex justify-center md:justify-start">
                <Image
                  src="/faq8.png"
                  alt="FAQ Image 8"
                  width={800}
                  height={500}
                  quality={100}
                  className="w-full h-auto rounded-sm -ml-2 md:-ml-5 object-contain"
                />
              </div>
              <p
                className="font-spectral lowercase text-[14px] md:text-[20px] leading-[100%] ml-6 md:ml-2 text-left"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-5%",
                  color: "rgba(27, 21, 4, 1)",
                }}
              >
                4. Set a price (optional)
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 px-1 md:px-2 space-y-4">
          <div className="flex flex-col 2xl:flex-row gap-4 2xl:gap-2 justify-start items-start">
            <div className="space-y-4 items-start w-full 2xl:w-1/2 2xl:max-w-none">
              <div className="flex justify-center md:justify-start">
                <Image
                  src="/faq9.png"
                  alt="FAQ Image 9"
                  width={800}
                  height={500}
                  quality={100}
                  className="w-full h-auto rounded-sm -ml-2 md:-ml-5 object-contain"
                />
              </div>
              <p
                className="font-spectral lowercase text-[14px] md:text-[20px] leading-[100%] ml-6 md:ml-2 text-left"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-5%",
                  color: "rgba(27, 21, 4, 1)",
                }}
              >
                5. create your press
              </p>
            </div>
            <div className="space-y-4 items-start w-full 2xl:w-1/2 2xl:max-w-none">
              <div className="flex justify-center md:justify-start">
                <Image
                  src="/faq10.png"
                  alt="FAQ Image 10"
                  width={800}
                  height={500}
                  quality={100}
                  className="w-full h-auto rounded-sm -ml-2 md:-ml-5 object-contain"
                />
              </div>
              <p
                className="font-spectral lowercase text-[14px] md:text-[20px] leading-[100%] ml-6 md:ml-2 text-left"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-5%",
                  color: "rgba(27, 21, 4, 1)",
                }}
              >
                6. share and build your timeline
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-18 space-y-8 md:space-y-12">
          {communityFaqData.map((faq, index) => (
            <div key={index} className="pb-6">
              <h2
                className="font-archivo-medium lowercase mb-4 text-[20px] leading-[110%] md:text-[36px] md:leading-[160%]"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-5%",
                  color: "rgba(27, 21, 4, 1)",
                }}
              >
                {faq.question}
              </h2>
              <div
                className="whitespace-pre-line lowercase max-w-4xl text-[14px] leading-[160%] md:text-[18px]"
                style={{
                  color: "rgba(27,21,4,1)",
                  lineHeight: "160%",
                  letterSpacing: "-5%",
                }}
              >
                {faq.answer.split("\n").map((line, lineIndex) => {
                  if (line.trim() === "") {
                    return <div key={lineIndex} className="mb-3"></div>;
                  }

                  return (
                    <div key={lineIndex} className="mb-1">
                      {line.startsWith("•") ? (
                        <span
                          className="font-spectral font-medium text-[14px] md:text-[18px]"
                          style={{
                            fontWeight: 400,
                            lineHeight: "160%",
                            letterSpacing: "-5%",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: line
                              .replace(
                                /<strong>/g,
                                '<strong style="font-family: Spectral; font-weight: 700; font-size: 14px; line-height: 160%; letter-spacing: -5%; text-transform: lowercase; color: rgba(27,21,4,1);" class="md:!text-[18px]">'
                              )
                              .replace(/<\/strong>/g, "</strong>"),
                          }}
                        />
                      ) : (
                        <span
                          className="font-spectral text-[14px] md:text-[18px]"
                          style={{
                            fontWeight: 400,
                            lineHeight: "160%",
                            letterSpacing: "-5%",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: line
                              .replace(
                                /<strong>/g,
                                '<strong style="font-family: Spectral; font-weight: 700; font-size: 14px; line-height: 160%; letter-spacing: -5%; text-transform: lowercase; color: rgba(27,21,4,1);" class="md:!text-[18px]">'
                              )
                              .replace(/<\/strong>/g, "</strong>"),
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
