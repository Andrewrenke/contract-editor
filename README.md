# Contract Management App

This is a simple React-based application for managing contracts. Users can view, edit, and delete contracts through a clean and easy-to-use interface.

## Features

- **View Contracts**: Displays a list of contracts with information about the author, entity name, description, and creation date.
- **Edit Contracts**: Allows users to edit the details of existing contracts.
- **Delete Contracts**: Provides functionality to delete contracts from the list.

## JSON Server

This project uses **JSON Server** to mock a REST API for contract data. The server allows you to perform CRUD operations (Create, Read, Update, Delete) on the contracts.

## Launch the app

### Installation steps

1. Clone the repository or download the project files.
2. Go to the project directory and install dependencies:

   ```bash
   npm install
   ```

## Run the app

```bash
npm start
```

```bash
json-server --watch db.json --port 4000
```

This will open the app in your default browser, typically at http://localhost:3000.

### Folder Structure:

- **/src**: Contains the source code.
- **/components**: Reusable components like ContractList, EditContract.
- **/services**: Contains functions for fetching and updating contracts from a backend service.
- **/types**: TypeScript types, such as Contract, used across the app.

### Project Structure

1. **App.tsx**: Main entry point. Executes the commission calculation.
2. **utils/commissions.js**: Contains the logic for commission calculations.
3. **db.json**: data file for operations.
4. **__tests__/contractService.test.ts**: Contains tests for the contract service functions to ensure proper functionality and error handling.
