# 2024.lol 🚀

## Summary of Project 📚
Welcome to the **2024.lol** repository! This project is a static website built using [Hugo](https://gohugo.io/) that features an interactive countdown timer to the upcoming U.S. Presidential Election on November 5, 2024, at 9:00 AM. The site offers engaging content aimed at encouraging users to participate, through voting, donating, volunteering, or learning more about the election. This platform is designed to promote civic engagement and provide valuable resources for users wanting to get involved.

## How to Use 🛠️

### Prerequisites
- Install [Hugo](https://gohugo.io/getting-started/installing/) on your local machine.
- Make sure you have [Node.js](https://nodejs.org/) installed as it’s required for package management (Yarn) in this project.

### Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/harperreed/2024.lol.git
   cd 2024.lol
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Run the development server:**
   ```bash
   yarn dev
   ```
   The site will be accessible at `http://localhost:1313`.

4. **Build the project for production:**
   ```bash
   yarn build
   ```

5. **Deploy the site to Netlify or any other hosting service.** The included Netlify configuration can guide you through deployment!

### Configuration
You can customize the `config.toml` file to change the base URL, language code, site title, and other metadata. Update the content in the `data/links.yml` file to manage links and resources displayed on the site.

## Tech Info ⚙️

### Structure
Here's a brief overview of the project's directory structure:

```
hugo/
├── archetypes
├── assets
│   ├── css
│   ├── js
├── config.toml
├── content
├── data
├── layouts
├── netlify.toml
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

### Key Technologies Used
- **Hugo**: For building the static site.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **JavaScript**: Handles the countdown timer functionality.
- **Yarn**: Package manager used for dependency management.

### Important Files
- **`config.toml`**: Configuration file for the Hugo site.
- **`assets/css/main.css`**: Main stylesheet using Tailwind CSS.
- **`assets/js/main.js`**: Handles the countdown logic and interaction with HTML elements.
- **`layouts/partials`**: Contains HTML templates for responsive layout and design consistency.

### Scripts in `package.json`
- **dev**: Starts the Hugo development server.
- **build**: Builds the static files for production.
- **format**: Formats code using Prettier.

### Contribution
If you have suggestions or improvements, feel free to fork the repository and submit a pull request! Let's make this project better together! 💪

## Support 💬
If you encounter any issues or have any questions, please create an issue in the repository. You can also reach out to me on Twitter [@harper](http://twitter.com/harper) or check for updates and improvements to this project.

Thank you for your interest in **2024.lol**! Let’s get involved and make a difference! 🗳️🌟
