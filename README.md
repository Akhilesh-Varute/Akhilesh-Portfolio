# Akhilesh Varute — Portfolio

Source for [akhileshvarute.me](https://akhileshvarute.me): a single-page portfolio for an AI/LLM and backend engineer.

**Stack:** Vite, React 18, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Lenis.

## Develop

```sh
npm install
npm run dev      # http://localhost:8080
npm run lint
npm run build    # output in dist/
npm run preview
```

## Notes

- Sections below the hero are lazy-loaded, and vendor code is split into `react` and `motion` chunks to keep first load small.
- Motion (smooth scroll, custom cursor, animated scenes) is disabled under `prefers-reduced-motion`.
- Project videos in `public/videos/` use `preload="none"` with poster images.
- Project cards live in `src/components/Projects.tsx`; update version labels there when releasing.
