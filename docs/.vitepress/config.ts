import { taskLists } from '@hedgedoc/markdown-it-plugins'

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
          { text: "Intro", link: "/Beginning/intro.md" },
          { text: "Motivation", link: "/Beginning/motivation.md" },
        ],
      },
      {
        text: "The Journey",
        items: [
          { text: "Saturday", link: "/Journey/Saturday" },
          { text: "Sunday", link: "/Journey/Sunday" },
          { text: "Monday", link: "/Journey/Monday" },
          { text: "Tuesday", link: "/Journey/Tuesday" },
          { text: "Wednesday", link: "/Journey/Wednesday" },
          { text: "Thursday", link: "/Journey/Thursday" },
          { text: "Friday", link: "/Journey/Friday" },
        ],
      },
      {
        text: "The Future",
        items: [
          { text: "Outlook", link: "/Future/outlook.md" },
        ],
      },
      {
        text: "Notes",
        items: [
          { text: "Launch Event", link: "/Notes/Notes-LaunchEvent" },
          { text: "Software Design", link: "/Notes/Software-Design" },
          { text: "Get Block", link: "/Notes/Archy_GetBlock" },
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
  markdown: {
    config: (md) => {
      md.use(taskLists, { enabled: true, label: true, lineNumber: true })
    }
  }
}
