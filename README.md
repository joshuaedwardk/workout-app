# workout-log

A simple workout logging application built with Next.js and Supabase.

## Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

You will need the following software installed:

* **Node.js & npm**: The project's JavaScript runtime and package manager.
* **Git**: For cloning the repository.

### Installation

1.  **Clone the repository**:
    Open your terminal and clone the project from GitHub.
    ```bash
    git clone [https://github.com/joshuaedwardk/workout-app.git](https://github.com/joshuaedwardk/workout-app.git)
    cd workout-app
    ```

2.  **Install dependencies**:
    Install all the required packages using npm.
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    This project uses Supabase. You need to create a local environment file to connect to your database.
    * Create a new file named `.env.local` in the root of your project.
    * Add your Supabase URL and public key to the file.
    
    `.env.local`
    ```env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

### Running the Development Server

Start the development server to see the application running.

```bash
npm run dev

The application will be accessible at:
http://localhost:3000