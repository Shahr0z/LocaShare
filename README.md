<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <h1>LocaShare</h1>
    <p>LocaShare is a location-sharing app built using React Native. It allows users to add their locations, which can be viewed by other users of the app. The app also features live location updates, where users can see each other's locations in real-time.</p>
    <h2>Getting Started</h2>
    <ol>
      <li>Install React Native on your machine. You can find the instructions on how to do this on the <a href="https://reactnative.dev/docs/environment-setup">React Native documentation website</a>.</li>
      <li>Clone this repository to your local machine using the following command:</li>
      <pre>git clone https://github.com/&lt;your-username&gt;/LocaShare.git</pre>
      <li>Install the required packages by running the following command inside the project directory:</li>
      <pre>npm install</pre>
      <li>Place your Google Maps API key in the `AndroidManifest.xml` file. You can obtain a Google Maps API key by following the instructions on the <a href="https://developers.google.com/maps/gmp-get-started#create-project">Google Maps Platform website</a>.</li>
      <pre>
        &lt;meta-data
          android:name="com.google.android.geo.API_KEY"
          android:value="YOUR_API_KEY_HERE" /&gt;
      </pre>
      <li>Build the app by running the following command:</li>
      <pre>npx react-native run-android</pre>
    </ol>
    <h2>Features</h2>
    <ul>
      <li><strong>Google Maps integration</strong>: The app integrates with Google Maps to display the user's location and the locations of other users.</li>
      <li><strong>Location sharing</strong>: Users can add their location to the app, which can be viewed by other users of the app.</li>
      <li><strong>Unique user IDs</strong>: The app assigns a unique ID to each user when they first open the app. This ID is used to identify the user's location and ensure that each user's data is kept separate.</li>
      <li><strong>Live location updates</strong>: The app features live location updates, where users can see each other's locations in real-time. The locations of multiple users can be displayed on the map at the same time, and the app draws a polyline between the locations of two users when they are selected.</li>
      <li><strong>User statistics</strong>: The app has a tab that shows users how many locations they have added.</li>
      <li><strong>All users tab</strong>: The app has a tab that shows all users who have added their location.</li>
      <li><strong>Settings</strong>: The app has a settings screen where users can clear their data, which generates a new unique ID for them.</li>
      <li><strong>Firebase integration</strong>: The app uses Firebase Firestore to store and retrieve user data in real-time.</li>
    </ul>
  </body>
</html>
