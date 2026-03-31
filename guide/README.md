# AuthNexus Learning Guide (Beginner to Production Backend)

This guide is written for a first-time backend learner.

You now have a clean top-level project layout:

- `frontend/` -> React app (do not modify while learning backend)
- `old_backend/` -> existing FastAPI prototype (reference only)
- `blockchain/` -> smart contracts and Hardhat project
- `guide/` -> your learning and implementation roadmap

## How to use this guide

1. Read `01-project-map.md` first.
2. Complete setup from `02-setup-prerequisites.md`.
3. Follow `day-01.md` to `day-07.md` in order.
4. Do not skip days. Each day depends on previous day output.
5. Keep a notebook of what errors you hit and how you fixed them.

## Strict rules (non-negotiable)

1. No business logic in route files.
2. Route -> Service -> Repository flow only.
3. Use environment variables for all secrets.
4. Keep functions small and focused.
5. Write at least one test for each critical feature.

## End goal by Day 7

You will have a new clean backend (`backend_v2`) that is:

- modular
- understandable
- production-ready baseline
- prepared for AI verification and blockchain integration

## Files in this guide

- `01-project-map.md`
- `02-setup-prerequisites.md`
- `day-01.md`
- `day-02.md`
- `day-03.md`
- `day-04.md`
- `day-05.md`
- `day-06.md`
- `day-07.md`
