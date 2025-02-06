**Front-end Developer (React Native) - Technical Assignment**

**Objective:**
The goal of this assignment is to evaluate your skills in React Native development, state management, API integration, and UI/UX implementation. This task is designed to reflect real-world scenarios that you may encounter while working with our team.

---

### **Assignment Overview**

You are tasked with building a simple React Native application for a ride-hailing service. The app should allow users to:

1. **Search for pickup and drop-off locations** using a search bar integrated with the Mapbox Search API.
2. **Request a ride** by selecting the pickup and drop-off points.
3. **View ride details** after booking, including assigned driver information, car details, and ride status.
4. **Monitor ride status updates** in real time.

You can use Expo to set up the project for easy testing.

---

### **Requirements:**

1. **Project Setup:**

   - Use React Native with Expo.
   - Use TypeScript.
   - Implement state management using React Query or Context API.

1. **Start Mock Server:**

   - Run command `npm run server` to start the mock API server.

1. **Search for Locations:**

   - Implement a search bar to allow users to find pickup and drop-off locations.
   - Use Mapbox Search API for location lookup.

1. **Requesting a Ride:**

   - Allow users to request a ride by selecting a pickup and drop-off location.
   - Send a request to the mock API to book a ride.
   - Display the estimated fare (randomized by the backend).

1. **Fetching and Displaying Ride Details:**

   - Fetch ride details from the mock API after booking.
   - Display the assigned driver’s name, car details (model, make, plate, color, year), and ride status.
   - Poll the API for real-time ride status updates (e.g., "Driver Arrived", "Ongoing", "Completed").

1. **Real-Time Ride Status Updates:**

   - Continuously fetch ride details to update the UI as the ride progresses.
   - Ensure users see live updates for when the driver arrives, the ride starts, and when it is completed.

1. **Code Quality & Best Practices:**
   - Write clean, modular, and well-documented code.
   - Follow best practices for state management and API integration.
   - Include basic unit tests using Jest and React Testing Library or an alternative.

---

### **Bonus Points:**

- Implement navigation using Expo Router.
- Use animations for smooth UI transitions.
- Implement a map view showing the pickup and drop-off locations using a service like Google Maps or Mapbox.
- Change dropoff location with pin marker when ride is in progress

---

### **Submission Guidelines:**

- Upload your project to a GitHub repository and share the link.
- Provide a README file with instructions on how to run the project.
- If possible, deploy the app using Expo and share the Expo link.

We are looking for developers who write clean, maintainable code and follow best practices.
Good luck! 🚀

---

# React Native Challenge - Julius Dejon

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (nodejs 18.18.0 or higher)

## How to Get Started

1. Clone repository

   ```bash
   git clone https://github.com/juliusdejon/uvante
   ```

2. Install dependencies

   ```bash
   cd uvante
   yarn install
   (cd server && yarn install)
   ```

3. Run the Server locally

   ```bash
   cd server
   yarn start
   ```

4. Download application via browser's link

     [https://expo.dev/artifacts/eas/tCAAYJjgwTDLpe1RafiuHZ.tar.gz](https://expo.dev/artifacts/eas/tCAAYJjgwTDLpe1RafiuHZ.tar.gz])

5. Install app in Simulator

   ```bash
   tar -xzvf application-dfc2d82d-3293-4308-a7be-56e07cf38cdb.tar.gz
   open -a Simulator
   xcrun simctl install booted uvante.app --verbose
   ```   
6. Open the app

   ```
   xcrun simctl launch booted com.juliusdejon.uvante
   ```
## Deployment

1. Build
   ```bash
   eas login
   eas build -p ios --profile preview
   ```
2. Run the build in Simulator

   ```bash
   eas build:run -p ios
   ```


## Running Tests

To run tests, run the following command

   ```bash
     yarn test
   ```
