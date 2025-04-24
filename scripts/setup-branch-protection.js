const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.REPO_ACCESS_TOKEN
});

async function setupBranchProtection() {
  try {
    await octokit.repos.updateBranchProtection({
      owner: 'devancapps',
      repo: 'akiko-react',
      branch: 'master',
      required_status_checks: {
        strict: true,
        contexts: ['Test']
      },
      enforce_admins: true,
      required_pull_request_reviews: {
        required_approving_review_count: 1,
        dismiss_stale_reviews: true,
        require_code_owner_reviews: false
      },
      restrictions: null
    });
    console.log('Branch protection rules set up successfully');
  } catch (error) {
    console.error('Error setting up branch protection:', error);
  }
}

setupBranchProtection(); 