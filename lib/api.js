
const response = async (context) => {
    const { payload, octokit } = context;
    const { issue, repository } = payload;
    const { user, body } = issue;

    let issueComment = null;

    if (payload.action === "opened") {
        issueComment = context.issue({
            body: `Thanks for opening this issue ${user.login}! \n\n Your issue is ${body} \n\n ${repository.name} team will get back to you as soon as possible.`,
        });
    } else if (payload.action === "edited") {
        issueComment = context.issue({
            body: `Thanks for editing this issue ${user.login}! \n\n Your issue is ${body} \n\n Keep patience ${repository.name} team will get back to you as soon as possible.`,
        });
    }
    return octokit.issues.createComment(issueComment);

};

module.exports = response;