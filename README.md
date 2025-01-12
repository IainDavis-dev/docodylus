![An anthropomorphized crocodile, standing upright, carrying a briefcase, next to the masthead reading "Docodylus". The crocodile is dressed in a white, button-down shirt, black trowsers and a jacket, with no tie. He straddles the border between "casual" and "professional". His posture suggests he is walking purposefully toward some task](/docs/Docodylus/assets/images/Docodylus_sillhouette_logo.webp)

# Introduction
Docodylus is a library of modular, reusable React components designed to streamline the development of high-quality documentation sites. Initially built for Docusaurus, it can integrate with any React-based documentation framework. With built-in support for accessibility, internationalization, and theming, Docodylus accelerates development while ensuring best practices.

:information_source: _The components in Docodylus are React components, but some features, such as theming, may prove to be Docusaurus-specific._

# Key Features
* Modular, reusable components for React-based documentation sites.
* Accessibility-first design to meet modern standards.
* Built-in internationalization with external customization options.
* Optimized for modern build tools with tree-shaking.
* Designed for Docusaurus but adaptable to other frameworks.

# Rationale
"Docodylus is ideal for developers working with React-based documentation platforms, especially those using Docusaurus or similar tools."

### Why Docodylus?
I chose Docusaurus as the framework for my professional website. I found it to be packed with great features for structuring, building, and deploying documentation websites. But I also found I kept wanting simple layout or content components that were absent. I began developing these components in place, and eventually decided I ought to make them a library so that I could use them in projects other than my website. Docodylus is that library.

Docodylus is also a learning project, providing me an opportunity to experience building something from the ground up, without a cadre of more senior developers to help me solve problems.

### Why "Docodylus"?
**Docodylus** is a small evolutionary step from **Docusaurus** just like crocodiles are a small evolutionary step from dinosaurs.

# Tech Stack
**source**
|                          |         |                          |
|--------------------------|---------|--------------------------|
| [Typescript][typescript] | ^5.7.2  | compile-time type checks |
| [React][react]                    | ^19.0.0 | components               |

**key dependencies**
|                      |        |              |
|----------------------|--------|--------------|
| [Polyglot][polyglot] | ^2.6.0 | translations |

**build & deploy**
|                                  |        |                     |
|----------------------------------|--------|---------------------|
| [Vite][vite]                     | ^6.0.7 | build engine        |
| [Github Actions][github-actions] | ~      | CI/CD               |
| [Githhub Pages][github-pages]    | ~      | hosting [user docs] |

**test**
|                          |         |                   |
|--------------------------|---------|-------------------|
| [Vitest][vitest]         | ^2.1.8  | unit tests        |
| [@testing-library/react] | ^16.1.0 | component testing |

**docs & showcase**
|                            |        |                        |
|----------------------------|--------|------------------------|
| [Storybook][storybook]     | ^8.4.7 | showcase & user docs   |
| [GitHub Wiki][github-wiki] | ~      | Developer Docs         |
| TBD                        | ~      | static site generation |


<!-- NAMED LINKS -->
[vite]:
    https://vite.dev/guide/why.html
    "Vite | Why Vite"

[vitest]: 
    https://vitest.dev/guide/why.html
    "Vitest | Why Vitest"

[github-actions]:
    https://docs.github.com/en/actions/about-github-actions/understanding-github-actions
    "Github Actions | Understanding Github Actions"

[storybook]:
    https://storybook.js.org/docs
    "Storybook | Get Started"

[github-wiki]:
    https://docs.github.com/en/communities/documenting-your-project-with-wikis/about-wikis
    "Github | About Wikis"

[polyglot]:
    https://airbnb.io/polyglot.js/
    "Polyglot | lightweight i18n by AirBnB"

[typescript]:
    https://www.typescriptlang.org/
    "TypeScript | Get Started"

[react]:
    https://react.dev/
    "React | React"