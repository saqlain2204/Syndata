# SynData: Synthetic Data Generator Platform


<p align="center">
   <img src="assets/syndata.png" alt="SynData Logo" width="120" />
</p>

<p align="center">
   <a href="https://github.com/saqlain2204/Syndata">
      <img src="https://img.shields.io/github/stars/saqlain2204/Syndata?style=social" alt="GitHub stars" />
   </a>
   <a href="https://github.com/saqlain2204/Syndata/fork">
      <img src="https://img.shields.io/github/forks/saqlain2204/Syndata?style=social" alt="GitHub forks" />
   </a>
   <a href="https://github.com/saqlain2204/Syndata">
      <img src="https://visitor-badge.laobi.icu/badge?page_id=saqlain2204.Syndata" alt="Repo views" />
   </a>
</p>


---

## 🚀 Overview

**SynData** is an open source platform for generating high-quality synthetic datasets, designed for testing, training machine learning models, and data analysis. Built with Next.js and FastAPI, SynData empowers researchers, developers, and data scientists to create, customize, and export artificial data with ease.

- **Generate structured Q&A pairs from PDFs using state-of-the-art LLMs**
- **Export results in CSV format for immediate use**
- **Modern, responsive UI with light/dark themes**
- **Accessible, mobile-friendly, and easy to use**
- **Open for contributions: help us build the future of synthetic data!**

---

## 🎬 Demo


<p align="center">
   <video width="480" controls>
      <source src="https://raw.githubusercontent.com/saqlain2204/syndata/main/assets/demo.mp4" type="video/mp4">
      Your browser does not support the video tag.
   </video>
   <br />
   <em>Watch SynData in action – from PDF upload to synthetic data generation!</em>
</p>

---

## 🌟 Features

- **PDF Processing:** Upload and process PDF documents to extract meaningful content chunks
- **AI-Powered Generation:** Generate synthetic question-answer pairs using advanced LLM models
- **Easy Export:** Download generated data in CSV format
- **Use Cases:** RAG evaluation, model benchmarking, data augmentation, QA system testing, enterprise knowledge validation, educational content creation
- **How It Works:** Upload PDF → Configure settings → Generate data → Download results

---

## 🖥️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.12+
- Docker (optional, for containerized backend)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/saqlain2204/syndata.git
   cd syndata
   ```
2. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```
3. **Start the frontend:**
   ```bash
   npm run dev
   ```
4. **Install backend dependencies:**
   ```bash
   cd ../server
   pip install -r requirements.txt
   ```
5. **Start the backend:**
   ```bash
   python main.py
   ```
6. **(Optional) Run backend with Docker:**
   ```bash
   docker build -t fastapi-app .
   docker run -p 8000:8000 fastapi-app
   ```

---

## 🤝 Contributing

We welcome contributions from the open source community! Whether you want to fix bugs, add features, improve documentation, or share feedback, your input is valued.

- **Fork the repo** and create your branch
- **Open a pull request** with a clear description
- **Discuss ideas and improvements** in [issues](https://github.com/saqlain2204/syndata/issues)
- **Join us in shaping the future of synthetic data!**

### Contribution Guidelines
- Follow the code style and organization used in the project
- Write clear, concise commit messages
- Add tests for new features when possible
- Be respectful and collaborative

---

## 📁 Project Structure

```
assets/           # Logo and branding
client/           # Next.js frontend
  app/            # Main pages and UI
  components/     # Reusable React components
  public/         # Static assets
server/           # FastAPI backend
  models/         # Data models
  routes/         # API routes
  services/       # Core backend logic
```

---

## 🛡️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 💡 Inspiration & Credits

Created and maintained by [@saqlain2204](https://github.com/saqlain2204). Special thanks to all contributors and the open source community!

---

## 📣 Stay Connected

- [GitHub Repository](https://github.com/saqlain2204/syndata)
- [Issues & Discussions](https://github.com/saqlain2204/syndata/issues)

---

> **Empowering innovation with synthetic data. Open for contributions!**
