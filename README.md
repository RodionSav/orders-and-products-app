# Test Task: SPA Application "Orders & Products"

## DEMO LINK

You can view the live demo of the application here: [Orders & Products Demo](https://orders-and-products-app-ztbg-3nk3i7xx7-rodionsavs-projects.vercel.app/)

## Project Description

This test task involves creating a SPA application called "Orders & Products" using modern technologies and development practices. The application should support global state management, routing, transition animations, and real-time updates via WebSocket.

## Technologies and Tools

- **SSR** (Next.js) for server-side rendering
- **Redux** for global state management
- **ES6** (arrow functions, spread operators, template strings, etc.)
- **Socket.io** for WebSocket communication
- **HTML/CSS** (component layout)
- **Chakra** and **CSS Architecture (BEM)** for styling
- **Axios/Fetch** for REST API interactions
- **Docker** for containerizing the application

## Installation and Setup

1. **Clone the repository:**

    ```bash
    git clone <repository_link>
    cd <project_folder>
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the application:**

    ```bash
    npm run dev
    ```

    The application will be available at [http://localhost:3000](http://localhost:3000).

## Functional Requirements

1. **Component Layout** should match the provided design mockups.

2. **Application Pages:**
    - **Orders**: A list of orders with the ability to view order details.
    - **Products**: A list of products with the ability to filter by product type.

3. **Components:**
    - **Navigation Menu**: Navigation menu (Sidebar) with links to Orders and Products pages.
    - **TopMenu**: Displays current date and time in real-time, along with a session counter using WebSocket.
    - **Orders**: Displays order information, including title, product count, creation date, order amount in different currencies, and a delete button with confirmation.
    - **Products**: Displays all products with a filter by product type.

4. **Features:**
    - **Orders**: View order information, including title, number of products, creation dates in different formats, order total in different currencies, and a delete confirmation popup.
    - **Products**: Filter products by type, display product details including name, type, warranty dates in various formats, price in different currencies, and associated order name.

## Additional Requirements

- **Docker**: Containerize the application for easy deployment.
- **Git**: Use version control to manage project development.
- **Readme.md**: The file should provide clear instructions on setup and running the application.
- **Database Schema File**: Provide a database schema file compatible with MySQL Workbench to compare the designed schema with the final implementation.

## Enhancements (for Junior+ Level)

- **TypeScript** for type safety
- **Unit Tests** for testing components and functions
- **i18n** for internationalization
- **Web Storage** for data persistence
- **Lazy Loading** for performance optimization


