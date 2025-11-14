<img width="1349" height="138" alt="Screenshot of Drink Local Header" src="https://github.com/user-attachments/assets/ad51d2bb-ae4c-4210-8de3-d78d72489013" />

<h1>Drink Local: Full-Stack Web Application</h1>

<h3>By: Nathan Fox || For: LaunchCode Saint Louis</h3>

<h4>Technologies Used:</h4>
<p>JavaScript | React | Vite | Maven | Java | Spring Boot | MySQL | React Router | CSS | Hibernate | Font Awesome | Google Fonts</p>

<hr>

<h2>💻 About the Project</h2>
<p>A full-stack web application built using Java Spring Boot and MySQL that provides users with secure profile management and an interactive brewery search. The application leverages an external RESTful API to allow users to search for breweries by city or name, and features a persistence layer that enables signed-in users to save favorite breweries to their profile for future reference.</p>

<hr>

<h2>✨ Core Features</h2>
<table>
  <tr>
    <th>Feature Category</th>
    <th>Description</th>
    <th>Technical Showcase</th>
  </tr>
  <tr>
    <td>User Authentication & Profiles</td>
    <td>Users can sign in and create a personal profile. This establishes a unique user identity within the application, providing personalized access.</td>
    <td>Secure data handling, CRUD functionality, and data modeling in MySQL.</td>
  </tr>
  <tr>
    <td>Modern UI & UX</td>
    <td>A modern user interface greets the user after profile creation, ensuring a clear, responsive, and engaging experience.</td>
    <td>Frontend development skills (e.g., React, Vite, JavaScript/HTML/CSS).</td>
  </tr>
  <tr>
    <td>Interactive Brewery Search</td>
    <td>An interactive search function allows users to look up breweries. Search can be performed either by specifying a city or by searching for the brewery's name.</td>
    <td>External API Integration, asynchronous data fetching, and front-end state management.</td>
    <tr>
      <td>Favorite/Saved Breweries</td>
      <td>Signed-in users can save breweries they find during their search to their personal profile for later viewing.</td>
      <td>Backend persistence (Spring Boot and MySQL) and data relationship management (e.g., a many-to-many relationship between users and breweries).</td>
    </tr>
  </tr>
</table>

<h2>🗺️ Architectural Features</h2>
<ul>
  <li>Full-Stack Architecture: Successful integration of a dedicated frontend with a powerful backend.</li>
  <li>Java Spring Boot Backend: The core business logic is handled by a robust, industry-standard Java framework.</li>
  <li>MySQL Data Persistence: All user profiles and saved brewery lists are reliably stored in a relational database.</li>
</ul>

<hr>

<h2>🧱 Tech Stack</h2>

<h3>🌐 Front End</h3>
<table>
  <tr>
    <th>Technology</th>
    <th>Function in the Project</th>
  </tr>
  <tr>
    <td>JavaScript</td>
    <td>Core language for the entire frontend logic and interactivity.</td>
  </tr>
  <tr>
    <td>React</td>
    <td>Builds the modern UI and manages the application's client-side state, handling the interactive search and profile display.</td>
  </tr>
  <tr>
    <td>Vite</td>
    <td>Serves as the build and dev server for the React application, ensuring speed and efficiency during development.</td>
  </tr>
  <tr>
    <td>React Router</td>
    <td>Manages navigation, allowing users to move between different views (like the main search page, the profile, and perhaps brewery details) without a full page reload.</td>
  </tr>
  <tr>
    <td>CSS</td>
    <td>Styles the application to deliver the "modern UI" experience.</td>
  </tr>
  <tr>
    <td>Font Awesome</td>
    <td>Provides scalable, vector-based icons to enhance the visual appeal and usability of the application (e.g., save icon, search icon).</td>
  </tr>
  <tr>
    <td>Google Fonts</td>
    <td>Used to define the typography of the application, contributing to the professional, modern aesthetic.</td>
  </tr>
</table>

<h3>⚙️ Back End & Database</h3>
<table>
 <tr>
    <th>Technology</th>
    <th>Function in the Project</th>
  </tr>
  <tr>
    <td>Java</td>
    <td>The core language used to build the server-side API and business logic.</td>
  </tr>
   <tr>
    <td>Spring Boot</td>
    <td>Used to quickly build a robust RESTful API for handling requests from the frontend, managing user authentication, and performing database operations.</td>
  </tr>
   <tr>
    <td>Maven</td>
    <td>Handles project dependencies (Spring Boot libraries, Hibernate, etc.) and packages the Java application for deployment.</td>
  </tr>
   <tr>
    <td>Hibernate</td>
    <td>Manages the seamless transfer of data between the Java objects in your Spring Boot application and the rows/columns in the MySQL database.</td>
  </tr>
   <tr>
    <td>MySQL</td>
    <td>The persistent data store for saving user profiles and the list of breweries marked as favorites.</td>
  </tr>
</table>

<hr>

<h2>📸 Visuals</h2>

<h3>Wireframes</h3>
<a href="https://www.figma.com/design/ainOcIGr5pbh9D5Dao41My/Figma-basics?node-id=1669-162202&t=OfHXTmM5nawqDaIk-1">Digital Project Wireframe - Figma</a>

<h3>Entity Relationship Diagram (ERD)</h3>
<a href="https://www.figma.com/board/MVRW45gxaXuXIYz3T7wZhK/Drink-Local-ERD?node-id=0-1&p=f&t=fb4oCAVpIpoblFKr-0">Digital ERD - Figma</a>

<hr>

<h2>🛠️ Installation Instructions & Required Dependencies</h2>

<p>Step 1: Prerequisites Installation
The user must first install the necessary software components.

Java Development Kit (JDK) 21: Download and install JDK 21 (from Oracle, Adoptium, or another vendor) and set the JAVA_HOME environment variable.

MySQL Server: Install the MySQL server and a client tool (like MySQL Workbench or DBeaver) to manage the database.

Node.js & npm (or yarn): Download and install Node.js (which includes npm) for running the frontend.

Git: Install Git to clone the repository.

Step 2: Clone the Project
The user will use Git to get a copy of your application's code.

Clone the Repository: Open a terminal or command prompt and run the following command, replacing the URL with the actual repository link:

>Bash

>git clone [your-repository-url]
>cd [your-project-folder]
>
Verify Structure: They should see separate folders for the frontend (e.g., client, frontend) and the backend (e.g., server, backend) inside the main project folder.

Step 3: Database Setup (Backend)
The backend needs a running MySQL database to connect to.

Create Database: Log into their MySQL server and execute a command to create the database schema.

>SQL

>CREATE DATABASE your_app_db;
Note: The name your_app_db must match the one configured in the Spring Boot application properties.

Configure Backend: Navigate to the backend project folder and locate the Spring Boot configuration file (usually application.properties or application.yml) within the src/main/resources directory.

Update Credentials: They must update the database connection details to match their local MySQL setup:

>Properties

># Example for application.properties
>spring.datasource.url=jdbc:mysql://localhost:3306/your_app_db
>spring.datasource.username=root  # Or their local MySQL user
>spring.datasource.password=mypassword # Their MySQL password
>spring.jpa.hibernate.ddl-auto=update # Allows Hibernate to manage table creation

Step 4: Run the Backend (Spring Boot)
They will use Maven to build and run the Java backend.

Navigate to Backend: Change directories into the backend project folder (where the pom.xml file is located).

>Bash

>cd [your-project-folder]/backend

Build and Run: Use the Maven wrapper (mvnw on Linux/macOS or mvnw.cmd on Windows) to build and run the application.

>Bash

>./mvnw spring-boot:run
># OR: mvn clean install (to build the jar) 
># and then java -jar target/[your-app].jar (to run)

Verify: The terminal should show Spring Boot starting up, typically reporting that it's running on a port (e.g., 8080).

Step 5: Run the Frontend (React/Vite)
They will use npm (Node Package Manager) to install dependencies and start the React development server.

Navigate to Frontend: Change directories into the frontend project folder.

>Bash

>cd [your-project-folder]/frontend

Install Dependencies: Install all required Node.js packages (React, React Router, Font Awesome, etc.).

>Bash

>npm install
># or yarn install if using yarn
Start the Server: Start the Vite development server.

>Bash

>npm run dev
># or yarn dev
Verify: The terminal should provide a local URL (e.g., http://localhost:5173) where the React application is running.

Step 6: Access the Application
The application is now fully running!

Open Browser: The user can open the URL provided by the Vite server (e.g., http://localhost:5173) in their web browser.

Test: They can now interact with the React frontend, which will communicate with the Spring Boot backend via API calls, and the backend will manage data in the MySQL database.</p>

<hr>

<h2>💡 Future Features</h2>
