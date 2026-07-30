---
title: QRA — web-based remote access platform
summary: Manage fleets of machines and control their screens from the browser. Next.js console + NestJS control plane + Rust agent + WebRTC
date: 2026-07-30
status: live
url: https://qra.qjins.com
---

## What was the problem

I wanted to manage scattered computers from the web and control their
screens with nothing but a browser. Existing remote desktop tools are
built around 1:1 device connections — there's no operator's view: groups,
roles (RBAC), session history, audit logs. I needed a platform that
operates machines, not a tool that attaches to one.

## What approach I took

Separate the control plane from the media plane. A NestJS server handles
only auth, permissions, the session state machine and signalling; screen
and input travel browser-to-agent over WebRTC, so video never passes
through the server — lighter server, lower latency. The console is
Next.js; the agent is Rust (a Windows service with a separate user-session
helper). The wire protocol and session transition table live in a shared
package as Zod schemas and data — the contract is code. Development runs
without Docker on embedded PostgreSQL, and a simulator registering 30+
mock devices exercises the server logic. Agent auto-update verifies
Ed25519 signatures against a key baked in at build time — even the server
isn't trusted.

## What didn't work

Reconnection passed all 43 e2e tests and then didn't work at all against
a real machine. The tests verified the server's state transitions and
token rules; what was broken was the transport layer between them.
Hands-on verification became the most valuable habit of the project —
only by attaching real devices did I find 3 server bugs, 3 silently
failing defects, and a regression where enabling audio killed the video.
There was a misdiagnosis too. An intermittently hanging e2e suite got
blamed on keep-alive sockets; the next run passed and I thought it was
fixed — it was just intermittent. Only after reading the failure output
to the end did the real cause surface: a dynamic-import deadlock, solved
by splitting test processes. An intermittent failure is never refuted by
one green run.
File transfer worked perfectly — uploads, downloads — while writing zero
audit log entries. "Does it work" and "does it leave a record" are
different questions, and the second one never surfaces unless you go
look. And as a bonus detour: Docker Desktop wouldn't even start on this
machine, so the verification environment moved into WSL2.

## How it turned out

Live at qra.qjins.com. Real Windows screens viewed and controlled from
the browser, with adaptive quality, audio, clipboard and file transfer
all verified against real hardware. It became the first service card on
this site — and the hands-on verification playbook for closing the gap
between "tests pass" and "it actually works" is the biggest asset I'm
carrying to the next project.
