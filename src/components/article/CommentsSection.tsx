'use client';

import { useEffect } from 'react';

interface CommentsSectionProps {
  pageId: string;
  pageTitle: string;
}

export function CommentsSection({ pageId, pageTitle: _pageTitle }: CommentsSectionProps) {
  useEffect(() => {
    // Load Utterances script for comments
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'your-github-username/your-repo'); // Replace with your repo
    script.setAttribute('issue-term', 'title');
    script.setAttribute('label', 'comments');
    script.setAttribute('theme', 'preferred-color-scheme');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    const container = document.getElementById('comments-container');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      // Cleanup if needed
    };
  }, [pageId]);

  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Comments
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Share your thoughts and experiences with other parents. All comments are moderated to ensure a safe and respectful community.
      </p>
      <div id="comments-container" className="comments-section" />
    </section>
  );
}

/**
 * SETUP INSTRUCTIONS:
 *
 * To enable comments on your site:
 *
 * 1. Create a GitHub repository for discussions
 *    - Go to https://github.com/new
 *    - Create a public repository (e.g., "pregnancysprout-comments")
 *    - Enable discussions in the repository settings
 *
 * 2. Install Utterances
 *    - Go to https://github.com/apps/utterances
 *    - Click "Install"
 *    - Select your newly created repository
 *
 * 3. Update the repo attribute above
 *    - Replace 'your-github-username/your-repo' with your actual repo
 *    - Example: 'yourname/pregnancysprout-comments'
 *
 * 4. Customize theme
 *    - Change 'preferred-color-scheme' to 'github-light' or 'github-dark' if needed
 *
 * ALTERNATIVE: Disqus
 * If you prefer Disqus (more features, better moderation):
 * 1. Sign up at https://disqus.com
 * 2. Create a new site
 * 3. Replace this component with Disqus script
 *
 * Benefits of Utterances:
 * ✅ Free and open-source
 * ✅ No ads
 * ✅ GitHub-backed discussions
 * ✅ Lightweight
 * ✅ Privacy-friendly
 *
 * Benefits of Disqus:
 * ✅ Rich moderation tools
 * ✅ Better spam filtering
 * ✅ Analytics
 * ✅ More customization
 */
