# Dev-Links

Dev-Links is a dynamic link sharing application designed for developers to share, organize, and discover valuable coding resources. Built with Next.js, React, TypeScript, and integrated with Prisma and PostgreSQL, this platform offers a user-friendly interface for developers to manage links, engage in discussions, and personalize their profiles.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **Backend:** Prisma, PostgreSQL
- **Other Tools:** Node.js, npm/yarn

## Features

- **CRUD Operations:** Create, read, update, and delete links.
- **Link Validation:** Ensures all submitted URLs follow the correct pattern.
- **Drag & Drop:** Reorder links with an intuitive drag and drop interface.
- **User Profiles:** Add and edit profile details including profile picture, name, and email.
- **Profile Preview:** View and copy the link to your Dev-Links profile.
- **Responsive Design:** Optimal layout for different device screen sizes.
- **Interactive UI Elements:** Enhanced user experience with hover and focus states.
- **Database Integration:** (Bonus) Save details to a PostgreSQL database.
- **User Authentication:** (Bonus) Create an account and log in.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ThorOnTheRocks/dev-links.git
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```

### Environment Setup

- Set up your PostgreSQL database and note down the credentials.
- Create a `.env` file in the project root and fill in your database credentials:
  ```env
  DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
  ```

### Running the Application

1. To start the development server:
   ```sh
   yarn dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Twitter: [https://twitter.com/GianlucaGalota](https://twitter.com/GianlucaGalota)
Linkedin: [https://www.linkedin.com/in/gianluca-galota/](https://www.linkedin.com/in/gianluca-galota/)

Project Link: [https://github.com/ThorOnTheRocks/dev-links](https://github.com/ThorOnTheRocks/dev-links)
