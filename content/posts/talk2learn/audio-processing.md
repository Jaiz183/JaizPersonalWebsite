---
title: "[Talk2learn] Audio Processing"
date: 2023-08-29T15:28:17+08:00
draft: true
images: ["content/posts/talk2learn/images/abstracted_speech_pipeline.png"]
categories:
  - projects
tags:
  - talk2learn
toc: false
cover:
---

I’ve always been more of a writer than a talker. When I started this project, I entered my first meeting with my mentor, Jobin, believing that we would transcribe speech and compare the transcription to a letter. Far from this, Talk2Learn uses CMUSphinx’s speech pipelines to compare raw audio signals, no intermediary required. How does that work? Well, let’s take it one step at a time, starting at what a speech pipeline is.

A speech pipeline is a series of processors that perform computations on audio data. Talk2Learn’s testing pipeline looks like this:

```xml
<component name="micToMatcher" type="edu.cmu.sphinx.frontend.FrontEnd">
  <propertylist name="pipeline">
    <item>mic</item>
    <item>dataBlocker</item>
    <item>speechClassifier</item>
    <item>speechMarker</item>
    <item>preemphasizer</item>
    <item>windower</item>
    <item>fft</item>
    <item>melFilterBank</item>
    <item>dct</item>
    <item>sampleMatcher</item>
  </propertylist>
</component>
```

Ok, that looks intimidating, so let’s simplify it:

![abstract_speech_pipeline](https://i.imgur.com/wZzoT2I.png)
Think of a pipeline as sequence of buckets. Every time a piece of audio data, say a ball, passes through a bucket, it changes little by little, until it is unrecognisable by the end.

The mic sucks up the ball and the dataBlocker bucket divvies it up. Instead of handling one massive ball every couple of seconds, the pipeline can handle balls more manageably-sized balls continuously. The smaller balls then pass through the speechClassifier and speechMarker machines. Working together, they package smaller balls. Wait, that seems counter-productive. Why return to bigger chunks? Well, initially, the balls are dropped in randomly. However, these machines are intelligent. They identify balls that belong together, i.e., group audio data that belong to the same block of speech.

Its worth noting that, you could stop the pipeline right now. If all you need is automatically identified blocks of speech, just write this audio data into a file and you’re done. If you need speech comparison, read on.

Now that we have bigger and better packages, a whole bunch of fancy operations are performed on the balls to prepare it for speech comparison. Eventually, the balls reach the end of their journey, where they are compared with packages of balls that have already been through the wringer and are paired up with balls that resemble them the closest.

It is very much worth noting that there is a ton of interesting, technical stuff occurring here that I couldn’t get to in my analogy. For instance, CMUSphinx’s speech classifiers and speech markers are [Hidden Markov Models](https://www.notion.so/82016465f2b34038af1d0c251e180937?pvs=21), which can predict whether audio data belongs to the current block of speech given only the preceding state. In fact, even that is an oversimplification. There are a few important conditions and inputs required for the model to function. Moreover, the signal pre-processing that I glossed over is crucial. The preemphasizer and windower improve signal readability by exaggerating high frequencies and smoothening out jitter at extreme frequencies. The fft ([Fast Fourier Transform](https://en.wikipedia.org/wiki/Fast_Fourier_transform)) outputs a spectrum of frequencies for easier comparison. Before any comparison occurs, the melFilterBank extracts signal features that humans are more sensitive to and the dct ([Discrete Cosine Transform](https://en.wikipedia.org/wiki/Discrete_cosine_transform)), compacts the resulting features. Finally, the sampleMatcher computes signal similarity.

There’s still a lot that I’ve left out. I’ll leave it to you, reader, to follow up on the details.

TLDR, use Talk2Learn’s pipeline if you want:

1. To identify speech starts and ends
2. To store user speech automatically
3. To compare speech in real time
