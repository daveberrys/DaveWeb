function createJSONResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status: status,
        headers: {
            "Content-Type": "application/json"
        }
    });
}

function getAvatarURL(user) {
    if (!user.avatar) {
        return null;
    } else {
        return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
    }
}

export async function GET() {
    try {
        const response = await fetch("https://api.lanyard.rest/v1/users/1149685116042485781");

        if (!response.ok) {
            return createJSONResponse(
                {
                    displayName: "null",
                    username: "null",
                    state: null,
                    status: "offline",
                    avatarUrl: null
                },
                response.status
            );
        } else {
            const data = await response.json();

            if (!data || !data.success || !data.data || !data.data.discord_user) {
                return createJSONResponse(
                    {
                        displayName: "null",
                        username: "null",
                        state: null,
                        status: "offline",
                        avatarUrl: null
                    },
                    500
                );
            } else {
                const user = data.data.discord_user;
                const customStatus = data.data.activities?.find(function (activity) {
                    if (activity.type === 4) {
                        return true;
                    } else {
                        return false;
                    }
                });

                return createJSONResponse({
                    displayName: user.global_name || user.username || "null",
                    username: user.username || "null",
                    state: customStatus?.state || null,
                    status: data.data.discord_status || "offline",
                    avatarUrl: getAvatarURL(user)
                });
            }
        }
    } catch (error) {
        console.log("Exception: " + error);

        return createJSONResponse(
            {
                displayName: "null",
                username: "null",
                state: null,
                status: "offline",
                avatarUrl: null
            },
            500
        );
    }
}
