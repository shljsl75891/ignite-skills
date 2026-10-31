# Does ChatGPT know or does it guess? Is it just a better search engine?

Let's search Google and ask ChatGPT the same two questions:

1. **Who is Dr. APJ Abdul Kalam?** ChatGPT gives one direct answer. Google gives links. ChatGPT feels like a better search engine.
2. **Why is NamasteAI red wine from the Himalayan regions so expensive?** This wine doesn't exist. Google returns nothing useful. ChatGPT can invent reasons and sources. So it is not a better search engine. Why does this happen?

### Search engines vs LLMs

| | How it works |
|---|---|
| Google | Question -> look up pages in a pre-built index -> rank them -> return links |
| LLM (like ChatGPT) | Prompt -> predict the next word from patterns learned in training -> generate response |

> [!TIP]
> ![](/assets/2026-10-31-13-53-25.png)
>
> **Search engines** retrieve existing pages.
>
> - Results can be outdated, badly ranked or misleading
>
> **LLMs** generate text.
>
> - The model gives each possible next word a probability and picks a likely one
> - It repeats this word by word until it produces a special end-of-text marker
>
> "Just autocomplete" undersells it. A modern LLM can read a long prompt (its "context") and has learned grammar, many languages, programming languages, reasoning, facts, stories and maths. That is why its guesses are often close to the truth.

> [!CAUTION]
> ChatGPT is not the same as an LLM. ChatGPT is a product (chat tuning, optional web search and other tools) built on a base model, the LLM.
> ![](/assets/2026-10-31-14-30-35.png)

### Neural networks

A neural network is made of layers of neurons, loosely inspired by the brain. Each neuron multiplies its input by learned numbers (weights) and passes an output on. One layer's output is the next layer's input. The last layer gives the result.

![](/assets/2026-10-31-14-21-20.png)

Every LLM has a knowledge cutoff date. Training needs a huge dataset and a lot of compute, so nobody retrains daily. The model alone knows nothing after its cutoff. Products like ChatGPT can add web search to cover the gap. Search engines stay current because crawlers (bots that visit pages) keep updating the index.

> [!NOTE]
> Inference is when a trained model answers a prompt. It costs much less than training.

### Why LLMs give wrong answers with confidence

> Sounds right != is right

A **hallucination** is output that sounds plausible but is wrong, unsupported or made up. Fluent language says nothing about factual accuracy. They are separate qualities, and we should not fall for the "illusion of certainty".

Common causes:

- Missing or ambiguous training data
- Outdated knowledge
- False assumptions in the prompt
- Unreliable patterns in the training data

An LLM is built to produce the most likely answer, even when that answer is wrong. Maths is an example. LLMs alone get arithmetic wrong, but a calculator tool fixes that.

So, back to our question: does ChatGPT know or guess? It predicts. For the wine, nothing real backs the answer, so the model writes what a plausible answer looks like.
