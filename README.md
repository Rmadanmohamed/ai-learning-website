# AI Learning Hub

> **Phase 2 repair branch:** The branch redirects links to the actual chatbot section on `index.html#chatbot` and allows normal page navigation, while preserving smooth scrolling for valid local fragments. Social placeholders remain because their intended destinations are unknown. No visual redesign is included. Full runtime validation is pending; the following historical audit describes the original baseline.

## Overview and problem statement

An Arabic-first static educational website for learners exploring artificial intelligence, machine learning, deep learning and popular AI model families. The site organizes introductory explanations, learning paths, animations and a browser-based assistant interface without a server-side application.

## Key features

- Separate educational pages for machine learning, deep learning and AI models.
- Responsive navigation, animated cards and scrolling effects.
- Client-side chatbot interface implemented in JavaScript; no verified LLM API or model inference service.

## Technologies and prerequisites

| Technology | Version / requirement |
| --- | --- |
| HTML, CSS, JavaScript | Browser-native; no version pin |
| Font Awesome | CDN 6.0.0 |
| AOS | CDN 2.3.4 on the home page; 2.3.1 stylesheet on section pages |
| Cairo font | Google Fonts CDN; version unspecified |

A modern browser is required. Internet access is needed for CDN resources. Node.js, a database and Python are not required for opening the site; Python 3 is optional for local HTTP serving.

## Project structure

- [index.html](index.html) — landing page and assistant section.
- [machine-learning.html](machine-learning.html) — ML concepts and learning path.
- [deep-learning.html](deep-learning.html) — neural-network concepts.
- [ai-models.html](ai-models.html) — model-family overview.
- [script.js](script.js) — navigation, animations and client-side assistant behavior.
- [styles.css](styles.css), [section-styles.css](section-styles.css) — presentation.
- [LICENSE](LICENSE) — repository license.

## Installation and setup

```bash
git clone https://github.com/Rmadanmohamed/ai-learning-website.git
cd ai-learning-website
```

Open `index.html` in a browser, or start an optional local static server:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000/ in your browser. No package installation or build is required.

## Environment variables

None. No API keys, backend service or database are required by the inspected JavaScript.

## Usage

Open the home page, select a learning topic using the buttons, or navigate directly to the corresponding HTML files. The home-page assistant can be opened through its button. Content about TensorFlow, PyTorch and other AI technologies is educational; those packages are not dependencies of the website.

## Testing

No automated test suite is included. Manual checks: open all four pages, inspect browser-console errors, test mobile navigation and assistant interactions, and verify external CDN loading. The audit did not execute browser tests.

## Screenshots and live demo

No verified live deployment or standalone screenshot is included in the repository.

## Limitations

Some navigation handlers intercept normal links; section pages also refer to a `chatbot.html` file that is not present. Use direct page URLs if navigation fails. Educational model information can become outdated; the site is not a live model catalogue. A dataset, training and evaluation metrics are not applicable.

## Future improvements

Add accessibility and responsive testing, correct missing navigation targets, add quizzes and publish a verified static demo.

## Author

**Ramadan Mohamed Hassan** — AI Engineer | AI Researcher | AI Automation | LLM & RAG Systems | Machine Learning

[Portfolio](https://ramadan-ai-portfolio.vercel.app/) · [LinkedIn](https://www.linkedin.com/in/ramadan-mohamed-89085a366/) · [GitHub](https://github.com/Rmadanmohamed) · [Email](mailto:ramadanmohameddd3@gmail.com)
