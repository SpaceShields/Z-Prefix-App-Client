# Z-Prefix App Client

This repository contains the client-side application for the Z-Prefix 15-21JAN2025 RAP project, built using Next.js.

## Table of Contents

- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 23.6.0)
- [npm](https://www.npmjs.com/) (version 11.0.0)
- [Next.js](https://nextjs.org/) (version 15.1.4)
- [react](https://react.dev/) (version 19.0.0)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SpaceShields/Z-Prefix-App-Client.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd Z-Prefix-App-Client
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Development Client

Start the development client with:

```bash
npm run dev
```
Open a new terminal to run the Node.js server:
[server repo found here](https://github.com/SpaceShields/Z-Prefix-App-Server)
(follow README for server instructions)

```bash
cd Z-Prefix-App-Server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. The page will automatically reload if you make edits.

## Available Scripts

In the project directory, you can run:

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the application for production.
- **`npm start`**: Starts the production server.
- **`npm run lint`**: Runs ESLint to identify and fix linting errors.
- **`npm test`**: Runs Jest to execute the test suites.

## Project Structure

The project's file structure is organized as follows:

```
Z-Prefix-App-Client/
├── app/                    # Application source code
│   ├── page.tsx            # Main page component
│   └── ...                 # Other components and pages
├── public/                 # Public assets
│   └── ...                 # Images, icons, etc.
├── .gitignore              # Git ignore file
├── README.md               # Project README
├── eslint.config.mjs       # ESLint configuration
├── jest.config.ts          # Jest configuration
├── jest.setup.ts           # Jest setup file
├── next.config.ts          # Next.js configuration
├── package-lock.json       # Package lock file
├── package.json            # Package manifest
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **ESLint**: A tool for identifying and fixing linting errors in code.
- **Jest**: A testing framework for JavaScript and TypeScript applications.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
