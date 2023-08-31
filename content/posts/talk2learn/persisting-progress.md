---
title: "[Talk2Learn] Persisting Progress"
date: 2023-08-31T15:49:21+08:00
draft: true
toc: false
images:
categories:
  - projects
tags:
  - talk2learn
---

In this age of cloud computing and online databases supported by expansive backends, Talk2Learn uses…an SQLite database and local files to persist progress.

Ok, that’s anticlimactic. That’s the catch in programming though. Sometimes, you must suppress your impulse to use cool technology when you don’t **need** to. Talk2Learn doesn’t need a dedicated server on the cloud. It could be made far more portable and efficient by using local storage. Broadly, Talk2Learn only **needs** to persist across user sessions are lesson configuration details, sample recordings, and lesson progress.

I found that storing this information in on device was sufficient. [SQLite](https://sqlite.org/index.html) is a library that helps implement a quick, on-device, self-contained SQL database. It is a satisfactory, on-device storage solution for small-scale. Strictly speaking, SQLite is written in C, but most languages have plugins to interact with SQLite. In Dart, the plugin was [sqflite](https://pub.dev/packages/sqflite). Local files are a great way to store media. Of course, you’re free to use MongoDB or other online databases for storage, but you’d lose SQLite’s compactness and speed.

Despite me singing its praises, SQLite is not a solution without problems. Most of these are more of general considerations than problems. Apart from the storage limits inherent to on-device solutions, I was most troubled by timing database operations appropriately. Database operations are typically asynchronous, i.e., they run on a separate processing thread, freeing up resources for subsequent computations. There are good reasons for this. Opening and closing database connections takes time and space. To quote an answer on [Quora](https://www.quora.com/Why-dont-we-think-about-time-and-space-complexity-in-database-systems):

> You’d have to save 1500 main memory references to have as much impact as removing one SSD read. You’d have to save 40 million instructions to have as much impact as avoiding one disk seek.

Logically, it’d be great if you could do something else while waiting for such operations to complete. However, when working with sequential structures, such as Talk2Learn lessons, some computations must be completed synchronously, i.e., one after the other. For a single lesson, you’d have to first open a database connection, retrieve data, process it, render the UI, and finally close the database connection. As you might’ve noticed, these operations must be performed in order. This is easy to handle with a couple of `await` keywords or promises, combined with a couple of progress indicators. Now, consider 2 consecutive lessons, with navigation between lessons. You’d have to repeat this series of operations twice. When separate instances of a widget are used to display separate lessons, the need for synchronousness clashes with initialization and disposal timings. For instance, the second instance will be initialized while the previous one is being disposed. Therefore, you may attempt to open a database connection while the other connection is being closed because of how slow such operations are, causing an array of errors.

Now, you may be thinking, why wouldn’t you just open one database connection, period? Just as database operations are expensive, having a database open for an elongated period creates security and privacy vulnerabilities.

I would advise against opening database connections repeatedly. Instead, open a single connection for each user session. If you must re-open database connections, try cleaning up before navigation and avoiding default disposal to avoid timing issues. On that note, do **not** use local files to store data that must be accessed frequently. Store file locations to access media. If you thought database operations seemed like trouble, you’re going to look end up like this guy while waiting for file retrieval:

![berserk_skeleton_meme](https://i.imgur.com/toBxgDK.gif)
