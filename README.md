<p align="center">
  <img src="public/images/logo.svg" alt="Sitges 2026 logo" width="220" />
</p>

<h1 align="center">🎬 Sitges 2026 — Companion PWA</h1>

<p align="center">
 <a href="https://github.com/clara-cdp/6sitgesApp/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/clara-cdp/6sitgesApp/ci.yml?branch=main&label=CI%20Build&logo=githubactions&logoColor=white&style=for-the-badge" alt="CI Status" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React_19-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React 19" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite_8-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS_v4-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" /></a>
  <a href="https://vite-pwa-org.netlify.app/"><img src="https://img.shields.io/badge/PWA-Offline_Ready-%235A0FC8.svg?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA Ready" /></a>
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Vitest-152_Passed-%236E9F18.svg?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest 152 Passed" /></a>
  <img src="https://img.shields.io/badge/Security-AES--256--GCM-%23FF0042.svg?style=for-the-badge" alt="AES-256-GCM" />
  <img src="https://img.shields.io/badge/Repo-Personal_Archive_(Read--Only)-black.svg?style=for-the-badge" alt="Personal Archive" />
</p>

<p align="center">
  <strong>📱 Mobile-first</strong> &nbsp;·&nbsp; <strong>🔐 Encrypted tickets</strong> &nbsp;·&nbsp; <strong>⭐ Personal ratings</strong> &nbsp;·&nbsp; <strong>📝 Festival notes</strong>
</p>

---

## 🎟️ About

As Sitges Film Festival regular and graphic designer. I have, until now, created a personal guide booklet emulating the real one but personalized instead with the average 25- 30 films we might watch every year. This year I preferred to make an app. since it was decided last minute, I had to work with very short time constraints, tha is the decition to work only on a front end which is enought for such a small app. Next year, I might implement features that will make this app useful to anyone that wants to downloaded, where to they can add their own tickets and have friends on the festival, check other reviews and rating and even a catch the plain, king kong game so watch this space.

### Personalized Project

This is a small, mobile-first web app suitable for Android and iPhone. **It is not an official festival app** or a catalogue of the entire festival. It focuses on **our booked screenings and selected films**, bringing the programme, tickets, film information, personal ratings and notes together in one place.

### It intentionally does not include the entire festival lineup of 200+ films.

The app was originally scoped around film browsing, a day filter, ticket access and individual ratings. It subsequently expanded to include a full timetable calculating the time between films, a notebook and detailed film credits.  
The interface follows our Figma designs and the **Sitges festival visual identity**.

## ✨ Key Features

### 🎬 Curated Festival Programme & Film Details

- **Personalized Catalogue:** Browse our selected competition titles, Midnight X-Treme and Marathon entries, and special screenings chosen for our festival run.
- **Detailed Technical Credits:** Complete cast and crew dossiers including **Direcció, Guió, Fotografia, Muntatge, Repartiment, Language, Subtitles, and Section**.
- **Interactive Stills Gallery:** Swipeable image carousels showcasing production stills and official posters.
- **Official Links & Trailers:** One-tap access to official Sitges festival entries and YouTube trailers.

### 🏃 Marathon Sessions

- Specialized views for the festival marathons attended (such as **Midnight X-Treme** and **Marató Sorpresa**), displaying all participating titles, composite runtimes, and sequential entry information under a unified pass.

### 🕒 Horari

- Day-by-day accordion schedule covering the staying times of the festival.
- Highlights screening venue and precise start/end times, and duration of screenings.
- **Automated Intermission Calculations ("Pausas"):** Accurately computes interval gaps between consecutive sessions to help navigate meals and venue transfers across Sitges.

### 📝 Apunts (Festival Journal & Notebook)

- **General Notes:** Create, edit, and organize multiple festival journals, reflections, and lists with real-time auto-saving.
- **Per-Film Impressions:** Direct access to write reviews and thoughts on specific films, viewable both from the film's profile and aggregated inside the Apunts dashboard.

### ⭐ Time-Locked Rating System

- 5-star evaluation system for every festival film.
- **Screening-Locked Protection:** To preserve honest impressions, rating is unlocked only once a film's screening has started (or progressed 60 minutes), preventing premature reviews.
- Ratings and watched state were designed to live in `localStorage`, indexed by stable film IDs rather than array positions.

### 📱 Full PWA & Offline Experience

- Installable on mobile devices (iOS / Android) as a standalone native-like application.
- Service worker precaching allows the full film guide, schedule, notes, and encrypted tickets to work smoothly offline during screenings and inside venues with no internet connectivity.

### 🏃‍♀️ Late information

- **the MARATÓ lineup was not confirmed until a day before the festival ends**.
- The event would already exist in the programme, with its own schedule and ticket; its list of participating film IDs could be filled in later and redeployed without resetting personal ratings.

### 🎟️ Ticket encryption

- original tickets contain private information and QR codes.
- The chosen approach was to **encrypt the PDFs locally**, deploy only encrypted assets and decrypt them in the browser with a shared passphrase.
- This avoids adding a server solely to deliver a few tickets, while still requiring sensible care with the **password** and devices.

## 🎨 Design process & visual direction

### 🦍 Inspired by Sitges 2026

The visual starting point was the **official Sitges Film Festival 2026 graphic identity**, interpreted for a small personal companion. The design uses the festival's visual references—its recognisable King Kong logo, typography and graphic motifs and colour palette—rather than a neutral dashboard or off-the-shelf component library.

> This is an **independent design inspired by the festival's branding**, not an official festival product or reproduction of an official app.

### ✏️ Figma first

The screens were designed in **Figma before development**.

- A **mobile-first, programme-like list**, with a prominent date block to the left and the film title, time and venue easy to scan.
- A clear visual difference between ordinary film entries and **ticket actions**.
- Dedicated pages for **film details** and **MARATÓ**, rather than trying to place everything on one screen.
- Consistent navigation, festival-inspired headers and recurring graphic elements.
- A watched-state treatment that sits within the existing palette instead of introducing an unrelated success colour.

<img width="3093" height="1714" alt="Screenshot 2026-10-19 203221" src="https://github.com/user-attachments/assets/b28d6d3a-cf1a-40b3-941d-6dd42ced7684" />

## 🛠️ Tech stack

- **Frontend:** React 19, TypeScript 6, Vite 8, React Router v7

- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), Montserrat and custom festival-themed styles

- **PWA:** `vite-plugin-pwa`, Workbox, installable application shell and offline caching

- **Tickets:** Web Crypto API, PBKDF2 (SHA-256, 600,000 iterations), AES-256-GCM

- **Local state:** `localStorage` for film ratings and notes, independent on each device

- **Quality:** Oxlint, Vitest 5, React Testing Library and jsdom

There is **no backend, database, account system or cross-device sync**. The programme is bundled with the frontend and personal state remains in each browser.

## 🔐 Security & offline notes

The ticket workflow uses the Web Crypto API, **PBKDF2 with SHA-256 (600,000 iterations)** and **AES-256-GCM**. The password isn't embedded in the JavaScript bundle or sent to a backend. Decrypted PDFs are opened using temporary browser Blob URLs.

> ⚠️ **Worth knowing:** This is client-side encrypted ticket storage, not an audited authentication system. Anyone with both the passphrase and encrypted files can decrypt them. Downloads, PDF viewers, screenshots or the device itself may retain plaintext. A temporary Blob URL doesn't guarantee a PDF never touches disk.


## 📸 Screenshots

<table>
  <thead>
    <tr align="center">
      <th>🔑 Password Entry</th>
      <th>🏠 Welcome / Menu</th>
      <th>🎬 Films List</th>
      <th>🎞️ Film List 2</th>
  </thead>
  <tbody>
    <tr valign="top" align="center">
      <td><img width="200" alt="Password entry screen" src="https://github.com/user-attachments/assets/6a815e5e-4063-440f-954a-e4a1aa5a8743" /></td>
      <td><img width="200" alt="welcome/menu" src="https://github.com/user-attachments/assets/7b090214-aa39-48d7-aa6d-798e0008b881" /></td>
      <td><img width="200" alt="films list" src="https://github.com/user-attachments/assets/222c69f7-036b-492b-bc68-b40f7b72a312" /></td>
       <td><img width="200" alt="film list-2" src="https://github.com/user-attachments/assets/45a47086-28c7-4a7f-9f8f-e3b704f13ea2" /></td>
    </tr>
    <tr align="center">
      <th>🗓️ Horari</th>
      <th>📝 Apunts</th>
      <th>🍿 Marathon Details</th>
      <th>🔍 Film Details</th>
    </tr>
    <tr valign="top" align="center">
      <td><img width="200" alt="horari" src="https://github.com/user-attachments/assets/4c160f6f-6c49-40ae-b939-32353eb17e12" /></td>
     <td><img width="200" alt="apunts" src="https://github.com/user-attachments/assets/b5e4a78a-aed9-4839-a54a-12d1a7773d94" /></td>
      <td><img width="200" alt="marathon details" src="https://github.com/user-attachments/assets/55d165cd-d631-471d-9d97-f81b5462c0bc" /></td>
      <td><img width="200" alt="film details" src="https://github.com/user-attachments/assets/3fe0a629-3853-4059-966b-4a631bf1e9e3" /></td>
    </tr>
  </tbody>
</table>



## 📂 Project structure

Structure documented from the project inventory. Component names are shown without file extensions for readability.

```text

6sitgesApp/

├── private-tickets/             # Original PDF tickets; excluded from Git

├── public/

│   ├── images/

│   │   └── films/               # Film posters, stills and portraits

│   ├── tickets/                 # Encrypted .enc ticket files

│   ├── favicon.ico

│   └── _redirects               # SPA route fallback

├── reference/                   # Festival references and project material

├── scripts/

│   ├── encrypt-tickets.mjs      # Encrypt PDFs into STG1 containers

│   └── update-programme.cjs     # Merge technical credits into programme data

├── src/

│   ├── components/

│   │   ├── DateFilterDropdown

│   │   ├── FilmListItem

│   │   ├── Header / Footer

│   │   ├── KingKongLogo

│   │   ├── LlegirMesButton

│   │   ├── NavButton

│   │   ├── PasswordScreen

│   │   ├── PWAUpdatePrompt

│   │   └── TicketButton

│   ├── context/

│   │   ├── TicketAuthContext

│   │   └── TicketAuthProvider

│   ├── data/

│   │   ├── sitges-programme.json

│   │   └── tickets.ts

│   ├── hooks/

│   │   └── useOpenTicket

│   ├── lib/

│   │   ├── notes.ts

│   │   ├── openTicket.ts

│   │   ├── ratings.ts

│   │   ├── ticketCrypto.ts

│   │   └── validatePassword.ts

│   ├── pages/

│   │   ├── AllFilmsPage

│   │   ├── ApuntsPage

│   │   ├── FilmDetailPage

│   │   ├── HorariPage

│   │   ├── MarathonDetailPage

│   │   └── WelcomePage

│   ├── types/

│   ├── App.tsx

│   ├── index.css

│   └── main.tsx

├── vite.config.ts

└── package.json

```

### 🧩 Data and state boundaries

- **Programme:** `src/data/sitges-programme.json` contains the static film, session and marathon data. The actual dataset is JSON, superseding the original plan to use `films.ts`.

- **Tickets:** `src/data/tickets.ts` maps logical ticket IDs to encrypted assets. A ticket reference is not a plaintext PDF URL.

- **Personal data:** ratings and notes are maintained separately from the programme and keyed by stable IDs.

- **Marathons:** refer to existing film records by ID; do not duplicate film metadata or personal state.

A film and a screening/session are conceptually different: a film can retain its identity and rating even when screened again as part of a marathon. The exact TypeScript interfaces should be read from `src/types/` rather than inferred from this README.




## 🚀 Deployment and installation

Deploy the built frontend to a static host with HTTPS, service-worker support and a fallback to `index.html` for client-side routes (`public/_redirects` is included in the documented structure).

On **iPhone**, open the site in Safari and use **Add to Home Screen**. On **Android**, open it in Chrome and use **Install app** or **Add to Home Screen**. No native app store or backend is required.


## ℹ️ Disclaimer

Independent personal project. Not affiliated with or endorsed by the Sitges Film Festival. Festival imagery, posters, film information and trademarks remain the property of their respective owners.

---

<p align="center">

  <sub>Made for the love of cinema 🎥 · Independent personal project · Sitges 2026</sub>

</p>

