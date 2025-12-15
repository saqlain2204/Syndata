import React from "react";
import { Github } from "lucide-react";

const OpenSource: React.FC = () => (
  <section className="max-w-7xl mx-auto px-6 py-20">
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-10 flex flex-col items-center text-center shadow-lg">
      <h3 className="text-3xl font-bold mb-4 text-black dark:text-white">Open Source & Contributions</h3>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
        Syndata is <span className="font-semibold">open source</span> and <span className="font-semibold">open for contributions</span>! Whether you want to fix bugs, add features, improve documentation, or share feedback, your input is valued.
      </p>
      <a
        href="https://github.com/saqlain2204/syndata"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white font-semibold rounded-lg hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
        aria-label="GitHub repository"
      >
        <Github className="w-5 h-5 mr-2" aria-hidden="true" />
        Contribute on GitHub
      </a>
    </div>
  </section>
);

export default OpenSource;
