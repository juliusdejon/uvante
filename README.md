# React Native Challenge - Julius Dejon

## 📌 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (18.18.0 or higher)  
- **Yarn** (Package manager)  
- **Expo CLI** (for running the app)  
- **Xcode & iOS Simulator** (for iOS testing)  

---

## 📥 Getting Started  

Follow these steps to set up the project locally:

1. **Clone the repository:**  

   ```bash
   git clone https://github.com/juliusdejon/uvante.git
   ```

2. **Install dependencies:**  

   ```bash
   cd uvante
   yarn install
   (cd server && yarn install)
   ```

3. **Start the mock API server:**  

   ```bash
   cd server
   yarn start
   ```

---

## 📲 Running the App  

### Install on Simulator  

1. **Download the app artifact:**  
   [Expo Build](https://expo.dev/artifacts/eas/tCAAYJjgwTDLpe1RafiuHZ.tar.gz)  

2. **Extract and install in Simulator:**  

   ```bash
   tar -xzvf application-dfc2d82d-3293-4308-a7be-56e07cf38cdb.tar.gz
   open -a Simulator
   xcrun simctl install booted uvante.app --verbose
   ```

3. **Launch the app in Simulator:**  

   ```bash
   xcrun simctl launch booted com.juliusdejon.uvante
   ```

---

## 🚀 Deployment  

1. **Login to Expo:**  

   ```bash
   eas login
   ```

2. **Build the app for iOS:**  

   ```bash
   eas build -p ios --profile preview
   ```

3. **Run the build in Simulator:**  

   ```bash
   eas build:run -p ios
   ```

---

## 🛠 Running Tests  

To run unit tests, execute:

   ```bash
   yarn test
   ```

---


