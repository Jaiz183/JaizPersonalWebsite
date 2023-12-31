---
title: "[Talk2Learn] Overview"
date: 2023-08-25T18:23:13+08:00
draft: false
toc: true
images:
categories:
  - projects
tags:
  - talk2learn
---

Talk2Learn is comprised of 3 core features - lesson configuration, practice lessons, and test lessons. As a user you’d typically experience the following flow:

## Lesson Configuration

Pretty straightforward. Here’s what’s involved in setting up a lesson:

1. Navigate to the configuration page.
2. Create a new lesson entry.
3. Add a lesson name.
4. Add an image.
5. Optionally add a demo pronunciation file.

Yep, that’s all.

## A Limitation

Talk2Learn was built for generalisability. It is inherently adaptable and works with any language, as long as you have supporting resources. However, it is currently limited by a rigid lesson structure. Right now, each lesson entry that you configure corresponds to a letter. Moreover, for each lesson entry, a practice lesson-testing lesson pair is created. You learn a letter by practising, and testing yourself based on your practice.

## Practice Lessons

Now that you’ve configured a couple of lessons, you can start practising. A practice lesson has two purposes:

1. To improve pronunciation through repetition.
2. To sample user speech.

I’ll get to why speech sampling is required later, but for now, here’s what’s involved in one practice lesson:

1. Navigate to a practice lesson.
2. Click record.
3. Repeat the letter on screen a couple of times.
4. Play your recordings to see how you did.
5. Wait for auto-navigation to the next lesson.

Okay, so what’s happening in the background? Well, every time you repeat the letter on screen, Talk2Learn recognises individual utterances, deciding when you’ve finished saying something and restarted. In this way, Talk2Learn stores your speech samples for later use.

## Test Lessons

Once you’re done with all the practice lessons, you can access test lessons. Here’s what’s involved in one test lesson:

1. Navigate to a test lesson.
2. Click record.
3. Repeat the letter on screen a couple of times.
4. If you’ve pronounced it right, you wait for auto-navigation to the next lesson. If you haven’t, get good.

Remember those speech samples you made during practice? That’s going to come in handy here. Every time you repeat the letter on screen, Talk2Learn recognises individual utterances. However, instead of them, it now finds the speech sample that the utterances most closely resemble. If that utterance was of the correct letter, awesome. Otherwise, you’re going to have to wait until you succeed. I’m sure there’s a deeply philosophical takeaway to be gleaned from this process…but I can’t be bothered.

## Another Limitation

Yeah, there’s another limitation. What did you expect? Due to the current lesson structure, Talk2Learn works best when a lot of practice lessons have been completed, at minimum two. Here’s why - more practice → more samples → more nuance during testing. Let me explain.

Talk2Learn’s testing mechanism functions relatively. Let’s say you’ve configured lessons for two letters, A and B. You pass the testing phase for B as long as you sound like you’re saying B more than you sound like you’re saying A. Consequently, as speech samples accumulate, Talk2Learn improves at distinguishing sounds. Of course, if you’ve only completed one practice lesson, Talk2Learn will think that you’re always saying the right letter. In other words, Talk2Learn posses (very) rudimentary intelligence!
