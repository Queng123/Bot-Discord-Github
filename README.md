# Bot-Discord-Github

Github notifications on Discord, currently only for pull requests

## Installation

1. Fork the repository
2. Create a Discord app on [the discord developper page](https://discord.com/developers/applications)
3. Create a project on [vercel](https://vercel.com/), link to the forked repository
4. Add the following environment variables to your vercel project:
    - `DISCORD_TOKEN`: The token of your discord bot (from the discord developper page)
    - `CHANNEL_ID`: The id of the channel where you want to send the notifications
5. On vercel, create a `Edge Config Store`, with a schema for each of your user like:
   ```json
   {
     "github_username": "discord_username",
   }
   ```
    This will allow the bot to mention the users who not created the pull reques.
    Also, add the `EDGE_CONFIG` environment variable to your vercel project, with the url of the `Edge Config Store`.
6. Deploy the project on vercel
7. On the target repository, go to `Settings` > `Webhooks` > `Add webhook`
8. Set the `Payload URL` to the url of your vercel project, with the path `github-webhook`
9.  Enable the `Pull requests` event
10. Add the webhook
11. You're done! You should now receive notifications on discord when a pull request is created

## Usage

When a new commit is pushed to the repository, a notification will be sent to the discord channel

## License

This project is free to use.
