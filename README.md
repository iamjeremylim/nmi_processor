# NMI Processor

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#tech-stack">Tech Stack</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#run-project-locally">Run project locally</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

NMI Processor enables the following features:

- User can upload CSV file (via click / drag and drop)
- User can submit the file for processing
- User can view the generated SQL INSERT statements
- User can delete uploaded file
- User can try to generate statements again if parser fails

### Tech Stack

- React.js
- TypeScript
- styled-components
- PapaParse
- vite
- vitest

<!-- GETTING STARTED -->

## Getting Started

### Run project locally

1. Clone the repo
   ```sh
   git clone https://github.com/iamjeremylim/nmi_processor
   ```
2. Change directory to project root folder
3. Install dependencies
   ```sh
   npm install
   ```
4. Run app in development mode
   ```sh
   npm run dev
   ```
5. Run unit tests
   ```sh
   npm test
   ```

<p align="right">(<a href="#nmi-processor">back to top</a>)</p>
