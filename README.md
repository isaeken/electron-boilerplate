# Electron Boilerplate

This project is a template for creating a desktop application using the following technologies:
  - Electron Forge
  - Typescript
  - React
  - Redux
  - Vite
  - Tailwind CSS
  - React Router

## Table of Contents

- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Code Structure](#code-structure)
- [Contributing](#contributing)
- [Debugging and Advanced Settings](#debugging-and-advanced-settings)
- [FAQ](#faq)
- [License](#license)

## Getting Started

Follow these steps to start the project:

1. Clone the repository

```bash
git clone https://github.com/isaeken/electron-boilerplate.git
```

2. Install dependencies

```bash
cd electron-boilerplate && npm install
```

3. Run the application

```bash
npm run start
``` 

This command runs the application in development mode, allowing Electron and React to work synchronously.

## Configuration

### package.json

This file contains the application’s metadata and basic settings. Key fields:

- `name`: The name of the application
- `signature`: The application’s signature (ex: `com.example.app`)
- `version`: The version of the application
- `description`: A description of the application

> **Note**: After building, the `app.json` file will be created at `src/app.json`, where you can update your metadata.

### src/app.json

The `app.json` file has the same structure as `package.json` and is used for configuring metadata within the project.

## Scripts

Commonly used commands in the project:

- `start`: Runs the application in development mode.
- `package`: Packages the application for the current platform.
- `make`: Packages the application for all platforms.
- `publish`: Publishes the application to GitHub Releases.
- `lint`: Runs code linting to check code quality.

## Code Structure

To keep the code organized and understandable, the following directory structure is used:

- `config`: Configuration files.
- `src`: Source code.
  - `src/app.json`: Application metadata.
  - `src/@types`: Typescript types.
  - `src/main`: Electron backend.
    - `src/main/main.ts`: Main entry point.
    - `src/main/Appliaction.ts`: Application class.
    - `src/main/services`: Services used by the application.
      - `src/main/services/Counter.ts`: Example service.
    - `src/main/skeleton`: Core application structure
      - `src/main/skeleton/Logger.ts`: Logger class.
      - `src/main/skeleton/Meta.ts`: Meta class.
      - `src/main/skeleton/Service.ts`: Service abstract class.
    - `src/main/utils`: Utility functions.
      - `src/main/utils/app.ts`: Application utilities.
  - `src/renderer`: React frontend
    - `src/renderer/components`: Components used in the application.
    - `src/renderer/pages`: Application pages.
    - `src/renderer/reducers`: Redux reducers.
    - `src/renderer/utils`: Utility functions.

## Contributing

To contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new feature branch (`feature/feature-name`).
3. Commit your changes.
4. Push your branch.
5. Open a pull request.

We appreciate all contributions!

## Debugging and Advanced Settings

- **Debugging**: You can open `DevTools` for Electron and React debugging (`View -> Toggle Developer Tools`).

## FAQ

**Q**: Does the application work on all platforms?
**A**: Yes, thanks to Electron, the application can run on macOS, Windows, and Linux.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
