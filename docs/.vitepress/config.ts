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
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
};
