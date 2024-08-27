# ANIMEEIGA

AnimeEiga is a responsive web application designed for anime movie enthusiasts to explore and manage their favorite movies. The app is built using Angular. Users can create profiles, browse a collection of anime movies, and save their favorites for easy access later.

## Deployment
You can access the live version here: [animeEiga](https://theawin.github.io/animeEiga-Angular/welcome)

## Features

- **User Authentication:** Users can securely register, log in, and log out.
- **User Profiles:** Users can create and update their profiles, view registration details, and manage their list of favorite movies.
- **Movie Catalog:** Browse a wide range of anime movies, view detailed information on movies, diretors and genre, and add movies to your favorites list.
- **Responsive Design:** The app is fully responsive, providing a seamless experience on both mobile and desktop devices.
- **Favorites Management:** Users can add or remove movies from their favorites directly from the movie catalog or profile page.

## Views

### Welcome View
- Allows new users to signup witha username, name, password, email and date of birth.
- Allows users to log in with a username and password.
![welcome page](https://github.com/TheaWin/animeEiga-Angular/blob/main/image/welcome-page.png)

### Home View
- Displays all movies with images and buttons to take user to see details on genre, director and movie's details
- Allows users to add/remove movie to the Favorite List.
- Provides navigation to the Profile View
- Allows users to log out.
![Home Page](https://github.com/TheaWin/animeEiga-Angular/blob/main/image/movie-card.png)

### Profile View
- Displays user registration details
- Allows users to update their information (name, email and date of birth)
- Shows the user's list of favorite movies.
- Allows users to remove a movie from their list of favorites.
- Allows existing users to deregister.
![Profile View](https://github.com/TheaWin/animeEiga-Angular/blob/main/image/profile-page.png)

## Technologies Used
- Angular: A powerful web application framework.
- Angular Material: A UI component library for Angular applications.
- RxJS: A library for reactive programming using Observables.

## Set Up Locally
### Clone Repository
Open your terminal and run the following.
```
git clone https://github.com/TheaWin/animeEiga-Angular.git
```

### Install Node.js, nvm, and npm
Check if you already have Node.js, nvm, and npm installed.
```
node -v
nvm -v
npm -v
```
If you don't have them installed, please follow this [guidance](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm) to get them set up.

### Install Dependencies
1. Navigate to the cloned project in your terminal, so that you are in the root of the project.
2. Run `npm install` in the terminal while in the root folder of the project. This will automatically install all the required dependencies.

## Development Server
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding
- Run `ng generate component component-name` to generate a new component

## Deployment on Gh-pages
- Run `ng deploy --repo=https://github.com/<username>/<repository-name>.git

## Contact
Thea Win - [mstheawin@gmail.com](mailto:mstheawin@gmail.com)
