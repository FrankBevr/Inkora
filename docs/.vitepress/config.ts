export default {
  title: "Inkora",
  description: "Moe's Taverne",
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],
    logo: "https://use.ink/assets/files/ink-squink-129208fde8d6d4a8474bf71865e3d76b.svg",
    ignoreDeadLinks: true,
    sidebar: [
      {
        text: "The Beginning",
        items: [
          { text: "Markdown Examples", link: "/Notes/markdown-examples" },
        ],
      },
      {
        text: "The Road",
        items: [
          { text: "Saturday", link: "/Journey/Saturday" },
          { text: "Sunday", link: "/Journey/Sunday" },
        ],
      },
      {
        text: "The Future",
        items: [
          { text: "Markdown Examples", link: "/Notes/markdown-examples" },
        ],
      },
      {
        text: "Notes",
        items: [
          { text: "Launch Event", link: "/Notes/Notes-LaunchEvent" },
          { text: "Get Block", link: "/Notes/Archy_GetBlock" },
          { text: "Software Design", link: "/Notes/Software-Design" },
          { text: "AZero", link: "/Notes/dennis_integrate_azero_id" },
          { text: "Ink Championship", link: "/Notes/german_ink_championship" },
          { text: "Safe and Robust Ink", link: "/Notes/piotr_safeAndRobuts" },
          {
            text: "Ink Storage",
            link: "/Notes/uladzislau_deep_dive_ink_storage",
          },
          { text: "Org Recap", link: "/Notes/org_recap" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/frankbevr/inkora" },
    ],
  },
};
