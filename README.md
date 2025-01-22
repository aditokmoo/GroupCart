# **Smart Shopping List App** 🛒🤝

The **Smart Shopping List App** is a collaborative and intelligent shopping assistant designed to make group shopping easier, faster, and smarter. Whether you're planning a barbecue with friends or organizing a party, this app helps you manage your shopping list with ease and convenience.

## **Key Features** 🌟

- **Create Groups**: Generate a unique code to invite friends or family to join your group and collaborate on a shared shopping list.  
- **Real-Time Updates**: Add, edit, or delete items, and see changes instantly across all group members.  
- **AI-Powered Suggestions**: An intelligent bot analyzes your list and suggests additional items you might need based on the context (e.g., "Don't forget the bread and ketchup for your barbecue!").  
- **Seamless Sharing**: Share your group code to easily bring everyone on board.  
- **User-Friendly Interface**: Clean, intuitive design that makes creating and managing shopping lists effortless.

## **Why Use This App?** 🛍️

- Save time by planning and organizing shopping with your group in one place.  
- Avoid forgetting essential items with smart AI-powered suggestions.  
- Enjoy a personalized and collaborative shopping experience.

## **Tech Stack** 🛠️

- **Frontend**: React, TailwindCSS  
- **Backend**: Firebase (Firestore, Authentication, Functions)  
- **AI Integration**: OpenAI API for intelligent suggestions  
- **Hosting**: Firebase Hosting  

## **How to Use?** 🚀

1. Create or join a group using a unique group code.  
2. Add items to your shared shopping list.  
3. Let the AI bot analyze your list and suggest what you might have missed.  
4. Collaborate in real-time with friends and family for a seamless shopping experience!



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
