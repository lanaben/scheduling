### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed globally on your machine.
  - [Download Node.js](https://nodejs.org/)
- Angular CLI installed globally.
  - Install Angular CLI using npm:
    ```bash
    npm install -g @angular/cli
    ```
- Git installed on your machine.
  - [Download Git](https://git-scm.com/)



### Installation

1. Clone the repository:
   
   ```bash
   git clone https://github.com/lanaben/scheduling.git

2. Navigate into the project directory:

      ```bash
   cd scheduling

3. Install dependencies using npm:

   ```bash
   npm install

4. Add environment file

   Create or update `environment.ts` in scheduling folder 

   ```typescript
   // scheduling/environment.ts

    export const environment = {
      production: false,
      clientId: 'client-id',
      clientSecret: 'client-secret',
      authUrl: 'https://login.allhours.com/connect/token',
      apiUrl: 'https://api4.allhours.com'
    };


### Usage

1. Start the development server:
   ```bash
   ng serve
