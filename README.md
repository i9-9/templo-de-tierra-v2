# Templo de Tierra v2

A modern web application for managing temple reservations and experiences, built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🔐 Authentication with NextAuth.js
- 🏛️ Temple reservation system
- 📅 Date management with react-datepicker
- 📧 Email notifications with Resend
- 🎨 Modern UI with Tailwind CSS and Framer Motion
- 🛡️ Google reCAPTCHA integration
- 📱 Responsive design
- 🗄️ Database management with Prisma

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma
- **Authentication**: NextAuth.js
- **Email**: Resend
- **Date Management**: date-fns, react-datepicker
- **Animation**: Framer Motion
- **Security**: Google reCAPTCHA v3

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/templo-de-tierra-v2.git
   cd templo-de-tierra-v2
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="your_postgresql_connection_string"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   RECAPTCHA_SITE_KEY="your_recaptcha_site_key"
   RECAPTCHA_SECRET_KEY="your_recaptcha_secret_key"
   RESEND_API_KEY="your_resend_api_key"
   ```

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed the database with initial data

## Project Structure

```
templo-de-tierra-v2/
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                 # Utility functions and services
├── prisma/             # Database schema and migrations
├── public/             # Static assets
└── styles/             # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
