---
title: QRA
summary: Manage fleets of machines and control their screens from the browser. Next.js console, NestJS control plane, Rust agent, WebRTC
date: 2026-07-30
status: live
url: https://qra.qjins.com
---

## Background

I wanted to manage scattered computers from the web and control their
screens with nothing but a browser. Existing remote desktop tools are
built around 1:1 device connections. There is no operator's view: groups,
roles (RBAC), session history, audit logs. I needed a platform that
operates machines, not a tool that attaches to one.

## Design

Separate the control plane from the media plane. A NestJS server handles
only auth, permissions, the session state machine and signalling; screen
and input travel browser-to-agent over WebRTC, so video never passes
through the server. Lighter server, lower latency. The console is
Next.js; the agent is Rust (a Windows service with a separate user-session
helper). The wire protocol and session transition table live in a shared
package as Zod schemas and data, so the contract is code. Development
runs without Docker on embedded PostgreSQL, and a simulator registering
30+ mock devices exercises the server logic.

Security defaults to the safe side. Remote-control approval treats
no-response, errors and a missing helper all as denial, and switches that
cannot be enforced were never built; a UI that promises protection it
cannot deliver is the most dangerous kind. Agent auto-update verifies
Ed25519 signatures against a key baked in at build time, so even the
server is not trusted.

## Trial and error

Reconnection passed all 43 e2e tests and then did not work at all against
a real machine. The tests verified the server's state transitions and
token rules; what was broken was the transport layer between them.
Hands-on verification became a habit after that. Only by attaching real
devices did I find 3 server bugs, 3 silently failing defects, and a
regression where enabling audio killed the video.

There was a misdiagnosis too. An intermittently hanging e2e suite got
blamed on keep-alive sockets; the next run passed and I thought it was
fixed. It was just intermittent. Only after reading the failure output
to the end did the real cause surface: a dynamic-import deadlock, solved
by splitting test processes. An intermittent failure is never refuted by
one green run.

File transfer worked perfectly, uploads and downloads alike, while
writing zero audit log entries. "Does it work" and "does it leave a
record" are different questions, and the second one never surfaces unless
you go look. As a bonus detour, Docker Desktop would not even start on
this machine, so the verification environment moved into WSL2.

## Outcome

Live at qra.qjins.com. Real Windows screens viewed and controlled from
the browser, with adaptive quality, audio, clipboard and file transfer
all verified against real hardware. The console covers the full admin
path: login, dashboard, device groups, sessions, audit event log, agent
installation. It is the first service card on this site.
