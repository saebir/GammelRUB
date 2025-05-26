# Første forsøg på app til Rock under Broen.
Dette er en mobilapp udviklet med React Native og Expo som en del af et skoleprojekt. Appen er lavet til festivalen Rock under Broen og indeholder funktioner som login, opret bruger, nulstil adgangskode, programoversigt og en hjem-skærm med nedtælling til festivalstart. Brugerdata og autentificering håndteres med Supabase.

## Teknologier brugt
- React Native (Expo)
- Supabase (Auth)
- React Navigation
- JavaScript (JSX)
- Visual Studio Code

## Funktioner

- Login med e-mail og adgangskode
- Opret bruger med bekræftelse via e-mail
- Glemt adgangskode 
- Hjem-skærm med nedtælling til festivalstart
- Navigation til programoversigt og øvrige menupunkter
- Brug af sharedStyles for ensartet design
- Responsivt layout til mobil

## Sådan kører du projektet på din egen computer
### 1. Installer Node.js
   
Download og installer Node.js fra https://nodejs.org
(Node.js indeholder også npm, som vi skal bruge)

### 2. Installer Expo CLI (kun første gang)
   
Åbn terminalen/kommandoprompt og skriv:

```bash
npm install -g expo-cli
```

### 3. Klon projektet fra Github

```bash
git clone https://github.com/saebir/GammelRUB.git
cd F-rste-Login
```

### 4. Installer projektets afhængigheder

```bash
npm install
```

### 5. Start appen med Expo

```bash
npx expo start
```


Når Metro bundler åbner kan man vælge at scanne QR-koden for at se appen på telefonen, eller åbne en simulator der er sat op.
