<div align="center">
  <img src="client/public/assets/Logo Files/png/logo-no-background.png" alt="LinksBuddy Logo" width="500"/>

  <p align="center">
    A modern link management platform powered by AI
  </p>

  <div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-lightgrey)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black)](https://vercel.com)

  </div>

  <br />

  <p align="center">
    <a href="#features">Features</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

<div align="center">

[🚀 View Live Demo](https://linksbuddy.org) • [📖 Documentation](https://docs.linksbuddy.org) • [🤝 Community](https://discord.gg/linksbuddy)

</div>

---

## Features ✨

- **Smart Organization**: AI-powered categorization and tagging system
- **Advanced Analytics**: Deep insights into your link performance
- **Intelligent Recommendations**: AI-driven content suggestions
- **Secure Sharing**: Control who sees your links
- **Custom Collections**: Organize links into public or private collections
- **Community Driven**: Connect with like-minded individuals

## Tech Stack 🛠️

<div align="center">

![Tech Stack](public/assets/tech-stack.png)

</div>

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: CSS Modules
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com)
- **Email**: [React Email](https://react.email/)

## Getting Started 🚀

### Prerequisites

- Node.js 18+
- PostgreSQL
- [Pnpm](https://pnpm.io/)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/linksbuddy.git

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Set up the database
pnpm prisma migrate dev

# Start the development server
pnpm dev
```

## Environment Setup 🔒

```env
DATABASE_URL=                # PostgreSQL connection string
NEXT_PUBLIC_APP_URL=        # Your app's URL
NODE_ENV=                   # development/production
```

## Available Scripts 📜

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Run tests
```

## Contributing 🤝

We love contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Support 💬

- Documentation: [docs.linksbuddy.org](https://docs.linksbuddy.org)
- Issues: [GitHub Issues](https://github.com/yourusername/linksbuddy/issues)
- Discord: [Join our community](https://discord.gg/linksbuddy)
- Twitter: [@linksbuddy](https://twitter.com/linksbuddy)

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**[Website](https://linksbuddy.org)** • **[Documentation](https://docs.linksbuddy.org)** • **[Discord](https://discord.gg/linksbuddy)**

Made with ❤️ by the LinksBuddy Team

</div>
