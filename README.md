# Skiper AI

A modern AI-powered SaaS platform built with Nuxt 4, Prisma, PostgreSQL, Groq AI, Cloudinary, and Polar.

The application provides a collection of AI tools for content creation, code generation, conversational assistance, and image processing through a clean subscription-based experience.

## Goal of the Project

Skiper AI is designed as a portfolio-grade SaaS application that demonstrates modern fullstack development practices, secure authentication, AI integrations, subscription management, and scalable architecture using the Nuxt ecosystem.

## Features

- AI Chat Assistant
- AI Code Generator
- AI Article Writer
- AI Background Removal
- AI Object Removal
- Authentication & Authorization
- Google OAuth Login
- Free & Pro Subscription Plans
- Polar Payment Integration
- Usage Limits & Generation Tracking
- Modern UI powered by Nuxt UI

# Tech Stack

# Frontend

- Nuxt 4
- TypeScript
- Tailwind CSS v4
- Nuxt UI
- VueUse

# Backend

Nuxt Server (Nitro)

# Database

PostgreSQL
Prisma ORM

# Authentication

Nuxt Auth Utils
Google OAuth
Session-based Authentication
Argon2 Password Hashing

# AI & Media

Groq API
Cloudinary

# Payments

Polar

# Validation

Zod

# Architecture

- app/ — frontend application (pages, layouts, components)
- server/ — backend APIs, integrations, business logic
- prisma/ — database schema and migrations
- shared/ — shared types and validation schemas
- public/ — static assets

# Required Environment Variables

- Database

```bash
DATABASE_URL
```

- Authentication

```bash
NUXT_SESSION_PASSWORD
```

```bash
NUXT_OAUTH_GOOGLE_CLIENT_ID
NUXT_OAUTH_GOOGLE_CLIENT_SECRET
```

- AI

```bash
GROQ_API_KEY
```

- Cloudinary

```bash
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

- Polar

```bash
POLAR_ACCESS_TOKEN
POLAR_WEBHOOK_SECRET
```

- Application

```bash
NUXT_PUBLIC_APP_URL
```
