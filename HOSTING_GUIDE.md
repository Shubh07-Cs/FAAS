# Hosting Guide for Render

This guide will help you deploy your Face Authentication Attendance System to Render.

## Prerequisites

- A [Render](https://render.com/) account.
- Your code pushed to a GitHub repository.

## Step 1: Database Setup (PostgreSQL)

Since your application currently uses SQLite (which resets on every deployment in the cloud), we need to set up a persistent PostgreSQL database.

1.  Log in to your Render Dashboard.
2.  Click **New +** -> **PostgreSQL**.
3.  **Name**: `face-auth-db` (or any name you like).
4.  **Region**: Choose the one closest to you (e.g., Singapore, Frankfurt).
5.  **Instance Type**: Free (if available) or Starter.
6.  Click **Create Database**.
7.  Once created, copy the **Internal Database URL** (it starts with `postgres://...`). You will need this for the backend.

## Step 2: Deploy Backend & Frontend (Blueprint)

Your repository contains a `render.yaml` file, which allows you to deploy both services at once.

1.  Go to the [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** -> **Blueprint**.
3.  Connect your GitHub repository.
4.  Give your Blueprint a name (e.g., `face-auth-system`).
5.  **Environment Variables**:
    *   Render might ask for environment variables. You can skip this for now or enter placeholders. We will configure them in the next step.
6.  Click **Apply**. Render will start creating the services.

## Step 3: Configure Backend Environment

1.  Go to your Dashboard and click on the **face-auth-backend** service.
2.  Click **Environment**.
3.  Add the following variables:
    *   `DATABASE_URL`: Paste the **Internal Database URL** you copied in Step 1.
        *   *Note: Your code automatically handles replacing `postgres://` with `postgresql://` if needed.*
    *   `PYTHON_VERSION`: `3.11.4` (should already be set by the blueprint).
4.  Click **Save Changes**. This will trigger a redeploy of the backend.

## Step 4: Configure Frontend Environment

1.  Wait for the **face-auth-backend** to finish deploying.
2.  Copy the backend URL (e.g., `https://face-auth-backend.onrender.com`).
3.  Go to your Dashboard and click on the **face-auth-frontend** service.
4.  Click **Environment**.
5.  Add/Update the variable:
    *   `VITE_API_URL`: Paste your backend URL (no trailing slash).
6.  Click **Save Changes**. This will trigger a redeploy of the frontend.

## Important Notes

-   **Memory Usage**: The free tier has 512MB RAM. If you see "Out of Memory" errors in the logs, it's likely due to `face_recognition` loading large models. You may need to optimize the code or upgrade the instance plan.
-   **Initial Load**: Free tier services spin down after inactivity. The first request might take 50+ seconds to wake up the backend.
