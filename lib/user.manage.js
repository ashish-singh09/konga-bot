const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const handleInstall = async (req, res) => {
    console.log("Install Webhook received");

    try {

        const user = req.body;

        const newUser = {
            login: user.installation.account.login,
            avatar_url: user.installation.account.avatar_url,
            followers: user.installation.account.followers_url,
            organizations: user.installation.account.organizations_url,
            repos: user.repositories.map(repo => {
                return {
                    id: repo.id,
                    name: repo.name,
                    private: repo.private,
                    showing: repo.private ? false : true,
                }
            }),
            account: {
                status: (function () {
                    if (user.action === "created" || user.action === "unsuspend") return "active";
                    if (user.action === "suspend") return "suspended";
                    if (user.action === "deleted") return "deleted";
                })(),
                actionBy: user.installation.account.suspended_by?.login ? user.installation.account.suspended_by.login : user.sender.login,
            },
        };

        await prisma.user.upsert({
            where: {
                login: newUser.login,
            },
            update: {
                avatar_url: newUser.avatar_url,
                followers: newUser.followers,
                organizations: newUser.organizations,
                repos: newUser.repos,
                account: newUser.account,
            },
            create: newUser,
        });

        prisma.$disconnect();

        res.status(200).send('ok');
    } catch (error) {
        console.log(error);
        await prisma.$disconnect();
    }
};

module.exports = {
    handleInstall,
}