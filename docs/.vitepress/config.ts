// https://vitepress.dev/reference/site-config
export default {
  title: "✒️ Inkora",
  description: "Moe's Taverne",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],

    sidebar: [
      {
        text: "The Beginning",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Markdown Examples", link: "/markdown-examples" },
        ],
      },
      {
        text: "The Present",
        items: [{ text: "Markdown Examples", link: "/markdown-examples" }],
      },
      {
        text: "The Future",
        items: [{ text: "Markdown Examples", link: "/markdown-examples" }],
      },
      {
        text: "Notes",
        items: [
          { text: "Launch Event", link: "/Notes-LaunchEvent" },
          { text: "Get Block", link: "/Archy_GetBlock" },
          { text: "Software Design", link: "/Software-Design" },
          { text: "AZero", link: "/dennis_integrate_azero_id" },
          { text: "Ink Championship", link: "/german_ink_championship" },
          { text: "Safe and Robust Ink", link: "/piotr_safeAndRobuts" },
          { text: "Ink Storage", link: "/uladzislau_deep_dive_ink_storage" },
          { text: "Org Recap", link: "/orgRecap/recap" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/frankbevr/inkora" },
    ],
  },
};
