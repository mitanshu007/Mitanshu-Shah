# Mitanshu Shah — Portfolio

A modern interactive portfolio for Mitanshu Shah — B.Tech AI/ML student and aspiring software developer.

## Portfolio

This repository contains the source for the portfolio website, with an Antigravity-inspired visual direction:
- dark, premium UI with blue/cyan accents
- animated particle / node background
- smooth scroll and reveal transitions
- magnetic hover interactions
- animated project cards
- responsive mobile-first layout
- direct links to GitHub, LinkedIn, email and projects

## Projects

- [AI Money Master](https://github.com/mitanshu007/AI-MONEY-MASTER) — AI-focused personal finance project.
- [AI Knowledge Workspace / RAG PDF System](https://github.com/mitanshu007/RAG-PDF-SYSTEM) — local PDF RAG application using FastAPI, Inngest, LlamaIndex, Sentence Transformers, Qdrant and Streamlit.

## Contact

- GitHub: https://github.com/mitanshu007
- LinkedIn: https://www.linkedin.com/in/mitanshu-shah-557756371/
- Email: mailto:mitanshushah2007@gmail.com


## Contact Form Email Delivery

The contact form sends submissions to **mitanshushah2007@gmail.com** through the Vercel serverless endpoint `POST /api/contact` and Resend.

For Vercel production, add this environment variable in Project Settings → Environment Variables:

```
RESEND_API_KEY=your_resend_api_key
```

The key must remain server-side. Visitors do not see it. Each submission includes the visitor's name, email, message, and timestamp. The visitor's email is used as Reply-To so you can reply directly from Gmail.

After configuring the key and redeploying, a successful form submission will arrive in the Gmail inbox for **mitanshushah2007@gmail.com**.