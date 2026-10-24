> [!NOTE]
> Top 10 companies by market cap as of today:
>
> ![](/assets/2026-10-20-13-41-26.png)
>
> All of these companies work in AI, and a lot of money is flowing into it. AI is changing how we live and work, so we need to understand what it is and how it works.

## What is artificial intelligence?

Artificial intelligence (AI) is the ability of machines to do tasks we link with human intelligence: learning, reasoning, problem-solving, perception and decision-making. Examples: playing chess, driving cars, generating images, recommending movies. The field is about 80 years old, young next to other technologies, and it moves fast.

### Evolution of AI

- In 1950, Alan Turing proposed the Turing Test: can a machine behave so intelligently that we cannot tell it from a human? He was asking **"Can machines think?"** The term "AI" did not exist yet. It came in 1955.

![](/assets/2026-10-20-14-07-42.png)

- In 1955, John McCarthy coined the term "Artificial Intelligence". The founders made BOLD claims when there were no GPUs, no cloud computing and no big data. Seventy years later, AI is part of our daily lives.

> [!NOTE]
> The researchers shared one belief: _**Every aspect of learning or intelligence could, in principle, be described so precisely that a machine could be made to simulate it.**_

![](/assets/2026-10-24-13-26-22.png)

- The first AI winter followed. Hype and promises outran progress, funding dried up, and many researchers left. The cause was too little computing power and data. In 1986, the term "Synthetic Intelligence" appeared. Researchers split into two camps, each chasing a different form of intelligence, and they argued over which name fit.

| Artificial Intelligence                                                                | Synthetic Intelligence                                                                 |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| The capability of machines to perform tasks that typically require human intelligence. | The capability of machines to learn and adapt to new situations, and learn themselves. |
| Focuses on simulating human intelligence and behavior.                                 | Focuses on enabling machines to learn and improve their performance over time.         |
| Emphasizes reasoning, problem-solving, and decision-making.                            | Emphasizes learning from data and experience.                                          |

> [!TIP]
> Today we file LLMs under Artificial Intelligence. Synthetic Intelligence is still theoretical. We may see a shift toward it as machines learn and adapt on their own. LLMs already go beyond human ability in some areas.

- In 1997, IBM's Deep Blue beat world chess champion Garry Kasparov. News and articles asked, "Have machines become more intelligent than humans?" The answer was no. Deep Blue was built for one job: it searched chess moves with math. It could not think like a human.

##### Rule-based AI

From 1950 to 1980, intelligence was a set of hand-written rules. Take a spam detector:

- If the content has "free", "$$$" or "lottery", mark it as spam.
- If the content has "hello", "hi" or "greetings", mark it as not spam.

Human experts wrote these rules, and the machines were called "Expert Systems". _**Then the second AI winter came.**_

##### Machine learning (ML)

![](/assets/2026-10-24-14-23-24.png)

Rules could not handle complex tasks. Take spam written as F R E E, F.R.E.E or F-R-E-E. We would need endless rules to catch every variant. So researchers turned to machine learning: let machines learn from data and improve over time. This started the modern era of AI.

Say we want a machine to tell cats from dogs. We give it thousands or millions of labelled images, and it learns the patterns that separate the two. After this, machines could predict the future from past data. But humans still had to label the data, so ML was not fully autonomous.

##### Deep learning (DL)

DL was one of the biggest breakthroughs in AI.

![](/assets/2026-10-24-15-05-49.png)

**Neural networks:** Some researchers took inspiration from the brain and its neurons. Artificial neural networks model complex patterns in data.

With DL, we no longer tell the machine which features matter. It learns them itself. In image recognition, it picks up edges, shapes and textures. DL brought image recognition, speech recognition, translation and more. At the same time, GPUs made computers faster, the internet produced large datasets, and cloud computing made that power easy to rent. Everything lined up for AI to take off.

![](/assets/2026-10-24-15-14-58.png)

##### Computer vision revolution

Alongside deep learning, computer vision took off. It is the field of AI that lets machines interpret images and videos.
![](/assets/2026-10-24-15-20-50.png)

"ImageNet" was a dataset of millions of labelled images in thousands of categories. In 2012, AlexNet, a deep neural network built by Alex Krizhevsky and his team, won the ImageNet Large Scale Visual Recognition Challenge (ILSVRC). It was a big leap in image classification.

> **Applications:** face unlock on phones, self-driving cars, product recognition, X-ray analysis.

> [!NOTE]
> A major breakthrough: _**Machines can actually see**_.

##### Natural language processing (NLP) revolution

Text looks easy, but it is not. It carries hidden meaning, and English is confusing. "Bank" means something different in "river bank", "Bank of India" and "Bank of Ganga". A machine needs context to get the meaning, and without it, it can hallucinate.

![](/assets/2026-10-24-15-32-17.png)

For a long time nobody solved this. The fixes came step by step:

1. _Bag of words_ (one word at a time)
   - We count each word in a text. We ignore word order.
   - Example: "bank" has the same count in "river bank" and "bank loan".
2. _n-grams_ (one word was not enough)
   - We group "n" words that appear next to each other. "n" is the group size.
   - Example: 2-word groups (bigrams) give "river bank" and "bank loan".
3. _RNN (Recurrent Neural Network)_ (loses context in long texts, for example forgets what a pronoun points to)
   - We read words one at a time. The network keeps a memory of what it read.
   - Example: "river" changes how the model reads "bank" later. Long texts make it forget early words.
4. _LSTM (Long Short-Term Memory)_ (still forgets, but much less than an RNN)
   - An RNN with gates. The gates decide what to keep and what to drop.
   - Example: It keeps "river" in memory across many words. It is slow to train.

##### Transformer revolution (2017)

![](/assets/2026-10-24-16-15-32.png)

_**Attention is all you need.**_ In 2017, the Google Brain team published a paper with this title. It introduced the Transformer. Without it, today's LLMs would not exist. Every major LLM we use, such as ChatGPT, Gemini, Sonnet and Perplexity, builds on it.

> [!TIP]
> For the first time, a model could tell what "it" refers to. LLMs could connect the dots.
> ![](/assets/2026-10-24-16-33-03.png)
> **Large Language Models (LLMs):** transformers trained on huge datasets. Large datasets, powerful GPUs and cloud computing made this possible. The result was _**Generative AI (multimodal)**_. It creates new content that never existed on the internet, such as text, images and music, using patterns from its training data. Older models only classified, predicted or recommended.

# The ChatGPT moment

![](/assets/2026-10-24-16-47-06.png)

OpenAI, led by Sam Altman, released ChatGPT publicly in November 2022. It is built on LLMs and Generative AI. After it, every big company began investing in AI and releasing public models.

### Multimodal AI (MuAI)

- Models now support almost every form of data: images, voice, video, languages, documents. Growth is exponential.

![](/assets/2026-10-24-17-07-13.png)

> [!TIP]
> Watch: [Chinese robots dance](https://www.youtube.com/watch?v=mUmlv814aJo)
